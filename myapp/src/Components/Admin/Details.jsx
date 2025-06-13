import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ManagerDetails() {
  const [managerDetail, setManagerDetail] = useState(null);
  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const [addressDetail, setAddressDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const [managerRes, restaurantRes, addressRes] = await Promise.all([
        axios.get("http://localhost:4000/api/auth/getmanagers"),
        axios.get("http://localhost:4000/api/auth/getrestaurants"),
        axios.get("http://localhost:4000/api/auth/getaddress"),
      ]);

      if (
        managerRes.data.success &&
        restaurantRes.data.success &&
        addressRes.data.success
      ) {
        toast.success("Data fetched successfully!");

        // Latest manager by createdAt descending
        const latestManager =
          managerRes.data.managers
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;

        // Latest restaurant
        const latestRestaurant =
          restaurantRes.data.restaurants
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;

        // Latest address (assuming array)
        const latestAddress =
          addressRes.data.address.length > 0
            ? addressRes.data.address[0]
            : null;

        setManagerDetail(latestManager);
        setRestaurantDetail(latestRestaurant);
        setAddressDetail(latestAddress);
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
        <p className="text-gray-700 text-lg text-center">Here are your latest submitted details.</p>
      </div>

      {/* Manager Details */}
      <div className="max-w-3xl w-full bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Manager Details</h2>
        {managerDetail ? (
          <div className="bg-blue-50 p-4 rounded-xl shadow border border-blue-200">
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
      <div className="max-w-3xl w-full bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Restaurant Details</h2>
        {restaurantDetail ? (
          <div className="bg-blue-50 p-4 rounded-xl shadow border border-blue-200">
            <p><strong>Name:</strong> {restaurantDetail.name}</p>
            <p><strong>Address:</strong> {restaurantDetail.address}</p>
            <p><strong>Special For:</strong> {restaurantDetail.specialfor}</p>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No restaurant data found.</p>
        )}
      </div>

      {/* Address Details */}
      <div className="max-w-3xl w-full bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Address Details</h2>
        {addressDetail ? (
          <div className="bg-blue-50 p-4 rounded-xl shadow border border-blue-200">
            <p><strong>Name:</strong> {addressDetail.name}</p>
            <p><strong>Phone:</strong> {addressDetail.phoneNo}</p>
            <p><strong>State:</strong> {addressDetail.state}</p>
            <p><strong>City:</strong> {addressDetail.city}</p>
            <p><strong>Pincode:</strong> {addressDetail.pincode}</p>
            <p><strong>Landmark:</strong> {addressDetail.landMark}</p>
            <p><strong>House No.:</strong> {addressDetail.houseno}</p>
            <p><strong>Road Name:</strong> {addressDetail.roadname}</p>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No address data found.</p>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <Link to="/manager">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            ← Back to Manager Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ManagerDetails;
