// ProductCard.js
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProductCard() {
    const [amount, setAmount] = useState(350);
    const navigate = useNavigate(); // Hook for navigation

    // handlePayment Function
    const handlePayment = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/payment/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount }),
            });

            const data = await res.json();
            if (data && data.data) {
                handlePaymentVerify(data.data);
                console.log("Order created:", data.data);
            } else {
                toast.error("Order creation failed!");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            toast.error("Internal Server Error!");
        }
    };

    // handlePaymentVerify Function
    const handlePaymentVerify = async (order) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Ensure this is set in the .env file
            amount: order.amount,
            currency: order.currency,
            name: "Devknus",
            description: "Test Transaction",
            order_id: order.id,
            handler: async (response) => {
                try {
                    const res = await fetch("http://localhost:4000/api/payment/verify", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    const verifyData = await res.json();
                    if (verifyData.message) {
                        toast.success(verifyData.message);
                        navigate("/checkout"); // Redirect to checkout
                    } else {
                        toast.error("Payment verification failed!");
                    }
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    toast.error("Verification Failed!");
                }
            },
            theme: {
                color: "#5f63b8",
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <>
            <button
                onClick={handlePayment}
                className="w-full bg-[#1B9CFC] text-white py-2 rounded"
            >
                Pay ₹{amount}
            </button>
        </>
    );
}
