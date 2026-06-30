import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  quickAccess,
    exams,

  proPlan,
  welcomeData,
} from "./dashboardData";

import DashboardNavbar from "./DashboardNavbar";

import { FaWhatsapp } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

const [support, setSupport] = useState(null);
const [liveLecture, setLiveLecture] = useState(null);
const [todayProblem, setTodayProblem] = useState(null);
const [lectures, setLectures] = useState([]);
const [upcomingMockTest, setUpcomingMockTest] = useState(null);
const [latestMaterial, setLatestMaterial] = useState(null);
const [materials, setMaterials] = useState([]);
const [mockTests, setMockTests] = useState([]);
const fetchMaterials = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/materials"
    );

   const materialsData = response.data.data;

setMaterials(materialsData);

if (materialsData.length > 0) {
    setLatestMaterial(materialsData[0]);
}
  } catch (error) {
    console.error(error);
  }
};
const fetchLectures = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/lectures"
    );

    const lecturesData = response.data.data;

setLectures(lecturesData);

const live =
  lecturesData.find((lecture) => !lecture.isRecorded) ||
  lecturesData[0];

setLiveLecture(live || null);
  } catch (error) {
    console.error(error);
  }
};
const fetchTodayPOTD = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/potd/today"
    );
console.log("POTD:", response.data);
    setTodayProblem(response.data.data);
  } catch (error) {
    console.error(error);
  }
};
const fetchMockTests = async () => {
  try {
    const response = await axios.get(
 "http://localhost:5000/api/mock-tests/getall"
    );

const tests = response.data;

setMockTests(tests);

    const upcoming =
      tests.find((test) => test.status === "Published") ||
      tests[0];
console.log("Mock Tests:", response.data);
    setUpcomingMockTest(upcoming || null);
  } catch (error) {
    console.error(error);
  }
};
const fetchSupport = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/support"
    );

    setSupport(response.data.data[0]);
    console.log("Support:", response.data.data[0]);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchSupport();
  fetchLectures();
  fetchTodayPOTD();
  fetchMaterials();
  fetchMockTests();
}, []);
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
              <b>Today's Live Class</b>

<span>
  {liveLecture
    ? `${liveLecture.title}`
    : "No lecture uploaded"}
</span>
            </div>

            <div>
              <b>Latest Material</b>

<span>
  {latestMaterial
    ? latestMaterial.title
    : "No material uploaded"}
</span>
            </div>

            <div>
             <b>POTD</b>

<span>
  {todayProblem
    ? todayProblem.title
    : "No POTD uploaded"}
</span>
            </div>
          </div>
        </div>

        <div className="hero-stats-panel">
          <div className="hero-stat-card">
            <span>📖</span>
            <div>
              <h3>{lectures.length}</h3>
              <p>Lectures Watched</p>
            </div>
          </div>

          <div className="hero-stat-card">
            <span>📄</span>
            <div>
             <h3>{materials.length}</h3>
              <p>Materials Read</p>
            </div>
          </div>

          <div className="hero-stat-card">
            <span>🎯</span>
            <div>
<h3>{mockTests.length}</h3>
              <p>Tests Attempted</p>
            </div>
          </div>

          <div className="hero-stat-card">
            <span>🔥</span>
            <div>
              <h3>-</h3>
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
  {lectures.length > 0 ? (
    lectures.map((item) => (
      <div className="learning-card" key={item.id}>
        <span>{item.exam}</span>

        <div className="lesson-icon">
          <PlayCircle size={38} />
        </div>

        <h3>{item.title}</h3>

        <p>Lecture {item.lectureNumber}</p>

        <small>{item.topic}</small>

        <button
          onClick={() => window.open(item.youtubeUrl, "_blank")}
        >
          {item.isRecorded ? "Watch Now →" : "Join Live →"}
        </button>
      </div>
    ))
  ) : (
    <div className="learning-card">
      <h3>No lectures uploaded</h3>
      <p>Lectures will appear here once they're added by the admin.</p>
    </div>
  )}
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
<h2>
  {todayProblem
    ? todayProblem.title
    : "Problem of the Day"}
</h2>             
 <a href="/potd">View all →</a>
            </div>

<span className="topic-pill">
  {todayProblem?.topic || "-"}
</span>

<span className="time-pill">
  {todayProblem ? "Published" : "No POTD"}
</span>

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
<h3>
  {upcomingMockTest
    ? upcomingMockTest.title
    : "No test uploaded"}
</h3>
              <a href="/mock-tests">View all →</a>
            </div>


            <div className="test-info">
<div>
  {upcomingMockTest
    ? upcomingMockTest.exam
    : "-"}
</div>
<div>
  {upcomingMockTest
    ? `${upcomingMockTest.duration} mins`
    : "-"}
</div>
<div>
  {upcomingMockTest
    ? `${upcomingMockTest.questions ?? "-"} Questions`
    : "-"}
</div>
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
<a
  href={support?.whatsappLink || "#"}
  target="_blank"
  rel="noreferrer"
   onClick={(e) => {
    if (!support) e.preventDefault();
  }}
>
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