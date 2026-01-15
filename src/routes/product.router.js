import { Router } from "express";
import { productRegister } from "../controllers/product.controller.js";
const productRouter = Router();

productRouter.route("/register").post(productRegister);


export {productRouter};


