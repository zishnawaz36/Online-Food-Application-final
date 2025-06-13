import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ManagerDetails from "../models/Manager.js";
import RestaurantDetails from "../models/restaurantDetails.js";
import UserModel from "../models/User.js";

// Register new user
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!(await UserModel.findOne({ email }))) {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({ username, email, password: hash, role });
      return res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
    }

    return res.status(409).json({ success: false, message: "User already exists." });
  } catch (err) {
    const msg = err.name === "ValidationError" ? err.message : "Internal Server Error";
    return res.status(500).json({ success: false, message: msg });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).lean();
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    delete user.password;
    return res.status(200).json({ success: true, message: "Login successful", user, token });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Logout user
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Create new restaurant
export const createRestaurant = async (req, res) => {
  const { name, address, menu, specialfor } = req.body;
  if (!name || !address || !menu || !specialfor) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  try {
    const restaurant = await RestaurantDetails.create({ name, address, menu, specialfor });
    return res.status(201).json({ success: true, message: "Restaurant created", restaurant });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Create new manager
export const createManager = async (req, res) => {
  const { Name, AdharNumber, PanNumber, PhoneNumber } = req.body;
  if (!(Name && AdharNumber && PanNumber && PhoneNumber)) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }
  try {
    const manager = await ManagerDetails.create({ Name, AdharNumber, PanNumber, PhoneNumber });
    return res.status(201).json({ success: true, message: "Manager created", manager });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get all restaurants
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantDetails.find();
    return res.status(200).json({ success: true, restaurants });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get all managers
export const getManagers = async (req, res) => {
  try {
    const managers = await ManagerDetails.find();
    return res.status(200).json({ success: true, managers });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
