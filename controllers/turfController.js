import Turf from "../models/Turf.js";

export const getAllTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find();
    res.status(200).json(turfs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
