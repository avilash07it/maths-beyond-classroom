import "./TopicDetail.css";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import {
    topicDetail,
    learningPath,
    lectures,
    studyMaterials,
    pyqPapers,
    importantTopics,
  } from "./topicDetailData";

function TopicDetail() {
  return (
    <div className="topic-detail-page">
      <DashboardNavbar />

      <section className="topic-hero">
        <div className="topic-hero-left">
          <p className="topic-breadcrumb">{topicDetail.breadcrumb}</p>

          <div className="topic-hero-main">
            <div className="topic-main-icon">{topicDetail.icon}</div>

            <div>
              <h1>{topicDetail.title}</h1>
              <p>{topicDetail.description}</p>

              <button className="bookmark-btn">Bookmark</button>
            </div>
          </div>

          <div className="topic-stats">
            {topicDetail.stats.map((stat) => (
              <div className="topic-stat-card" key={stat.label}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="topic-hero-graphic">
          <span>7</span>
          <span>3</span>
          <span>∞</span>
          <span>5</span>
        </div>
      </section>

      <section className="topic-tabs">
        <button className="active">Overview</button>
        <button>Lectures</button>
        <button>Study Material</button>
        <button>PYQ Papers</button>
        <button>Topic Tests</button>

        <button className="continue-btn">Continue Learning →</button>
      </section>

      <section className="topic-main">
  <div className="topic-left">
    <div className="detail-card">
      <div className="card-header">
        <div>
          <h2>Learning Path</h2>
          <p>Step by step journey to master Number Theory</p>
        </div>
        <a href="#">View Roadmap →</a>
      </div>

      <div className="path-grid">
        {learningPath.map((item) => (
          <div className="path-item" key={item.step}>
            <div className="path-step">{item.step}</div>
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
            <span>{item.status}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="detail-card">
      <div className="card-header">
        <div>
          <h2>Lectures</h2>
          <p>Watch, learn and strengthen your concepts</p>
        </div>
        <a href="#">View All Lectures →</a>
      </div>

      <div className="lecture-list">
        {lectures.map((lecture) => (
          <div className="lecture-row" key={lecture.no}>
            <span>{lecture.no}</span>
            <div>
              <h3>{lecture.title}</h3>
              <p>{lecture.time}</p>
            </div>
            <button>{lecture.status}</button>
          </div>
        ))}
      </div>
    </div>

    <div className="resource-grid">
      <div className="detail-card">
        <div className="card-header">
          <h2>Study Material</h2>
          <a href="#">View All →</a>
        </div>

        {studyMaterials.map((item) => (
          <div className="resource-row" key={item.title}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.meta}</p>
            </div>
            <span>↓</span>
          </div>
        ))}
      </div>

      <div className="detail-card">
        <div className="card-header">
          <h2>PYQ Papers</h2>
          <a href="#">View All →</a>
        </div>

        {pyqPapers.map((item) => (
          <div className="resource-row" key={item.title}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.meta}</p>
            </div>
            <span>↓</span>
          </div>
        ))}
      </div>
    </div>
  </div>

  <aside className="topic-right">
  <div className="detail-card progress-card">
  <h2>Your Progress</h2>

  <div className="progress-circle">65%</div>

  <div className="progress-summary">
    <div>
      <span className="green-dot"></span>
      Completed
      <b>31/48</b>
    </div>

    <div>
      <span className="blue-dot"></span>
      In Progress
      <b>8/48</b>
    </div>

    <div>
      <span className="gray-dot"></span>
      Not Started
      <b>9/48</b>
    </div>
  </div>

  <div className="streak-mini-card">
    <span>🔥</span>
    <div>
      <h3>12 Day Streak</h3>
      <p>Keep it up!</p>
    </div>
  </div>
</div>

    <div className="detail-card">
      <h2>Important Topics</h2>

      <div className="important-list">
        {importantTopics.map((topic) => (
          <button key={topic}>{topic} →</button>
        ))}
      </div>
    </div>

    <div className="topic-pro-card">
  <div className="topic-pro-crown">♛</div>

  <div>
    <span className="topic-pro-label">PRO ACCESS</span>
    <h2>Go Pro</h2>
    <p>Unlock Test Series, PYQs, detailed solutions and personal support.</p>

    <div className="topic-pro-benefits">
      <span>Test Series</span>
      <span>Personal Support</span>
    </div>

    <button>Explore Pro Plans →</button>
  </div>
</div>
  </aside>
</section>
    </div>
  );
}

export default TopicDetail;