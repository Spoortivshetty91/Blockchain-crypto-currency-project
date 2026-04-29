import express from "express";
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/:walletAddress", getUserProfile);

export default router;