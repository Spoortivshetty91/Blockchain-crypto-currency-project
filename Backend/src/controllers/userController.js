import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const walletAddress = req.params.walletAddress;

    console.log("Wallet received:", walletAddress); // debug

    const user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};