import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Crown,
  FileText,
  Filter,
  FolderOpen,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import {
  exams,
  materialTypes,
  studyMaterials,
  topics,
} from "./studyMaterialData";
import "./StudyMaterial.css";

const typeMeta = {
  Notes: {
    className: "notes",
    Icon: FileText,
  },
  Assignment: {
    className: "assignment",
    Icon: ShieldCheck,
  },
  "Practice Sheet": {
    className: "practice",
    Icon: BookOpenCheck,
  },
  "Other Material": {
    className: "other",
    Icon: FolderOpen,
  },
};

function StudyMaterial() {
  const [query, setQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState("All Exams");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedType, setSelectedType] = useState("All Types");

  const filteredMaterials = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return studyMaterials.filter((material) => {
      const matchesExam =
        selectedExam === "All Exams" || material.exam === selectedExam;
      const matchesTopic =
        selectedTopic === "All Topics" || material.topic === selectedTopic;
      const matchesType =
        selectedType === "All Types" || material.type === selectedType;
      const matchesSearch =
        !searchTerm ||
        `${material.title} ${material.exam} ${material.topic} ${material.type} ${material.description}`
          .toLowerCase()
          .includes(searchTerm);

      return matchesExam && matchesTopic && matchesType && matchesSearch;
    });
  }, [query, selectedExam, selectedTopic, selectedType]);

  const resetFilters = () => {
    setQuery("");
    setSelectedExam("All Exams");
    setSelectedTopic("All Topics");
    setSelectedType("All Types");
  };

  return (
    <div className="study-material-page">
      <DashboardNavbar />

      <main className="study-material-shell">
        <div className="study-material-breadcrumb">
          <span>Study Material</span>
          <span>/</span>
          <strong>All Study Material</strong>
        </div>

        <section className="study-material-hero">
          <div className="study-hero-content">
            <span className="study-kicker">Structured Resource Library</span>
            <h1>
              Study <span>Material</span>
            </h1>
            <p>
              Access structured notes, assignments, practice sheets, and
              exam-wise resources for Olympiad and school mathematics.
            </p>

            <div className="study-stat-chips">
              <span>Study Notes</span>
              <span>Practice Sheets</span>
              <span>Assignments</span>
              <span>PYQ Support</span>
            </div>
          </div>

          <div className="study-hero-visual" aria-hidden="true">
            <div className="material-flow-card">
              <span>Exam</span>
              <strong>IOQM</strong>
              <span>Topic</span>
              <strong>Geometry</strong>
              <span>Material</span>
              <strong>Practice Sheet 1</strong>
            </div>
            <span className="study-orbit orbit-one"></span>
            <span className="study-orbit orbit-two"></span>
            <span className="study-node node-one"></span>
            <span className="study-node node-two"></span>
            <span className="study-shape shape-square"></span>
            <span className="study-shape shape-triangle"></span>
          </div>
        </section>

        <section className="study-controls" aria-label="Study material filters">
          <div className="study-search">
            <Search size={20} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search study material by title, topic or keyword..."
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

          <label>
            <Layers size={19} />
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
            >
              <option>All Types</option>
              {materialTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>

          <button type="button" onClick={resetFilters}>
            Clear Filters
          </button>
        </section>

        <section className="study-material-content">
          <div className="study-material-main">
            <div className="materials-panel">
              <div className="materials-header">
                <div>
                  <h2>All Study Material</h2>
                  <p>Browse exam-wise resources by topic and material type.</p>
                </div>
                <span>{filteredMaterials.length} Materials</span>
              </div>

              {filteredMaterials.length > 0 ? (
                <div className="materials-grid">
                  {filteredMaterials.map((material) => {
                    const meta = typeMeta[material.type];
                    const MaterialIcon = meta.Icon;

                    return (
                      <article
                        className={`material-card ${meta.className}`}
                        key={material.id}
                      >
                        <div className="material-card-top">
                          <div className="material-icon">
                            <MaterialIcon size={28} />
                          </div>
                          <span>{material.type}</span>
                        </div>

                        <h3>{material.title}</h3>
                        <div className="material-tags">
                          <strong>{material.exam}</strong>
                          <strong>{material.topic}</strong>
                        </div>
                        <p>{material.description}</p>

                        <div className="material-meta-row">
                          <span>{material.label}</span>
                          <span>Updated {material.updated}</span>
                        </div>

                        <button type="button">
                          View Material
                          <ArrowRight size={16} />
                        </button>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="materials-empty-state">
                  <FileText size={34} />
                  <h3>No materials found</h3>
                  <p>Try changing the exam, topic, or material type.</p>
                </div>
              )}
            </div>
          </div>

          <aside className="study-material-sidebar">
            <div className="study-side-card">
              <h3>How materials are organized</h3>
              <div className="organization-steps">
                <div>
                  <span>1</span>
                  <p>Choose exam</p>
                </div>
                <div>
                  <span>2</span>
                  <p>Select topic or chapter</p>
                </div>
                <div>
                  <span>3</span>
                  <p>Open the material</p>
                </div>
              </div>
            </div>

            <div className="study-pro-card">
              <div className="study-pro-crown">
                <Crown size={30} />
              </div>
              <span>PERSONAL SUPPORT</span>
              <h2>Need personal support?</h2>
              <p>
                Get help choosing the right notes, assignments, and practice
                sheets for your preparation stage.
              </p>
              <button type="button">
                Explore Support
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="study-reminder-card">
              <Sparkles size={22} />
              <div>
                <h3>Note</h3>
                <p>Study Material PDFs are view-only</p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default StudyMaterial;
