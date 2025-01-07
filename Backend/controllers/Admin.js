import UserModel from "../models/user.js";
import ManagerDetails from "../models/manager.js";

// Get users
const GetUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({
      message: "Successfully fetched users",
      status: 200,
      success: true,
      users
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false
    });
    console.log("Error fetching data: ", err.message);
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false
    });
  }
};

// Delete manager
const deleteManager = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedManager = await ManagerDetails.findByIdAndDelete(id);
    if (!deletedManager) {
      return res.status(404).json({
        message: "Manager not found",
        success: false
      });
    }
    res.status(200).json({
      message: "Manager deleted successfully",
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false
    });
  }
};

export { GetUser, deleteUser, deleteManager };
