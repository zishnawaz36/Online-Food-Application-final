import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTMONGO);
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.log("Error to Connect:", err.message);
    }
};

export default connectDB;
