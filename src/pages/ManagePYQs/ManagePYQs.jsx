import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Archive,
  CheckCircle2,
  Edit3,
  Eraser,
  FileQuestion,
  Files,
  FolderKanban,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import "./ManagePYQs.css";

import {
  managePYQsAdminNotes,
  managePYQsExams,
  managePYQsInitialForm,
  managePYQsTopics,
  managePYQsYears,
} from "./managePYQsData";

function ManagePYQs() {
const [pyqs, setPyqs] = useState([]);
  const [form, setForm] = useState(managePYQsInitialForm);
  const [editingPYQId, setEditingPYQId] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    exam: "All Exams",
    topic: "All Topics",
    year: "All Years",
    status: "All Status",
  });
const fetchPYQs = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/pyqs"
    );

    setPyqs(response.data.data);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};
useEffect(() => {
  fetchPYQs();
}, []);
  const summaryCards = useMemo(
    () => [
      {
        label: "Total PYQ Sets",
        value: pyqs.length,
        note: "Previous papers",
        icon: Files,
        tone: "purple",
      },
      {
        label: "IOQM",
        value: pyqs.filter((pyq) => pyq.exam === "IOQM").length,
        note: "Qualifier papers",
        icon: FileQuestion,
        tone: "green",
      },
      {
        label: "RMO",
        value: pyqs.filter((pyq) => pyq.exam === "RMO").length,
        note: "Regional sets",
        icon: Archive,
        tone: "orange",
      },
      {
        label: "SEHSS",
        value: pyqs.filter((pyq) => pyq.exam === "SEHSS").length,
        note: "Institution papers",
        icon: FolderKanban,
        tone: "blue",
      },
    ],
    [pyqs],
  );

  const filteredPYQs = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    return pyqs.filter((pyq) => {
      const searchableText =
        `${pyq.title} ${pyq.exam} ${pyq.topic} ${pyq.year} ${pyq.status} ${pyq.pdfUrl}`.toLowerCase();
      const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
      const matchesExam = filters.exam === "All Exams" || pyq.exam === filters.exam;
      const matchesTopic = filters.topic === "All Topics" || pyq.topic === filters.topic;
const matchesYear =
  filters.year === "All Years" ||
  String(pyq.year) === filters.year;      const matchesStatus = filters.status === "All Status" || pyq.status === filters.status;

      return matchesSearch && matchesExam && matchesTopic && matchesYear && matchesStatus;
    });
  }, [filters, pyqs]);

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
    setForm(managePYQsInitialForm);
    setEditingPYQId(null);
  };

  const savePYQ = async (event) => {
    event.preventDefault();

    const pyqPayload = {
      ...form,
      title: form.title.trim(),
      pdfUrl: form.pdfUrl.trim() || "pyq-paper-placeholder.pdf",
       year: Number(form.year),
      status: form.status,
    };
try {
  if (editingPYQId) {
    await axios.put(
      `http://localhost:5000/api/pyqs/${editingPYQId}`,
      pyqPayload
    );
  } else {
    await axios.post(
      "http://localhost:5000/api/pyqs",
      pyqPayload
    );
  }

  await fetchPYQs();
  clearForm();

} catch (error) {
  console.error(error);
}
  
  };

  const editPYQ = (pyq) => {
    console.log("EDIT CLICKED");
  console.log(pyq);
   console.log("FORM SET", {
    title: pyq.title,
    exam: pyq.exam,
    topic: pyq.topic,
    year: pyq.year,
    pdfUrl: pyq.pdfUrl,
    status: pyq.status,
  });

    setEditingPYQId(pyq.id);
    setForm(
     {
      title: pyq.title,
      exam: pyq.exam,
      topic: pyq.topic,
      year: String(pyq.year),
      pdfUrl: pyq.pdfUrl,
      status: pyq.status,
    });
  };

 const deletePYQ = async (pyqId) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/pyqs/${pyqId}`
    );

    await fetchPYQs();

    if (editingPYQId === pyqId) {
      clearForm();
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <main className="manage-pyqs-page">
      <section className="manage-pyqs-hero" aria-labelledby="manage-pyqs-title">
        <div className="manage-pyqs-hero-copy">
          <span className="manage-pyqs-eyebrow">
            <ShieldCheck size={16} aria-hidden="true" />
            Admin Workspace
          </span>
          <h1 id="manage-pyqs-title">Manage PYQs</h1>
          <p>Upload and organize previous year question papers.</p>
        </div>

        <div className="manage-pyqs-hero-panel" aria-label="PYQ structure">
          <FileQuestion size={26} aria-hidden="true" />
          <div>
            <span>Exam to Topic to PYQ PDF</span>
            <p>Maintain clear paper sets for focused student practice.</p>
          </div>
        </div>
      </section>

      <section className="manage-pyqs-shell" aria-label="PYQ admin workspace">
        <section className="manage-pyqs-summary-grid" aria-label="PYQ summary">
          {summaryCards.map((card) => {
            const CardIcon = card.icon;

            return (
              <article className={`manage-pyqs-summary-card manage-pyqs-summary-${card.tone}`} key={card.label}>
                <div className="manage-pyqs-summary-icon" aria-hidden="true">
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

        <div className="manage-pyqs-main-grid">
          <section className="manage-pyqs-form-card" aria-labelledby="manage-pyqs-form-title">
            <div className="manage-pyqs-section-heading">
              <div>
                <span>{editingPYQId ? "Update PYQ" : "PYQ Upload"}</span>
                <h2 id="manage-pyqs-form-title">
                  {editingPYQId ? "Edit PYQ details" : "Add PYQ resource"}
                </h2>
              </div>
              <p>Frontend-only controls for future backend connection.</p>
            </div>

            <form className="manage-pyqs-form" onSubmit={savePYQ}>
              <label className="manage-pyqs-field manage-pyqs-field-wide">
                <span>PYQ Title</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => updateFormField("title", event.target.value)}
                  placeholder="e.g. IOQM 2024 Number Theory Set"
                  required
                />
              </label>

              <label className="manage-pyqs-field">
                <span>Exam</span>
                <select value={form.exam} onChange={(event) => updateFormField("exam", event.target.value)}>
                  {managePYQsExams.map((exam) => (
                    <option key={exam}>{exam}</option>
                  ))}
                </select>
              </label>

              <label className="manage-pyqs-field">
                <span>Topic</span>
                <select value={form.topic} onChange={(event) => updateFormField("topic", event.target.value)}>
                  {managePYQsTopics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>

              <label className="manage-pyqs-field">
                <span>Year</span>
                <select value={form.year} onChange={(event) => updateFormField("year", event.target.value)}>
                  {managePYQsYears.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </label>

              <label className="manage-pyqs-field">
                <span>Publish Status</span>
                <select value={form.status} onChange={(event) => updateFormField("status", event.target.value)}>
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </label>

              <label className="manage-pyqs-field manage-pyqs-field-wide">
                <span>PDF URL</span>
                <input
                  type="text"
                  value={form.pdfUrl}
                  onChange={(event) => updateFormField("pdfUrl", event.target.value)}
                  placeholder="e.g. https://example.com/ioqm-2024-number-theory.pdf"
                />
              </label>

              <div className="manage-pyqs-form-actions">
                <button className="manage-pyqs-save-button" type="submit">
                  {editingPYQId ? <Save size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                  Save PYQ
                </button>
                <button className="manage-pyqs-clear-button" type="button" onClick={clearForm}>
                  <Eraser size={18} aria-hidden="true" />
                  Clear Form
                </button>
              </div>
            </form>
          </section>

          <aside className="manage-pyqs-notes-card" aria-labelledby="manage-pyqs-notes-title">
            <div className="manage-pyqs-notes-icon" aria-hidden="true">
              <CheckCircle2 size={28} />
            </div>
            <span>Admin Notes</span>
            <h2 id="manage-pyqs-notes-title">Publishing reminders</h2>
            <ul>
              {managePYQsAdminNotes.map((note) => (
                <li key={note}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="manage-pyqs-table-card" aria-labelledby="manage-pyqs-table-title">
          <div className="manage-pyqs-section-heading">
            <div>
              <span>PYQ Library</span>
              <h2 id="manage-pyqs-table-title">Manage previous papers</h2>
            </div>
            <p>{filteredPYQs.length} PYQ rows visible</p>
          </div>

          <div className="manage-pyqs-filter-bar" aria-label="PYQ filters">
            <label className="manage-pyqs-search-field">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={filters.search}
                onChange={(event) => updateFilter("search", event.target.value)}
                placeholder="Search PYQs"
              />
            </label>

            <label className="manage-pyqs-filter-field">
              <span>Exam</span>
              <select value={filters.exam} onChange={(event) => updateFilter("exam", event.target.value)}>
                <option>All Exams</option>
                {managePYQsExams.map((exam) => (
                  <option key={exam}>{exam}</option>
                ))}
              </select>
            </label>

            <label className="manage-pyqs-filter-field">
              <span>Topic</span>
              <select value={filters.topic} onChange={(event) => updateFilter("topic", event.target.value)}>
                <option>All Topics</option>
                {managePYQsTopics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </label>

            <label className="manage-pyqs-filter-field">
              <span>Year</span>
              <select value={filters.year} onChange={(event) => updateFilter("year", event.target.value)}>
                <option>All Years</option>
                {managePYQsYears.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </label>

            <label className="manage-pyqs-filter-field">
              <span>Status</span>
              <select value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}>
                <option>All Status</option>
                <option>Draft</option>
                <option>Published</option>
              </select>
            </label>
          </div>

          <div className="manage-pyqs-table-wrap">
            <div className="manage-pyqs-table" role="table" aria-label="PYQ management table">
              <div className="manage-pyqs-table-row manage-pyqs-table-head" role="row">
                <span role="columnheader">Title</span>
                <span role="columnheader">Exam</span>
                <span role="columnheader">Topic</span>
                <span role="columnheader">Year</span>
                <span role="columnheader">Status</span>
                <span role="columnheader">Actions</span>
              </div>

              {filteredPYQs.map((pyq) => (
                <div className="manage-pyqs-table-row" role="row" key={pyq.id}>
                  <span role="cell" data-label="Title">
                    <strong>{pyq.title}</strong>
                    <small>{pyq.pdfUrl}</small>
                  </span>
                  <span role="cell" data-label="Exam">{pyq.exam}</span>
                  <span role="cell" data-label="Topic">{pyq.topic}</span>
                  <span role="cell" data-label="Year">{pyq.year}</span>
                  <span role="cell" data-label="Status">
                    <span className={`manage-pyqs-pill manage-pyqs-status-${pyq.status.toLowerCase()}`}>
                      {pyq.status}
                    </span>
                  </span>
                  <span className="manage-pyqs-row-actions" role="cell" data-label="Actions">
                    <button type="button" onClick={() => editPYQ(pyq)}>
                      <Edit3 size={16} aria-hidden="true" />
                      Edit
                    </button>
                    <button type="button" onClick={() => deletePYQ(pyq.id)}>
                      <Trash2 size={16} aria-hidden="true" />
                      Delete
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {filteredPYQs.length === 0 && (
            <div className="manage-pyqs-empty-state">
              <FileQuestion size={28} aria-hidden="true" />
              <p>No PYQs match these filters.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default ManagePYQs;
