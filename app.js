import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


import { userRouter } from './src/routes/user.router.js';
import { ownerRouter } from './src/routes/owner.router.js';
import { productRouter } from './src/routes/product.router.js';

app.use("/api/v1/users",userRouter);
app.use("/api/v1/owners",ownerRouter);
app.use("/api/v1/products",productRouter);

export {app};



