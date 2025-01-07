import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setUser } from "./Utilis/AuthSlice";
import { useDispatch } from "react-redux";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        if(data.user.role!=="admin"){
          navigate("/admin");
        }
        else if(data.user.role ==='user'){
          navigate('/maincontainer')
        }
        dispatch(setUser(data.user));
        navigate("/mainBody");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      toast.error("An error occurred while logging in.");
    }
  };

  return (
    <div className="bg-gray-800 w-full h-screen flex justify-center items-center">
      <div className="h-[500px] w-[500px] shadow-md flex justify-center items-center flex-col rounded-xl bg-white text-black">
        <h1 className="text-2xl mb-10"><b>Login</b></h1>
        <form onSubmit={handleLogin} className="flex flex-col w-full">
          <label className="mb-6 mx-4">Email</label>
          <input
            type="email"
            className="mb-4 p-2 mx-4 border rounded-md focus:ring-2 focus:ring-orange-400"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="mb-6 mx-4">Password</label>
          <input
            type="password"
            className="mb-2 p-2 mx-4 border rounded-md focus:ring-2 focus:ring-orange-400"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 my-4 mx-4 bg-orange-400 text-white rounded-md"
          >
            Submit
          </button>
        </form>
        <div className="flex gap-2">
          <h1><b>Don't have an account?</b></h1>
          <Link className="text-orange-400" to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
