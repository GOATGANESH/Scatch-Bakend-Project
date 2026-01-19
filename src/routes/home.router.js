import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
const homeRouter = Router();

homeRouter.route("/").get((req,res)=>{
    const error = req.flash("error");
    res.render("home",{error});
})
homeRouter.route("/shop").get((req,res)=>{
    res.render("shop");
})


export {homeRouter};