import express from 'express';
import { getHalls, createHall } from '../controllers/hallController.js';

const router = express.Router();

router.get('/', getHalls);
router.post('/', createHall);

export default router;

