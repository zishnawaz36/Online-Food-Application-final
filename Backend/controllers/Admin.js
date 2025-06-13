import User from "../models/User.js";
import Manager from "../models/Manager.js";
import RestaurantDetails from "../models/restaurantDetails.js";

// Get all data
export const GetUser = async (req, res) => {
  try {
    const users = await User.find();
    const managers = await Manager.find();
    const restaurants = await RestaurantDetails.find();

    res.status(200).json({
      success: true,
      users,
      managers,
      restaurants
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Manager
export const deleteManager = async (req, res) => {
  try {
    const { id } = req.params;
    await Manager.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Manager deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
