import "./Register.css";
import logo from "../../assets/mbc-logo-8.png";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/login");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

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

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
          />

          {error && <p className="register-error">{error}</p>}

          <button type="submit" className="register-btn" disabled={isLoading}>
  {isLoading ? "Creating Account..." : "Create Account →"}
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
