import express from 'express';
import User from '../models/userModel.js';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    UpdateOrderToDelivered,
    GetOrders} from '../controllers/orderController.js';
import { protect,admin } from '../middleware/authMiddlware.js';    

const router = express.Router();


router.route('/').post(protect,addOrderItems).get(protect,admin,GetOrders);
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,UpdateOrderToDelivered)

export default router;