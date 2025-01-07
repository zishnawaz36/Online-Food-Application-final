import { Link } from "react-router-dom";
import "../Style/App.css";

function MainHeader() {
  return (
    <div className="flex justify-end">
      <ul className="font-bold text-white flex space-x-10 mr-10 mt-2 text-md">
        <li>
          <Link to="/manager" className="hover:underline">
            Partner with us
          </Link>
        </li>
        <li>
          <Link to="/admin" className="hover:underline">
            Admin
          </Link>
        </li>
        <li>
          <Link to="/signup" className="hover:underline">
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MainHeader;
