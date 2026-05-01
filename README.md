# 🔐 Vaulta — Premium Web3 Wallet & DeFi Platform

Vaulta is a production-ready, dark glassmorphic Web3 platform built on Ethereum. It features a modern React application, a dedicated Express backend, and professional Solidity smart contracts.

## 📁 Project Structure

```
Vaulta/
├── crypto-app/          # React 19 + Vite frontend
├── server/              # Express + SQLite backend for referrals
├── smart-contracts/     # Hardhat + Solidity smart contracts
├── start-dev.bat        # Launches frontend dev server
└── start-backend.bat    # Launches referral backend
```

## 🚀 Key Features

### 1. AI-Powered Fundraiser (Real On-Chain)
- **Smart Contracts**: Uses a `FundraiserFactory` pattern to deploy unique contracts for every project.
- **AI Integration**: Leverages Gemini 1.5 Flash to generate project descriptions from titles.
- **Voice-to-Text**: Built-in speech recognition for accessibility and ease of use.

### 2. Universal Wallet Support
- **Multi-Provider**: Integrated **Web3Modal** to support MetaMask, WalletConnect, and Coinbase Wallet.
- **Real Transactions**: Fully integrated with `ethers.js` for on-chain transfers.

### 3. Server-Side Referrals
- **Tracking**: Real-time referral recording using a dedicated Node.js/SQLite backend.
- **Leaderboard**: Global rankings based on real conversion data, not just client-side simulation.

## 🛠️ Getting Started

### 1. Smart Contracts
```bash
cd smart-contracts
npm install
npx hardhat compile
# Deploy to local node or testnet
npx hardhat run scripts/deploy.js --network sepolia
npx hardhat run scripts/deploy_fundraiser.js --network sepolia
```

### 2. Backend Server
```bash
cd server
npm install
npm start # Or run start-backend.bat from root
```

### 3. Frontend App
```bash
cd crypto-app
npm install
npm run dev # Or run start-dev.bat from root
```

## 📜 License
This project is licensed under the MIT License.

*Built for the future of decentralized finance.*