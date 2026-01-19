import { Router } from "express";
import { addProduct } from "../controllers/owner.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const ownerRouter = Router();

ownerRouter.route("/product/register").post(upload.single('productimage'),addProduct);
ownerRouter.route("/admin").get((req,res)=>{
    res.render("admin")
})

export {ownerRouter};


