import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
      req.user = decoded; // You can pass decoded info to next middleware/controller
      next(); // ✅ Proceed to the next middleware/controller
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

export default verifyToken;
