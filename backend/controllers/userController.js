import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"


const authUser = asyncHandler(async (req, res) => 
{
    const {email, password} = req.body
    const user = await User.findOne({email:email})
    if(user && (await user.matchPassword(password)))
    {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:null
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
    res.send('register user')
})

const logoutUser = asyncHandler(async(req,res)=>{
    res.send('logout user')
})
// Private User
const getUserProfile = asyncHandler(async(req,res)=>{
    res.send('get user profile')
})
const UpdateUserProfile = asyncHandler(async(req,res)=>{
    res.send('UpdateUserProfile')
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
