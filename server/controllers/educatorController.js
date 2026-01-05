import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

// Get educator dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const educatorId = req.user._id;

        // Get educator's courses
        const courses = await Course.find({ educator: educatorId });
        const courseIds = courses.map(c => c._id);

        // Get enrollments for educator's courses
        const enrollments = await Enrollment.find({ course: { $in: courseIds } })
            .populate("user", "name imageUrl email")
            .populate("course", "courseTitle coursePrice discount")
            .sort({ enrolledAt: -1 });

        // Calculate total earnings
        const totalEarnings = enrollments.reduce((sum, e) => sum + (e.purchasePrice || 0), 0);

        // Format enrolled students data
        const enrolledStudentsData = enrollments.slice(0, 10).map(enrollment => ({
            student: {
                _id: enrollment.user._id,
                name: enrollment.user.name,
                imageUrl: enrollment.user.imageUrl || "",
            },
            courseTitle: enrollment.course.courseTitle,
            purchaseDate: enrollment.enrolledAt,
            status: enrollment.status,
        }));

        res.json({
            success: true,
            totalEarnings: parseFloat(totalEarnings.toFixed(2)),
            totalCourses: courses.length,
            totalEnrollments: enrollments.length,
            enrolledStudentsData,
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch dashboard data" });
    }
};

// Get all students enrolled in educator's courses
export const getEnrolledStudents = async (req, res) => {
    try {
        const educatorId = req.user._id;

        // Get educator's courses
        const courses = await Course.find({ educator: educatorId });
        const courseIds = courses.map(c => c._id);

        // Get all enrollments
        const enrollments = await Enrollment.find({ course: { $in: courseIds } })
            .populate("user", "name imageUrl email")
            .populate("course", "courseTitle")
            .sort({ enrolledAt: -1 });

        const enrolledStudents = enrollments.map(enrollment => ({
            student: {
                _id: enrollment.user._id,
                name: enrollment.user.name,
                imageUrl: enrollment.user.imageUrl || "",
                email: enrollment.user.email,
            },
            courseTitle: enrollment.course.courseTitle,
            purchaseDate: enrollment.enrolledAt,
            status: enrollment.status,
            completedAt: enrollment.completedAt,
        }));

        res.json({ success: true, enrolledStudents });
    } catch (error) {
        console.error("Get enrolled students error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch enrolled students" });
    }
};
