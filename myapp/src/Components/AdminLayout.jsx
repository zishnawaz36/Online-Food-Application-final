import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [managers, setManagers] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                const [userRes, managerRes, restaurantRes, addressRes] = await Promise.all([
                    axios.get("http://localhost:4000/api/admin/getuser"),
                    axios.get("http://localhost:4000/api/auth/getmanagers"),
                    axios.get("http://localhost:4000/api/auth/getrestaurants"),
                    axios.get("http://localhost:4000/api/auth/getaddress"),
                ]);

                if (userRes.data.success) setUsers(userRes.data.users || []);
                if (managerRes.data.success) setManagers(managerRes.data.managers || []);
                if (restaurantRes.data.success) setRestaurants(restaurantRes.data.restaurants || []);
                if (addressRes.data.success) setAddresses(addressRes.data.address || []);

                toast.success("All data fetched successfully!");
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/admin/user/delete/${id}`);
            setUsers(users.filter(u => u._id !== id));
            toast.success(res.data.message);
        } catch (err) {
            toast.error("Failed to delete user");
        }
    };

    const deleteManager = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/admin/delete/${id}`);
            setManagers(managers.filter(m => m._id !== id));
            toast.success(res.data.message);
        } catch (err) {
            toast.error("Failed to delete manager");
        }
    };

    const deleteRestaurant = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/admin/deleterestaurant/${id}`);
            setRestaurants(restaurants.filter(r => r._id !== id));
            toast.success(res.data.message);
        } catch (err) {
            toast.error("Failed to delete restaurant");
        }
    };

    const deleteAddress = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:4000/api/admin/deleteaddress/${id}`);
            setAddresses(addresses.filter(a => a._id !== id));
            toast.success(res.data.message);
        } catch (err) {
            toast.error("Failed to delete address");
        }
    };

    if (isLoading) return <div className="text-center text-xl p-10">Loading data...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-blue-100 p-6">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Admin Dashboard</h1>

            {/* Users */}
            <Section title="Users" data={users} deleteHandler={deleteUser} fields={['username', 'email']} />

            {/* Managers */}
            <Section title="Managers" data={managers} deleteHandler={deleteManager} fields={['Name', 'AdharNumber']} />

            {/* Restaurants */}
            <Section title="Restaurants" data={restaurants} deleteHandler={deleteRestaurant} fields={['name', 'address']} />

            {/* Addresses */}
            <Section title="Addresses" data={addresses} deleteHandler={deleteAddress} fields={['name', 'phoneNo']} />
        </div>
    );
}

// Reusable component for rendering sections
function Section({ title, data, deleteHandler, fields }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-10 transition-transform transform hover:scale-[1.02]">
            <h2 className="text-3xl font-semibold mb-6 text-blue-700">{title}</h2>
            {data.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-100">
                                {fields.map((field) => (
                                    <th key={field} className="p-3 border">{field}</th>
                                ))}
                                <th className="p-3 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}>
                                    {fields.map((field) => (
                                        <td key={field} className="p-3 border">{item[field]}</td>
                                    ))}
                                    <td className="p-3 border">
                                        <button
                                            onClick={() => deleteHandler(item._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600">No {title.toLowerCase()} found.</p>
            )}
        </div>
    );
}

export default AdminDashboard;
