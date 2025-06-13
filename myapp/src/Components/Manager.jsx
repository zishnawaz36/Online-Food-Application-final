import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const ManagerandRestaurent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    manager: {
      Name: "",
      AdharNumber: "",
      PanNumber: "",
      PhoneNumber: "",
    },
    restaurant: {
      name: "",
      address: "",
      menu: "",
      specialfor: "",
    },
  });

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const managerResponse = await axios.post(
        "http://localhost:4000/api/auth/manager",
        formData.manager
      );
      const restaurantResponse = await axios.post(
        "http://localhost:4000/api/auth/restaurant",
        {
          ...formData.restaurant,
          menu: formData.restaurant.menu.split(","),
        }
      );

      if (
        managerResponse.status === 201 &&
        restaurantResponse.status === 201
      ) {
        toast.success("Manager and Restaurant successfully created!");
        navigate("/details");
        setFormData({
          manager: { Name: "", AdharNumber: "", PanNumber: "", PhoneNumber: "" },
          restaurant: { name: "", address: "", menu: "", specialfor: "" },
        });
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || error.message));
      console.log("error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-8 animate-pulse">
        Welcome! Please submit your details to become our partner
      </h1>

      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Manager Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Name", "AdharNumber", "PanNumber", "PhoneNumber"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field}
              value={formData.manager[field]}
              onChange={(e) => handleChange(e, "manager")}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Restaurant Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "name", placeholder: "Restaurant Name" },
            { name: "address", placeholder: "Address" },
            { name: "menu", placeholder: "Menu (comma-separated)" },
            { name: "specialfor", placeholder: "Special For" },
          ].map((input) => (
            <input
              key={input.name}
              type="text"
              name={input.name}
              placeholder={input.placeholder}
              value={formData.restaurant[input.name]}
              onChange={(e) => handleChange(e, "restaurant")}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full max-w-xs bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 mb-6 shadow-md"
      >
        Submit Details
      </button>

      <Link to="/">
        <button className="text-gray-700 hover:text-blue-600 underline">
          ← Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ManagerandRestaurent;
