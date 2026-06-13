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

export const manageStudyMaterialSeedMaterials = [
  {
    id: 1,
    title: "Geometry Practice Sheet 1",
    exam: "IOQM",
    topic: "Geometry",
    type: "Practice Sheets",
    pdfName: "geometry-practice-sheet-1.pdf",
    status: "Published",
    date: "10 Jun 2026",
  },
  {
    id: 2,
    title: "Number Theory Complete Notes",
    exam: "IOQM",
    topic: "Number Theory",
    type: "Study Notes",
    pdfName: "number-theory-complete-notes.pdf",
    status: "Published",
    date: "08 Jun 2026",
  },
  {
    id: 3,
    title: "Algebra Assignment Set A",
    exam: "RMO",
    topic: "Algebra",
    type: "Assignments",
    pdfName: "algebra-assignment-set-a.pdf",
    status: "Draft",
    date: "06 Jun 2026",
  },
  {
    id: 4,
    title: "Polynomial Identities Reference",
    exam: "SEHSS",
    topic: "Algebra",
    type: "Other Materials",
    pdfName: "polynomial-identities-reference.pdf",
    status: "Published",
    date: "01 Jun 2026",
  },
  {
    id: 5,
    title: "Linear Equations Practice Sheet",
    exam: "CBSE Class X",
    topic: "Algebra",
    type: "Practice Sheets",
    pdfName: "linear-equations-practice-sheet.pdf",
    status: "Published",
    date: "28 May 2026",
  },
  {
    id: 6,
    title: "Divisibility Tricks Quick Reference",
    exam: "NMTC",
    topic: "Number Theory",
    type: "Other Materials",
    pdfName: "divisibility-tricks-reference.pdf",
    status: "Draft",
    date: "25 May 2026",
  },
];

export const manageStudyMaterialAdminNotes = [
  "PDFs should be managed here, not inside lectures.",
  "Students can view materials separately from lectures.",
  "Keep exam, topic, and material type labels consistent.",
  "Publish only reviewed PDFs for student access.",
];
