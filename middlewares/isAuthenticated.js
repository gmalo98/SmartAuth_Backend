const User = require("../model/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwt=require('jsonwebtoken');


const isAuthenticated=catchAsync(async(req,res,next)=>{


const token=req.cookies.token||req.header.authorization?.split(" ")[1]


if(!token){
    return next(new AppError('You are not logged in. Please logged in to access',401));
}
const decoded=jwt.verify(token,process.env.JWT_SECRET);

const currentUser=await User.findById(decoded.id);
if(!currentUser)
{
    return next(new AppError("User not found",401));
}
req.user=currentUser;
next();

})

module.exports=isAuthenticated