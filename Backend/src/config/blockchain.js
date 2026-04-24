import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Read ABI file manually
const artifact = JSON.parse(
  fs.readFileSync(
    "../blockchain/artifacts/contracts/Transaction.sol/Transaction.json",
    "utf-8"
  )
);

// Connect to local blockchain
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// Wallet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  artifact.abi,
  wallet
);

export { provider, wallet, contract };