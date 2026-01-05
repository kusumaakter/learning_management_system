import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        courseTitle: {
            type: String,
            required: [true, "Course title is required"],
            trim: true,
        },
        courseDescription: {
            type: String,
            required: [true, "Course description is required"],
        },
        courseThumbnail: {
            type: String,
            default: "",
        },
        coursePrice: {
            type: Number,
            required: [true, "Course price is required"],
            min: 0,
        },
        discount: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        courseContent: [
            {
                chapterId: String,
                chapterOrder: Number,
                chapterTitle: String,
                chapterContent: [
                    {
                        lectureId: String,
                        lectureTitle: String,
                        lectureDuration: Number,
                        lectureUrl: String,
                        isPreviewFree: Boolean,
                        lectureOrder: Number,
                    },
                ],
            },
        ],
        educator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        enrolledStudents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        courseRatings: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
            },
        ],
    },
    { timestamps: true }
);

// Indexes for better query performance
courseSchema.index({ educator: 1 });
courseSchema.index({ isPublished: 1 });

const Course = mongoose.model("Course", courseSchema);
export default Course;
