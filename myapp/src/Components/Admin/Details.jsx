import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
function Details() {
    const [allDetails, setAllDetails] = useState({ managers: [], restaurants: [] });
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true); // Show loading spinner
        try {
            // Fetch managers and restaurants concurrently
            const [managersResponse, restaurantsResponse] = await Promise.all([
                axios.get("http://localhost:4000/api/auth/getmanagers"),
                axios.get("http://localhost:4000/api/auth/getrestaurants"),
            ]);

            console.log("Managers Data:", managersResponse.data);
            console.log("Restaurants Data:", restaurantsResponse.data);

            // Ensure you access the `data` property correctly
            if (
                managersResponse.data.success &&
                restaurantsResponse.data.success
            ) {
                toast.success("Data fetched successfully!");
                setAllDetails({
                    managers: managersResponse.data.managers || [],
                    restaurants: restaurantsResponse.data.restaurants || [],
                });
            } else {
                toast.error("Failed to fetch data. Please check the API responses.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error fetching data. Please try again.");
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    return (
        <div className="h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 p-5">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl text-center font-bold text-gray-800 mb-10">
                    Welcome to Our Partner Portal
                </h1>

                {/* Button to Fetch Data */}
                <div className="flex text-center mb-10 ">
                    <button
                        onClick={getData}
                        className={`px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Fetch Data"}
                    </button>
                    <Link to="/admin"><button className="bg-blue-500 px-8 py-3 ml-5 rounded-lg text-white font-medium transition-all duration-300 ">Admin</button></Link>
                </div>

                {/* Manager Details */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-5">
                        Manager Details
                    </h2>
                    {allDetails.managers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allDetails.managers.map((manager) => (
                                <div
                                    className="bg-white p-6 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300"
                                    key={manager._id}
                                >
                                    <p>
                                        <strong>Name:</strong> {manager.Name}
                                    </p>
                                    <p>
                                        <strong>Aadhaar Number:</strong> {manager.AdharNumber}
                                    </p>
                                    <p>
                                        <strong>Phone Number:</strong> {manager.PhoneNumber}
                                    </p>
                                    <p>
                                        <strong>PAN Number:</strong> {manager.PanNumber}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No managers found.</p>
                    )}
                </div>

                {/* Restaurant Details */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-5">
                        Restaurant Details
                    </h2>
                    {allDetails.restaurants.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allDetails.restaurants.map((restaurant) => (
                                <div
                                    className="bg-white p-6 shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300"
                                    key={restaurant._id}
                                >
                                    <p>
                                        <strong>Name:</strong> {restaurant.name}
                                    </p>
                                    <p>
                                        <strong>Address:</strong> {restaurant.address}
                                    </p>
                                    <p>
                                        <strong>Special For:</strong> {restaurant.specialfor}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No restaurants found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Details;
