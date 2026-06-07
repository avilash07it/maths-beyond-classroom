import logo from "../../assets/mbc-logo-10.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <div className="footer-logo">
          <img
            src={logo}
            alt="Maths Beyond Classroom Logo"
            className="footer-logo-img"
          />

          <div>
            <h2>MATHS</h2>
            <span>BEYOND CLASSROOM</span>
          </div>
        </div>

        <p>
          Empowering students to think deeper,
          solve better and achieve beyond limits.
        </p>
      </div>

      <div className="footer-links">
        <div>
          <h4>Explore</h4>
          <a>Topics</a>
          <a>Mock Tests</a>
          <a>PYQs</a>
          <a>Leaderboard</a>
        </div>

        <div>
          <h4>Resources</h4>
          <a>Study Notes</a>
          <a>Formula Sheet</a>
          <a>Problem Archive</a>
          <a>Wall of Fame</a>
        </div>

        <div>
          <h4>Company</h4>
          <a>About Us</a>
          <a>Our Mentors</a>
          <a>Careers</a>
          <a>Contact Us</a>
        </div>

        <div>
          <h4>Support</h4>
          <a>Help Center</a>
          <a>FAQs</a>
          <a>Privacy Policy</a>
          <a>Terms & Conditions</a>
        </div>
      </div>

      <p className="footer-bottom">
        © 2026 Maths Beyond Classroom. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;