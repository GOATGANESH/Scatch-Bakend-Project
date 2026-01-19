import { Router } from "express";
import {
  userRegister,
  userLogin,
  userLogout,
  addProductToCart,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.middleware.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
const userRouter = Router();

userRouter.route("/signupuser").post(userRegister);
userRouter.route("/loginuser").post(userLogin);
userRouter.route("/logout").get(userLogout);
userRouter.route("/cart").get(isLoggedIn,async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart");
  res.render("cart", { cart:user.cart});
});

userRouter.get("/addtocart/:id", isLoggedIn, addProductToCart);
export { userRouter };
