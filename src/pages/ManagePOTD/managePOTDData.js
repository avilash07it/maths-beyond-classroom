export const managePOTDExams = [
  "IOQM",
  "RMO",
  "NMTC",
  "SEHSS",
  "CBSE Class IX",
  "CBSE Class X",
];

export const managePOTDTopics = [
  "Number Theory",
  "Algebra",
  "Geometry",
  "Combinatorics",
  "Polynomials",
  "Quadratic Equations",
];

export const managePOTDDifficulties = ["Easy", "Medium", "Hard"];

export const managePOTDStatuses = ["Draft", "Published", "Archived"];

export const managePOTDInitialForm = {
  title: "",
  exam: managePOTDExams[0],
  topic: managePOTDTopics[0],
  difficulty: managePOTDDifficulties[1],
  date: "2026-06-13",
  problemImage: "",
  hintImage: "",
  solutionImage: "",
  status: "Draft",
};



export const managePOTDAdminNotes = [
  "Upload a new POTD daily.",
  "Hint image is optional.",
  "Solution image should be uploaded carefully.",
  "Student solution upload/checking is a Pro feature.",
  "Published POTD is visible to students.",
];
