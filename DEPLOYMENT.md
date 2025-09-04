# KRYPT Deployment Guide

## Smart Contracts (Sepolia Testnet)

1. **Setup Environment**
```bash
cd smart-contracts
cp .env.example .env
# Add your SEPOLIA_URL and PRIVATE_KEY
```

2. **Deploy to Testnet**
```bash
npm run deploy:sepolia
```

## Frontend Deployment

### Option 1: Vercel
```bash
npm install -g vercel
vercel --prod
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
cd crypto-app && npm run build
netlify deploy --prod --dir=build
```

### Option 3: Manual Build
```bash
cd crypto-app
npm run build
# Upload build/ folder to hosting service
```

## Environment Variables

**Smart Contracts (.env)**
- `SEPOLIA_URL`: Infura/Alchemy Sepolia endpoint
- `PRIVATE_KEY`: Wallet private key for deployment

**Frontend (.env.production)**
- `REACT_APP_CONTRACT_ADDRESS`: Deployed contract address
- `REACT_APP_NETWORK_ID`: 11155111 (Sepolia)
- `REACT_APP_NETWORK_NAME`: sepolia

## Testing
- Frontend: https://your-app.vercel.app
- Smart Contracts: Sepolia Etherscan
- MetaMask: Switch to Sepolia testnet