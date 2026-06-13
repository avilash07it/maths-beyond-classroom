import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

import {
  continueLearning,
  quickAccess,
  exams,
  potd,
  upcomingTest,
  proPlan,
  welcomeData,
} from "./dashboardData";

import DashboardNavbar from "./DashboardNavbar";

import { FaWhatsapp } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <DashboardNavbar />

      <section className="dashboard-hero">
        <div>
          <h1>
            Welcome back, <span>{welcomeData.studentName}!</span> 👋
          </h1>
          <p>Consistency today, excellence tomorrow.</p>

          <div className="hero-status-cards">
            <div>
              <b>Today’s Live Class</b>
              <span>Number Theory • 10:00 AM</span>
            </div>

            <div>
              <b>Latest Material</b>
              <span>Quadratic Equations</span>
            </div>

            <div>
              <b>POTD Available</b>
              <span>Solve and keep your streak alive</span>
            </div>
          </div>
        </div>

        <div className="hero-stats-panel">
          <div className="hero-stat-card">
            <span>📖</span>
            <div>
              <h3>32</h3>
              <p>Lectures Watched</p>
            </div>
          </div>

          <div className="hero-stat-card">
            <span>📄</span>
            <div>
              <h3>18</h3>
              <p>Materials Read</p>
            </div>
          </div>

          <div className="hero-stat-card">
            <span>🎯</span>
            <div>
              <h3>7</h3>
              <p>Tests Attempted</p>
            </div>
          </div>

          <div className="hero-stat-card">
            <span>🔥</span>
            <div>
              <h3>12</h3>
              <p>Day Streak</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-content">
        <main className="dashboard-main">
          <div className="section-header">
            <h2>Continue Learning</h2>
            <a href="/lectures">View all →</a>
          </div>

          <div className="learning-grid">
            {continueLearning.map((item) => {
              const LessonIcon = item.icon;

              return (
                <div className={`learning-card ${item.color}`} key={item.topic}>
                  <span>{item.exam}</span>

                  <div className="lesson-icon">
                    <LessonIcon size={38} />
                  </div>

                  <h3>{item.topic}</h3>
                  <p>{item.lecture}</p>
                  <small>{item.subtitle}</small>
                  <button onClick={() => navigate("/lectures")}>Continue →</button>
                </div>
              );
            })}
          </div>

          <div className="section-header quick-heading">
            <h2>Quick Access</h2>
          </div>

          <div className="quick-grid">
            {quickAccess.map((item) => {
              const Icon = item.icon;

              return (
                <div
  className="quick-card"
  key={item.title}
  onClick={() => navigate(item.path)}
  role="button"
  tabIndex={0}
>
                  <div className="quick-icon">
                    <Icon size={28} />
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="section-header quick-heading">
            <h2>Exams We Cover</h2>
          </div>

          <div className="exam-grid">
            {exams.map((exam) => {
              const ExamIcon = exam.icon;

              return (
                <div
  className="exam-card"
  key={exam.name}
  onClick={() => navigate("/topics")}
  role="button"
  tabIndex={0}
>
                  <div className="exam-icon">
                    <ExamIcon size={26} />
                  </div>

                  <h3>{exam.name}</h3>
                  <p>{exam.subtitle}</p>
                </div>
              );
            })}
          </div>
        </main>

        <aside className="dashboard-sidebar">
        <div className="side-card dashboard-potd-card">
                      <div className="section-header">
              <h2>{potd.title}</h2>
              <a href="/potd">View all →</a>
            </div>

            <span className="topic-pill">{potd.topic}</span>
            <span className="time-pill">{potd.timeLeft}</span>

            <div className="potd-preview-box">
  <h3>Today’s challenge is ready</h3>
  <p>Open the uploaded problem image and try solving it before viewing the hint or solution.</p>

  <button className="view-problem-btn" onClick={() => navigate("/potd")}>
  View Problem →
</button>
</div>

<div className="potd-actions">
<button className="outline-btn" onClick={() => navigate("/potd")}>
  View Hint
</button>
<button onClick={() => navigate("/pro-plans")}>
  View Solution
</button>
</div>
          </div>

          <div className="side-card">
            <div className="section-header">
              <h2>Upcoming Test</h2>
              <a href="/mock-tests">View all →</a>
            </div>

            <h3>{upcomingTest.title}</h3>

            <div className="test-info">
              <div>{upcomingTest.date}</div>
              <div>{upcomingTest.time}</div>
              <div>{upcomingTest.questions}</div>
            </div>

            <button className="side-btn" onClick={() => navigate("/mock-tests")}>
  View Details
</button>
          </div>

          <div className="pro-card">
  <div className="pro-crown">♛</div>

  <div>
    <span className="pro-label">PRO ACCESS</span>
    <h2>{proPlan.title}</h2>
    <p>{proPlan.description}</p>

    <div className="pro-benefits">
      <span>Test Series</span>
      <span>Personal Support</span>
    </div>

    <button onClick={() => navigate("/pro-plans")}>
  Explore Pro Plans →
</button>
  </div>
</div>

<div className="support-card">
  <div className="support-whatsapp-icon">
    <FaWhatsapp />
  </div>

  <div className="support-content">
    <h3>Need guidance?</h3>
    <p>Talk to a mentor for lectures, tests and preparation doubts.</p>
    <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer">
  WhatsApp Support →
</a>
  </div>
</div>
        </aside>
      </section>
    </div>
  );
}

export default Dashboard;