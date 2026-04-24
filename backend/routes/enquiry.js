import express from "express";
const router = express.Router();

import {
  createEnquiry,
  getAllEnquiries,
  deleteEnquiry,
} from "../controllers/enquirycontroller.js";

// POST
router.post("/", createEnquiry);

// GET (admin)
router.get("/", getAllEnquiries);

// DELETE
router.delete("/:id", deleteEnquiry);

export default router;