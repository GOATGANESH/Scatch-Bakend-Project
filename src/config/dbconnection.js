import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/scatchdb`);
       console.log("Successully DB connected !");
    } catch (error) {
        console.log("Error while connecting DB : ",error.message);
    }
}

export default connectDB;