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

export const managePOTDSeedProblems = [
  {
    id: 1,
    title: "Divisibility and Prime Numbers",
    exam: "IOQM",
    topic: "Number Theory",
    difficulty: "Hard",
    date: "2026-06-13",
    problemImage: "divisibility-prime-problem.png",
    hintImage: "divisibility-prime-hint.png",
    solutionImage: "divisibility-prime-solution.png",
    status: "Published",
  },
  {
    id: 2,
    title: "Find the Value of k",
    exam: "RMO",
    topic: "Quadratic Equations",
    difficulty: "Medium",
    date: "2026-06-12",
    problemImage: "equal-roots-problem.png",
    hintImage: "",
    solutionImage: "equal-roots-solution.png",
    status: "Published",
  },
  {
    id: 3,
    title: "Sum of Angles",
    exam: "NMTC",
    topic: "Geometry",
    difficulty: "Easy",
    date: "2026-06-11",
    problemImage: "triangle-angles-problem.png",
    hintImage: "triangle-angles-hint.png",
    solutionImage: "triangle-angles-solution.png",
    status: "Draft",
  },
  {
    id: 4,
    title: "Remainder Theorem Drill",
    exam: "CBSE Class X",
    topic: "Polynomials",
    difficulty: "Medium",
    date: "2026-06-10",
    problemImage: "remainder-theorem-problem.png",
    hintImage: "",
    solutionImage: "remainder-theorem-solution.png",
    status: "Published",
  },
  {
    id: 5,
    title: "Coordinate Geometry Distance",
    exam: "SEHSS",
    topic: "Geometry",
    difficulty: "Easy",
    date: "2026-06-09",
    problemImage: "coordinate-distance-problem.png",
    hintImage: "coordinate-distance-hint.png",
    solutionImage: "coordinate-distance-solution.png",
    status: "Archived",
  },
];

export const managePOTDAdminNotes = [
  "Upload a new POTD daily.",
  "Hint image is optional.",
  "Solution image should be uploaded carefully.",
  "Student solution upload/checking is a Pro feature.",
  "Published POTD is visible to students.",
];
