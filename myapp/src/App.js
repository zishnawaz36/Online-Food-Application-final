import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React, { Suspense, lazy } from "react";
import MainContainerLayout from "./Components/Admin/MainContainer";
import CompleteAddress from "./Components/Address";
import ConfirmOrder from "./Components/ConfirmOrder";
import AdminDashboardComplete from "./Components/Admin/CompleteDetailsforAdmin.jsx";
import AdminProfile from "./Components/Admin/AdminProfile.jsx";
const AdminDashboard = lazy(() => import("./Components/Admin/CompleteDetailsforAdmin.jsx"));
const Admin = lazy(() => import("./Components/AdminLayout"));
const Manager = lazy(() => import("./Components/Manager"));
const MainBody = lazy(() => import("./Components/MainBody"));
const ProtectedRoute = lazy(() => import("./Components/Utilis/ProtectedRoute"));
const DeliveryRestro = lazy(() => import("./Components/DeliveryRestro"));
const RestaurantMenu = lazy(() => import("./Components/Resturantmenu"));
const Signup = lazy(() => import("./Components/Signup"));
const Login = lazy(() => import("./Components/Login"));
const Cart = lazy(() => import("./Components/Cart"));
const Details = lazy(() => import("./Components/Admin/Details"));
const Checkout = lazy(() => import("./Components/MyCheckout"));
const Complete = lazy(() => import("./Components/CompleteDetails"));

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Toaster />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainContainerLayout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          {token ? (
            <Route element={<ProtectedRoute token={token} />}>
              <Route path="/details" element={<Details />} />
              <Route path="/confirmorder" element={<ConfirmOrder />} />
              <Route path="/completeDetails" element={<Complete />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/address" element={<CompleteAddress />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/adminprofile" element={<AdminProfile />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/onlyadmin" element={<AdminDashboardComplete />} />
              <Route path="/mainBody" element={<MainBody />} />
              <Route path="/toprated" element={<DeliveryRestro />} />
              <Route path="/restaurant/:resid" element={<RestaurantMenu />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          ) : (
            // Agar token nahi hai to protected routes par jane par redirect ho jayega login par
            <>
              <Route path="/details" element={<Navigate to="/login" />} />
              <Route path="/confirmorder" element={<Navigate to="/login" />} />
              <Route path="/completeDetails" element={<Navigate to="/login" />} />
              <Route path="/checkout" element={<Navigate to="/login" />} />
              <Route path="/address" element={<Navigate to="/login" />} />
              <Route path="/admin" element={<Navigate to="/login" />} />
              <Route path="/manager" element={<Navigate to="/login" />} />
              <Route path="/onlyadmin" element={<Navigate to="/login" />} />
              <Route path="/mainBody" element={<Navigate to="/login" />} />
              <Route path="/toprated" element={<Navigate to="/login" />} />
              <Route path="/restaurant/:resid" element={<Navigate to="/login" />} />
              <Route path="/cart" element={<Navigate to="/login" />} />
            </>
          )}

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
