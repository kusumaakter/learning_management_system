import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./configs/mongodb.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import educatorRoutes from "./routes/educatorRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = 4000;

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/educator", educatorRoutes);

// Test route (API)
app.get("/", (req, res) => {
  res.json({ message: "Backend running", success: true });
});

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle React routing, return all requests to React app
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on http://localhost:${PORT}`);
});