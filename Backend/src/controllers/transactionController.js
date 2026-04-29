import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const sendTransaction = async (req, res) => {
  try {
    const { senderWallet, receiverWallet, amount, message } = req.body;

    const senderUser = await User.findOne({ walletAddress: senderWallet });
    const receiverUser = await User.findOne({ walletAddress: receiverWallet });

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (senderUser.balance < Number(amount)) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    senderUser.balance -= Number(amount);
    receiverUser.balance += Number(amount);

    await senderUser.save();
    await receiverUser.save();

    const newTransaction = new Transaction({
      sender: senderUser._id,
      receiver: receiverUser._id,
      senderWallet: senderUser.walletAddress,
      receiverWallet: receiverUser.walletAddress,
      amount: Number(amount),
      message: message || "",
      txHash: "0x" + Math.random().toString(16).slice(2),
      status: "success",
    });

    await newTransaction.save();

    res.status(201).json({
      message: "Transaction successful",
      transaction: newTransaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const { walletAddress } = req.params;

    const transactions = await Transaction.find({
      $or: [
        { senderWallet: walletAddress },
        { receiverWallet: walletAddress },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};