/**
 * Seed Script - Populate database with initial course data
 * Run: node scripts/seedCourses.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/Course.js";
import User from "../models/User.js";

dotenv.config();

const dummyCourses = [
    {
        courseTitle: "Introduction to JavaScript",
        courseDescription: "<h2>Learn the Basics of JavaScript</h2><p>JavaScript is a versatile programming language that powers the web. In this course, you will learn the fundamentals of JavaScript, including syntax, data types, and control structures.</p>",
        coursePrice: 49.99,
        isPublished: true,
        discount: 20,
        courseContent: [
            {
                chapterId: "chapter1",
                chapterOrder: 1,
                chapterTitle: "Getting Started with JavaScript",
                chapterContent: [
                    { lectureId: "lecture1", lectureTitle: "What is JavaScript?", lectureDuration: 16, lectureUrl: "https://youtu.be/CBWnBi-awSA", isPreviewFree: true, lectureOrder: 1 },
                    { lectureId: "lecture2", lectureTitle: "Setting Up Your Environment", lectureDuration: 19, lectureUrl: "https://youtu.be/4l87c2aeB4I", isPreviewFree: false, lectureOrder: 2 }
                ]
            },
            {
                chapterId: "chapter2",
                chapterOrder: 2,
                chapterTitle: "Variables and Data Types",
                chapterContent: [
                    { lectureId: "lecture3", lectureTitle: "Understanding Variables", lectureDuration: 20, lectureUrl: "https://youtu.be/pZQeBJsGoDQ", isPreviewFree: true, lectureOrder: 1 },
                    { lectureId: "lecture4", lectureTitle: "Data Types in JavaScript", lectureDuration: 10, lectureUrl: "https://youtu.be/ufHT2WEkkC4", isPreviewFree: false, lectureOrder: 2 }
                ]
            }
        ],
        courseRatings: [],
        courseThumbnail: "https://img.youtube.com/vi/CBWnBi-awSA/maxresdefault.jpg"
    },
    {
        courseTitle: "Advanced Python Programming",
        courseDescription: "<h2>Deep Dive into Python Programming</h2><p>This course is designed for those who have a basic understanding of Python and want to take their skills to the next level.</p>",
        coursePrice: 79.99,
        isPublished: true,
        discount: 15,
        courseContent: [
            {
                chapterId: "chapter1",
                chapterOrder: 1,
                chapterTitle: "Advanced Data Structures",
                chapterContent: [
                    { lectureId: "lecture1", lectureTitle: "Lists and Tuples", lectureDuration: 720, lectureUrl: "https://youtu.be/HdLIMoQkXFA", isPreviewFree: true, lectureOrder: 1 },
                    { lectureId: "lecture2", lectureTitle: "Dictionaries and Sets", lectureDuration: 850, lectureUrl: "https://youtu.be/HdLIMoQkXFA", isPreviewFree: false, lectureOrder: 2 }
                ]
            }
        ],
        courseRatings: [],
        courseThumbnail: "https://img.youtube.com/vi/HdLIMoQkXFA/maxresdefault.jpg"
    },
    {
        courseTitle: "Web Development Bootcamp",
        courseDescription: "<h2>Become a Full-Stack Web Developer</h2><p>This comprehensive bootcamp covers everything you need to know to become a full-stack web developer.</p>",
        coursePrice: 99.99,
        isPublished: true,
        discount: 25,
        courseContent: [
            {
                chapterId: "chapter1",
                chapterOrder: 1,
                chapterTitle: "HTML & CSS Basics",
                chapterContent: [
                    { lectureId: "lecture1", lectureTitle: "Introduction to HTML", lectureDuration: 600, lectureUrl: "https://youtu.be/-HeadgoqJ7A", isPreviewFree: true, lectureOrder: 1 },
                    { lectureId: "lecture2", lectureTitle: "Styling with CSS", lectureDuration: 720, lectureUrl: "https://youtu.be/-HeadgoqJ7A", isPreviewFree: false, lectureOrder: 2 }
                ]
            }
        ],
        courseRatings: [],
        courseThumbnail: "https://img.youtube.com/vi/lpx2zFkapIk/maxresdefault.jpg"
    },
    {
        courseTitle: "Data Science with Python",
        courseDescription: "<h2>Start Your Data Science Journey</h2><p>Data Science is one of the most in-demand fields in the world. This course teaches you the essentials of data analysis and visualization.</p>",
        coursePrice: 89.99,
        isPublished: true,
        discount: 20,
        courseContent: [
            {
                chapterId: "chapter1",
                chapterOrder: 1,
                chapterTitle: "Python for Data Science",
                chapterContent: [
                    { lectureId: "lecture1", lectureTitle: "Python Basics", lectureDuration: 30, lectureUrl: "https://youtu.be/samplelink1", isPreviewFree: true, lectureOrder: 1 }
                ]
            }
        ],
        courseRatings: [],
        courseThumbnail: "https://img.youtube.com/vi/E4znbZgUWzA/maxresdefault.jpg"
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Find an educator or create one
        let educator = await User.findOne({ role: "educator" });

        if (!educator) {
            console.log("No educator found. Please create an educator account first.");
            console.log("Run the app and signup as an educator before seeding courses.");
            process.exit(1);
        }

        console.log(`📚 Using educator: ${educator.name} (${educator.email})`);

        // Check if courses already exist
        const existingCourses = await Course.countDocuments();
        if (existingCourses > 0) {
            console.log(`⚠️  Database already has ${existingCourses} courses.`);
            const answer = "skip"; // Auto-skip to avoid duplicates
            console.log("Skipping seed to avoid duplicates. Delete existing courses first if needed.");
            process.exit(0);
        }

        // Add educator reference to courses
        const coursesWithEducator = dummyCourses.map(course => ({
            ...course,
            educator: educator._id,
            enrolledStudents: []
        }));

        // Insert courses
        const result = await Course.insertMany(coursesWithEducator);
        console.log(`✅ Successfully seeded ${result.length} courses!`);

        // List courses
        result.forEach(course => {
            console.log(`   - ${course.courseTitle}`);
        });

    } catch (error) {
        console.error("❌ Seed error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB");
    }
}

seedDatabase();
