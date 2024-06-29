import express from "express";
import {addBooking, verifyPayment} from "../controllers/PaymentController.js";

const router = express.Router();

router.post("/addBooking", addBooking);
router.post("/verify", verifyPayment);

export default router;