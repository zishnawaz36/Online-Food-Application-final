import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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
      // API requests for both manager and restaurant
      const managerResponse = await axios.post("http://localhost:4000/api/auth/manager", formData.manager);
      const restaurantResponse = await axios.post("http://localhost:4000/api/auth/restaurant", {
        ...formData.restaurant,
        menu: formData.restaurant.menu.split(","), // Convert menu to array
      });

      // If both succeed, show success toast
      if (managerResponse.status === 201 && restaurantResponse.status === 201) {
        toast.success("Manager and Restaurant successfully created!");
        navigate("/details")
        setFormData({
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
      }
    } catch (error) {
      // Handle errors and show error toast
      toast.error("Error: " + (error.response?.data?.message || error.message));
      console.log("error:",error.message);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl text-center font-bold text-black mb-10 animate-bounce">
         Welcome & Please fill the details and become our partner
        </h1>
      <h2 className="text-2xl font-bold mb-4">Manager Details</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          name="Name"
          placeholder="Manager Name"
          value={formData.manager.Name}
          onChange={(e) => handleChange(e, "manager")}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="AdharNumber"
          placeholder="Adhar Number"
          value={formData.manager.AdharNumber}
          onChange={(e) => handleChange(e, "manager")}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="PanNumber"
          placeholder="PAN Number"
          value={formData.manager.PanNumber}
          onChange={(e) => handleChange(e, "manager")}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="PhoneNumber"
          placeholder="Phone Number"
          value={formData.manager.PhoneNumber}
          onChange={(e) => handleChange(e, "manager")}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Restaurant Details</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={formData.restaurant.name}
          onChange={(e) => handleChange(e, "restaurant")}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.restaurant.address}
          onChange={(e) => handleChange(e, "restaurant")}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="menu"
          placeholder="Menu (comma-separated)"
          value={formData.restaurant.menu}
          onChange={(e) => handleChange(e, "restaurant")}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="specialfor"
          placeholder="Special For"
          value={formData.restaurant.specialfor}
          onChange={(e) => handleChange(e, "restaurant")}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit Details
      </button>
    </div>
  );
};

export default ManagerandRestaurent;
