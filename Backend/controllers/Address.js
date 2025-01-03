import { Address } from "../models/address.js";
const CreateAddress =async (req,res) => {
    try{
        console.log(req.body);
        const {name,phoneNo,state,city,pincode,landMark,houseno,roadname} = req.body;
        if(!name || !phoneNo || !state || !city || !pincode || !landMark || !houseno || !roadname){
            return res.status(400).json({ message: "Fields are required", success: false });
        }
        const newAddress = await Address.create({
            name,
            phoneNo,
            state,city,
            pincode,
            landMark,
            houseno,
            roadname
        })
        res.status(201).json({ message: "Address successfully created", newAddress });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

const getAddress = async (req, res) => {
    try {
        const address = await Address.find();
        res.status(200).json({ message: "Address fetched successfully", success: true, address });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};

export {CreateAddress,getAddress};