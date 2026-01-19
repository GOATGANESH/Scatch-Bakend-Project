import { Router } from "express";
import { addProduct } from "../controllers/owner.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const ownerRouter = Router();

ownerRouter.route("/product/register").post(upload.single('productimage'),addProduct);
ownerRouter.route("/createproduct").get(function(req,res){
    res.render("createproduct")
})

ownerRouter.route("/admin").get(async (req,res)=>{
    const productData = await Product.find();
    res.render("admin",{productData})
})

ownerRouter.route("/logout").get(async (req,res)=>{
    res
    .cookie("token","")
    .status(200)
    .json(
        new ApiResponse(200,null,"Successfully logout !")
    )
})

export {ownerRouter};


