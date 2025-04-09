import mongoose from 'mongoose';

const turfSchema = new mongoose.Schema({
  name: String,
  category: String,
  city: String,
  sports: String,
  surface: String,
  size: String,
  days: [String],
  time: String,
  price: Number
});

const Turf = mongoose.model('Turf', turfSchema);
export default Turf;