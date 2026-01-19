import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
import {Product} from "../models/product.model.js"
const homeRouter = Router();

homeRouter.route("/").get((req,res)=>{
    const error = req.flash("error");
    res.render("home",{error});
})
homeRouter.route("/shop").get(async (req,res)=>{
    const productData = await Product.find();

    res.render("shop",{productData});
})


export {homeRouter};