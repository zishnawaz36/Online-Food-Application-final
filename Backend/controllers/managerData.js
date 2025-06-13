// controller functions for latest data

export const getLatestManager = async (req, res) => {
  const manager = await ManagerDetails.findOne().sort({ createdAt: -1 }).exec();
  res.json({ success: true, manager });
};

export const getLatestRestaurant = async (req, res) => {
  const restaurant = await RestaurantDetails.findOne().sort({ createdAt: -1 }).exec();
  res.json({ success: true, restaurant });
};

export const getLatestAddress = async (req, res) => {
  const address = await Address.findOne({ userId: req.user.id }).sort({ createdAt: -1 }).exec();
  if (!address) return res.status(404).json({ success: false, message: "No address found" });
  res.json({ success: true, address });
};
