import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import User from "../models/User.js";

// Get all published courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true })
            .populate("educator", "name imageUrl")
            .sort({ createdAt: -1 });

        res.json({ success: true, courses });
    } catch (error) {
        console.error("Get courses error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch courses" });
    }
};

// Get single course by ID
export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id)
            .populate("educator", "name imageUrl");

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Check if user is enrolled
        let isEnrolled = false;
        if (req.user) {
            const enrollment = await Enrollment.findOne({
                user: req.user._id,
                course: id,
            });
            isEnrolled = !!enrollment;
        }

        res.json({ success: true, course, isEnrolled });
    } catch (error) {
        console.error("Get course error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch course" });
    }
};

// Enroll in a course
export const enrollInCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Check if course exists
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({
            user: userId,
            course: id,
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: "Already enrolled in this course"
            });
        }

        // Calculate purchase price
        const purchasePrice = course.coursePrice - (course.discount * course.coursePrice) / 100;

        // Create enrollment
        const enrollment = new Enrollment({
            user: userId,
            course: id,
            purchasePrice,
            status: "active",
        });
        await enrollment.save();

        // Add to course's enrolledStudents
        await Course.findByIdAndUpdate(id, {
            $addToSet: { enrolledStudents: userId },
        });

        // Add to user's enrolledCourses
        await User.findByIdAndUpdate(userId, {
            $addToSet: { enrolledCourses: id },
        });

        res.json({
            success: true,
            message: "Successfully enrolled in course",
            enrollment
        });
    } catch (error) {
        console.error("Enrollment error:", error);
        res.status(500).json({ success: false, message: "Failed to enroll" });
    }
};

// Unenroll from a course
export const unenrollFromCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Delete enrollment
        const enrollment = await Enrollment.findOneAndDelete({
            user: userId,
            course: id,
        });

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found"
            });
        }

        // Remove from course's enrolledStudents
        await Course.findByIdAndUpdate(id, {
            $pull: { enrolledStudents: userId },
        });

        // Remove from user's enrolledCourses
        await User.findByIdAndUpdate(userId, {
            $pull: { enrolledCourses: id },
        });

        res.json({ success: true, message: "Successfully unenrolled from course" });
    } catch (error) {
        console.error("Unenroll error:", error);
        res.status(500).json({ success: false, message: "Failed to unenroll" });
    }
};

// Mark course as completed
export const completeCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const enrollment = await Enrollment.findOneAndUpdate(
            { user: userId, course: id },
            {
                status: "completed",
                completedAt: new Date(),
                "progress.percentComplete": 100
            },
            { new: true }
        );

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found"
            });
        }

        res.json({
            success: true,
            message: "Course marked as completed",
            enrollment
        });
    } catch (error) {
        console.error("Complete course error:", error);
        res.status(500).json({ success: false, message: "Failed to complete course" });
    }
};

// Get user's enrolled courses
export const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user._id;

        const enrollments = await Enrollment.find({ user: userId })
            .populate({
                path: "course",
                populate: { path: "educator", select: "name imageUrl" }
            })
            .sort({ enrolledAt: -1 });

        const enrolledCourses = enrollments.map(enrollment => ({
            ...enrollment.course.toObject(),
            enrollmentId: enrollment._id,
            status: enrollment.status,
            progress: enrollment.progress,
            enrolledAt: enrollment.enrolledAt,
            completedAt: enrollment.completedAt,
        }));

        res.json({ success: true, enrolledCourses });
    } catch (error) {
        console.error("Get enrolled courses error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch enrolled courses" });
    }
};
