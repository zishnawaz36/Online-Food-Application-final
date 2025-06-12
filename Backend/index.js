import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import express from 'express';
import connectDB from "./utlis/connect.js"; 
import Authroute from "./routes/AuthRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import payment from './models/payment.js';
dotenv.config();
await connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true
}));


app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.use("/api/auth", Authroute);
app.use("/api/admin", AdminRoute);
app.use('/api/payment', payment);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
