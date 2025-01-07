import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user); // Get user from Redux state

    useEffect(() => {
        // If no user is logged in or the role is not admin, redirect to login
        if (!user || user.role !== "admin") {
            navigate("/login");
        }
    }, [user, navigate]);

    return <Outlet />; // Render nested routes
}

export default Admin;
