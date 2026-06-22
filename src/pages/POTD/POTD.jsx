import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Eye,
  Flame,
  HelpCircle,
  Lightbulb,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import "./POTD.css";
import {
  potdHeroStats,
  potdStats,
  preparationTips,
} from "./potdData";
function POTD() {
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [hintData, setHintData] = useState(null);
  const [todayProblem, setTodayProblem] = useState(null);
  
const [previousPotds, setPreviousPotds] = useState([]);

 const navigate = useNavigate();
 const fetchHint = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/potd/${todayProblem.id}/hint`
    );

    setHintData(response.data.data);
    setIsHintVisible(true);

  } catch (error) {
    console.error(error);
  }
};
const fetchPOTDs = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/potd"
    );
console.log(response.data.data[0]);

    const potds = response.data.data;

   setPreviousPotds(
  publishedPotds.filter(
    (potd) => potd.id !== todayProblem?.id
  )
);

    

  } catch (error) {
    console.error(error);
  }
};
const fetchTodayPOTD = async () => {
  const response = await axios.get(
    "http://localhost:5000/api/potd/today"
  );

  setTodayProblem(response.data.data);
};
useEffect(() => {
  fetchTodayPOTD();
}, []);
  const handleSolutionClick = () => {
    navigate("/pro-plans");
  };
useEffect(() => {
  fetchPOTDs();
}, []);

if (!todayProblem) {
  return (
    <div className="potd-page">
      <DashboardNavbar />
      <main className="potd-shell">
        <h2>No POTD Published Yet</h2>
      </main>
    </div>
  );
}
  return (
    <div className="potd-page">
      <DashboardNavbar />

      <main className="potd-shell">
        <section className="potd-hero">
          <div className="potd-hero-copy">
            <span className="potd-hero-kicker">
              <Sparkles size={16} />
              Sharpen Your Mind Daily
            </span>
            <h1>
              Problem <span>of the Day</span>
            </h1>
            <p>
              Solve one carefully chosen mathematics problem every day and build
              the consistency needed for Olympiad success.
            </p>

            <div className="potd-hero-badges">
              {potdHeroStats.map((item) => (
                <div className="potd-hero-badge" key={item.label}>
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="potd-hero-visual" aria-hidden="true">
            <div className="potd-hero-orbit potd-hero-orbit-one"></div>
            <div className="potd-hero-orbit potd-hero-orbit-two"></div>
            <div className="potd-question-orb">?</div>
            <div className="potd-visual-base"></div>
            <span className="potd-symbol potd-symbol-one">π</span>
            <span className="potd-symbol potd-symbol-two">f(x)</span>
            <span className="potd-symbol potd-symbol-three">△</span>
          </div>
        </section>

        <section className="potd-content-grid">
          <div className="potd-main-column">
            <article className="potd-problem-card">
              <div className="potd-card-heading">
                <div>
                  <span className="potd-section-icon">
                    <CalendarDays size={20} />
                  </span>
                  <div>
                    <h2>Today's Problem</h2>
                    <p>{todayProblem.date}</p>
                  </div>
                </div>
                <span className="potd-difficulty">{todayProblem.difficulty}</span>
              </div>

              <div className="potd-problem-meta">
                <span>{todayProblem.topic}</span>
                <span>{todayProblem.exam}</span>
                <span>{todayProblem.difficulty}</span>
              </div>

              <div className="potd-problem-image">
  <span className="potd-paper-label">Problem Image</span>

  {todayProblem.problemImageUrl ? (
    <img
      src={todayProblem.problemImageUrl}
      alt={todayProblem.title}
      className="potd-problem-img"
    />
  ) : (
    <p>No problem image available</p>
  )}
</div>

              <div className="potd-problem-description">
                <h3>{todayProblem.title}</h3>
                <p>{todayProblem.description}</p>
              </div>

             {isHintVisible && (
  <div className="potd-hint-panel">
    <img
      src={todayProblem.hintImageUrl}
      alt="Hint"
      style={{ maxWidth: "100%" }}
    />
  </div>
)}

              <div className="potd-problem-actions">
                <button className="potd-view-problem-btn" type="button" onClick={() => navigate("/potd")}>
                  <Eye size={18} />
                  View Problem
                </button>
                <button
  className="potd-hint-btn"
  type="button"
  onClick={fetchHint}
>
  <Lightbulb size={18} />
  View Hint
</button>
                <button
                  className="potd-solution-btn"
                  type="button"
                  onClick={handleSolutionClick}
                >
                  <Lock size={17} />
                  <span>Pro</span>
                  View Solution
                </button>
              </div>
            </article>

            <article className="potd-streak-card">
              <div className="potd-streak-copy">
                <span>
                  <Flame size={28} />
                </span>
                <div>
                  <h2>12 Day Streak</h2>
                  <p>Keep it going. Return tomorrow to continue your chain.</p>
                </div>
              </div>
              <div className="potd-streak-days">
                {["17 May", "18 May", "19 May", "20 May", "21 May", "22 May", "Today"].map(
                  (day, index) => (
                    <div className={index === 6 ? "current" : ""} key={day}>
                      {index === 6 ? <Flame size={18} /> : <CheckCircle2 size={18} />}
                      <span>{day}</span>
                    </div>
                  )
                )}
              </div>
            </article>

            <article className="potd-recent-card">
              <div className="potd-card-heading compact">
                <h2>Previous POTDs</h2>
                <a href="/potd">
                  View All
                  <ArrowRight size={16} />
                </a>
              </div>
              <div className="potd-recent-list">
                {previousPotds.map((problem) => (
                  <div className="potd-recent-row" key={`${problem.date}-${problem.title}`}>
                    <span className="potd-recent-date">{problem.date}</span>
                    <div>
                      <strong>{problem.title}</strong>
                      <p>{problem.topic}</p>
                    </div>
                    {problem.solved ? (
                      <CheckCircle2 size={19} />
                    ) : (
                      <HelpCircle size={19} />
                    )}
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="potd-side-column">
            <article className="potd-side-card potd-topic-card">
              <span className="potd-side-icon">
                <Target size={21} />
              </span>
              <div>
                <h2>Today's Topic</h2>
                <strong>{todayProblem.topic}</strong>
                <p>Prime numbers, divisibility, and contradiction-based proof.</p>
              </div>
            </article>

            <article className="potd-side-card potd-stats-card">
              <h2>Your POTD Stats</h2>
              <div className="potd-stat-list">
                {potdStats.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="potd-side-card potd-tip-card">
              <h2>Daily Preparation Tip</h2>
              <ul>
                {preparationTips.map((tip) => (
                  <li key={tip}>
                    <ShieldCheck size={16} />
                    {tip}
                  </li>
                ))}
              </ul>
            </article>

            <article className="potd-side-card potd-support-card">
              <span>
                <MessageCircle size={24} />
              </span>
              <div>
                <h2>Need personal support?</h2>
                <p>Talk to a mentor for problem solving guidance.</p>
                <button type="button" onClick={() => window.open("https://wa.me/91XXXXXXXXXX", "_blank")}>
                  WhatsApp Support
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>

            <article className="potd-side-card potd-why-card">
              <h2>Why Solve POTD?</h2>
              <div className="potd-why-list">
                <div>
                  <BookOpen size={19} />
                  Build strong problem solving habits
                </div>
                <div>
                  <Star size={19} />
                  Improve logical thinking
                </div>
                <div>
                  <Trophy size={19} />
                  Stay consistent and track progress
                </div>
              </div>
            </article>
          </aside>
        </section>

        <section className="potd-bottom-cta">
          <div className="potd-trophy-visual" aria-hidden="true">
            <Trophy size={62} />
          </div>
          <div>
            <h2>Build consistency with one problem every day.</h2>
            <p>Solve daily problems and strengthen your path to Olympiad confidence.</p>
          </div>
          <button type="button" onClick={() => navigate("/potd")}>
            Continue Daily Practice
            <ArrowRight size={17} />
          </button>
        </section>
      </main>
    </div>
  );
}

export default POTD;
