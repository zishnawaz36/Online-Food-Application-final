import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function AdminLayout() {
    const [users, setUsers] = useState([]);
    const [managers, setManagers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUsersAndManagers = async () => {
            try {
                // Fetch users and managers data
                const userResponse = await axios.get("http://localhost:4000/api/admin/getuser");
                const managerResponse = await axios.get("http://localhost:4000/api/auth/getmanagers");

                // Check if the responses are successful and set the state
                console.log("Api response of user:",userResponse.data);
                console.log("Api Response of manager is :",managerResponse.data);
                if (userResponse.data.success) {
                    setUsers(userResponse.data.users || []);
                } else {
                    toast.error("Failed to fetch users.");
                }

                if (managerResponse.data.success) {
                    setManagers(managerResponse.data.managers || []);
                } else {
                    toast.error("Failed to fetch managers.");
                }
            } catch (error) {
                toast.error("Error fetching data.");
                console.log("error getting is ",error.message);
            } finally {
                setIsLoading(false);
            }
        };

        getUsersAndManagers();
    }, []);

    const handleDeleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/admin/user/delete/${id}`);
            toast.success(response.data.message);
            setUsers(users.filter(user => user._id !== id)); // Remove deleted user
            console.log("Response api is",response.data);        
        } catch (err) {

            toast.error("Failed to delete user.");
        }
    };

    const handleDeleteManager = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/admin/delete/${id}`);
            toast.success(response.data.message);
            setManagers(managers.filter(manager => manager._id !== id)); // Remove deleted manager
        } catch (err) {
            toast.error("Failed to delete manager.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Manage Users & Managers</h1>
            <div className="flex flex-col items-center">
                {/* User List */}
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
                                    <tr key={user._id} className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                                        <td className="py-3 px-6 text-left">{user.name}</td>
                                        <td className="py-3 px-6 text-left">{user.email}</td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
                                            >
                                                Delete User
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-center mt-4">No users found.</p>
                    )}
                </div>

                {/* Manager List */}
                <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Manager List</h2>
                    {managers.length > 0 ? (
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-slate-200 text-slate-800 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {managers.map((manager) => (
                                    <tr key={manager._id} className="border-b border-slate-200 hover:bg-slate-100 transition-colors">
                                        <td className="py-3 px-6 text-left">{manager.Name}</td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                onClick={() => handleDeleteManager(manager._id)}
                                                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
                                            >
                                                Delete Manager
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-center mt-4">No managers found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
