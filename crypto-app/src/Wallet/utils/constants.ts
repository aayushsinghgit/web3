import TransactionsArtifact from './Transactions.json';
import FundraiserFactoryArtifact from './FundraiserFactory.json';
import FundraiserArtifact from './Fundraiser.json';

// Core Transaction Contract
export const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '0x406138B18F29b1A39BC30Fd2E9Fe807A3077E436';
export const contractABI = TransactionsArtifact.abi;

// Fundraiser Factory Contract
export const factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS || '0xE90319b010eF951603AA46b926b6b2c11076ef5c';
export const factoryABI = FundraiserFactoryArtifact.abi;

// Individual Fundraiser ABI (used when interacting with deployed clones)
export const fundraiserABI = FundraiserArtifact.abi;
