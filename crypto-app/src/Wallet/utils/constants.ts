import TransactionsArtifact from './Transactions.json';
import FundraiserFactoryArtifact from './FundraiserFactory.json';
import FundraiserArtifact from './Fundraiser.json';

// Core Transaction Contract
export const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
export const contractABI = TransactionsArtifact.abi;

// Fundraiser Factory Contract
export const factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS || '0x0000000000000000000000000000000000000000';
export const factoryABI = FundraiserFactoryArtifact.abi;

// Individual Fundraiser ABI (used when interacting with deployed clones)
export const fundraiserABI = FundraiserArtifact.abi;
