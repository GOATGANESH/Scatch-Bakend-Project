import { Router } from "express";
import { ownerRegister } from "../controllers/owner.controller.js";
const ownerRouter = Router();

ownerRouter.route("/register").post(ownerRegister);


export {ownerRouter};


