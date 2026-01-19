import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import flash from "connect-flash";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "Hello ganesh",
  })
);
app.use(flash());
app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "..", "public"));

import { userRouter } from "./src/routes/user.router.js";
import { ownerRouter } from "./src/routes/owner.router.js";
import { productRouter } from "./src/routes/product.router.js";
import { homeRouter } from "./src/routes/home.router.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/owners", ownerRouter);
app.use("/api/v1/products", productRouter);
app.use("/", homeRouter);
app.use("/shop", homeRouter);

app.use((err, req, res, next) => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
});

export { app };
