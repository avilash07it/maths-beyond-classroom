import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import {
  CalendarClock,
  CheckCircle2,
  Crown,
  Edit3,
  Eraser,
  ExternalLink,
  FileQuestion,
  Gift,
  Link2,
  ListChecks,
  LockKeyhole,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

import "./ManageMockTests.css";

import {
  manageMockTestPlatforms,
  manageMockTestStatuses,

  manageMockTestsAdminNotes,
  manageMockTestsExams,
  manageMockTestsInitialForm,
  manageMockTestsTopics,
} from "./manageMockTestsData";

const manageMockTestsHeroBadges = [
  { label: "Test Series", icon: ListChecks },
  { label: "Pro Only", icon: Crown },
  { label: "External Links", icon: Link2 },
  { label: "Admin Only", icon: ShieldCheck },
];

function ManageMockTests() {
const [tests, setTests] = useState([]);
  const [form, setForm] = useState(manageMockTestsInitialForm);
  const [editingTestId, setEditingTestId] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    exam: "All Exams",
    topic: "All Topics",
    status: "All Status",
  });



  const filteredTests = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    return tests.filter((test) => {
      const searchableText =
        `${test.title} ${test.exam} ${test.topic} ${test.testType} ${test.accessType} ${test.status} ${test.platform}`.toLowerCase();
      const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
      const matchesExam = filters.exam === "All Exams" || test.exam === filters.exam;
      const matchesTopic = filters.topic === "All Topics" || test.topic === filters.topic;
      const matchesStatus = filters.status === "All Status" || test.status === filters.status;

      return matchesSearch && matchesExam && matchesTopic && matchesStatus;
    });
  }, [filters, tests]);
const summaryCards = [
  {
    label: "Total Tests",
    value: tests.length,
    note: "Mock tests created",
    icon: ListChecks,
    tone: "blue",
  },
  {
    label: "Pro Tests",
    value: tests.filter((test) => test.isProOnly).length,
    note: "Requires Pro",
    icon: Crown,
    tone: "purple",
  },
  {
    label: "Free Tests",
    value: tests.filter((test) => !test.isProOnly).length,
    note: "Available to everyone",
    icon: Gift,
    tone: "green",
  },
  {
    label: "Published",
    value: tests.filter((test) => test.status === "Published").length,
    note: "Visible to students",
    icon: CheckCircle2,
    tone: "gold",
  },
];

  const updateFormField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const updateFilter = (field, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  const clearForm = () => {
    setForm(manageMockTestsInitialForm);
    setEditingTestId(null);
  };

  const fetchMockTests = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/mock-tests/getall"
    );

    console.log(response.data);

    setTests(response.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchMockTests();
}, []);
  



const saveTest = async (event) => {
    console.log("SAVE CLICKED");

  event.preventDefault();

  const testPayload = {
    title: form.title,
    exam: form.exam,
    topic: form.topic,
    externalUrl: form.externalUrl,
    platform: form.platform,
    duration: Number(form.duration),
    questions: Number(form.questions),
    marks: Number(form.marks),
    status: form.status,
    isProOnly: form.isProOnly,
  };

  try {
    if (editingTestId) {
      await axios.put(
        `http://localhost:5000/api/mock-tests/update/${editingTestId}`,
        testPayload
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/mock-tests/create",
        testPayload
      );
    }
await fetchMockTests();
clearForm();
    
  } catch (error) {
    console.error(error);
  }
}
const deleteTest = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/mock-tests/delete/${id}`
    );

    await fetchMockTests();
  } catch (error) {
    console.error(error);
  }
};
const editTest = (test) => {
  setEditingTestId(test.id);

  setForm({
    title: test.title,
    exam: test.exam,
    topic: test.topic,
    externalUrl: test.externalUrl,
    platform: test.platform || "",
    duration: test.duration || "",
    questions: test.questions || "",
    marks: test.marks || "",
    status: test.status,
    isProOnly: test.isProOnly,
  });
};
  return (
    <main className="manage-mock-tests-page">
      <section className="manage-mock-tests-hero" aria-labelledby="manage-mock-tests-title">
        <div className="manage-mock-tests-hero-copy">
          <span className="manage-mock-tests-eyebrow">
            <ShieldCheck size={16} aria-hidden="true" />
            Admin Workspace
          </span>
          <h1 id="manage-mock-tests-title">Manage Mock Tests</h1>
          <p>Create and manage external test links.</p>
        </div>

        <div className="manage-mock-tests-hero-badges" aria-label="Mock test management capabilities">
          {manageMockTestsHeroBadges.map((badge) => {
            const BadgeIcon = badge.icon;

            return (
              <span key={badge.label}>
                <BadgeIcon size={16} aria-hidden="true" />
                {badge.label}
              </span>
            );
          })}
        </div>
      </section>

      <section className="manage-mock-tests-shell" aria-label="Manage mock tests workspace">
        <section className="manage-mock-tests-summary-grid" aria-label="Mock test summary">
          {summaryCards.map((card) => {
            const CardIcon = card.icon;

            return (
              <article
                className={`manage-mock-tests-summary-card manage-mock-tests-summary-${card.tone}`}
                key={card.label}
              >
                <div className="manage-mock-tests-summary-icon" aria-hidden="true">
                  <CardIcon size={25} />
                </div>
                <div>
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                  <p>{card.note}</p>
                </div>
              </article>
            );
          })}
        </section>

        <div className="manage-mock-tests-main-grid">
          <section className="manage-mock-tests-form-card" aria-labelledby="manage-mock-tests-form-title">
            <div className="manage-mock-tests-section-heading">
              <div>
                <span>{editingTestId ? "Update Test" : "Add Test"}</span>
                <h2 id="manage-mock-tests-form-title">
                  {editingTestId ? "Edit external test link" : "Add or update test link"}
                </h2>
              </div>
              <p>Frontend-only dummy controls for external test platforms.</p>
            </div>

            <form className="manage-mock-tests-form" onSubmit={saveTest}>
              <label className="manage-mock-tests-field manage-mock-tests-field-wide">
                <span>Test Title</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => updateFormField("title", event.target.value)}
                  placeholder="e.g. IOQM Full-Length Mock Test - 03"
                  required
                />
              </label>

              <label className="manage-mock-tests-field">
                <span>Exam</span>
                <select value={form.exam} onChange={(event) => updateFormField("exam", event.target.value)}>
                  {manageMockTestsExams.map((exam) => (
                    <option key={exam}>{exam}</option>
                  ))}
                </select>
              </label>

              <label className="manage-mock-tests-field">
                <span>Topic</span>
                <select value={form.topic} onChange={(event) => updateFormField("topic", event.target.value)}>
                  {manageMockTestsTopics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>

           

              

              <label className="manage-mock-tests-field manage-mock-tests-field-wide">
                <span>External URL</span>
                <input
                  type="url"
                  value={form.externalUrl}
                  onChange={(event) => updateFormField("externalUrl", event.target.value)}
                  placeholder="https://forms.google.com/..."
                  required
                />
              </label>

              <label className="manage-mock-tests-field">
                <span>Platform</span>
                <select value={form.platform} onChange={(event) => updateFormField("platform", event.target.value)}>
                  {manageMockTestPlatforms.map((platform) => (
                    <option key={platform}>{platform}</option>
                  ))}
                </select>
              </label>

              <label className="manage-mock-tests-field">
                <span>Duration</span>
                <input
                  type="text"
                  value={form.duration}
                  onChange={(event) => updateFormField("duration", event.target.value)}
                  placeholder="e.g. 90 min"
                  required
                />
              </label>

              <label className="manage-mock-tests-field">
                <span>Questions</span>
                <input
                  type="number"
                  min="1"
                  value={form.questions}
                  onChange={(event) => updateFormField("questions", event.target.value)}
                  placeholder="30"
                  required
                />
              </label>

              <label className="manage-mock-tests-field">
                <span>Marks</span>
                <input
                  type="number"
                  min="1"
                  value={form.marks}
                  onChange={(event) => updateFormField("marks", event.target.value)}
                  placeholder="100"
                  required
                />
              </label>

              
              <label className="manage-mock-tests-field">
                <span>Status</span>
                <select value={form.status} onChange={(event) => updateFormField("status", event.target.value)}>
                  {manageMockTestStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>

              <div className="manage-mock-tests-form-actions">
                <button className="manage-mock-tests-save-button" type="submit">
                  {editingTestId ? <Save size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                  Save Test
                </button>
                <button className="manage-mock-tests-clear-button" type="button" onClick={clearForm}>
                  <Eraser size={18} aria-hidden="true" />
                  Clear Form
                </button>
              </div>
            </form>
          </section>

          <aside className="manage-mock-tests-notes-card" aria-labelledby="manage-mock-tests-notes-title">
            <div className="manage-mock-tests-notes-icon" aria-hidden="true">
              <CheckCircle2 size={28} />
            </div>
            <span>Admin Notes</span>
            <h2 id="manage-mock-tests-notes-title">MVP reminders</h2>
            <ul>
              {manageMockTestsAdminNotes.map((note) => (
                <li key={note}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="manage-mock-tests-table-card" aria-labelledby="manage-mock-tests-table-title">
          <div className="manage-mock-tests-section-heading">
            <div>
              <span>Test Library</span>
              <h2 id="manage-mock-tests-table-title">Manage external links</h2>
            </div>
            <p>{filteredTests.length} test rows visible</p>
          </div>

          <div className="manage-mock-tests-filter-bar" aria-label="Mock test filters">
            <label className="manage-mock-tests-search-field">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={filters.search}
                onChange={(event) => updateFilter("search", event.target.value)}
                placeholder="Search test"
              />
            </label>

            <label className="manage-mock-tests-filter-field">
              <span>Exam</span>
              <select value={filters.exam} onChange={(event) => updateFilter("exam", event.target.value)}>
                <option>All Exams</option>
                {manageMockTestsExams.map((exam) => (
                  <option key={exam}>{exam}</option>
                ))}
              </select>
            </label>

            <label className="manage-mock-tests-filter-field">
              <span>Topic</span>
              <select value={filters.topic} onChange={(event) => updateFilter("topic", event.target.value)}>
                <option>All Topics</option>
                {manageMockTestsTopics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </label>

            <label className="manage-mock-tests-filter-field">
              <span>Test Type</span>
              <select
                value={filters.testType}
                onChange={(event) => updateFilter("testType", event.target.value)}
              >
                
              </select>
            </label>

            

            <label className="manage-mock-tests-filter-field">
              <span>Status</span>
              <select value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}>
                <option>All Status</option>
                {manageMockTestStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="manage-mock-tests-table-wrap">
            <div className="manage-mock-tests-table" role="table" aria-label="Mock test management table">
              <div className="manage-mock-tests-table-row manage-mock-tests-table-head" role="row">
                <span role="columnheader">Title</span>
                <span role="columnheader">Exam</span>
                <span role="columnheader">Status</span>
                <span role="columnheader">Platform</span>
                <span role="columnheader">External Link</span>
                <span role="columnheader">Actions</span>
              </div>

              {filteredTests.map((test) => (
                <div className="manage-mock-tests-table-row" role="row" key={test.id}>
                  <span role="cell" data-label="Title">
                    <strong>{test.title}</strong>
                    <small>
                      {test.topic} | {test.duration} | {test.questions} questions | {test.marks} marks
                    </small>
                  </span>
                  <span role="cell" data-label="Exam">{test.exam}</span>
                    
                  <span role="cell" data-label="Status">
                    <span className={`manage-mock-tests-pill manage-mock-tests-status-${test.status.toLowerCase()}`}>
                      {test.status}
                    </span>
                  </span>
                  <span role="cell" data-label="Platform">{test.platform}</span>
                  <span role="cell" data-label="External Link">
                    <a
                      className="manage-mock-tests-link-button"
                      href={test.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Link2 size={15} aria-hidden="true" />
                      Open
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </span>
                  <span className="manage-mock-tests-row-actions" role="cell" data-label="Actions">
                    <button type="button" onClick={() => editTest(test)}>
                      <Edit3 size={16} aria-hidden="true" />
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteTest(test.id)}>
                      <Trash2 size={16} aria-hidden="true" />
                      Delete
                    </button>
                    <a href={test.externalUrl} target="_blank" rel="noreferrer">
                      <ExternalLink size={16} aria-hidden="true" />
                      Preview Link
                    </a>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {filteredTests.length === 0 && (
            <div className="manage-mock-tests-empty-state">
              <FileQuestion size={28} aria-hidden="true" />
              <p>No mock tests match these filters.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default ManageMockTests;
