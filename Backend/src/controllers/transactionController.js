import { contract } from "../config/blockchain.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const sendTransaction = async (req, res) => {
  try {
    const { senderWallet, receiverWallet, amount, message } = req.body;

    if (!senderWallet || !receiverWallet || !amount) {
      return res.status(400).json({
        success: false,
        error: "senderWallet, receiverWallet and amount are required"
      });
    }

    const senderUser = await User.findOne({ walletAddress: senderWallet });
    const receiverUser = await User.findOne({ walletAddress: receiverWallet });

    if (!senderUser) {
      return res.status(404).json({
        success: false,
        error: "Sender user not found"
      });
    }

    if (!receiverUser) {
      return res.status(404).json({
        success: false,
        error: "Receiver user not found"
      });
    }

    if (senderWallet === receiverWallet) {
      return res.status(400).json({
        success: false,
        error: "Sender and receiver cannot be same"
      });
    }

    const tx = await contract.sendTransaction(receiverWallet, amount, message || "");
    await tx.wait();

    const savedTransaction = await Transaction.create({
      sender: senderUser._id,
      receiver: receiverUser._id,
      senderWallet,
      receiverWallet,
      amount,
      message: message || "",
      txHash: tx.hash,
      status: "success"
    });

    res.status(200).json({
      success: true,
      message: "Transaction sent successfully",
      txHash: tx.hash,
      transaction: savedTransaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("sender", "name email walletAddress")
      .populate("receiver", "name email walletAddress")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};