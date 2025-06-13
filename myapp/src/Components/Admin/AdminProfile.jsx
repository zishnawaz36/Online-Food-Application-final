import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function AdminProfile() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get("http://localhost:4000/api/admin/getuser");
                if (res.data.success) setUsers(res.data.users || []);
                toast.success("User data fetched successfully!");
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch user data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) return <div className="text-center text-xl p-10">Loading user profile...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 p-8 w-screen">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Panel - User Profiles</h1>

            {/* FLEX WRAP CONTAINER */}
            <div className="flex flex-wrap justify-center gap-6">
                {users.length > 0 ? (
                    users.map(user => (
                        <div key={user._id} className="bg-white p-6 rounded-xl shadow-lg w-80">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-600">👤 {user.username}</h2>
                            <div className="space-y-2 text-gray-700">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Role:</strong> {user.role}</p>
                                <p><strong>Date:</strong> {new Date(user.createdAt).toLocaleString('en-GB', { 
                                    day: '2-digit', 
                                    month: '2-digit', 
                                    year: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: true
                                })}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>

            <div className="flex justify-center items-center bg-orange-400 text-white mx-4 p-2 rounded-md mt-8">
                <Link to={"/admin"}>Full details</Link>
            </div>
        </div>
    );
}

export default AdminProfile;
