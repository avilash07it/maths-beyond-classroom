export const manageLecturesExams = [
  "IOQM",
  "RMO",
  "NMTC",
  "SEHSS",
  "CBSE Class IX",
  "CBSE Class X",
];

export const manageLecturesTopics = [
  "Number Theory",
  "Algebra",
  "Geometry",
  "Combinatorics",
];

export const manageLecturesInitialForm = {
  title: "",
  exam: manageLecturesExams[0],
  topic: manageLecturesTopics[0],
  lectureNumber: "",
  type: "Live",
  youtubeUrl: "",
  scheduledAt: "",
  status: "Draft",
};



export const manageLecturesAdminNotes = [
  "Upload YouTube links only for MVP.",
  "PDFs should not be attached to lectures.",
  "Study materials are managed separately.",
  "Students see only published lectures.",
];
