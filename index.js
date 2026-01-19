import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
});
import { app } from "./app.js";
import connectDB from "./src/config/dbconnection.js";

const port = process.env.PORT || 8000;

await connectDB();
app.listen(port,()=>{
    console.log('Listening on port ',port);
})
