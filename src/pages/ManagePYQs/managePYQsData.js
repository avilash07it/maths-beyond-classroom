export const managePYQsExams = ["IOQM", "RMO", "NMTC", "SEHSS"];

export const managePYQsTopics = [
  "Number Theory",
  "Algebra",
  "Geometry",
  "Combinatorics",
];

export const managePYQsYears = ["2026", "2025", "2024", "2023", "2022", "2021"];

export const managePYQsInitialForm = {
  title: "",
  exam: managePYQsExams[0],
  topic: managePYQsTopics[0],
  year: managePYQsYears[0],
  pdfUrl: "",
  status: "Draft",
};



export const managePYQsAdminNotes = [
  "Organize PYQs exam-wise and topic-wise.",
  "Keep titles clear for students.",
  "Use the year field consistently for easier filtering.",
  "Publish only verified paper PDFs.",
];
