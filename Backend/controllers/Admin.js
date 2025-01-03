import UserModel from "../models/user.js"; //always apply .js ->mistake
const GetUser = async(req,res) => {
  try{
const users = await UserModel.find();
return res.status(200).json(users);

  }
catch(err){
   return res.status(400).json({message:"user not exist"},err.message);
}
}

const deleteUser  = async (req,res) =>{
  try{
    const userId = req.params.id;
    const checkAdmin = await UserModel.findById(userId);
    if(checkAdmin.role == 'admin'){
      return res.status(409).json({message:"You can't delete yourself"});
    }
    const user = await UserModel.findOneAndDelete({_id:userId});
    if(!user) {
      return res.status(404).json({message:"user not exist"})
    }
    return res.status(200).json({message:"User deleted successfully",user});
  }
  catch(err){
    return res.status(500).json({message:"internal server error",Error:err.message});
  }
} 
export {GetUser,deleteUser};