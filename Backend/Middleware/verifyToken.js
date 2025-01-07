import jwt from "jsonwebtoken";
import UserModel from "../models/user.js"; // Ensure the correct path and extension

const isAdmin = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;
        console.log("Token found:", token);

        // If token is missing, return an unauthorized response
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify token and decode payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        // Find the user by ID
        const user = await UserModel.findById(decoded.userId); // Ensure payload includes `userId`
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user has the 'admin' role
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized: User is not an admin" });
        }

        // Attach user to the request object for future use and proceed to the next middleware
        req.user = user;
        next();
    } catch (err) {
        // Handle errors and send appropriate response
        console.log("Error in isAdmin middleware:", err.message);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

export { isAdmin };
