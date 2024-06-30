import express from "express";
import {mintNFT ,getNFTs,sellNFT,buyNFT,getNFTstoBuy} from "../controllers/NFTControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post('/mintnft',verifyToken,mintNFT);
router.get('/getnfts',verifyToken,getNFTs);
router.post('/sellnft',verifyToken,sellNFT);
router.post('/buynft',verifyToken,buyNFT);
router.get('/buynft',verifyToken,getNFTstoBuy);
export default router;