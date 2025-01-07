import mongoose from "mongoose";


const addressSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:Number,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    landMark:{
        type:String,
        required:true,
    },
    houseno:{
        type:String,
        required:true,
    },
    roadname:{
        type:String,
        required:true
    },
    
}, { timestamps: true });

export const Address = mongoose.model("Address",addressSchema);
