import {
  ArrowRight,
  Clock,
  FileQuestion,
  Lock,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import api from "../../utils/api";
import "./MockTests.css";

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
const freeTestCount = tests.filter((test) => test.isProOnly === false).length;
const premiumTestCount = tests.filter((test) => test.isProOnly).length;
const supportedExamCount = new Set(
  tests.map((test) => test.exam).filter(Boolean)
).size;

const formatDuration = (duration) => {
  if (!duration) {
    return "TBA";
  }

  const value = String(duration);

  return value.toLowerCase().includes("min") ? value : `${value} min`;
};

const getAccessBadge = (test) => {
  if (!test?.isProOnly) {
    return "FREE";
  }

  const planName = normalizeText(myPlan.planName);

  if (canAccessMockTest(test, myPlan)) {
    if (planName === "pro max") {
      return "PRO MAX";
    }

    if (planName === "pro plus") {
      return "PRO PLUS";
    }

    return "STARTER";
  }

  const exam = normalizeText(test.exam);

  return exam === "sehss" || exam === "ioqm" ? "STARTER" : "PRO PLUS";
};

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
            <h1>Mock Tests &amp; Test Series</h1>
            <p>
              Practice under real exam conditions.
              <br />
              Improve speed, accuracy and confidence.
            </p>

            <div className="mocktest-hero-actions">
              <button
                type="button"
                className="mocktest-primary-btn"
                onClick={() => handleAttempt(freeMockTest)}
                disabled={!freeMockTest}
              >
                Attempt Free Test
                <ArrowRight size={17} />
              </button>
              <button
                type="button"
                className="mocktest-secondary-btn"
                onClick={() => navigate("/pro-plans")}
              >
                Explore Pro Plans
              </button>
            </div>
          </div>
        </section>

        <section className="mocktest-stats-grid" aria-label="Mock test statistics">
          <article className="mocktest-stat-card">
            <span>Available Tests</span>
            <strong>{tests.length}</strong>
          </article>
          <article className="mocktest-stat-card">
            <span>Free Tests</span>
            <strong>{freeTestCount}</strong>
          </article>
          <article className="mocktest-stat-card">
            <span>Premium Tests</span>
            <strong>{premiumTestCount}</strong>
          </article>
          <article className="mocktest-stat-card">
            <span>Supported Exams</span>
            <strong>{supportedExamCount}</strong>
          </article>
        </section>

        <section className="mocktest-series-area">
          <div className="mocktest-section-heading">
            <div>
              <span>Practice Library</span>
              <h2>Available Mock Tests</h2>
            </div>

            <p>
              {accessMessage ||
                (isProUser
                  ? "Your current plan access is active."
                  : "Test Series")}
            </p>
          </div>

          <div className="mocktest-test-grid">
            {tests.map((test) => {
              const isAccessible = canAccessMockTest(test, myPlan);
              const accessBadge = getAccessBadge(test);

              return (
                <article className="mocktest-test-card" key={test.id}>
                  <div className="mocktest-test-topline">
                    <span className={`mocktest-access-badge ${accessBadge.toLowerCase().replaceAll(" ", "-")}`}>
                      {isAccessible ? (
                        <Trophy size={13} />
                      ) : (
                        <Lock size={13} />
                      )}
                      {accessBadge}
                    </span>
                    <span className="mocktest-status-badge">
                      {test.status || "Live"}
                    </span>
                  </div>

                  <div className="mocktest-card-body">
                    <h3>{test.title}</h3>
                    <p>{test.topic || "Full Syllabus"}</p>
                  </div>

                  <div className="mocktest-test-details">
                    <div>
                      <Clock size={17} />
                      <span>Duration</span>
                      <strong>{formatDuration(test.duration)}</strong>
                    </div>
                    <div>
                      <FileQuestion size={17} />
                      <span>Questions</span>
                      <strong>{test.questions || "TBA"}</strong>
                    </div>
                    <div>
                      <Trophy size={17} />
                      <span>Marks</span>
                      <strong>{test.marks || "TBA"}</strong>
                    </div>
                  </div>

                  <div className="mocktest-card-footer">
                    <span>{test.exam || "Exam"}</span>
                    <button type="button" onClick={() => handleAttempt(test)}>
                      {isAccessible ? "Attempt Test" : "Upgrade"}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mocktest-bottom-cta">
          <h2>Need access to every mock test?</h2>
          <button type="button" onClick={() => navigate("/pro-plans")}>
            Upgrade to Pro
            <ArrowRight size={17} />
          </button>
        </section>
      </main>
    </div>
    </PageTransition>
  );
}

export default MockTests;
