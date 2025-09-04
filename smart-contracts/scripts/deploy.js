const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("Network:", hre.network.name);

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("\n=== Deployment Successful ===");
  console.log("Transactions contract deployed to:", transactions.address);
  console.log("Transaction hash:", transactions.deployTransaction.hash);
  console.log("\nUpdate your .env file with:");
  console.log(`REACT_APP_CONTRACT_ADDRESS=${transactions.address}`);
  
  // Verify deployment
  const transactionCount = await transactions.getTransactionCount();
  console.log("\nContract verification - Transaction count:", transactionCount.toString());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
};

runMain();
