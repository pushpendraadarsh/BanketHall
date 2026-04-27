import express from "express";
import { getHalls, createHall } from "../controllers/hallController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// GET
router.get("/", getHalls);
router.post("/", upload.single("image"), createHall);
// CREATE (SINGLE IMAGE FIXED)


export default router;