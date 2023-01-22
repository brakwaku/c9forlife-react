import express from 'express';
const router = express.Router();
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    getUserByEmail,
    resetUserPassword,
    sendUserEmail,
    addActivityToBucket,
    removeActivityFromBucket,
    addActivityToTodo,
    removeActivityFromTodo,
    addActivityToCompleted,
    removeActivityFromCompleted
} from '../controllers/userController.js';
import { protect, protectR, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.post('/resetpassword', getUserByEmail);
router.route('/reset/:id').put(protectR, resetUserPassword);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router
.route('/:id')
.delete(protect, admin, deleteUser)
.get(protect, getUserById)
.put(protect, admin, updateUser);
router.route('/bucket/:id').post(protect, addActivityToBucket).delete(protect, removeActivityFromBucket);
router.route('/todo/:id').post(protect, addActivityToTodo).delete(protect, removeActivityFromTodo);
router.route('/complete/:id').post(protect, addActivityToCompleted);
router.route('/archive/:id').post(protect, removeActivityFromCompleted);
router.route('/email').post(protect, admin, sendUserEmail);

export default router;
