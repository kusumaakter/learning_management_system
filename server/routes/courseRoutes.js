import express from "express";
import {
    getAllCourses,
    getCourseById,
    enrollInCourse,
    unenrollFromCourse,
    completeCourse,
    getEnrolledCourses,
    updateLectureProgress,
} from "../controllers/courseController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllCourses);
router.get("/enrolled", isAuthenticated, getEnrolledCourses);
router.get("/:id", getCourseById);

// Protected routes
router.post("/:id/enroll", isAuthenticated, enrollInCourse);
router.delete("/:id/unenroll", isAuthenticated, unenrollFromCourse);
router.put("/:id/complete", isAuthenticated, completeCourse);
router.put("/:id/progress", isAuthenticated, updateLectureProgress);

export default router;

