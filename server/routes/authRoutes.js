import express from "express";
import {
  signup,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", isAuthenticated, getCurrentUser);

export default router;