import { Address } from "../models/address.js";

const CreateAddress = async (req, res) => {
    try {
        const { name, phoneNo, state, city, pincode, landMark, houseno, roadname } = req.body;

        // Validate that all fields are provided
        if (!name || !phoneNo || !state || !city || !pincode || !landMark || !houseno || !roadname) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Create new address and associate it with the authenticated user
        const newAddress = await Address.create({
            name,
            phoneNo,
            state,
            city,
            pincode,
            landMark,
            houseno,
            roadname,
        });

        // Send a success response with the created address
        res.status(201).json({ message: "Address successfully created", success: true, newAddress });
    } catch (err) {
        console.error("Error creating address:", err);
        res.status(500).json({ message: err.message, success: false });
    }
};

// Get all addresses (most recent first)
const getAddress = async (req, res) => {
    try {
        const userId = req._id; // Extract userId from the authenticated user

        // Fetch the most recent address linked to the logged-in user
        const address = await Address.find({ userId })
            .sort({ _id: -1 })  // Sorting by _id in descending order (newest first)
            .limit(1)  // Limit to only the most recent address
            .exec();

        if (address.length === 0) {
            return res.status(404).json({ message: "No addresses found", success: false });
        }

        res.status(200).json({ message: "Address fetched successfully", success: true, address });
    } catch (err) {
        console.error("Error fetching address:", err);
        res.status(500).json({ message: err.message, success: false });
    }
};


export { CreateAddress, getAddress };
