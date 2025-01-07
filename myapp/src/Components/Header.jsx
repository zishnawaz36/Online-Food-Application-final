import { Link, useNavigate } from "react-router-dom";
import { LOGO_URL } from "./Utilis/constraint";
import "./Style/App.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

function Header({ search, setSearch }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set true if token exists
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login"); 
  };

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between items-center h-20 w-full px-6 bg-white shadow-md">
      
      <div className="flex items-center">
        <img className="h-12" alt="Logo" src={LOGO_URL} />
      </div>

      
      <div className="flex items-center w-full max-w-md relative">
        <input
          className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2"
          type="text"
          id="name"
          placeholder="Search here..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      
      <div className="flex items-center space-x-14 font-bold text-gray-900">
        <Link
          to="/"
          className="hover:text-orange-600 transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/admin"
          className="hover:text-orange-600 transition duration-200"
        >
          admin
        </Link>
        <Link
          to="/toprated"
          className="hover:text-orange-600 transition duration-200"
        >
          Add Restaurant
        </Link>
        <Link
          to="/cart"
          className="flex items-center space-x-2 font-semibold hover:text-orange-600 transition duration-200"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="font-bold">Cart({cartItems.length} items)</span>
        </Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="hover:text-green-600 transition duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
