import express from "express";
import {
    getDashboardData,
    getEnrolledStudents,
} from "../controllers/educatorController.js";
import { isAuthenticated, isEducator } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes require authentication and educator role
router.use(isAuthenticated);
router.use(isEducator);

router.get("/dashboard", getDashboardData);
router.get("/students", getEnrolledStudents);

export default router;
