import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    productImage:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        default:0
    },
    bgColor:{
        type:String,
        required:true,
        default:"#fff"
    },
    panelColor:{
        type:String,
        required:true,
        default:"#999696",
    },
    textColor:{
        type:String,
        required:true,
        default:"#222"
    },
    
},{timestamps:true});

export const Product = mongoose.model('Product',productSchema);

