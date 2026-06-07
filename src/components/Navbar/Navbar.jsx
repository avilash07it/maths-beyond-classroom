import logo from "../../assets/mbc-logo-8.png";
import "./Navbar.css";

function Navbar() {
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
        <li>Home</li>
        <li>Topics</li>
        <li>Mock Tests</li>
        <li>PYQs</li>
        <li>Leaderboard</li>
        <li>About Us</li>
      </ul>

      <div className="nav-buttons">
        <button className="signup-btn">Sign Up</button>
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;