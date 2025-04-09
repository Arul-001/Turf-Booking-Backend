import express from "express";
import { getAllTurfs } from "../controllers/turfController.js";

const router = express.Router();

router.get("/", getAllTurfs); // this handles GET /api/turfs

export default router;
