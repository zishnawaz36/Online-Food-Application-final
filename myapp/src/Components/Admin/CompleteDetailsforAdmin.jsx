import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function AdminDashboard() {
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

  const handleDeleteManager = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/admin/delete/${id}`);
      toast.success("Manager deleted successfully");
      fetchAllData();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting manager");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/admin/user/delete/${id}`);
      toast.success("User deleted successfully");
      fetchAllData();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    }
  };

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
          <SummaryCard title="Total Users" count={allData.users.length} />
          <SummaryCard title="Total Managers" count={allData.managers.length} />
          <SummaryCard title="Total Restaurants" count={allData.restaurants.length} />
        </div>

        {/* USERS LIST */}
        <DataTable
          title="All Users"
          data={allData.users}
          headers={["Username", "Email", "Role", "Actions"]}
          renderRow={(user) => (
            <>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </>
          )}
        />

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
                  <button
                    className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteManager(man._id)}
                  >
                    Delete Manager
                  </button>
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

// Component for summary cards
function SummaryCard({ title, count }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border">
      <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
      <p className="text-3xl text-center text-green-600">{count}</p>
    </div>
  );
}

// Component for reusable data table
function DataTable({ title, data, headers, renderRow }) {
  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-md mb-10">
      <h2 className="text-2xl font-semibold text-blue-700 mb-5">{title}</h2>
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="border p-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>{renderRow(item)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
}

export default AdminDashboard;
