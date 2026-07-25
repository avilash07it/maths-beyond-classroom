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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import api from "../../utils/api";
import "./MockTests.css";
import {
  mockTestBenefits,
  mockTestHeroBadges,
} from "./mockTestsData";

const statusIconMap = {
  LIVE: Flame,
  UPCOMING: CalendarClock,
  COMPLETED: CheckCircle2,
};

const upgradeMessage = "Upgrade your plan to access this mock test.";

const normalizeText = (value) => String(value || "").trim().toLowerCase();

const canAccessMockTest = (test, myPlan) => {
  if (!test?.isProOnly) {
    return true;
  }

  if (!myPlan.isPro) {
    return false;
  }

  const planName = normalizeText(myPlan.planName);
  const exam = normalizeText(test.exam);

  if (planName === "pro plus" || planName === "pro max") {
    return exam === "sehss" || exam === "ioqm";
  }

  if (planName === "starter pro (sehss)") {
    return exam === "sehss";
  }

  if (planName === "starter pro (ioqm)") {
    return exam === "ioqm";
  }

  return false;
};

function MockTests() {
const navigate = useNavigate();

const [tests, setTests] = useState([]);
const [myPlan, setMyPlan] = useState({
  isPro: false,
  planId: null,
  planName: "",
});
const [accessMessage, setAccessMessage] = useState("");

  

  
const fetchMockTests = async () => {
  try {
    const response = await api.get("/mock-tests/getall");

    setTests(response.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchMyPlan = async () => {
  try {
    const response = await api.get("/payments/my-plan");
    const plan = response.data?.data || response.data || {};

    setMyPlan({
      isPro: Boolean(plan.isPro),
      planId: plan.planId ?? null,
      planName: plan.planName || "",
    });
  } catch (error) {
    console.error(error);
    setMyPlan({
      isPro: false,
      planId: null,
      planName: "",
    });
  }
};

useEffect(() => {
  fetchMockTests();
  fetchMyPlan();
}, []);
const isProUser = myPlan.isPro;
const freeMockTest = tests.find(
  (test) => test.isProOnly === false
);
const proMockTests = tests.filter((test) => test.isProOnly);
const handleAttempt = async (test) => {
  if (!test) {
    return;
  }

  if (!canAccessMockTest(test, myPlan)) {
    setAccessMessage(upgradeMessage);
    alert(upgradeMessage);
    navigate("/pro-plans");
    return;
  }

  try {
    setAccessMessage("");

    const response = await api.post(`/mock-tests/start/${test.id}`);

    window.open(response.data.externalUrl, "_blank");
  } catch (error) {
    console.error(error);

    const message =
      error.response?.data?.error ||
      "Unable to launch mock test.";

    setAccessMessage(message);
    alert(message);

    if (message === upgradeMessage) {
      navigate("/pro-plans");
    }
  }
};
  return (
    <PageTransition>
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
                {freeMockTest ? (
                  <>
                    <h2>{freeMockTest.title}</h2>
                    <p>
                      Free mock test available for all students.
                    </p>
                  </>
                ) : (
                  <p>No free mock tests available yet.</p>
                )}
              </div>
            </div>
            {freeMockTest && (
              <>
                <div className="mocktest-free-meta">
                  <div>
                    <Gauge size={19} />
                    <span>Marks</span>
                    <strong>{freeMockTest.marks}</strong>
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

                <button type="button" onClick={() => handleAttempt(freeMockTest)}>
                  Attempt Now
                  <ArrowRight size={17} />
                </button>
              </>
            )}
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
              <section className="mocktest-series-area">
                <div className="mocktest-section-heading">
                  <div>
                    <span>Mock Tests</span>
                    <h2>Available Mock Tests</h2>
                  </div>

                  <p>
                    {accessMessage ||
                      (isProUser
                        ? "Pro access enabled."
                        : "Upgrade to Pro to unlock premium tests.")}
                  </p>
                </div>

                <div className="mocktest-test-grid">
                  {proMockTests.map((test) => (
                    <button
                      key={test.id}
                      className="mocktest-test-card"
                      onClick={() => handleAttempt(test)}
                    >
                      <div className="mocktest-test-topline">
                        <span className="mocktest-lock-badge">
                          <Lock size={13} />
                          PRO
                        </span>
                      </div>

                      <h4>{test.title}</h4>

                      <div className="mocktest-test-meta">
                        <span>{test.exam}</span>
                        <span>{test.topic}</span>
                        <span>{test.duration} min</span>
                      </div>

                      <div className="mocktest-card-cta">
                        {isProUser
                          ? "Attempt Test"
                          : "Unlock With Pro"}
                        <ArrowRight size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </article>
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
    </PageTransition>
  );
}

export default MockTests;
