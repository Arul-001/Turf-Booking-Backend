// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  turf: String,
  sport: String,
  type: String,
  price: Number,
  date: String,
  time: String,
  players: Number,
  hours: Number,
  totalAmount: Number,
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
