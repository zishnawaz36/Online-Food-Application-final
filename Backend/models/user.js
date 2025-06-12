import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    "username":{
        "type":String,
        "required":true,
        "unique":true
    },
     "password":{
        "type":String,
        "required":true,
        "unique":true
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
    
    
})

const UserModel = mongoose.model("UserModel",userSchema);

export default UserModel;