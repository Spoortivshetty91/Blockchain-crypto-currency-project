async function main() {
  console.log("Deploying contract...");

  const Transaction = await ethers.getContractFactory("Transaction");
  const transaction = await Transaction.deploy();

  // ✅ PUT HERE
  await transaction.waitForDeployment();

  console.log("Contract deployed successfully!");
  console.log("Contract Address:", await transaction.getAddress());
}

main().catch((error) => {
  console.error("Deployment error:", error);
  process.exit(1);
});