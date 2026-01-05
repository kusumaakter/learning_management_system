import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "completed"],
            default: "active",
        },
        progress: {
            completedLectures: [String], // Array of lectureIds
            lastAccessedLecture: String,
            percentComplete: {
                type: Number,
                default: 0,
            },
        },
        enrolledAt: {
            type: Date,
            default: Date.now,
        },
        completedAt: {
            type: Date,
            default: null,
        },
        purchasePrice: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Prevent duplicate enrollments
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ user: 1, status: 1 });
enrollmentSchema.index({ course: 1 });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
