import express from "express";
import {
  signup,
  login,
  logout,
  getCurrentUser,
  checkAuth,
  updateProfile,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Protected routes
router.get("/me", isAuthenticated, getCurrentUser);
router.get("/check", isAuthenticated, checkAuth);
router.put("/profile", isAuthenticated, updateProfile);

export default router;