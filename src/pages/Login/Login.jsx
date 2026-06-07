import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import logo from "../../assets/mbc-logo-8.png";

function Login() {
  return (
    <main className="login-page">
      <div className="login-bg-glow"></div>

      <div className="login-top-brand">
        <img src={logo} alt="MBC Logo" />
        <div>
          <h2>MATHS</h2>
          <p>BEYOND CLASSROOM</p>
        </div>
      </div>

      <section className="login-left">
        <div className="login-brand-text">
          <h1>
            Think Beyond.
            <br />
            <span>Solve Beyond.</span>
            <br />
            Achieve Beyond.
          </h1>

          <p>
            India’s focused platform for Olympiad mathematics preparation,
            daily practice, PYQs and structured learning.
          </p>
        </div>

        <div className="login-benefits">
          <div>
            <span>✦</span>
            <p>Live classes updated daily</p>
          </div>
          <div>
            <span>✦</span>
            <p>Topic-wise PYQs and materials</p>
          </div>
          <div>
            <span>✦</span>
            <p>Test Series and personal support</p>
          </div>
        </div>

        <div className="login-mini-card">
  <b>Free access includes</b> lectures, study materials, PYQs and Problem of the Day.
  Pro access unlocks test series and personal support.
</div>

        <div className="login-exam-strip">
          <span>IOQM</span>
          <span>RMO</span>
          <span>NMTC</span>
          <span>SEHSS</span>
          <span>CBSE IX & X</span>
        </div>
      </section>

      <section className="login-card">
        <div className="login-card-header">
          <h2>Welcome Back!</h2>
          <p>Login to continue your learning journey.</p>
        </div>

        <form>
          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" />

          <div className="password-row">
            <label>Password</label>
            <a href="#">Forgot Password?</a>
          </div>
          <input type="password" placeholder="Enter your password" />

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
          </div>

          <button type="button" className="login-btn">
            Login →
          </button>
        </form>

        <div className="login-divider">
          <span></span>
          <p>or continue with</p>
          <span></span>
        </div>

        <button className="google-btn" type="button">
  <FcGoogle className="google-icon" />
  Continue with Google
</button>

        <p className="register-link">
          Don’t have an account? <a href="/register">Sign up</a>
        </p>

        <div className="secure-box">
          🛡️ Your data is secure with us.
        </div>
      </section>
    </main>
  );
}

export default Login;