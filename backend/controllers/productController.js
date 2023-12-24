import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// Public route
const getProducts = asyncHandler(async(req,res)=> {
    const products = await Product.find({});
    res.json(products);
})
const getProductById = asyncHandler(async(req,res)=> {
    const {id:productId} = req.params
    const product = await Product.findById(productId);
    
    if(product){
       return res.json(product)}
        else{
            res.status(404)
            throw new Error('Product not found')
        }
})

export {getProducts, getProductById}