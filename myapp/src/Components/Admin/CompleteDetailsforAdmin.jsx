import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function AdminDashboardComplete() {
  const [allData, setAllData] = useState({
    users: [],
    managers: [],
    restaurants: []
  });
  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [usersRes, managersRes, restaurantsRes] = await Promise.all([
        axios.get("http://localhost:4000/api/auth/getallusers"),
        axios.get("http://localhost:4000/api/auth/getmanagers"),
        axios.get("http://localhost:4000/api/auth/getrestaurants")
      ]);

      if (
        usersRes.data.success &&
        managersRes.data.success &&
        restaurantsRes.data.success
      ) {
        toast.success("All data fetched successfully!");
        setAllData({
          users: usersRes.data.users || [],
          managers: managersRes.data.managers || [],
          restaurants: restaurantsRes.data.restaurants || []
        });
      } else {
        toast.error("Some data fetch failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100 p-5">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl text-center font-bold text-gray-800 mb-8">
          Admin Control Panel
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <Link to="/">
            <button className="bg-blue-500 px-6 py-2 rounded-full text-white font-medium shadow-md transition-transform hover:scale-105">
              Back to Home
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-5 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Total Users</h2>
            <p className="text-3xl text-center text-green-600">{allData.users.length}</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Total Managers</h2>
            <p className="text-3xl text-center text-green-600">{allData.managers.length}</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Total Restaurants</h2>
            <p className="text-3xl text-center text-green-600">{allData.restaurants.length}</p>
          </div>

        </div>

        {/* USERS LIST */}
        <div className="bg-white/80 p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-5">All Users</h2>
          {allData.users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">Username</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {allData.users.map((user) => (
                    <tr key={user._id}>
                      <td className="border p-2">{user.username}</td>
                      <td className="border p-2">{user.email}</td>
                      <td className="border p-2">{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </div>

        {/* RESTAURANTS LIST */}
        <div className="bg-white/80 p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-5">All Restaurants</h2>
          {allData.restaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allData.restaurants.map((res) => (
                <div key={res._id} className="bg-white p-4 rounded-lg shadow border">
                  <p><strong>Name:</strong> {res.name}</p>
                  <p><strong>Address:</strong> {res.address}</p>
                  <p><strong>Special For:</strong> {res.specialfor}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No restaurants found.</p>
          )}
        </div>

        {/* MANAGERS LIST */}
        <div className="bg-white/80 p-6 rounded-lg shadow-md mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-5">All Managers</h2>
          {allData.managers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allData.managers.map((man) => (
                <div key={man._id} className="bg-white p-4 rounded-lg shadow border">
                  <p><strong>Name:</strong> {man.Name}</p>
                  <p><strong>Aadhaar:</strong> {man.AdharNumber}</p>
                  <p><strong>Phone:</strong> {man.PhoneNumber}</p>
                  <p><strong>PAN:</strong> {man.PanNumber}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No managers found.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboardComplete;
