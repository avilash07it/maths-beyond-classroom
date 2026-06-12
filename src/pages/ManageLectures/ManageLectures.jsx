import { useMemo, useState } from "react";
import {
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  Edit3,
  Eraser,
  ExternalLink,
  FileVideo,
  Link2,
  ListChecks,
  PlaySquare,
  Plus,
  Radio,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  Video,
} from "lucide-react";

import "./ManageLectures.css";

import {
  manageLecturesAdminNotes,
  manageLecturesExams,
  manageLecturesInitialForm,
  manageLecturesSeedLectures,
  manageLecturesTopics,
} from "./manageLecturesData";

const manageLecturesHeroBadges = [
  { label: "YouTube Live Links", icon: Radio },
  { label: "Recorded Lectures", icon: PlaySquare },
  { label: "Exam-wise Structure", icon: ListChecks },
  { label: "Admin Only", icon: ShieldCheck },
];

function ManageLectures() {
  const [lectures, setLectures] = useState(manageLecturesSeedLectures);
  const [form, setForm] = useState(manageLecturesInitialForm);
  const [editingLectureId, setEditingLectureId] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    exam: "All Exams",
    topic: "All Topics",
    type: "All Types",
    status: "All Status",
  });

  const summaryCards = useMemo(() => {
    const publishedTopics = new Set(lectures.map((lecture) => lecture.topic));

    return [
      {
        label: "Total Lectures",
        value: lectures.length,
        note: "Dummy admin records",
        icon: FileVideo,
        tone: "purple",
      },
      {
        label: "Live Classes",
        value: lectures.filter((lecture) => lecture.type === "Live").length,
        note: "YouTube live links",
        icon: Radio,
        tone: "green",
      },
      {
        label: "Recorded Links",
        value: lectures.filter((lecture) => lecture.type === "Recorded").length,
        note: "Replay-ready lectures",
        icon: Video,
        tone: "blue",
      },
      {
        label: "Topics Covered",
        value: publishedTopics.size,
        note: "Across core topics",
        icon: BadgeCheck,
        tone: "gold",
      },
    ];
  }, [lectures]);

  const filteredLectures = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    return lectures.filter((lecture) => {
      const searchableText = `${lecture.title} ${lecture.exam} ${lecture.topic} ${lecture.type} ${lecture.status}`.toLowerCase();
      const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
      const matchesExam = filters.exam === "All Exams" || lecture.exam === filters.exam;
      const matchesTopic = filters.topic === "All Topics" || lecture.topic === filters.topic;
      const matchesType = filters.type === "All Types" || lecture.type === filters.type;
      const matchesStatus = filters.status === "All Status" || lecture.status === filters.status;

      return matchesSearch && matchesExam && matchesTopic && matchesType && matchesStatus;
    });
  }, [filters, lectures]);

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
    setForm(manageLecturesInitialForm);
    setEditingLectureId(null);
  };

  const saveLecture = (event) => {
    event.preventDefault();

    const lecturePayload = {
      ...form,
      title: form.title.trim(),
      youtubeUrl: form.youtubeUrl.trim(),
      lectureNumber: Number(form.lectureNumber),
    };

    if (editingLectureId) {
      setLectures((currentLectures) =>
        currentLectures.map((lecture) =>
          lecture.id === editingLectureId ? { ...lecturePayload, id: editingLectureId } : lecture,
        ),
      );
    } else {
      setLectures((currentLectures) => [
        { ...lecturePayload, id: Date.now() },
        ...currentLectures,
      ]);
    }

    clearForm();
  };

  const editLecture = (lecture) => {
    setEditingLectureId(lecture.id);
    setForm({
      title: lecture.title,
      exam: lecture.exam,
      topic: lecture.topic,
      lectureNumber: String(lecture.lectureNumber),
      type: lecture.type,
      youtubeUrl: lecture.youtubeUrl,
      scheduledAt: lecture.scheduledAt,
      status: lecture.status,
    });
  };

  const deleteLecture = (lectureId) => {
    setLectures((currentLectures) =>
      currentLectures.filter((lecture) => lecture.id !== lectureId),
    );

    if (editingLectureId === lectureId) {
      clearForm();
    }
  };

  return (
    <main className="manage-lectures-page">
      <section className="manage-lectures-hero" aria-labelledby="manage-lectures-title">
        <div className="manage-lectures-hero-copy">
          <span className="manage-lectures-eyebrow">
            <ShieldCheck size={16} aria-hidden="true" />
            Admin Workspace
          </span>
          <h1 id="manage-lectures-title">Manage Lectures</h1>
          <p>Add, update, and organize live and recorded lecture links.</p>
        </div>

        <div className="manage-lectures-hero-badges" aria-label="Lecture management capabilities">
          {manageLecturesHeroBadges.map((badge) => {
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

      <section className="manage-lectures-shell" aria-label="Manage lectures workspace">
        <section className="manage-lectures-summary-grid" aria-label="Lecture summary">
          {summaryCards.map((card) => {
            const CardIcon = card.icon;

            return (
              <article
                className={`manage-lectures-summary-card manage-lectures-summary-${card.tone}`}
                key={card.label}
              >
                <div className="manage-lectures-summary-icon" aria-hidden="true">
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

        <div className="manage-lectures-main-grid">
          <section className="manage-lectures-form-card" aria-labelledby="manage-lectures-form-title">
            <div className="manage-lectures-section-heading">
              <div>
                <span>{editingLectureId ? "Update Link" : "Add Lecture"}</span>
                <h2 id="manage-lectures-form-title">
                  {editingLectureId ? "Edit lecture details" : "Add or update lecture link"}
                </h2>
              </div>
              <p>Frontend-only mock controls for MVP planning.</p>
            </div>

            <form className="manage-lectures-form" onSubmit={saveLecture}>
              <label className="manage-lectures-field manage-lectures-field-wide">
                <span>Lecture Title</span>
                <input
                  type="text"
                  value={form.title}
                  onChange={(event) => updateFormField("title", event.target.value)}
                  placeholder="e.g. Divisibility Rules Live Workshop"
                  required
                />
              </label>

              <label className="manage-lectures-field">
                <span>Exam Category</span>
                <select
                  value={form.exam}
                  onChange={(event) => updateFormField("exam", event.target.value)}
                >
                  {manageLecturesExams.map((exam) => (
                    <option key={exam}>{exam}</option>
                  ))}
                </select>
              </label>

              <label className="manage-lectures-field">
                <span>Topic / Chapter</span>
                <select
                  value={form.topic}
                  onChange={(event) => updateFormField("topic", event.target.value)}
                >
                  {manageLecturesTopics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>

              <label className="manage-lectures-field">
                <span>Lecture Number</span>
                <input
                  type="number"
                  min="1"
                  value={form.lectureNumber}
                  onChange={(event) => updateFormField("lectureNumber", event.target.value)}
                  placeholder="01"
                  required
                />
              </label>

              <label className="manage-lectures-field">
                <span>Lecture Type</span>
                <select
                  value={form.type}
                  onChange={(event) => updateFormField("type", event.target.value)}
                >
                  <option>Live</option>
                  <option>Recorded</option>
                </select>
              </label>

              <label className="manage-lectures-field manage-lectures-field-wide">
                <span>YouTube URL</span>
                <input
                  type="url"
                  value={form.youtubeUrl}
                  onChange={(event) => updateFormField("youtubeUrl", event.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </label>

              <label className="manage-lectures-field">
                <span>Scheduled Date / Time</span>
                <input
                  type="datetime-local"
                  value={form.scheduledAt}
                  onChange={(event) => updateFormField("scheduledAt", event.target.value)}
                  required
                />
              </label>

              <label className="manage-lectures-field">
                <span>Status</span>
                <select
                  value={form.status}
                  onChange={(event) => updateFormField("status", event.target.value)}
                >
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </label>

              <div className="manage-lectures-form-actions">
                <button className="manage-lectures-save-button" type="submit">
                  {editingLectureId ? <Save size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                  Save Lecture
                </button>
                <button className="manage-lectures-clear-button" type="button" onClick={clearForm}>
                  <Eraser size={18} aria-hidden="true" />
                  Clear Form
                </button>
              </div>
            </form>
          </section>

          <aside className="manage-lectures-notes-card" aria-labelledby="manage-lectures-notes-title">
            <div className="manage-lectures-notes-icon" aria-hidden="true">
              <CheckCircle2 size={28} />
            </div>
            <span>Admin Notes</span>
            <h2 id="manage-lectures-notes-title">Publishing reminders</h2>
            <ul>
              {manageLecturesAdminNotes.map((note) => (
                <li key={note}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="manage-lectures-table-card" aria-labelledby="manage-lectures-table-title">
          <div className="manage-lectures-section-heading">
            <div>
              <span>Lecture Library</span>
              <h2 id="manage-lectures-table-title">Manage YouTube links</h2>
            </div>
            <p>{filteredLectures.length} lecture rows visible</p>
          </div>

          <div className="manage-lectures-filter-bar" aria-label="Lecture filters">
            <label className="manage-lectures-search-field">
              <Search size={18} aria-hidden="true" />
              <input
                type="search"
                value={filters.search}
                onChange={(event) => updateFilter("search", event.target.value)}
                placeholder="Search lecture"
              />
            </label>

            <label className="manage-lectures-filter-field">
              <span>Exam</span>
              <select
                value={filters.exam}
                onChange={(event) => updateFilter("exam", event.target.value)}
              >
                <option>All Exams</option>
                {manageLecturesExams.map((exam) => (
                  <option key={exam}>{exam}</option>
                ))}
              </select>
            </label>

            <label className="manage-lectures-filter-field">
              <span>Topic</span>
              <select
                value={filters.topic}
                onChange={(event) => updateFilter("topic", event.target.value)}
              >
                <option>All Topics</option>
                {manageLecturesTopics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </label>

            <label className="manage-lectures-filter-field">
              <span>Type</span>
              <select
                value={filters.type}
                onChange={(event) => updateFilter("type", event.target.value)}
              >
                <option>All Types</option>
                <option>Live</option>
                <option>Recorded</option>
              </select>
            </label>

            <label className="manage-lectures-filter-field">
              <span>Status</span>
              <select
                value={filters.status}
                onChange={(event) => updateFilter("status", event.target.value)}
              >
                <option>All Status</option>
                <option>Draft</option>
                <option>Published</option>
              </select>
            </label>
          </div>

          <div className="manage-lectures-table-wrap">
            <div className="manage-lectures-table" role="table" aria-label="Lecture management table">
              <div className="manage-lectures-table-row manage-lectures-table-head" role="row">
                <span role="columnheader">Lecture Title</span>
                <span role="columnheader">Exam</span>
                <span role="columnheader">Topic</span>
                <span role="columnheader">Lecture Number</span>
                <span role="columnheader">Type</span>
                <span role="columnheader">Status</span>
                <span role="columnheader">YouTube Link</span>
                <span role="columnheader">Actions</span>
              </div>

              {filteredLectures.map((lecture) => (
                <div className="manage-lectures-table-row" role="row" key={lecture.id}>
                  <span role="cell" data-label="Lecture Title">
                    <strong>{lecture.title}</strong>
                    <small>
                      <CalendarClock size={14} aria-hidden="true" />
                      {lecture.scheduledAt.replace("T", " ")}
                    </small>
                  </span>
                  <span role="cell" data-label="Exam">{lecture.exam}</span>
                  <span role="cell" data-label="Topic">{lecture.topic}</span>
                  <span role="cell" data-label="Lecture Number">
                    {String(lecture.lectureNumber).padStart(2, "0")}
                  </span>
                  <span role="cell" data-label="Type">
                    <span className={`manage-lectures-pill manage-lectures-type-${lecture.type.toLowerCase()}`}>
                      {lecture.type}
                    </span>
                  </span>
                  <span role="cell" data-label="Status">
                    <span className={`manage-lectures-pill manage-lectures-status-${lecture.status.toLowerCase()}`}>
                      {lecture.status}
                    </span>
                  </span>
                  <span role="cell" data-label="YouTube Link">
                    <a className="manage-lectures-youtube-link" href={lecture.youtubeUrl} target="_blank" rel="noreferrer">
                      <Link2 size={15} aria-hidden="true" />
                      Open
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </span>
                  <span className="manage-lectures-row-actions" role="cell" data-label="Actions">
                    <button type="button" onClick={() => editLecture(lecture)}>
                      <Edit3 size={16} aria-hidden="true" />
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteLecture(lecture.id)}>
                      <Trash2 size={16} aria-hidden="true" />
                      Delete
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {filteredLectures.length === 0 && (
            <div className="manage-lectures-empty-state">
              <FileVideo size={28} aria-hidden="true" />
              <p>No lectures match these filters.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default ManageLectures;
