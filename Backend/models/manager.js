import mongoose from "mongoose";

// Define the manager schema
const managerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Name is required"],  
    },
    AdharNumber: {
        type: String,
        required: [true, "Please enter 12 digit Adhar number"], 
        validate: {
            validator: function(v) {
                return /^\d{12}$/.test(v);  
            },
            message: "Adhar number must be 12 digits"
        }
    },
    PanNumber: {
        type: String,
        required: [true, "Please enter 10 digit PAN number"], 
        validate: {
            validator: function(v) {
                return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v); 
            },
            message: "Invalid PAN number format"
        }
    },
    PhoneNumber: {
        type: String,
        required: [true, "Please enter 10 digit phone number"],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); 
            },
            message: "Phone number must be 10 digits"
        },
        
    },
    
},{timestamps:true});


// Create the model
const ManagerDetails = mongoose.model("ManagerDetails", managerSchema);

export default ManagerDetails;
