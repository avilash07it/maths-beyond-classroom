import "./Register.css";
import logo from "../../assets/mbc-logo.png";
import { FcGoogle } from "react-icons/fc";

function Register() {
  return (
    <main className="register-page">
      <div className="register-bg-glow"></div>
      
      <div className="register-top-brand">
        <img src={logo} alt="MBC Logo" />
        <div>
          <h2>MATHS</h2>
          <p>BEYOND CLASSROOM</p>
        </div>
      </div>

      <section className="register-left">
        <div className="register-brand-text">
          <h1>
            Start Beyond.
            <br />
            <span>Practice Beyond.</span>
            <br />
            Achieve Beyond.
          </h1>

          <p>
            Create your account and begin structured preparation for Olympiad,
            scholarship and school mathematics exams.
          </p>
        </div>

        <div className="register-benefits">
          <div><span>✦</span><p>Free access to lectures and materials</p></div>
          <div><span>✦</span><p>Daily Problem of the Day practice</p></div>
          <div><span>✦</span><p>Upgrade anytime for Test Series support</p></div>
        </div>

        <div className="register-mini-card">
          <b>Student account includes</b> topic-wise learning, PYQs, study materials,
          assignments and practice sheets.
        </div>

        <div className="register-exam-strip">
          <span>IOQM</span>
          <span>RMO</span>
          <span>NMTC</span>
          <span>SEHSS</span>
          <span>CBSE IX & X</span>
        </div>
      </section>

      <section className="register-card">
        <div className="register-card-header">
          <h2>Create Account</h2>
          <p>Join MBC and start your learning journey.</p>
        </div>

        <form>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Create a password" />

          <button type="button" className="register-btn">
            Create Account →
          </button>
        </form>

        <div className="register-divider">
          <span></span>
          <p>or continue with</p>
          <span></span>
        </div>

        <button className="google-btn" type="button">
          <FcGoogle className="google-icon" />
          Continue with Google
        </button>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>

        <div className="secure-box">
          🛡️ Your data is secure with us.
        </div>
      </section>
    </main>
  );
}

export default Register;