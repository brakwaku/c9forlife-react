import express from 'express';
const router = express.Router();
import {
    getActivitySuggestions,
    getActivitySuggestionById,
    deleteActivitySuggestion,
    createActivitySuggestion,
    updateActivitySuggestion,
    approveActivitySuggestion,
} from '../controllers/activitySuggestionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getActivitySuggestions).post(protect, createActivitySuggestion);
router.route('/:id')
.get(getActivitySuggestionById)
.post(protect, admin, approveActivitySuggestion)
.put(protect, admin, updateActivitySuggestion)
.delete(protect, admin, deleteActivitySuggestion);

export default router;
