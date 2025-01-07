import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function Address() {
    const [name, setName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [landMark, setLandMark] = useState('');
    const [houseno, setHouseno] = useState('');
    const [roadname, setRoadname] = useState('');

    // Handle address submission
    const addressHandler = async (e) => {
        e.preventDefault();
        if (!name || !phoneNo || !state || !city || !pincode || !landMark || !houseno || !roadname) {
            toast.error("All fields are required!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/auth/address", {
                name,
                phoneNo,
                state,
                city,
                pincode,
                landMark,
                houseno,
                roadname,
                
                    
            });

            if (response.data.message === "Address successfully created") {
                toast.success("Address created successfully!");
                console.log("Api response:",response.data);
            } else {
                toast.error(response.data.message || "Address creation failed");
            }
        } catch (err) {
            console.error("Error connecting to server:", err.message);
            toast.error("Server error. Please try again later.");
        }
    };

    return (
        <div className="bg-gray-800 w-full h-screen flex justify-center items-center">
            <div className="h-auto w-[95%] max-w-[800px] shadow-lg flex flex-col items-center rounded-xl bg-white text-black p-6">
                {/* Header */}
                <h1 className="text-2xl font-bold mb-6">Add Address</h1>

                {/* Address Form */}
                <form className="flex flex-col w-full" onSubmit={addressHandler}>
                    {/* Name and Phone Number Inputs */}
                    <div className="flex space-x-4 mb-4">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="name" className="mb-2 text-gray-600">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="phoneNo" className="mb-2 text-gray-600">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNo"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Enter your phone number"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* State and City Inputs */}
                    <div className="flex space-x-4 mb-4">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="state" className="mb-2 text-gray-600">State</label>
                            <input
                                type="text"
                                id="state"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Enter your state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="city" className="mb-2 text-gray-600">City</label>
                            <input
                                type="text"
                                id="city"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Enter your city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Pincode and Landmark Inputs */}
                    <div className="flex space-x-4 mb-4">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="pincode" className="mb-2 text-gray-600">Pincode</label>
                            <input
                                type="text"
                                id="pincode"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Enter your pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="landMark" className="mb-2 text-gray-600">Landmark</label>
                            <input
                                type="text"
                                id="landMark"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Enter your landmark"
                                value={landMark}
                                onChange={(e) => setLandMark(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* House No and Road Name Inputs */}
                    <div className="flex space-x-4 mb-4">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="houseno" className="mb-2 text-gray-600">House No</label>
                            <input
                                type="text"
                                id="houseno"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Enter your house number"
                                value={houseno}
                                onChange={(e) => setHouseno(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="roadname" className="mb-2 text-gray-600">Road Name</label>
                            <input
                                type="text"
                                id="roadname"
                                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Enter your road name"
                                value={roadname}
                                onChange={(e) => setRoadname(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-between">
                    <button
                        type="submit"
                        className="py-2 px-8 flex justify-start bg-blue-400 text-white rounded-md hover:bg-blue-800 transition duration-300"
                    >
                        Submit
                    </button>
                   <Link to="/completeDetails"> <button className="py-2 px-8 flex justify-end bg-green-500 text-white rounded-md hover:bg-green-800 transition duration-300">Confirm order</button></Link>
                   </div>
                </form>
            </div>
        </div>
    );
}

export default Address;
