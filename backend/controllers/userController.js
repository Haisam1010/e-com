import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/genToken.js"



const authUser = asyncHandler(async (req, res) => 
{
    const {email, password} = req.body
    const user = await User.findOne({email:email})
    if(user && (await user.matchPassword(password)))
    {
        generateToken(res,user._id)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }
    else
    {
        res.status(401)
        throw new Error('Invalid email or password')
    }
    res.send('auth user')
})

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body

    const userExist = await User.findOne({email:email})

    if(userExist)
    {
        res.status(400)
        throw new Error('User already exist')
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if(user)
    {
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }
    else
    {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0),
    })
    res.status(200).json({
        message:'Log Out successfully'
})
})
// Private User
const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(user)
    {
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }
    else
    {
        res.status(404)
        throw new Error('User not found')
    }
})
const UpdateUserProfile = asyncHandler(async(req,res)=>{
    const updateUser = await User.findById(req.user._id)
    if(updateUser)
    {
        updateUser.name = req.body.name || updateUser.name
        updateUser.email = req.body.email || updateUser.email
        if(req.body.password)
        {
            updateUser.password = req.body.password
        }
        const updatedUser = await updateUser.save()
        generateToken(res,updatedUser._id)
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
        })
    }
    else
    {
        res.status(404)
        throw new Error('User not found')
    }
})
// Private User
const getUserProfileById = asyncHandler(async(req,res)=>{
    res.send('get user by id')
})
const getUsers = asyncHandler(async(req,res)=>{
    res.send('getUsers')
})
// Private Route
const updateUser = asyncHandler(async(req,res)=>{
    res.send('updateUser')
})
// Delete User
const deleteUser =  asyncHandler(async(req,res)=>{
    res.send('deleteUser')
})

export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    UpdateUserProfile,
    getUserProfileById,
    getUsers,
    updateUser,
    deleteUser
}
