import express from "express";
import {mintNFT ,getNFTs} from "../controllers/NFTControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post('/mintnft',verifyToken,mintNFT);
router.get('/getnfts',verifyToken,getNFTs);
export default router;