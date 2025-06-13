import React from "react";
import { Link } from "react-router-dom";

function CompletingManager() {
    return (
        <div className="bg-gradient-to-r from-orange-400 to-yellow-300 w-full h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
                <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
                <p className="text-gray-700 text-lg mb-6">
                    Your details have been successfully submitted.
                    <br /> We're excited to have you as a Manager in our system.
                    <br /> Now you can start managing restaurants, adding menu items, and serving users efficiently.
                    <br /> Welcome aboard! 🚀
                </p>

                <Link 
                    to="/dashboard" 
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md text-lg transition-transform transform hover:scale-105"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}

export default CompletingManager;
