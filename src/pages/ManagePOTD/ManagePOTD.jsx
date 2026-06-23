import { useMemo, useRef, useState, useEffect} from "react";
import axios from "axios";
import {
  Archive,
  CalendarDays,
  CheckCircle2,
  Edit3,
  Eraser,
  FileImage,
  Flame,
  ImagePlus,
  Lightbulb,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
} from "lucide-react";

import "./ManagePOTD.css";

import {
  managePOTDAdminNotes,
  managePOTDDifficulties,
  managePOTDExams,
  managePOTDInitialForm,
  managePOTDStatuses,
  managePOTDTopics,
} from "./managePOTDData";

const formatDisplayDate = (date) => {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

function ManagePOTD() {
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState(managePOTDInitialForm);
  const [editingProblemId, setEditingProblemId] = useState(null);
  const fileInputRefs = {
    problemImage: useRef(null),
    hintImage: useRef(null),
    solutionImage: useRef(null),
  };
const fetchPOTDs = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/potd"
    );

    setProblems(response.data.data);

  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchPOTDs();
}, []);
  const summaryCards = useMemo(() => {
   
const currentProblem = problems
  .filter((problem) => problem.status === "Published")
  .sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  )[0];
    return [
      {
        label: "Current POTD",
value: currentProblem
  ? formatDisplayDate(currentProblem.createdAt)
  : "None",
          note: currentProblem ? currentProblem.title : "No published problem",
        icon: Flame,
        tone: "orange",
      },
      {
        label: "Published Problems",
        value: problems.filter((problem) => problem.status === "Published").length,
        note: "Visible to students",
        icon: CheckCircle2,
        tone: "green",
      },
      {
        label: "Draft Problems",
        value: problems.filter((problem) => problem.status === "Draft").length,
        note: "Waiting for review",
        icon: Edit3,
        tone: "purple",
      },
      {
        label: "Archived Problems",
        value: problems.filter((problem) => problem.status === "Archived").length,
        note: "Hidden from students",
        icon: Archive,
        tone: "blue",
      },
    ];
  }, [problems]);

  const updateFormField = (field, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const updateImageField = (field, fileList) => {
  const file = fileList?.[0];

  if (!file) return;

  updateFormField(
    field,
    URL.createObjectURL(file)
  );
};
{form.problemImage && (
  <img
    src={form.problemImage}
    alt="Preview"
    style={{ width: "200px" }}
  />
)}
  const clearForm = () => {
    setForm(managePOTDInitialForm);
    setEditingProblemId(null);
  };

  const saveProblem = async (event, statusOverride) => {
  event.preventDefault();

  const problemPayload = {
    title: form.title,
    problemImageUrl: form.problemImage,
    hintImageUrl: form.hintImage,
    solutionImageUrl: form.solutionImage,
    exam: form.exam,
    topic: form.topic,
    status: statusOverride || form.status,
  };

  try {

    if (editingProblemId) {

      await axios.put(
        `http://localhost:5000/api/potd/${editingProblemId}`,
        problemPayload
      );

    } else {

      await axios.post(
        "http://localhost:5000/api/potd",
        problemPayload
      );

    }

    await fetchPOTDs();
    clearForm();

  } catch (error) {
    console.error(error);
  }


    

    clearForm();
  };

  const editProblem = (problem) => {
  setEditingProblemId(problem.id);

  setForm({
    title: problem.title,
    exam: problem.exam,
    topic: problem.topic,
    difficulty: problem.difficulty || "Medium",
date: problem.createdAt || "",
    problemImage: problem.problemImageUrl || "",
    hintImage: problem.hintImageUrl || "",
    solutionImage: problem.solutionImageUrl || "",
    status: problem.status,
  });
};

  const deleteProblem = async (problemId) => {
  try {

    await axios.delete(
      `http://localhost:5000/api/potd/${problemId}`
    );

   await fetchPOTDs();

  } catch (error) {
    console.error(error);
  }
};


  const archiveProblem = (problemId) => {
    setProblems((currentProblems) =>
      currentProblems.map((problem) =>
        problem.id === problemId ? { ...problem, status: "Archived" } : problem,
      ),
    );

    if (editingProblemId === problemId) {
      updateFormField("status", "Archived");
    }
  };

  const renderUploadField = (field, label, helper, required) => (
    <div className="manage-potd-upload-field">
      <input
        ref={fileInputRefs[field]}
        type="file"
        accept="image/*"
        onChange={(event) => updateImageField(field, event.target.files)}
        aria-label={label}
      />
      <button type="button" onClick={() => fileInputRefs[field].current?.click()}>
        <UploadCloud size={20} aria-hidden="true" />
        <span>{label}</span>
        <small>{form[field] || helper}</small>
      </button>
      {required && <span className="manage-potd-required-pill">Required</span>}
    </div>
  );

  const previewItems = [
    {
      label: "Problem Image",
      value: form.problemImage,
      helper: "Problem statement image preview",
      icon: FileImage,
    },
    {
      label: "Hint Image",
      value: form.hintImage,
      helper: "Optional hint image preview",
      icon: Lightbulb,
    },
    {
      label: "Solution Image",
      value: form.solutionImage,
      helper: "Solution image preview",
      icon: CheckCircle2,
    },
  ];

  return (
    <main className="manage-potd-page">
      <section className="manage-potd-hero" aria-labelledby="manage-potd-title">
        <div className="manage-potd-hero-copy">
          <span className="manage-potd-eyebrow">
            <ShieldCheck size={16} aria-hidden="true" />
            Admin Only
          </span>
          <h1 id="manage-potd-title">Manage POTD</h1>
          <p>Upload and manage daily Olympiad-style problems.</p>
          <div className="manage-potd-badge-row" aria-label="POTD capabilities">
            <span>Daily Problem</span>
            <span>Image Upload</span>
            <span>Hint &amp; Solution</span>
            <span>Admin Only</span>
          </div>
        </div>

        <aside className="manage-potd-hero-panel" aria-label="POTD publishing status">
          <div className="manage-potd-hero-panel-icon" aria-hidden="true">
            <Sparkles size={28} />
          </div>
          <div>
            <span>Daily challenge desk</span>
            <p>Prepare the problem, optional hint, and reviewed solution before publishing.</p>
          </div>
        </aside>
      </section>

      <section className="manage-potd-shell" aria-label="Manage POTD workspace">
        <section className="manage-potd-summary-grid" aria-label="POTD summary">
          {summaryCards.map((card) => {
            const CardIcon = card.icon;

            return (
              <article className={`manage-potd-summary-card manage-potd-summary-${card.tone}`} key={card.label}>
                <div className="manage-potd-summary-icon" aria-hidden="true">
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

        <div className="manage-potd-editor-grid">
          <section className="manage-potd-form-card" aria-labelledby="manage-potd-form-title">
            <div className="manage-potd-section-heading">
              <div>
                <span>{editingProblemId ? "Update POTD" : "Add POTD"}</span>
                <h2 id="manage-potd-form-title">
                  {editingProblemId ? "Edit daily problem" : "Create daily problem"}
                </h2>
              </div>
            </div>

            <form className="manage-potd-form" onSubmit={(event) => saveProblem(event)}>
              <label className="manage-potd-field manage-potd-field-wide">
                <span>Problem Title</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => updateFormField("title", event.target.value)}
                  placeholder="e.g. Divisibility and Prime Numbers"
                  required
                />
              </label>

              <label className="manage-potd-field">
                <span>Exam Category</span>
                <select value={form.exam} onChange={(event) => updateFormField("exam", event.target.value)}>
                  {managePOTDExams.map((exam) => (
                    <option key={exam}>{exam}</option>
                  ))}
                </select>
              </label>

              <label className="manage-potd-field">
                <span>Topic</span>
                <select value={form.topic} onChange={(event) => updateFormField("topic", event.target.value)}>
                  {managePOTDTopics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>

              <label className="manage-potd-field">
                <span>Difficulty</span>
                <select
                  value={form.difficulty}
                  onChange={(event) => updateFormField("difficulty", event.target.value)}
                >
                  {managePOTDDifficulties.map((difficulty) => (
                    <option key={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </label>

              <label className="manage-potd-field">
                <span>Date</span>
                <input
                  type="date"
                  onChange={(event) => updateFormField("date", event.target.value)}
                  required
                />
              </label>

              <label className="manage-potd-field">
                <span>Status</span>
                <select value={form.status} onChange={(event) => updateFormField("status", event.target.value)}>
                  {managePOTDStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>

              <div className="manage-potd-upload-grid">
                {renderUploadField("problemImage", "Problem Image", "Choose problem image", true)}
                {renderUploadField("hintImage", "Hint Image", "Choose optional hint", false)}
                {renderUploadField("solutionImage", "Solution Image", "Choose solution image", true)}
              </div>

              <div className="manage-potd-form-actions">
                <button
                  className="manage-potd-publish-button"
                  type="button"
                  onClick={(event) => saveProblem(event, "Published")}
                >
                  <ImagePlus size={18} aria-hidden="true" />
                  Publish POTD
                </button>
                <button
                  className="manage-potd-draft-button"
                  type="button"
                  onClick={(event) => saveProblem(event, "Draft")}
                >
                  <Save size={18} aria-hidden="true" />
                  Save as Draft
                </button>
                <button className="manage-potd-clear-button" type="button" onClick={clearForm}>
                  <Eraser size={18} aria-hidden="true" />
                  Clear Form
                </button>
              </div>
            </form>
          </section>

          <aside className="manage-potd-preview-card" aria-labelledby="manage-potd-preview-title">
            <div className="manage-potd-section-heading">
              <div>
                <span>Image Preview</span>
                <h2 id="manage-potd-preview-title">Selected files</h2>
              </div>
            </div>

            <div className="manage-potd-preview-list">
              {previewItems.map((item) => {
                const PreviewIcon = item.icon;

                return (
                  <article
                    className={`manage-potd-preview-item ${item.value ? "manage-potd-preview-ready" : ""}`}
                    key={item.label}
                  >
                    <div className="manage-potd-preview-art" aria-hidden="true">
                      <PreviewIcon size={25} />
                    </div>
                    <div>
                      <span>{item.label}</span>
                      <strong>{item.value || "No image selected"}</strong>
                      <p>{item.value ? "Mock preview placeholder" : item.helper}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </aside>
        </div>

        <div className="manage-potd-lower-grid">
          <section className="manage-potd-table-card" aria-labelledby="manage-potd-table-title">
            <div className="manage-potd-section-heading">
              <div>
                <span>POTD Library</span>
                <h2 id="manage-potd-table-title">Manage daily problems</h2>
              </div>
            </div>

            <div className="manage-potd-table-wrap">
              <div className="manage-potd-table" role="table" aria-label="POTD management table">
                <div className="manage-potd-table-row manage-potd-table-head" role="row">
                  <span role="columnheader">Title</span>
                  <span role="columnheader">Exam</span>
                  <span role="columnheader">Topic</span>
                  <span role="columnheader">Difficulty</span>
                  <span role="columnheader">Date</span>
                  <span role="columnheader">Status</span>
                  <span role="columnheader">Actions</span>
                </div>

                {problems.map((problem) => (
                  <div className="manage-potd-table-row" role="row" key={problem.id}>
                    <span role="cell" data-label="Title">
                      <strong>{problem.title}</strong>
                      <small>{problem.problemImage || "No problem image selected"}</small>
                    </span>
                    <span role="cell" data-label="Exam">{problem.exam}</span>
                    <span role="cell" data-label="Topic">{problem.topic}</span>
                    <span role="cell" data-label="Difficulty">
                      <span
  className={`manage-potd-pill manage-potd-difficulty-${(
    problem.difficulty || "medium"
  ).toLowerCase()}`}
>
  {problem.difficulty || "Medium"}
</span>
                    </span>
                    <span role="cell" data-label="Date">
                      <CalendarDays size={15} aria-hidden="true" />
{formatDisplayDate(problem.createdAt)}                    </span>
                    <span role="cell" data-label="Status">
                      <span className={`manage-potd-pill manage-potd-status-${problem.status.toLowerCase()}`}>
                        {problem.status}
                      </span>
                    </span>
                    <span className="manage-potd-row-actions" role="cell" data-label="Actions">
                      <button type="button" onClick={() => editProblem(problem)}>
                        <Edit3 size={16} aria-hidden="true" />
                        Edit
                      </button>
                      <button type="button" onClick={() => deleteProblem(problem.id)}>
                        <Trash2 size={16} aria-hidden="true" />
                        Delete
                      </button>
                      <button type="button" onClick={() => archiveProblem(problem.id)}>
                        <Archive size={16} aria-hidden="true" />
                        Archive
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="manage-potd-notes-card" aria-labelledby="manage-potd-notes-title">
            <div className="manage-potd-notes-icon" aria-hidden="true">
              <Lightbulb size={28} />
            </div>
            <span>Admin Notes</span>
            <h2 id="manage-potd-notes-title">Publishing reminders</h2>
            <ul>
              {managePOTDAdminNotes.map((note) => (
                <li key={note}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default ManagePOTD;
