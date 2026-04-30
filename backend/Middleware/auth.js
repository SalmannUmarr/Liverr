import jwt from "jsonwebtoken";
import { User } from "../Models/index.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.access_token ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid session" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
