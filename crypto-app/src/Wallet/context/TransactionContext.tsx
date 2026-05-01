import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { 
  contractAddress, contractABI, 
  factoryAddress, factoryABI, 
  fundraiserABI 
} from '../utils/constants';

interface TransactionContextType {
  currentAccount: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendTransaction: (addressTo: string, amount: string, message: string, keyword: string) => Promise<void>;
  createFundraiser: (title: string, description: string, goal: string) => Promise<void>;
  getFundraisers: () => Promise<any[]>;
  transactions: any[];
  isLoading: boolean;
  formData: { addressTo: string; amount: string; keyword: string; message: string };
  setFormData: React.Dispatch<React.SetStateAction<{ addressTo: string; amount: string; keyword: string; message: string }>>;
}

const TransactionContext = createContext<TransactionContextType>({} as TransactionContextType);

export const useTransaction = () => useContext(TransactionContext);

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: import.meta.env.VITE_INFURA_ID || "27e484dcd9e3efcfd25a83a78777cdf1",
    },
  },
};

let web3Modal: any;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
    theme: "dark",
  });
}

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const providerRef = useRef<any>(null);

  const getEthereumContract = (address: string, abi: any) => {
    if (!providerRef.current) throw new Error("No provider found");
    const provider = new ethers.providers.Web3Provider(providerRef.current);
    const signer = provider.getSigner();
    return new ethers.Contract(address, abi, signer);
  };

  const getAllTransactions = async () => {
    try {
      if (!providerRef.current) return;
      const contract = getEthereumContract(contractAddress, contractABI);
      const availableTransactions = await contract.getAllTransactions();
      const parsed = availableTransactions.map((tx: any) => ({
        addressTo: tx.receiver,
        addressFrom: tx.sender,
        timestamp: new Date(tx.timestamp.toNumber() * 1000).toISOString(),
        message: tx.message,
        keyword: tx.keyword,
        amount: ethers.utils.formatEther(tx.amount),
      }));
      setTransactions(parsed.reverse());
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const connectWallet = async () => {
    try {
      const instance = await web3Modal.connect();
      providerRef.current = instance;
      const provider = new ethers.providers.Web3Provider(instance);
      const accounts = await provider.listAccounts();
      
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        toast.success('Wallet connected!');
        await getAllTransactions();
      }

      // Listen for account changes
      instance.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
        else disconnectWallet();
      });

      instance.on("chainChanged", () => window.location.reload());
      instance.on("disconnect", () => disconnectWallet());

    } catch (err: any) {
      console.error("Connection error:", err);
      toast.error('Connection failed');
    }
  };

  const disconnectWallet = () => {
    web3Modal.clearCachedProvider();
    setCurrentAccount('');
    providerRef.current = null;
    toast.success('Wallet disconnected');
  };

  const sendTransaction = async (addressTo: string, amount: string, message: string, keyword: string) => {
    try {
      if (!currentAccount) { toast.error('Connect wallet first!'); return; }
      setIsLoading(true);
      const toastId = toast.loading('Waiting for confirmation...');
      
      const contract = getEthereumContract(contractAddress, contractABI);
      const parsedAmount = ethers.utils.parseEther(amount);

      const tx = await contract.addToBlockchain(addressTo, parsedAmount, message, keyword, {
        value: parsedAmount
      });
      
      await tx.wait();

      toast.success('Transaction sent!', { id: toastId });
      await getAllTransactions();
    } catch (err: any) {
      toast.error(err?.message || 'Transaction failed');
    } finally {
      setIsLoading(false);
    }
  };

  const createFundraiser = async (title: string, description: string, goal: string) => {
    try {
      if (!currentAccount) { toast.error('Connect wallet first!'); return; }
      setIsLoading(true);
      const toastId = toast.loading('Deploying fundraiser contract...');
      
      const factory = getEthereumContract(factoryAddress, factoryABI);
      const tx = await factory.createFundraiser(title, description, ethers.utils.parseEther(goal));
      
      await tx.wait();
      toast.success('🚀 Fundraiser launched on-chain!', { id: toastId });
    } catch (err: any) {
      toast.error(err?.message || 'Deployment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const getFundraisers = async () => {
    try {
      if (!providerRef.current) return [];
      const factory = getEthereumContract(factoryAddress, factoryABI);
      const addresses = await factory.getFundraisers();
      
      const fundraiserData = await Promise.all(addresses.map(async (addr: string) => {
        const fundraiser = getEthereumContract(addr, fundraiserABI);
        const details = await fundraiser.getDetails();
        return {
          address: addr,
          title: details[0],
          description: details[1],
          goal: ethers.utils.formatEther(details[2]),
          totalRaised: ethers.utils.formatEther(details[3]),
          isWithdrawn: details[4],
          creator: details[5]
        };
      }));
      
      return fundraiserData.reverse();
    } catch (err) {
      console.error("Error fetching fundraisers:", err);
      return [];
    }
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  return (
    <TransactionContext.Provider value={{
      currentAccount, connectWallet, disconnectWallet,
      sendTransaction, createFundraiser, getFundraisers,
      transactions, isLoading,
      formData, setFormData
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
