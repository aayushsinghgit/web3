const { exec } = require('child_process');
const path = require('path');

// Deploy smart contracts to testnet
function deployContracts() {
  console.log('🚀 Deploying smart contracts...');
  exec('npm run deploy:sepolia', { cwd: './smart-contracts' }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Contract deployment failed:', error);
      return;
    }
    console.log('✅ Smart contracts deployed:', stdout);
  });
}

// Build and prepare frontend for production
function buildFrontend() {
  console.log('🏗️ Building frontend...');
  exec('npm run build', { cwd: './crypto-app' }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Frontend build failed:', error);
      return;
    }
    console.log('✅ Frontend built successfully');
    console.log('📦 Build output in crypto-app/build/');
  });
}

// Run deployment
console.log('🎯 Starting production deployment...');
deployContracts();
buildFrontend();