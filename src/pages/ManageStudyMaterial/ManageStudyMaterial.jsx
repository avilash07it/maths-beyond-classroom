import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  Edit3,
  Eraser,
  FileText,
  Files,
  FolderKanban,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import "./ManageStudyMaterial.css";

import {
  manageStudyMaterialAdminNotes,
  manageStudyMaterialExams,
  manageStudyMaterialInitialForm,
  manageStudyMaterialSeedMaterials,
  manageStudyMaterialTopics,
  manageStudyMaterialTypes,
} from "./manageStudyMaterialData";

function ManageStudyMaterial() {
  const [materials, setMaterials] = useState(manageStudyMaterialSeedMaterials);
  const [form, setForm] = useState(manageStudyMaterialInitialForm);
  const [editingMaterialId, setEditingMaterialId] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    exam: "All Exams",
    topic: "All Topics",
    type: "All Types",
    status: "All Status",
  });

  const summaryCards = useMemo(
    () => [
      {
        label: "Total Materials",
        value: materials.length,
        note: "All resource PDFs",
        icon: Files,
        tone: "purple",
      },
      {
        label: "Notes",
        value: materials.filter((material) => material.type === "Study Notes").length,
        note: "Theory resources",
        icon: FileText,
        tone: "green",
      },
      {
        label: "Assignments",
        value: materials.filter((material) => material.type === "Assignments").length,
        note: "Submitted practice",
        icon: ClipboardList,
        tone: "orange",
      },
      {
        label: "Practice Sheets",
        value: materials.filter((material) => material.type === "Practice Sheets").length,
        note: "Skill drills",
        icon: BookOpenCheck,
        tone: "blue",
      },
    ],
    [materials],
  );

  const filteredMaterials = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    return materials.filter((material) => {
      const searchableText =
        `${material.title} ${material.exam} ${material.topic} ${material.type} ${material.status} ${material.pdfName}`.toLowerCase();
      const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
      const matchesExam = filters.exam === "All Exams" || material.exam === filters.exam;
      const matchesTopic = filters.topic === "All Topics" || material.topic === filters.topic;
      const matchesType = filters.type === "All Types" || material.type === filters.type;
      const matchesStatus = filters.status === "All Status" || material.status === filters.status;

      return matchesSearch && matchesExam && matchesTopic && matchesType && matchesStatus;
    });
  }, [filters, materials]);

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
    setForm(manageStudyMaterialInitialForm);
    setEditingMaterialId(null);
  };

  const saveMaterial = (event) => {
    event.preventDefault();

    const materialPayload = {
      ...form,
      title: form.title.trim(),
      pdfName: form.pdfName.trim() || "uploaded-material-placeholder.pdf",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    if (editingMaterialId) {
      setMaterials((currentMaterials) =>
        currentMaterials.map((material) =>
          material.id === editingMaterialId
            ? { ...materialPayload, id: editingMaterialId }
            : material,
        ),
      );
    } else {
      setMaterials((currentMaterials) => [
        { ...materialPayload, id: Date.now() },
        ...currentMaterials,
      ]);
    }

    clearForm();
  };

  const editMaterial = (material) => {
    setEditingMaterialId(material.id);
    setForm({
      title: material.title,
      exam: material.exam,
      topic: material.topic,
      type: material.type,
      pdfName: material.pdfName,
      status: material.status,
    });
  };

  const deleteMaterial = (materialId) => {
    setMaterials((currentMaterials) =>
      currentMaterials.filter((material) => material.id !== materialId),
    );

    if (editingMaterialId === materialId) {
      clearForm();
    }
  };

  return (
    <main className="manage-study-material-page">
      <section className="manage-study-material-hero" aria-labelledby="manage-study-material-title">
        <div className="manage-study-material-hero-copy">
          <span className="manage-study-material-eyebrow">
            <ShieldCheck size={16} aria-hidden="true" />
            Admin Workspace
          </span>
          <h1 id="manage-study-material-title">Manage Study Materials</h1>
          <p>Upload and organize academic resources.</p>
        </div>

        <div className="manage-study-material-hero-panel" aria-label="Study material structure">
          <FolderKanban size={26} aria-hidden="true" />
          <div>
            <span>Exam to Topic to Material</span>
            <p>Keep PDFs separate from lecture links for a cleaner student library.</p>
          </div>
        </div>
      </section>

      <section className="manage-study-material-shell" aria-label="Study material admin workspace">
        <section className="manage-study-material-summary-grid" aria-label="Study material summary">
          {summaryCards.map((card) => {
            const CardIcon = card.icon;

            return (
              <article
                className={`manage-study-material-summary-card manage-study-material-summary-${card.tone}`}
                key={card.label}
              >
                <div className="manage-study-material-summary-icon" aria-hidden="true">
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

        <div className="manage-study-material-main-grid">
          <section className="manage-study-material-form-card" aria-labelledby="manage-study-material-form-title">
            <div className="manage-study-material-section-heading">
              <div>
                <span>{editingMaterialId ? "Update Material" : "Material Upload"}</span>
                <h2 id="manage-study-material-form-title">
                  {editingMaterialId ? "Edit resource details" : "Add study material"}
                </h2>
              </div>
              <p>Frontend-only controls ready for backend wiring later.</p>
            </div>

            <form className="manage-study-material-form" onSubmit={saveMaterial}>
              <label className="manage-study-material-field manage-study-material-field-wide">
                <span>Material Title</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => updateFormField("title", event.target.value)}
                  placeholder="e.g. Geometry Practice Sheet 1"
                  required
                />
              </label>

              <label className="manage-study-material-field">
                <span>Exam</span>
                <select
                  value={form.exam}
                  onChange={(event) => updateFormField("exam", event.target.value)}
                >
                  {manageStudyMaterialExams.map((exam) => (
                    <option key={exam}>{exam}</option>
                  ))}
                </select>
              </label>

              <label className="manage-study-material-field">
                <span>Topic</span>
                <select
                  value={form.topic}
                  onChange={(event) => updateFormField("topic", event.target.value)}
                >
                  {manageStudyMaterialTopics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>

              <label className="manage-study-material-field">
                <span>Material Type</span>
                <select
                  value={form.type}
                  onChange={(event) => updateFormField("type", event.target.value)}
                >
                  {manageStudyMaterialTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>

              <label className="manage-study-material-field">
                <span>Publish Status</span>
                <select
                  value={form.status}
                  onChange={(event) => updateFormField("status", event.target.value)}
                >
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </label>

              <label className="manage-study-material-field manage-study-material-field-wide">
                <span>PDF Name Placeholder</span>
                <input
                  type="text"
                  value={form.pdfName}
                  onChange={(event) => updateFormField("pdfName", event.target.value)}
                  placeholder="e.g. geometry-practice-sheet-1.pdf"
                />
              </label>

              <div className="manage-study-material-form-actions">
                <button className="manage-study-material-save-button" type="submit">
                  {editingMaterialId ? <Save size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                  Save Material
                </button>
                <button className="manage-study-material-clear-button" type="button" onClick={clearForm}>
                  <Eraser size={18} aria-hidden="true" />
                  Clear Form
                </button>
              </div>
            </form>
          </section>

          <aside className="manage-study-material-notes-card" aria-labelledby="manage-study-material-notes-title">
            <div className="manage-study-material-notes-icon" aria-hidden="true">
              <CheckCircle2 size={28} />
            </div>
            <span>Admin Notes</span>
            <h2 id="manage-study-material-notes-title">Publishing reminders</h2>
            <ul>
              {manageStudyMaterialAdminNotes.map((note) => (
                <li key={note}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="manage-study-material-table-card" aria-labelledby="manage-study-material-table-title">
          <div className="manage-study-material-section-heading">
            <div>
              <span>Material Library</span>
              <h2 id="manage-study-material-table-title">Manage resource PDFs</h2>
            </div>
            <p>{filteredMaterials.length} material rows visible</p>
          </div>

          <div className="manage-study-material-filter-bar" aria-label="Study material filters">
            <label className="manage-study-material-search-field">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={filters.search}
                onChange={(event) => updateFilter("search", event.target.value)}
                placeholder="Search materials"
              />
            </label>

            <label className="manage-study-material-filter-field">
              <span>Exam</span>
              <select value={filters.exam} onChange={(event) => updateFilter("exam", event.target.value)}>
                <option>All Exams</option>
                {manageStudyMaterialExams.map((exam) => (
                  <option key={exam}>{exam}</option>
                ))}
              </select>
            </label>

            <label className="manage-study-material-filter-field">
              <span>Topic</span>
              <select value={filters.topic} onChange={(event) => updateFilter("topic", event.target.value)}>
                <option>All Topics</option>
                {manageStudyMaterialTopics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </label>

            <label className="manage-study-material-filter-field">
              <span>Material Type</span>
              <select value={filters.type} onChange={(event) => updateFilter("type", event.target.value)}>
                <option>All Types</option>
                {manageStudyMaterialTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>

            <label className="manage-study-material-filter-field">
              <span>Status</span>
              <select value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}>
                <option>All Status</option>
                <option>Draft</option>
                <option>Published</option>
              </select>
            </label>
          </div>

          <div className="manage-study-material-table-wrap">
            <div className="manage-study-material-table" role="table" aria-label="Study material management table">
              <div className="manage-study-material-table-row manage-study-material-table-head" role="row">
                <span role="columnheader">Title</span>
                <span role="columnheader">Exam</span>
                <span role="columnheader">Topic</span>
                <span role="columnheader">Type</span>
                <span role="columnheader">Status</span>
                <span role="columnheader">Date</span>
                <span role="columnheader">Actions</span>
              </div>

              {filteredMaterials.map((material) => (
                <div className="manage-study-material-table-row" role="row" key={material.id}>
                  <span role="cell" data-label="Title">
                    <strong>{material.title}</strong>
                    <small>{material.pdfName}</small>
                  </span>
                  <span role="cell" data-label="Exam">{material.exam}</span>
                  <span role="cell" data-label="Topic">{material.topic}</span>
                  <span role="cell" data-label="Type">
                    <span className="manage-study-material-pill manage-study-material-type-pill">
                      {material.type}
                    </span>
                  </span>
                  <span role="cell" data-label="Status">
                    <span className={`manage-study-material-pill manage-study-material-status-${material.status.toLowerCase()}`}>
                      {material.status}
                    </span>
                  </span>
                  <span role="cell" data-label="Date">{material.date}</span>
                  <span className="manage-study-material-row-actions" role="cell" data-label="Actions">
                    <button type="button" onClick={() => editMaterial(material)}>
                      <Edit3 size={16} aria-hidden="true" />
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteMaterial(material.id)}>
                      <Trash2 size={16} aria-hidden="true" />
                      Delete
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {filteredMaterials.length === 0 && (
            <div className="manage-study-material-empty-state">
              <Files size={28} aria-hidden="true" />
              <p>No study materials match these filters.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default ManageStudyMaterial;
