
import mongoose from "mongoose";
const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    menu:{
        type: [String],
        default: [],
    },
    specialfor:{
        type:String,
        required:false
    }
},{ timestamps: true });

const RestaurantDetails = mongoose.model("RestaurantDetails",restaurantSchema);
export default RestaurantDetails;