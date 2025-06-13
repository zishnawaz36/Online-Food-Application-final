import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
function Details() {
  const [managerDetail, setManagerDetail] = useState(null);
  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const [managerRes, restaurantRes] = await Promise.all([
        axios.get("http://localhost:4000/api/auth/getmanagers"),
        axios.get("http://localhost:4000/api/auth/getrestaurants"),
      ]);

      if (managerRes.data.success && restaurantRes.data.success) {
        toast.success("Data fetched successfully!");

        // ✅ Sirf last manager ka data le rahe hain
        const latestManager = managerRes.data.managers
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;

        // ✅ Sirf last restaurant ka data le rahe hain
        const latestRestaurant = restaurantRes.data.restaurants
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;

        setManagerDetail(latestManager);
        setRestaurantDetail(latestRestaurant);
      } else {
        toast.error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-blue-100 to-blue-200 p-5 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg mb-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">Welcome Manager 👋</h1>
        <p className="text-gray-700 text-lg text-center">
          Here are your latest submitted details.
        </p>
      </div>

      {/* Manager Details */}
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-5 text-center">Manager Details</h2>
        {managerDetail ? (
          <div className="bg-blue-50 p-5 rounded-xl shadow border border-blue-200 hover:shadow-lg transition-all duration-300">
            <p><strong>Name:</strong> {managerDetail.Name}</p>
            <p><strong>Aadhaar:</strong> {managerDetail.AdharNumber}</p>
            <p><strong>Phone:</strong> {managerDetail.PhoneNumber}</p>
            <p><strong>PAN:</strong> {managerDetail.PanNumber}</p>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No manager data found.</p>
        )}
      </div>

      {/* Restaurant Details */}
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-5 text-center">Restaurant Details</h2>
        {restaurantDetail ? (
          <div className="bg-blue-50 p-5 rounded-xl shadow border border-blue-200 hover:shadow-lg transition-all duration-300">
            <p><strong>Name:</strong> {restaurantDetail.name}</p>
            <p><strong>Address:</strong> {restaurantDetail.address}</p>
            <p><strong>Special For:</strong> {restaurantDetail.specialfor}</p>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No restaurant data found.</p>
        )}
      </div>
      
<div className="mt-10">
  <Link to="/manager">
    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
      Back to Manager Dashboard
    </button>
  </Link>
</div>
    </div>
  );
}

export default Details;
