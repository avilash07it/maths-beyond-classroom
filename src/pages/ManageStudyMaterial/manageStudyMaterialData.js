export const manageStudyMaterialExams = [
  "IOQM",
  "RMO",
  "NMTC",
  "SEHSS",
  "CBSE Class IX",
  "CBSE Class X",
];

export const manageStudyMaterialTopics = [
  "Number Theory",
  "Algebra",
  "Geometry",
  "Combinatorics",
];

export const manageStudyMaterialTypes = [
  "Study Notes",
  "Assignments",
  "Practice Sheets",
  "Other Materials",
];

export const manageStudyMaterialInitialForm = {
  title: "",
  exam: manageStudyMaterialExams[0],
  topic: manageStudyMaterialTopics[0],
  type: manageStudyMaterialTypes[0],
  pdfName: "",
  status: "Draft",
};



export const manageStudyMaterialAdminNotes = [
  "PDFs should be managed here, not inside lectures.",
  "Students can view materials separately from lectures.",
  "Keep exam, topic, and material type labels consistent.",
  "Publish only reviewed PDFs for student access.",
];
