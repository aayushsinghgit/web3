@echo off
echo Starting Krypt Development Environment...
echo.

echo Installing dependencies...
cd smart-contracts
call npm install
cd ..\crypto-app
call npm install
cd ..

echo.
echo Dependencies installed successfully!
echo.
echo To start development:
echo 1. Configure your .env files (see SETUP.md)
echo 2. Deploy smart contracts: cd smart-contracts && npm run deploy:localhost
echo 3. Start React app: cd crypto-app && npm start
echo.
pause