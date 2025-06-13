import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [optionRole, setOptionRole] = useState('');

    // Role options
    const options = [
        { label: "Admin", value: "admin" },
        { label: "Manager", value: "manager" },
        { label: "User", value: "user" }
    ];

    // Handle role selection
    const handleOptions = (e) => {
        setOptionRole(e.target.value);
    };

    // Handle user registration
    const userHandler = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !optionRole) {
            toast.error("All fields are required!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/auth/register", {
                username,
                email,
                password,
                role: optionRole    // role bhi bhejna hoga backend ko
            });

            if (response.data.message === "User registered successfully") {
                toast.success("Registration successful!");
                navigate("/login");
            } else {
                toast.error(response.data.message || "Registration failed");
            }
        } catch (err) {
            console.error("Error connecting to server:", err.message);
            toast.error("Server error. Please try again later.");
        }
    };

    return (
        <div className="bg-gray-800 w-full h-screen flex justify-center items-center">
            <div className="h-auto w-[90%] max-w-[500px] shadow-lg flex flex-col items-center rounded-xl bg-white text-black p-6">
                <h1 className="text-3xl font-bold mb-8">Register</h1>

                <form className="flex flex-col w-full" onSubmit={userHandler}>
                    <label htmlFor="name" className="mb-2 text-gray-600">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="email" className="mb-2 text-gray-600">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password" className="mb-2 text-gray-600">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className="mb-2 text-gray-600">Select Role</label>
                    <div className="flex justify-around mb-4">
                        {options.map((option) => (
                            <label key={option.value} className="text-orange-500">
                                <input
                                    type="radio"
                                    value={option.value}
                                    checked={optionRole === option.value}
                                    onChange={handleOptions}
                                    className="mr-1"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>

                    <button type="submit" className="py-2 my-4 w-full bg-orange-400 text-white rounded-md hover:bg-orange-500 transition duration-300">
                        Submit
                    </button>
                </form>

                <div className="flex justify-center items-center">
                    <p>Already have an account?</p>
                    <Link to="/login" className="ml-2 text-orange-500 hover:underline hover:scale-105 transition-transform">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
