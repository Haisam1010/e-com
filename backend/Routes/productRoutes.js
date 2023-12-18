import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
const router = express.Router();

router.get('/',asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}))

router.get('/:id',asyncHandler( async(req, res) => {
    const {id} = req.params
    const product = await Product.findById(id);
    
    if(product){
       return res.json(product)}
        else{
            res.status(404)
            throw new Error('Product not found')
        }

}))
export default router;