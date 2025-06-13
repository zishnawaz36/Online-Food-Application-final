import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ManagerDetails from "../models/manager.js";
import RestaurantDetails from "../models/restaurantDetails.js";
import UserModel from "../models/user.js";

// Register new user
const register = async (req, res) => {
    try {
        console.log("Data comming from backend check:",req.body);
       const { username, email, password, role } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ success: false, message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            username,
            email,
            password: hashPassword,
            role
        });

        await newUser.save();
        res.status(200).json({ success: true, message: "User registered successfully", newUser });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
};

// User login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }

       

       
    const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);



        res.status(200).json({ message: "Login successful", success: true, user, token });
    } catch (err) {
        res.status(500).json({ message: "Error during login", success: false, error: err.message });
    }
};

// User logout
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Error during logout", success: false, error: err.message });
    }
};

// Create new restaurant
const createRestaurant = async (req, res) => {
    try {
        const { name, address, menu, specialfor } = req.body;
        if (!name || !address || !menu || !specialfor) {
            return res.status(400).json({ message: "Fields are required", success: false });
        }

        const newRestaurant = await RestaurantDetails.create({
            name,
            address,
            menu,
            specialfor
        });

        res.status(201).json({ message: "Successfully created", newRestaurant });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new manager
const createManager = async (req, res) => {
    try {
        const { Name, AdharNumber, PanNumber, PhoneNumber } = req.body;
        if (!Name || !AdharNumber || !PhoneNumber || !PanNumber ) {
            return res.status(400).json({ message: "Fields are required", success: false });
        }

        const newManager = await ManagerDetails.create({
            Name,
            AdharNumber,
            PhoneNumber,
            PanNumber
        });

        res.status(201).json({ message: "Manager successfully created", newManager });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all restaurants
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await RestaurantDetails.find();
        res.status(200).json({ message: "Restaurants fetched successfully", success: true, restaurants });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

// Get all managers
const getManagers = async (req, res) => {
    try {
        const managers = await ManagerDetails.find();
        res.status(200).json({ message: "Managers fetched successfully", success: true, managers });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

export { register, login, logout, createRestaurant, createManager, getManagers, getRestaurants };
