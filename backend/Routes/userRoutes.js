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

const router = express.Router();


router.route('/').post(registerUser).get(getUsers);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router.route('/profile').get(getUserProfile).put(UpdateUserProfile);
router.route('/:id').get(getUserProfileById).delete(deleteUser).put(updateUser);

export default router;