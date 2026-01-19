import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse } from "../utils/ApiResponse.js";
import {Product} from "../models/product.model.js";

const addProduct = asyncHandler(async (req,res)=>{
    const {productname,productprice,bgColor,panelColor,textColor} = req.body;

    if([productname,productprice,bgColor,panelColor,textColor].some(field=>field?.trim()==="")){
        throw new ApiError(401,"All fields are required !");
    }
    const productImageUrl = `/images/${req.file.filename}`;
    if(!productImageUrl) throw new ApiError(500,"File upload errror !");
    const product = await Product.create({
        name:productname,
        price:productprice,
        bgColor,
        panelColor,
        textColor,
        productImage:productImageUrl,
    });
    
    res.status(200).json({
        success:true,
        data:product,
        message:"OK"
    })
})

export {
    addProduct
}