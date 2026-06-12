import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Crown,
  FileQuestion,
  Flame,
  Gauge,
  Lock,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import "./MockTests.css";
import {
  freeMockTest,
  isProUser,
  mockTestBenefits,
  mockTestHeroBadges,
  testSeries,
} from "./mockTestsData";

const statusIconMap = {
  LIVE: Flame,
  UPCOMING: CalendarClock,
  COMPLETED: CheckCircle2,
};

const testSections = [
  { key: "live", title: "Live Tests", description: "Tests currently open for attempt." },
  { key: "upcoming", title: "Upcoming Tests", description: "Plan your next practice session." },
  { key: "completed", title: "Completed Tests", description: "Review past tests and analysis." },
];

function MockTests() {
  const navigate = useNavigate();

  const openExternalTest = (url) => {
    window.location.href = url;
  };

  const handleSeriesClick = (testUrl) => {
    if (!isProUser) {
      navigate("/pro-plans");
      return;
    }

    window.location.href = testUrl;
  };

  return (
    <div className="mocktest-page">
      <DashboardNavbar />

      <main className="mocktest-shell">
        <section className="mocktest-hero">
          <div className="mocktest-hero-copy">
            <span className="mocktest-hero-kicker">
              <Trophy size={17} />
              Test Series Hub
            </span>
            <h1>
              Mock Tests <span>& Test Series</span>
            </h1>
            <p>Practice under exam conditions and track your preparation.</p>

            <div className="mocktest-hero-badges">
              {mockTestHeroBadges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>

          <div className="mocktest-hero-visual" aria-hidden="true">
            <div className="mocktest-orbit mocktest-orbit-one"></div>
            <div className="mocktest-orbit mocktest-orbit-two"></div>
            <div className="mocktest-trophy-platform"></div>
            <div className="mocktest-trophy-mark">
              <Trophy size={90} />
            </div>
            <span className="mocktest-float mocktest-float-one">30</span>
            <span className="mocktest-float mocktest-float-two">π</span>
            <span className="mocktest-float mocktest-float-three">%</span>
          </div>
        </section>

        <section className="mocktest-top-grid">
          <article className="mocktest-free-card">
            <div className="mocktest-free-content">
              <span className="mocktest-free-icon">
                <PlayCircle size={28} />
              </span>
              <div>
                <span className="mocktest-free-label">Free Access</span>
                <h2>{freeMockTest.title}</h2>
                <p>{freeMockTest.description}</p>
              </div>
            </div>

            <div className="mocktest-free-meta">
              <div>
                <Gauge size={19} />
                <span>Difficulty</span>
                <strong>{freeMockTest.difficulty}</strong>
              </div>
              <div>
                <Clock3 size={19} />
                <span>Duration</span>
                <strong>{freeMockTest.duration}</strong>
              </div>
              <div>
                <FileQuestion size={19} />
                <span>Questions</span>
                <strong>{freeMockTest.questions}</strong>
              </div>
            </div>

            <button type="button" onClick={() => openExternalTest(freeMockTest.url)}>
              Attempt Now
              <ArrowRight size={17} />
            </button>
          </article>

          <article className="mocktest-pro-banner">
            <span className="mocktest-pro-crown">
              <Crown size={34} />
            </span>
            <div>
              <span className="mocktest-pro-label">Pro Access</span>
              <h2>Unlock Full Test Series</h2>
              <p>Get structured test access with tracking and mentor support.</p>
              <div className="mocktest-pro-pills">
                <span>Topic-wise Tests</span>
                <span>Full-Length Mock Tests</span>
                <span>Performance Tracking</span>
                <span>Personal Support</span>
              </div>
              <button type="button" onClick={() => navigate("/pro-plans")}>
                View Pro Plans
                <ArrowRight size={17} />
              </button>
            </div>
          </article>
        </section>

        <section className="mocktest-series-area">
          <div className="mocktest-section-heading">
            <div>
              <span>Test Series</span>
              <h2>Live, upcoming, and completed tests</h2>
            </div>
            <p>{isProUser ? "Pro access enabled." : "Test series access requires Pro."}</p>
          </div>

          <div className="mocktest-section-stack">
            {testSections.map((section) => (
              <article className="mocktest-status-section" key={section.key}>
                <div className="mocktest-status-heading">
                  <div>
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                  </div>
                  <span>{testSeries[section.key].length} Tests</span>
                </div>

                <div className="mocktest-test-grid">
                  {testSeries[section.key].map((test) => {
                    const StatusIcon = statusIconMap[test.status] || Target;

                    return (
                      <button
                        className="mocktest-test-card"
                        type="button"
                        key={test.id}
                        onClick={() => handleSeriesClick(test.url)}
                      >
                        <div className="mocktest-test-topline">
                          <span className={`mocktest-status-badge mocktest-status-${test.status.toLowerCase()}`}>
                            <StatusIcon size={14} />
                            {test.status}
                          </span>
                          {!isProUser && (
                            <span className="mocktest-lock-badge">
                              <Lock size={13} />
                              Pro
                            </span>
                          )}
                        </div>
                        <h4>{test.name}</h4>
                        <div className="mocktest-test-meta">
                          <span>{test.exam}</span>
                          <span>{test.duration}</span>
                          <span>{test.questions}</span>
                        </div>
                        <div className="mocktest-card-cta">
                          {isProUser ? "Open Test" : "Unlock With Pro"}
                          <ArrowRight size={16} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mocktest-benefits-area">
          <div className="mocktest-section-heading compact">
            <div>
              <span>Why Practice</span>
              <h2>Why Practice With Mock Tests</h2>
            </div>
          </div>

          <div className="mocktest-benefit-grid">
            {mockTestBenefits.map((benefit, index) => {
              const icons = [ShieldCheck, Clock3, BarChart3, Sparkles];
              const Icon = icons[index] || ShieldCheck;

              return (
                <article className="mocktest-benefit-card" key={benefit.title}>
                  <span>
                    <Icon size={24} />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mocktest-bottom-cta">
          <div>
            <h2>Simulate. Analyze. Improve.</h2>
            <p>Start with the free mock test, then unlock the full test series when you are ready.</p>
          </div>
          <button type="button" onClick={() => navigate("/pro-plans")}>
            Explore Pro Test Series
            <ArrowRight size={17} />
          </button>
        </section>
      </main>
    </div>
  );
}

export default MockTests;
