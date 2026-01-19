import { Router } from "express";
import { userRegister, userLogin } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/signupuser").post(userRegister);
userRouter.route("/loginuser").post(userLogin);

export {userRouter};


