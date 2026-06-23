export const manageMockTestsExams = [
  "IOQM",
  "RMO",
  "NMTC",
  "SEHSS",
  "CBSE Class IX",
  "CBSE Class X",
];

export const manageMockTestsTopics = [
  "Number Theory",
  "Algebra",
  "Geometry",
  "Combinatorics",
  "Full Syllabus",
];

export const manageMockTestTypes = [
  "Free Mock",
  "Topic Test",
  "Full Test Series",
  "Live Mock",
  "Diagnostic",
];

export const manageMockTestPlatforms = [
  "Google Forms",
  "Quizizz",
  "Microsoft Forms",
  "Typeform",
  "External LMS",
];

export const manageMockTestStatuses = [
  "Draft",
  "Live",
  "Upcoming",
  "Completed",
];

export const manageMockTestsInitialForm = {
  title: "",
  exam: manageMockTestsExams[0],
  topic: manageMockTestsTopics[0],
  testType: manageMockTestTypes[0],
  accessType: "Free",
  externalUrl: "",
  platform: manageMockTestPlatforms[0],
  duration: "",
  questions: "",
  marks: "",
  date: "",
  status: "Draft",
};


export const manageMockTestsAdminNotes = [
  "Tests are hosted externally for the MVP.",
  "Full Test Series access should stay Pro-only.",
  "Free users are redirected to Pro Plans before paid test attempts.",
  "A future version may replace external links with a custom test engine.",
];
