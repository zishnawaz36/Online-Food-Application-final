import express from "express";
import Razorpay from "razorpay";
import Payment from "../models/payment.js";

const router = express.Router();

// Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// ROUTE 1: Create Order API
router.post("/order", async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100), // Convert to paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ data: order });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});

// ROUTE 2: Verify Payment API
router.post("/verify", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign)
            .digest("hex");

        if (expectedSign === razorpay_signature) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            await payment.save();
            res.status(200).json({ message: "Payment Successfully Verified!" });
        } else {
            res.status(400).json({ message: "Invalid Signature!" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

export default router;
