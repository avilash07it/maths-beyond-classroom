import { useNavigate } from "react-router-dom";
import logo from "../../assets/mbc-logo-8.png";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src={logo}
          alt="Maths Beyond Classroom Logo"
          className="logo-img"
        />

        <div className="logo-text">
          <span className="logo-title">MATHS</span>
          <span className="logo-subtitle">BEYOND CLASSROOM</span>
        </div>
      </div>

      <ul className="nav-links">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/topics")}>Topics</li>
        <li onClick={() => navigate("/mock-tests")}>Mock Tests</li>
        <li onClick={() => navigate("/pyq-library")}>PYQs</li>
        <li>Leaderboard</li>
        <li>About Us</li>
      </ul>

      <div className="nav-buttons">
        <button className="signup-btn" onClick={() => navigate("/register")}>Sign Up</button>
        <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
      </div>
    </nav>
  );
}

export default Navbar;
