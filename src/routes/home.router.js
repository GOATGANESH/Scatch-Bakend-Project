import { Router } from "express";

const homeRouter = Router();

homeRouter.route("/").get((req,res)=>{
    res.render("home");
})


export {homeRouter};