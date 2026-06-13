import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Crown,
  FileText,
  Filter,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import { exams, pyqSets, topics } from "./pyqData";
import "./PYQLibrary.css";

const examAccent = {
  IOQM: "purple",
  RMO: "green",
  NMTC: "blue",
  SEHSS: "orange",
  "CBSE IX & X": "violet",
};

function PYQLibrary() {
  const [query, setQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const navigate = useNavigate();

  const filteredSets = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return pyqSets.filter((set) => {
      const matchesExam =
        selectedExam === "All Exams" || set.exam === selectedExam;
      const matchesTopic =
        selectedTopic === "All Topics" || set.topic === selectedTopic;
      const matchesSearch =
        !searchTerm ||
        `${set.exam} ${set.examName} ${set.year} ${set.topic} ${set.difficulty}`
          .toLowerCase()
          .includes(searchTerm);

      return matchesExam && matchesTopic && matchesSearch;
    });
  }, [query, selectedExam, selectedTopic]);

  const resetFilters = () => {
    setQuery("");
    setSelectedExam("All Exams");
    setSelectedTopic("All Topics");
  };

  return (
    <div className="pyq-page">
      <DashboardNavbar />

      <section className="pyq-hero">
        <div className="pyq-hero-content">
          <span className="pyq-kicker">Olympiad Practice Vault</span>
          <h1>
            PYQ <span>Library</span>
          </h1>
          <p>
            Practice previous year questions exam-wise, then sharpen your
            preparation by topic with guided solutions and focused practice.
          </p>

          <div className="pyq-search-wrap">
            <Search size={20} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for exams, years or topics..."
            />
          </div>

          <div className="pyq-hero-filters">
            <label>
              <Trophy size={18} />
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
              <Filter size={18} />
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
              Clear Filters
            </button>
          </div>
        </div>

        <div className="pyq-hero-visual" aria-hidden="true">
          <div className="pyq-open-book">
            <div className="book-page left-page"></div>
            <div className="book-page right-page"></div>
          </div>
          <div className="pyq-sheet">
            <strong>PYQ</strong>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="pyq-orb">Σ</div>
          <span className="visual-node node-one"></span>
          <span className="visual-node node-two"></span>
          <span className="visual-line"></span>
        </div>
      </section>

      <section className="pyq-content">
        <main className="pyq-main">
          <div className="pyq-section-card">
            <div className="pyq-section-header">
              <div>
                <h2>Previous Year Questions</h2>
                <p>
                  Exam-wise papers organized by the four core Olympiad topics.
                </p>
              </div>
              <span>{filteredSets.length} Sets Available</span>
            </div>

            <div className="pyq-list">
              {filteredSets.map((set) => (
                <article className="pyq-row" key={set.id}>
                  <div className={`pyq-exam-icon ${examAccent[set.exam]}`}>
                    <FileText size={24} />
                  </div>

                  <div className="pyq-row-title">
                    <h3>
                      {set.exam} {set.year}
                    </h3>
                    <p>{set.examName}</p>
                  </div>

                  <div className="pyq-meta-block">
                    <span>Topic</span>
                    <strong>{set.topic}</strong>
                  </div>

                  <div className="pyq-meta-block">
                    <span>Questions</span>
                    <strong>{set.questions}</strong>
                  </div>

                  <div className="pyq-meta-block">
                    <span>Difficulty</span>
                    <strong>{set.difficulty}</strong>
                  </div>

                  <div className="pyq-actions">
                    <button type="button">View PDF</button>
                    <button type="button" onClick={() => navigate("/pro-plans")}>View Solution</button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="pyq-info-card">
            <div className="pyq-info-icon">
              <BookOpenCheck size={28} />
            </div>
            <div>
              <h2>How to Use PYQs</h2>
              <ol>
                <li>Choose exam</li>
                <li>Select topic</li>
                <li>Attempt questions first</li>
                <li>View solutions after attempting</li>
              </ol>
            </div>
          </div>
        </main>

        <aside className="pyq-sidebar">
          <div className="pyq-side-card">
            <h3>Filter by Exam</h3>
            <div className="pyq-filter-list">
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

          <div className="pyq-side-card">
            <h3>Filter by Topic</h3>
            <div className="pyq-filter-list">
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

          <div className="pyq-pro-card">
            <div className="pyq-pro-crown">
              <Crown size={30} />
            </div>
            <span>PRO ACCESS</span>
            <h2>Go Pro</h2>
            <p>
              Unlock Test Series, detailed solutions and personal support for
              stronger PYQ practice.
            </p>
            <div className="pyq-pro-benefits">
              <small>Test Series</small>
              <small>Detailed Solutions</small>
              <small>Personal Support</small>
            </div>
            <button type="button" onClick={() => navigate("/pro-plans")}>
              Explore Pro Plans
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="pyq-support-card">
            <div>
              <Sparkles size={22} />
            </div>
            <div>
              <h3>Practice Plan</h3>
              <p>Pick one exam and complete two topic sets every week.</p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default PYQLibrary;
