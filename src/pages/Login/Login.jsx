import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/mbc-logo-8.png";
import api from "../../utils/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.data.token;
      const user = response.data.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

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

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <div className="password-row">
            <label>Password</label>
            <a href="#">Forgot Password?</a>
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : (
              <>
            Login →
              </>
            )}
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
