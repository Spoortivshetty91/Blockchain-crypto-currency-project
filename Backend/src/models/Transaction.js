import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    senderWallet: {
      type: String,
      required: true
    },
    receiverWallet: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    message: {
      type: String,
      default: ""
    },
    txHash: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "success"
    }
  },
  {
    timestamps: true
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;