
import { Link } from "react-router-dom";

function Dashboard() {
    return(
        <>
        <Link to={"/admin"}>Admin</Link>
          <Link to={"/manager"}>Manager</Link>
            <Link to={"/user"}>User</Link>
            <Link to={"/logout"}>Logout</Link>
        </>
    )
}
export default Dashboard;