import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function CompleteDetailsAndCheckout() {
  const [details, setDetails] = useState([]);
  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/auth/getaddress"
        );
        console.log("API Response:", response.data); // Debugging response structure

        if (response.data.success) {
          toast.success("Please Welcome");
          // Correct path to access the data array
          setDetails(response.data.address || []);
          console.log("Fetched Data:", response.data.address);
        } else {
          toast.error("Failed to fetch data");
        }
      } catch (err) {
        console.log("Error:", err.message);
        toast.error("Server error. Please try again later.");
      }
    };
    getAllData();
  }, []);

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + (item.card.info.price || item.card.info.defaultPrice) / 100,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Checkout & Delivery Details
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Delivery Details Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Delivery Details
          </h2>
          {details.length > 0 ? (
            <div className="space-y-4">
              {details.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <p className="font-bold">Name: {item.name}</p>
                  <p>Phone Number: {item.phoneNo}</p>
                  <p>State: {item.state}</p>
                  <p>City: {item.city}</p>
                  <p>Pincode: {item.pincode}</p>
                  <p>LandMark: {item.landMark}</p>
                  <p>House Number: {item.houseno}</p>
                  <p>Road Name: {item.roadname}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No delivery details available.
            </p>
          )}
        </div>

        {/* Checkout Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>
          {cartItems.length > 0 ? (
            <>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item?.card?.info?.name}
                      </h3>
                      <p className="text-gray-500">
                        Price: ₹
                        {(
                          item.card.info.price || item.card.info.defaultPrice
                        ) / 100}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 mt-6 pt-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">Total Amount</h3>
                <p className="text-lg font-semibold">₹{totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between gap-4 mt-6">
                <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300">
                  Confirm Payment
                </button>
                <Link
                  to="/address"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                >
                  Enter Delivery Address
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Your cart is empty
              </h3>
              <p className="text-gray-500">Add items to your cart from the menu.</p>
              <Link
                to="/menu"
                className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
              >
                Go to Menu
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompleteDetailsAndCheckout;
