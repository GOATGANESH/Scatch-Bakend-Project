import { Router } from "express";
import { userRegister } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/signupuser").post(userRegister);
// userRouter.post("/signupuser",(req,res,next)=>{
//     console.log(req.body);
//     res.json({
//         success:true
//     })
// })


export {userRouter};


