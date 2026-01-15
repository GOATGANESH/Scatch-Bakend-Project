import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    profilePicture:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    address:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
    },
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    
},{timestamps:true});


userSchema.pre("save",async function(req,res,next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
})



export const User = mongoose.model('User',userSchema);
