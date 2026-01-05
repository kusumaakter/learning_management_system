import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Check if user is authenticated
 * Verifies JWT token and attaches user info to request
 */
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user object
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please login again.",
      });
    }

    req.user = user;
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};

/**
 * Generic role authorization middleware
 * Usage: authorizeRoles("admin", "educator")
 * @param  {...string} roles - Allowed roles
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. This resource requires one of these roles: ${roles.join(", ")}`,
      });
    }
    next();
  };
};

/**
 * Check if user is admin
 */
export const isAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
  next();
};

/**
 * Check if user is educator
 */
export const isEducator = (req, res, next) => {
  if (req.userRole !== "educator" && req.userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Educator privileges required.",
    });
  }
  next();
};

/**
 * Check if user is student
 */
export const isStudent = (req, res, next) => {
  if (req.userRole !== "student" && req.userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Student privileges required.",
    });
  }
  next();
};