import express from 'express';
import User from '../models/userModel.js';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    UpdateUserProfile,
    getUserProfileById,
    getUsers,
    updateUser,
    deleteUser} from '../controllers/userController.js';
import { protect,admin } from '../middleware/authMiddlware.js';    

const router = express.Router();


router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout',logoutUser);
router.post('/auth',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,UpdateUserProfile);
router.route('/:id').get(protect,admin,getUserProfileById).delete(protect,admin,deleteUser).put(updateUser);

export default router;