import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function AdminLayout() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loader state

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("Token not found! Please login again.");
                    return;
                }

                const response = await axios.get(
                    "http://localhost:4000/api/admin/getuser",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.success) {
                    setUsers(response.data.users || []);
                    toast.success("Users fetched successfully!");
                } else {
                    toast.error("Failed to fetch users.");
                }
            } catch (error) {
                console.error("Error:", error.message);
                if (error.response?.status === 401) {
                    toast.error("Unauthorized! Please login again.");
                } else {
                    toast.error("Failed to fetch users.");
                }
            } finally {
                setIsLoading(false); // Hide loader after fetching data
            }
        };

        getUser();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Token not found! Please login again.");
                return;
            }

            const response = await axios.delete(
                `http://localhost:4000/api/admin/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                toast.success(response.data.message);
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
            }
        } catch (err) {
            console.error("Error:", err.message);
            toast.error("Failed to delete user.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
                Manage Users
            </h1>
            <div className="flex flex-col items-center">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">User List</h2>
                    {isLoading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : users.length > 0 ? (
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-slate-200 text-slate-800 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-slate-200 hover:bg-slate-100 transition-colors"
                                    >
                                        <td className="py-3 px-6 text-left">{user.name}</td>
                                        <td className="py-3 px-6 text-left">{user.email}</td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-center mt-4">
                            No users found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
