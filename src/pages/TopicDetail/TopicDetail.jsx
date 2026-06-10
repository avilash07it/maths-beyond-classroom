import "./TopicDetail.css";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Box,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  ClipboardList,
  Eye,
  FileText,
  Flame,
  Layers,
  Lock,
  PlayCircle,
  Sparkles,
  Target,
} from "lucide-react";
import {
  importantTopics,
  learningPath,
  lectures,
  pyqPapers,
  recommendedResources,
  streakDays,
  studyMaterials,
  topicDetail,
} from "./topicDetailData";

const statIcons = {
  lectures: PlayCircle,
  questions: ClipboardList,
  papers: FileText,
  progress: CircleDot,
};

const statusClass = (status) => status.toLowerCase().replace(/\s+/g, "-");

function TopicDetail() {
  return (
    <div className="topic-detail-page">
      <DashboardNavbar />

      <main className="topic-detail-shell">
        <section className="topic-detail-hero">
          <div className="topic-hero-content">
            <div className="topic-breadcrumb">
              {topicDetail.breadcrumb.map((item, index) => (
                <span key={item}>
                  {item}
                  {index < topicDetail.breadcrumb.length - 1 && <ChevronRight size={14} />}
                </span>
              ))}
            </div>

            <div className="topic-hero-main">
              <div className="topic-main-icon" aria-hidden="true">
                <span>1</span>
                <span>+</span>
                <span>3</span>
              </div>

              <div className="topic-hero-copy">
                <h1>
                  Number <span>Theory</span>
                </h1>
                <p>{topicDetail.description}</p>
                <button className="bookmark-btn" type="button">
                  <Bookmark size={16} />
                  Bookmark
                </button>
              </div>
            </div>

            <div className="topic-stats">
              {topicDetail.stats.map((stat) => {
                const Icon = statIcons[stat.type] || FileText;
                return (
                  <div className="topic-stat-card" key={stat.label}>
                    <span className="topic-stat-icon">
                      <Icon size={21} />
                    </span>
                    <div>
                      <strong>{stat.value}</strong>
                      <p>{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="topic-hero-visual" aria-hidden="true">
            <div className="visual-grid"></div>
            <span className="math-float math-one">7</span>
            <span className="math-float math-two">3</span>
            <span className="math-float math-three">1</span>
            <span className="math-float math-four">5</span>
            <span className="math-float math-five">&infin;</span>
            <div className="pyramid">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
          </div>
        </section>

        <section className="topic-tabs" aria-label="Topic sections">
          <button className="active" type="button">
            <BookOpen size={16} />
            Overview
          </button>
          <button type="button">
            <PlayCircle size={16} />
            Lectures
          </button>
          <button type="button">
            <FileText size={16} />
            PYQ Papers
          </button>
          <button type="button">
            <Bookmark size={16} />
            Study Material
          </button>
          <button type="button">
            <Target size={16} />
            Topic Tests
          </button>
          <button className="continue-btn" type="button">
            Continue Learning
            <ArrowRight size={16} />
          </button>
        </section>

        <section className="topic-main">
          <div className="topic-left">
            <article className="detail-card learning-card">
              <div className="card-header">
                <div>
                  <h2>Learning Path</h2>
                  <p>Step by step journey to master Number Theory</p>
                </div>
                <a href="#" aria-label="View full roadmap">
                  View Full Roadmap
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="path-grid">
                {learningPath.map((item) => (
                  <div className={`path-item ${statusClass(item.status)}`} key={item.step}>
                    <div className="path-step">
  {item.status === "Locked" ? <Lock size={25} /> : <Box size={29} />}
</div>
                    <h3>
                      {item.step}. {item.title}
                    </h3>
                    <p>{item.subtitle}</p>
                    <div className="path-progress">
                      <span style={{ width: `${item.progress}%` }}></span>
                    </div>
                    <span className="path-status">
                      {item.status === "Completed" && <CheckCircle2 size={14} />}
                      {item.status === "Locked" && <Lock size={13} />}
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="detail-card lectures-card">
              <div className="card-header">
                <div>
                  <h2>Lectures</h2>
                  <p>Watch, learn and strengthen your concepts</p>
                </div>
                <a href="#" aria-label="View all lectures">
                  View All Lectures
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="td-lecture-list">
  {lectures.map((lecture) => (
    <div className={`td-lecture-row ${statusClass(lecture.status)}`} key={lecture.no}>
      <button className="td-lecture-play" type="button" aria-label={`Open ${lecture.title}`}>
        {lecture.status === "Locked" ? <Lock size={15} /> : <PlayCircle size={18} />}
      </button>

      <span className="td-lecture-no">{lecture.no}</span>

      <div className="td-lecture-info">
        <h3>{lecture.title}</h3>
        <p>{lecture.time}</p>
      </div>

      <div className="td-lecture-action">
        {lecture.status === "Continue" ? (
          <>
            <button type="button">Continue</button>
            <span>{lecture.progress}</span>
          </>
        ) : (
          <span>
            {lecture.status === "Completed" && <CheckCircle2 size={16} />}
            {lecture.status === "Locked" && <Lock size={16} />}
            {lecture.status}
          </span>
        )}
      </div>

      <ChevronRight className="td-lecture-chevron" size={18} />
    </div>
  ))}
</div>

              <a className="card-bottom-link" href="#">
                View All Lectures
                <ArrowRight size={16} />
              </a>
            </article>

            <div className="resource-grid">
              <article className="detail-card resource-card">
                <div className="card-header compact">
                  <div>
                    <h2>Study Material</h2>
                    <p>High quality notes and resources</p>
                  </div>
                  <a href="#" aria-label="View all study material">
                    View All
                    <ArrowRight size={16} />
                  </a>
                </div>

                <div className="resource-list">
                  {studyMaterials.map((item) => (
                    <div className="resource-row" key={item.title}>
                      <span className={`resource-icon ${item.tone}`}>
                        <FileText size={18} />
                      </span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.meta}</p>
                      </div>
                      <button type="button">
                        <Eye size={15} />
                        View
                      </button>
                    </div>
                  ))}
                </div>

                <a className="card-bottom-link" href="#">
                  View All Study Material
                  <ArrowRight size={16} />
                </a>
              </article>

              <article className="detail-card resource-card">
                <div className="card-header compact">
                  <div>
                    <h2>PYQ Papers</h2>
                    <p>Practice and analyze real exam papers</p>
                  </div>
                  <a href="#" aria-label="View all PYQ papers">
                    View All
                    <ArrowRight size={16} />
                  </a>
                </div>

                <div className="resource-list">
                  {pyqPapers.map((item) => (
                    <div className="resource-row" key={item.title}>
                      <span className="resource-icon purple">
                        <FileText size={18} />
                      </span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.meta}</p>
                      </div>
                      <button type="button">
                        <Eye size={15} />
                        View
                      </button>
                    </div>
                  ))}
                </div>

                <a className="card-bottom-link" href="#">
                  View All PYQ Papers
                  <ArrowRight size={16} />
                </a>
              </article>
            </div>
          </div>

          <aside className="topic-right">
            <article className="detail-card progress-card">
              <h2>Your Progress</h2>
              <div className="progress-layout">
                <div className="progress-circle">
                  <strong>65%</strong>
                  <span>Completed</span>
                </div>

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
              </div>
              <p className="progress-note">Keep going! You're doing great.</p>
              <button className="outline-action" type="button">
                View Detailed Progress
                <ArrowRight size={16} />
              </button>
            </article>

            <article className="detail-card streak-card">
              <div className="streak-heading">
                <span>
                  <Flame size={24} />
                </span>
                <div>
                  <h2>12 Day Streak</h2>
                  <p>Keep it up! Solve daily to maintain your streak.</p>
                </div>
              </div>

              <div className="streak-days">
                {streakDays.map((day) => (
                  <div className={day.done ? "done" : "today"} key={day.label}>
                    <span>{day.done ? <CheckCircle2 size={18} /> : <Flame size={18} />}</span>
                    <small>{day.label}</small>
                  </div>
                ))}
              </div>
            </article>

            <article className="detail-card">
              <h2>Important Topics</h2>
              <div className="important-list">
                {importantTopics.map((topic) => (
                  <button key={topic} type="button">
                    {topic}
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </article>

            <article className="detail-card recommended-card">
              <h2>Recommended For You</h2>
              <div className="recommended-list">
                {recommendedResources.map((item) => (
                  <button key={item.title} type="button">
                    <span className={`resource-icon ${item.tone}`}>
                      <Layers size={18} />
                    </span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>
                    <ChevronRight size={17} />
                  </button>
                ))}
              </div>
            </article>

            <article className="potd-card">
              <div>
                <h2>Challenge Yourself Daily!</h2>
                <p>Solve POTD and improve your problem solving skills.</p>
                <button type="button">
                  Solve POTD Now
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="potd-visual" aria-hidden="true">
                <Sparkles size={18} />
                <span>?</span>
              </div>
            </article>
          </aside>
        </section>

        <section className="topic-bottom-cta">
          <div className="cta-visual" aria-hidden="true">
            <PlayCircle size={46} />
            <BookOpen size={64} />
          </div>
          <div>
            <h2>Master Number Theory with Consistency.</h2>
            <p>Watch lectures, revise concepts and practice PYQs to excel in Olympiads.</p>
          </div>
          <button type="button">
            Start Learning Now
            <ArrowRight size={17} />
          </button>
        </section>
      </main>
    </div>
  );
}

export default TopicDetail;
