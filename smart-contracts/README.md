# Smart Contracts - KRYPT Platform

Ethereum smart contracts for the KRYPT cryptocurrency platform, including token contracts, staking, and DeFi protocols.

## 📁 Contract Structure

```
smart-contracts/
├── contracts/           # Solidity smart contracts
├── scripts/            # Deployment scripts
├── test/               # Contract tests
├── hardhat.config.js   # Hardhat configuration
└── package.json        # Dependencies
```

## 🔧 Tech Stack

- **Solidity** - Smart contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Security standards
- **Ethers.js** - Ethereum library

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MetaMask wallet

### Installation

```bash
cd smart-contracts
npm install
```

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npx hardhat test
```

### Deploy to Network
```bash
npx hardhat run scripts/deploy.js --network localhost
```

## 📋 Contracts

- **KryptToken.sol** - Main ERC-20 token
- **TokenSale.sol** - Token sale contract
- **Staking.sol** - Staking rewards
- **Governance.sol** - DAO governance

## 🔐 Security

- OpenZeppelin standards
- Comprehensive testing
- Audit-ready code