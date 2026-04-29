import express from "express";
import {
  sendTransaction,
  getTransactions
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/send", sendTransaction);
router.get("/:walletAddress", getTransactions);

export default router;