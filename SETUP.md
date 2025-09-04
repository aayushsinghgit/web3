# Krypt Application Setup Guide

This guide will help you set up and run the Krypt cryptocurrency application.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension
- Git

## Project Structure

```
Krypt/
├── crypto-app/          # React frontend application
├── smart-contracts/     # Ethereum smart contracts
└── SETUP.md            # This setup guide
```

## Setup Instructions

### 1. Install Dependencies

#### Smart Contracts
```bash
cd smart-contracts
npm install
```

#### React App
```bash
cd crypto-app
npm install
```

### 2. Environment Configuration

#### Smart Contracts Environment
1. Copy `.env.example` to `.env` in the `smart-contracts` folder
2. Update the values:
   ```
   ALCHEMY_URL=https://eth-ropsten.alchemyapi.io/v2/YOUR_API_KEY
   PRIVATE_KEY=your_private_key_without_0x_prefix
   ```

#### React App Environment
1. Copy `.env.example` to `.env` in the `crypto-app` folder
2. Update the Firebase configuration values
3. Add your deployed contract address

### 3. Smart Contract Deployment

#### Option A: Local Development
```bash
cd smart-contracts
npm run node          # Start local Hardhat node
npm run deploy:localhost  # Deploy to local network
```

#### Option B: Ropsten Testnet
```bash
cd smart-contracts
npm run deploy:ropsten    # Deploy to Ropsten testnet
```

### 4. Update Contract Address

After deployment, update the contract address in:
- `crypto-app/.env` file: `REACT_APP_CONTRACT_ADDRESS=your_deployed_address`

### 5. Start the Application

```bash
cd crypto-app
npm start
```

The application will be available at `http://localhost:3000`

## Features

- Cryptocurrency wallet integration
- Transaction management
- Token exchange
- Blog and news integration
- Demo request forms
- Fundraising platform

## Security Notes

- Never commit `.env` files to version control
- Keep your private keys secure
- Use testnet for development
- Regularly update dependencies

## Troubleshooting

### Common Issues

1. **MetaMask Connection Issues**
   - Ensure MetaMask is installed and unlocked
   - Switch to the correct network (localhost or Ropsten)

2. **Contract Deployment Fails**
   - Check your account has sufficient ETH for gas fees
   - Verify your private key and API keys are correct

3. **React App Won't Start**
   - Ensure all environment variables are set
   - Check for any missing dependencies

### Getting Help

- Check the console for error messages
- Verify all environment variables are properly set
- Ensure you're connected to the correct network in MetaMask

## Development Commands

### Smart Contracts
- `npm run compile` - Compile contracts
- `npm run test` - Run tests
- `npm run node` - Start local node
- `npm run deploy:localhost` - Deploy to local network
- `npm run deploy:ropsten` - Deploy to Ropsten

### React App
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests