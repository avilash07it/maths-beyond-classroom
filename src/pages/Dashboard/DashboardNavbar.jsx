import { NavLink } from "react-router-dom";
import "./DashboardNavbar.css";
import logo from "../../assets/mbc-logo-8.png";

function DashboardNavbar() {
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
  <NavLink to="/potd">POTD</NavLink>
</div>

      <div className="dashboard-streak">
        🔥 12 Day Streak
      </div>
    </nav>
  );
}

export default DashboardNavbar;