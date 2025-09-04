@echo off
echo ================================
echo    Krypt Application Installer
echo ================================
echo.

echo [1/4] Installing Smart Contract Dependencies...
cd smart-contracts
call npm install
if %errorlevel% neq 0 (
    echo Error installing smart contract dependencies!
    pause
    exit /b 1
)

echo.
echo [2/4] Installing React App Dependencies...
cd ..\crypto-app
call npm install
if %errorlevel% neq 0 (
    echo Error installing React app dependencies!
    pause
    exit /b 1
)

echo.
echo [3/4] Setting up environment files...
cd ..
if not exist "smart-contracts\.env" (
    copy "smart-contracts\.env.example" "smart-contracts\.env"
    echo Created smart-contracts\.env from template
)
if not exist "crypto-app\.env" (
    copy "crypto-app\.env.example" "crypto-app\.env"
    echo Created crypto-app\.env from template
)

echo.
echo [4/4] Installation Complete!
echo.
echo ================================
echo    Next Steps:
echo ================================
echo 1. Configure your .env files with your API keys
echo 2. Read SETUP.md for detailed instructions
echo 3. Deploy smart contracts: cd smart-contracts && npm run deploy:localhost
echo 4. Start the app: cd crypto-app && npm start
echo.
echo Happy coding!
pause