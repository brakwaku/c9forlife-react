import express from 'express';
const router = express.Router();
import {
    getMotivations,
    getMotivationById,
    deleteMotivation,
    createMotivation,
    updateMotivation,
} from '../controllers/motivationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getMotivations).post(protect, admin, createMotivation);
router.route('/:id')
.get(getMotivationById)
.delete(protect, admin, deleteMotivation)
.put(protect, admin, updateMotivation);

export default router;
