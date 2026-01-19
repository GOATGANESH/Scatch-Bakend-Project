import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
const isLoggedIn = asyncHandler(async function(req,res,next){
    
    
    const token = req.cookies.token;
    if(!token) {
        req.flash("error","Please login again !");
        return res.redirect("/");
    };
    const data = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({email:data.email}).select(
        "-password"
    );
    if(!user) throw new ApiError(501,"Internal server error !");
    req.user = user;
    next();
})
export {isLoggedIn};