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
        <a href="#" className="active">Dashboard</a>
        <a href="#">Topics</a>
        <a href="#">Lectures</a>
        <a href="#">Study Material</a>
        <a href="#">PYQ Library</a>
        <a href="#">Mock Tests</a>
        <a href="#">POTD</a>
      </div>

      <div className="dashboard-streak">
        🔥 12 Day Streak
      </div>
    </nav>
  );
}

export default DashboardNavbar;