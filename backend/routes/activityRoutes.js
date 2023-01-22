import express from 'express';
const router = express.Router();
import {
    getActivities,
    getActivityById,
    deleteActivity,
    createActivity,
    updateActivity,
} from '../controllers/activityController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getActivities).post(protect, admin, createActivity);
router.route('/:id')
.get(getActivityById)
.delete(protect, admin, deleteActivity)
.put(protect, admin, updateActivity);

export default router;
