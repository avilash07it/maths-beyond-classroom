import {
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  Crown,
  ExternalLink,
  Filter,
  ListVideo,
  Play,
  Radio,
  RotateCcw,
  Search,
  Trophy,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import { exams, topics } from "./lecturesData";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "./Lectures.css";

const statusIcon = {
  Live: Radio,
  Upcoming: CalendarClock,
  Recorded: Play,
};

const lectureSteps = [
  { title: "Join Live", icon: Radio },
  { title: "Watch Lecture", icon: Play },
  { title: "Revise Notes", icon: BookOpenCheck },
  { title: "Practice Assignments", icon: Trophy },
];

function Lectures() {
  const [lectures, setLectures] = useState([]);

  const [query, setQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const navigate = useNavigate();
const fetchLectures = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/lectures"
    );

    const formattedLectures = response.data.data.map((lecture) => ({
      ...lecture,

      status: lecture.isRecorded ? "Recorded" : "Live",

      duration: "-",

      chapter: "-",

      action: lecture.isRecorded ? "Watch Now" : "Join Live",
    }));

    setLectures(formattedLectures);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchLectures();
}, []);
  const filteredLectures = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return lectures.filter((lecture) => {
      const matchesExam =
        selectedExam === "All Exams" || lecture.exam === selectedExam;
      const matchesTopic =
        selectedTopic === "All Topics" || lecture.topic === selectedTopic;
      const matchesSearch =
        !searchTerm ||
        `${lecture.title} ${lecture.exam} ${lecture.topic} ${lecture.status}`
          .toLowerCase()
          .includes(searchTerm);

      return matchesExam && matchesTopic && matchesSearch;
    });
  }, [query, selectedExam, selectedTopic]);

const liveLecture =
  lectures.find((lecture) => lecture.status === "Live") ||
  lectures[0];


  const resetFilters = () => {
    setQuery("");
    setSelectedExam("All Exams");
    setSelectedTopic("All Topics");
  };
  if (lectures.length === 0) {
  return (
    <div className="lectures-page">
      <DashboardNavbar />
      <main className="lectures-shell">
        <h2>Loading lectures...</h2>
      </main>
    </div>
  );
}

  return (
    <div className="lectures-page">
      <DashboardNavbar />

      <main className="lectures-shell">
        <div className="lectures-breadcrumb">
          <span>Lectures</span>
          <span>/</span>
          <strong>All Lectures</strong>
        </div>

        <section className="lectures-hero">
          <div className="lectures-hero-content">
            <span className="lectures-kicker">YouTube Learning Series</span>
            <h1>
              All <span>Lectures</span>
            </h1>
            <p>Watch live and recorded Olympiad mathematics lectures.</p>

            <div className="lectures-hero-stats">
              <div>
                <ListVideo size={28} />
<strong>{lectures.length}</strong>
<span>Total Lectures</span>
              </div>
              <div>
                <Radio size={28} />
                <strong>Live Every Day</strong>
                <span>Join live on YouTube</span>
              </div>
            </div>
          </div>

          <div className="lectures-hero-visual" aria-hidden="true">
            <div className="video-stage">
              <div className="play-tile">
                <Play size={64} fill="currentColor" />
              </div>
            </div>
            <span className="math-symbol sigma">Σ</span>
            <span className="math-symbol pi">π</span>
            <span className="math-symbol infinity">∞</span>
            <span className="lecture-cube"></span>
            <span className="lecture-node node-a"></span>
            <span className="lecture-node node-b"></span>
          </div>
        </section>

        <section className="lecture-controls" aria-label="Lecture filters">
          <div className="lecture-search">
            <Search size={20} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search lectures, exams or topics..."
            />
          </div>

          <label>
            <Trophy size={19} />
            <select
              value={selectedExam}
              onChange={(event) => setSelectedExam(event.target.value)}
            >
              <option>All Exams</option>
              {exams.map((exam) => (
                <option key={exam}>{exam}</option>
              ))}
            </select>
          </label>

          <label>
            <Filter size={19} />
            <select
              value={selectedTopic}
              onChange={(event) => setSelectedTopic(event.target.value)}
            >
              <option>All Topics</option>
              {topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </label>

          <button type="button" onClick={resetFilters}>
            <RotateCcw size={18} />
            Clear Filters
          </button>
        </section>

        <section className="featured-live-section">
          <div className="featured-live-card">
            <div className="featured-live-icon">
              <Radio size={34} />
            </div>

            <div className="featured-live-copy">
              <span>Featured Live Class</span>
              <h2>{liveLecture.title}</h2>
              <div className="featured-live-meta">
                <strong>{liveLecture.exam}</strong>
                <strong>{liveLecture.topic}</strong>
                <strong>{liveLecture.duration}</strong>
              </div>
            </div>
<button
  type="button"
  onClick={() => window.open(liveLecture.youtubeUrl, "_blank")}
>  Join Live

            </button>
          </div>
        </section>

        <section className="lectures-content">
          <div className="lectures-main">
            <div className="lecture-list-card">
              <div className="lecture-section-header">
                <div>
                  <h2>All Lectures</h2>
                  <p>Click on a lecture to watch on YouTube.</p>
                </div>
                <span>{filteredLectures.length} Lectures</span>
              </div>

              <div className="lecture-list">
                {filteredLectures.map((lecture) => {
                  const StatusIcon = statusIcon[lecture.status];

                  return (
                    <article
                      className={`lecture-row ${lecture.status.toLowerCase()}`}
                      key={lecture.id}
                    >
                      <div className="lecture-number">
                        {String(lecture.lectureNumber).padStart(2, "0")}
                      </div>

                      <div className="lecture-status-icon">
                        <StatusIcon size={20} />
                      </div>

                      <div className="lecture-title-block">
                        <span className="lecture-status-pill">
                          {lecture.status}
                        </span>
                        <h3>{lecture.title}</h3>
                        <p>{lecture.topic}</p>
                        <small>{lecture.chapter}</small>
                        {lecture.status === "Recorded" && (
                          <div className="lecture-progress">
                            <span></span>
                          </div>
                        )}
                      </div>

                      <div className="lecture-meta">
                        <strong>{lecture.duration}</strong>
                        <span>{lecture.exam}</span>
                      </div>

                       <button
  type="button"
  className="lecture-action"
  onClick={() => window.open(lecture.youtubeUrl, "_blank")}
>
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="lectures-info-card">
              <div className="lectures-info-header">
                <div className="lectures-info-icon">
                  <BookOpenCheck size={28} />
                </div>
                <h2>How lectures work</h2>
              </div>

              <div className="lecture-step-grid">
                {lectureSteps.map((step) => {
                  const StepIcon = step.icon;

                  return (
                    <div className="lecture-step-card" key={step.title}>
                      <StepIcon size={22} />
                      <span>{step.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="lectures-sidebar">
            <div className="lecture-side-card">
              <h3>Filter by Exam</h3>
              <div className="lecture-filter-list">
                {exams.map((exam) => (
                  <button
                    type="button"
                    className={selectedExam === exam ? "active" : ""}
                    onClick={() => setSelectedExam(exam)}
                    key={exam}
                  >
                    {exam}
                  </button>
                ))}
              </div>
            </div>

            <div className="lecture-side-card">
              <h3>Filter by Topic</h3>
              <div className="lecture-filter-list">
                {topics.map((topic) => (
                  <button
                    type="button"
                    className={selectedTopic === topic ? "active" : ""}
                    onClick={() => setSelectedTopic(topic)}
                    key={topic}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="today-live-card">
              <div className="live-card-header">
                <h3>Today's Live Class</h3>
                <span>LIVE NOW</span>
              </div>
              <div className="live-card-body">
                <div className="live-orbit">
                  <Radio size={34} />
                </div>
                <div>
                  <h4>{liveLecture.title}</h4>
                  <p>{liveLecture.topic}</p>
                  <small>{liveLecture.duration}</small>
                  <em>Live class is in progress. Join before the problem set starts.</em>
                </div>
              </div>
              <button
  type="button"
  onClick={() => window.open(liveLecture.youtubeUrl, "_blank")}
>  Join Live Class

              </button>
            </div>

            <div className="lectures-pro-card">
              <div className="lectures-pro-crown">
                <Crown size={28} />
              </div>
              <span>PRO ACCESS</span>
              <h2>All-in-One Learning</h2>
              <p>
                Access Test Series, personal support, detailed solutions and
                structured lecture plans.
              </p>
              <div className="lectures-pro-benefits">
                <small>Test Series</small>
                <small>Personal Support</small>
              </div>
              <button type="button" onClick={() => navigate("/pro-plans")}>
                Explore Pro Plans
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="lecture-support-card">
              <div>
                <Video size={22} />
              </div>
              <div>
                <h3>Lecture Plan</h3>
                <p>Attend live, revise recordings, then solve assignments.</p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Lectures;
