const admin =async(req,res)=>{
    try{
        res.status(200).json({"message":"welcome admin from server"});
    }
    catch(error){
        res.status(401).json({"message":"error to get data",error:error.message})
    }
}
const manager= async(req,res)=>{
    try{
        res.status(200).json({"message":"Welcome manager from server"});
    }
    catch(error){
        res.status(401).json({"message":"error to connect",error:error.message});
    }
};

const user= async(req,res)=>{
    try{
        res.status(200).json({"message":"Welcome user from server"});
    }
    catch(error){
        res.status(401).json({"message":"error to connect",error:error.message});
    }
};

export {admin,manager,user};