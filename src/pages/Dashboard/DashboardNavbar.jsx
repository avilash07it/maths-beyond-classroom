import { NavLink, useNavigate } from "react-router-dom";
import "./DashboardNavbar.css";
import logo from "../../assets/mbc-logo-8.png";
import { useEffect, useState } from "react";

function DashboardNavbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
const handleLogout = () => {
  localStorage.removeItem("user");

  localStorage.removeItem("token");

  setUser(null);

  navigate("/");
};
  return (
    <nav className="dashboard-navbar">
      <div className="dashboard-logo">
        
        <img src={logo} alt="Maths Beyond Classroom Logo" />

        <div>
          <h3>MATHS</h3>
          <span>BEYOND CLASSROOM</span>
        </div>
      </div>

 <div className="dashboard-links">
  <NavLink to="/dashboard">Dashboard</NavLink>
  <NavLink to="/topics">Topics</NavLink>
  <NavLink to="/lectures">Lectures</NavLink>
  <NavLink to="/study-material">Study Material</NavLink>
  <NavLink to="/pyq-library">PYQ Library</NavLink>
  <NavLink to="/mock-tests">Mock Tests</NavLink>
  <NavLink to="/books">Books</NavLink>
  <NavLink to="/potd">POTD</NavLink>
</div>

<div className="dashboard-user-actions">
  <div className="dashboard-streak">
    🔥 {user?.streak ?? 0} Day{user?.streak === 1 ? "" : "s"}
  </div>

  <button
    className="dashboard-logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
</div>
      
    </nav>
  );
}

export default DashboardNavbar;
