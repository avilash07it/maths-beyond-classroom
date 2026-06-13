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
  pdfName: "",
  status: "Draft",
};

export const managePYQsSeedPYQs = [
  {
    id: 1,
    title: "IOQM 2024 Number Theory Set",
    exam: "IOQM",
    topic: "Number Theory",
    year: "2024",
    pdfName: "ioqm-2024-number-theory.pdf",
    status: "Published",
  },
  {
    id: 2,
    title: "IOQM 2023 Algebra Questions",
    exam: "IOQM",
    topic: "Algebra",
    year: "2023",
    pdfName: "ioqm-2023-algebra.pdf",
    status: "Published",
  },
  {
    id: 3,
    title: "RMO 2023 Geometry Paper",
    exam: "RMO",
    topic: "Geometry",
    year: "2023",
    pdfName: "rmo-2023-geometry.pdf",
    status: "Published",
  },
  {
    id: 4,
    title: "RMO 2022 Number Theory Set",
    exam: "RMO",
    topic: "Number Theory",
    year: "2022",
    pdfName: "rmo-2022-number-theory.pdf",
    status: "Draft",
  },
  {
    id: 5,
    title: "NMTC 2024 Combinatorics PYQs",
    exam: "NMTC",
    topic: "Combinatorics",
    year: "2024",
    pdfName: "nmtc-2024-combinatorics.pdf",
    status: "Published",
  },
  {
    id: 6,
    title: "SEHSS 2024 Geometry Practice",
    exam: "SEHSS",
    topic: "Geometry",
    year: "2024",
    pdfName: "sehss-2024-geometry.pdf",
    status: "Draft",
  },
];

export const managePYQsAdminNotes = [
  "Organize PYQs exam-wise and topic-wise.",
  "Keep titles clear for students.",
  "Use the year field consistently for easier filtering.",
  "Publish only verified paper PDFs.",
];
