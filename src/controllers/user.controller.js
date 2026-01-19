import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";


const userRegister = asyncHandler(async (req, res, next) => {

  const {username, email, password } = req.body;
  if (
    [ username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(401, "All fields are required !");
  }
  
  const existedUser = await User.findOne({ email });

  if (existedUser != null) throw new ApiError(409, "User already exist !");
  const user = await User.create({
    email,
    password,
    username,
  });

  if (!user) throw new ApiError(501, "Internal Server Error !");
  const token = user.getAccessToken();
  const responseUser = await User.findById(user._id).select("-password");
  if (!responseUser) throw new ApiError(501, "Internal Server Error !");

  res
    .cookie("token", token)
    .status(201)
    .json(new ApiResponse(201, responseUser, "Success"));
});

const userLogin = asyncHandler(async (req, res, next) => {
 
  const { email, password } = req.body;
  
  if([email,password].some(field=>field?.trim()==="")){
    throw new ApiError(400, "All fields are required !");
  }
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Account doesn't exist !");
  const result = await user.isPasswordCorrect(password);
  console.log(result);
  if (!result) throw new ApiError(401, "Invalid credentials");

  const token = await user.getAccessToken();

  res
  .cookie("token",token)
  .status(200)
  .json(
    new ApiResponse(200,null,"Successful Login !!")
  );
});

export { userRegister, userLogin };
