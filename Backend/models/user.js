import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin","manager"],
        default:"user"
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

const UserModel = mongoose.model("UserModel",userSchema);

export default UserModel;