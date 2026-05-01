const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  
  if (!deployer) {
    throw new Error("No deployer account found. Check your private key in .env file");
  }
  
  console.log("Deploying FundraiserFactory with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("Network:", hre.network.name);

  const FundraiserFactory = await hre.ethers.getContractFactory("FundraiserFactory");
  const factory = await FundraiserFactory.deploy();

  await factory.deployed();

  console.log("\n=== Deployment Successful ===");
  console.log("FundraiserFactory deployed to:", factory.address);
  console.log("Transaction hash:", factory.deployTransaction.hash);
  console.log("\nNext step: Update your frontend constants with this address.");
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
