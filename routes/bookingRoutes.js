// routes/bookingRoutes.js
import express from "express";
// import Booking from "../models/Booking.js";
import { createBooking, getBookingsByEmail,deleteBookingById,updateBookingById } from "../controllers/bookingController.js";
const router = express.Router();
router.post("/", createBooking);
router.get("/:email", getBookingsByEmail);
router.delete("/:id", deleteBookingById);
router.put("/:id", updateBookingById);
  export default router;