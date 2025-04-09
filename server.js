import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookingRoutes.js";
import turfRoutes from './routes/turfRoutes.js';
const port = process.env.PORT || 5000;
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://arul-001.github.io', // your GitHub Pages URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
app.use("/api/turfs", turfRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes); 
app.listen(port, () => console.log("Server running on port 5000"));
