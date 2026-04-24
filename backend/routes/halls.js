import express from "express";
import { getHalls, createHall } from "../controllers/hallController.js";

const router = express.Router();

// GET all halls
router.get("/", getHalls);

// CREATE hall (admin)
router.post("/", createHall);

export default router;