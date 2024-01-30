import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// Private route
const addOrderItems = asyncHandler(async(req,res)=> {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        TotalPrice
    } = req.body

    if (orderItems && orderItems === 0 ){
        res.status(400)
        throw new Error('No Order Items')
    }else{
        const order = new Order({
            orderItems:orderItems.map((x)=>({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            TotalPrice
        })
        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }

})


const getMyOrders = asyncHandler(async(req,res)=> {
    const orders = await Order.find({user:req.user._id})
    res.status(200).json(orders)
})


const getOrderById = asyncHandler(async(req,res)=> {
    const ordersById = await Order.findById(req.params.id).populate('user','name','email')
    if (ordersById) {
        res.status(200).json(ordersById)
    }
    else{
        res.status(404)
        throw new Error('Orders Not Found')
    }
})


const updateOrderToPaid = asyncHandler(async(req,res)=> {
    res.send('by id')
})


const UpdateOrderToDelivered = asyncHandler(async(req,res)=> {
    res.send('by id')
})


const GetOrders = asyncHandler(async(req,res)=> {
    res.send('by id')
})


export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    UpdateOrderToDelivered,
    GetOrders
}

