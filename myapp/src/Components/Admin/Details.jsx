import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function Details() {
    const [allDetails, setAllDetails] = useState({ managers: [], restaurants: [] });
    const [loading, setLoading] = useState(false); // Loading state

    const getData = async () => {
        setLoading(true); // Show loading spinner
        try {
            // Fetch managers and restaurants concurrently
            const [managersResponse, restaurantsResponse] = await Promise.all([
                axios.get("http://localhost:4000/api/auth/getmanagers"),
                axios.get("http://localhost:4000/api/auth/getrestaurants"),
            ]);

            // Debugging fetched data
            console.log("Managers Data:", managersResponse.data);
            console.log("Restaurants Data:", restaurantsResponse.data);

            // If response is successful, store data in state
            if (
                managersResponse.data.message === "success" &&
                restaurantsResponse.data.message === "success"
            ) {
                toast.success("Data fetched successfully!");
                setAllDetails({
                    managers: managersResponse?.data?.managers || [],
                    restaurants: restaurantsResponse?.data?.restaurants || [],
                });
            } else {
                toast.error("Failed to fetch data. Check API response.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error fetching data. Please try again.");
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    return (
        <div className="h-screen w-full bg-gray-100 p-5">
            <h1 className="text-3xl text-center font-bold text-black mb-10">
                Welcome Our Partner
            </h1>

            {/* Button to Fetch Data */}
            <div className="text-center mb-10">
                <button
                    onClick={getData}
                    className={`px-6 py-3 rounded-md text-white font-medium ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Fetch Data"}
                </button>
            </div>

            {/* Manager Details */}
            <div>
                <h2 className="text-xl font-semibold mb-5">Manager Details</h2>
                {allDetails.managers.length > 0 ? (
                    allDetails.managers.map((manager) => (
                        <div
                            className="bg-white p-4 mb-4 shadow-md rounded-md"
                            key={manager._id}
                        >
                            <p>
                                <strong>Name:</strong> {manager.Name}
                            </p>
                            <p>
                                <strong>Adhar Number:</strong> {manager.AdharNumber}
                            </p>
                            <p>
                                <strong>Phone Number:</strong> {manager.PhoneNumber}
                            </p>
                            <p>
                                <strong>PAN Number:</strong> {manager.PanNumber}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No managers found.</p>
                )}
            </div>

            {/* Restaurant Details */}
            <div>
                <h2 className="text-xl font-semibold mt-10 mb-5">Restaurant Details</h2>
                {allDetails.restaurants.length > 0 ? (
                    allDetails.restaurants.map((restaurant) => (
                        <div
                            className="bg-white p-4 mb-4 shadow-md rounded-md"
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
                    ))
                ) : (
                    <p className="text-gray-600">No restaurants found.</p>
                )}
            </div>
        </div>
    );
}

export default Details;
