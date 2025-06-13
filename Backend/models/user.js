import { timeStamp } from "console";
import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    "username":{
        "type":String,
        "required":true,
        
    },
     "password":{
        "type":String,
        "required":true,
        
    },
     "email":{
        "type":String,
        "required":true,
        "unique":true
    },
     "role":{
        "type":String,
        "required":true,
        "enum":["user","manager","admin"]
    },
    
    
},{ timestamps: true })

const UserModel = mongoose.model("UserModel",userSchema);

export default UserModel;