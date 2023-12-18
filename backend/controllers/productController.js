import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";


const getProducts = asyncHandler(async(req,res)=> {
    const products = await Product.find({});
    res.json(products);
})
const getProductById = asyncHandler(async(req,res)=> {
    const {id} = req.params
    const product = await Product.findById(id);
    
    if(product){
       return res.json(product)}
        else{
            res.status(404)
            throw new Error('Product not found')
        }
})

export {getProducts, getProductById}