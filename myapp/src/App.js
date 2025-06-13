import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React, { Suspense, lazy } from "react";
import MainContainerLayout from "./Components/Admin/MainContainer";
import CompleteAddress from "./Components/Address";
import ConfirmOrder from "./Components/ConfirmOrder";
import AdminDashboardComplete from "./Components/Admin/CompleteDetailsforAdmin.jsx";
// Lazy loading components

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
const Address = lazy(() => import("./Components/Address"));
//const Complete = lazy(() =>import("./Components/Address"))
const Complete = lazy(() =>import("./Components/CompleteDetails"));
function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Toaster />
      <Suspense fallback={<div>Loading...</div>}>
      
        <Routes>
          {/* Public Routes */}  
          <Route path="/confirmorder" element={<ConfirmOrder/>}/> 
          <Route path="/completeDetails"element={<Complete/>} />      
          <Route path="/checkout" element={<Checkout/>}></Route>
          <Route  path="/address" element={<CompleteAddress/>} />
          <Route path="/" element={<MainContainerLayout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details" element={<Details/>} />
          {!token && (
            <>
              
              
              
            </>
          )}

          {/* Protected Routes */}
          {token && (
            <Route element={<ProtectedRoute token={token} />}>
              <Route path="/onlyadmin"element={<AdminDashboardComplete/>}/>
              <Route path="/mainBody" element={<MainBody />} />
              <Route path="/toprated" element={<DeliveryRestro />} />
              <Route path="/restaurant/:resid" element={<RestaurantMenu />} />

              <Route path="/cart" element={<Cart />} />
            </Route>
          )}

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
