import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import "./AdminLogin.css";
import logo from "../../assets/mbc-logo-8.png";
import api from "../../utils/api";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

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

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setError("Enter your admin email and password to continue.");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.data.token;
      const user = response.data.data.user;

      if (user.role !== "ADMIN") {
        setError("Only administrators can access this portal.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/admin-dashboard");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to login. Please try again."
      );
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-hero" aria-labelledby="admin-login-title">
        <div className="admin-login-glow admin-login-glow-primary"></div>
        <div className="admin-login-glow admin-login-glow-secondary"></div>

        <div className="admin-login-shell">
          <div className="admin-login-layout">
            <aside className="admin-login-intro" aria-label="Admin portal overview">
              <div className="admin-login-brand">
                <img src={logo} alt="Maths Beyond Classroom logo" />
                <div>
                  <span>MATHS</span>
                  <p>BEYOND CLASSROOM</p>
                </div>
              </div>

              <div className="admin-login-intro-copy">
                <span className="admin-login-secure-badge">
                  <ShieldCheck size={16} aria-hidden="true" />
                  Secure access
                </span>
                <h1 id="admin-login-title">Admin Portal</h1>
                <p>Controlled access for managing the MBC platform.</p>
              </div>

              <div className="admin-login-mini-notice">
                <LockKeyhole size={18} aria-hidden="true" />
                <p>Student accounts cannot enter this workspace.</p>
              </div>
            </aside>

            <div className="admin-login-panel">
              <section className="admin-login-card" aria-label="Admin sign in">
                <div className="admin-login-card-icon" aria-hidden="true">
                  <ShieldCheck size={34} />
                </div>

                <div className="admin-login-card-header">
                  <span>Authorized administrators only</span>
                  <h2>Admin Login</h2>
                  <p>Use your administrator credentials to continue.</p>
                </div>

                <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
                  <label htmlFor="admin-login-email">Email</label>
                  <div className="admin-login-input-wrap">
                    <Mail size={18} aria-hidden="true" />
                    <input
                      id="admin-login-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@mbc.com"
                      autoComplete="username"
                    />
                  </div>

                  <label htmlFor="admin-login-password">Password</label>
                  <div className="admin-login-input-wrap">
                    <LockKeyhole size={18} aria-hidden="true" />
                    <input
                      id="admin-login-password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      autoComplete="current-password"
                    />
                  </div>

                  {error && <p className="admin-login-error">{error}</p>}

                  <button className="admin-login-submit" type="submit">
                    Sign In
                  </button>
                </form>

                <div className="admin-login-authorized-note">
                  <LockKeyhole size={15} aria-hidden="true" />
                  <span>Restricted area. Activity may be monitored.</span>
                </div>
              </section>

              <section className="admin-login-info-card" aria-label="Security information">
                <h2>Security information</h2>
                <ul>
                  <li>Student accounts cannot access the admin portal.</li>
                  <li>Admin credentials are managed internally.</li>
                  <li>Activity may be monitored.</li>
                </ul>
              </section>

              <section className="admin-login-support-card" aria-label="Access support">
                <div>
                  <span>Need access?</span>
                  <p>Contact the platform owner.</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminLogin;
