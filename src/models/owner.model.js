import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const ownerSchema = new mongoose.Schema({
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
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
},{timestamps:true});


ownerSchema.pre("save",async function(req,res,next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
})



export const Owner = mongoose.model('Owner',ownerSchema);
