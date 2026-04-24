import { contract } from "./config/blockchain.js";

async function test() {
  try {
    console.log("Contract connected successfully");
    console.log("Contract address:", await contract.getAddress());
  } catch (error) {
    console.error("Error:", error.message);
  }
}

test();