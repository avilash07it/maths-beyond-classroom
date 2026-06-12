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

export const manageLecturesSeedLectures = [
  {
    id: 1,
    title: "Divisibility Rules Live Workshop",
    exam: "IOQM",
    topic: "Number Theory",
    lectureNumber: 1,
    type: "Live",
    youtubeUrl: "https://www.youtube.com/watch?v=mbc-live-001",
    scheduledAt: "2026-06-14T18:00",
    status: "Published",
  },
  {
    id: 2,
    title: "Quadratic Equations Recorded Primer",
    exam: "CBSE Class X",
    topic: "Algebra",
    lectureNumber: 2,
    type: "Recorded",
    youtubeUrl: "https://www.youtube.com/watch?v=mbc-recorded-002",
    scheduledAt: "2026-06-12T20:00",
    status: "Published",
  },
  {
    id: 3,
    title: "Triangles and Angle Chasing",
    exam: "RMO",
    topic: "Geometry",
    lectureNumber: 3,
    type: "Recorded",
    youtubeUrl: "https://www.youtube.com/watch?v=mbc-recorded-003",
    scheduledAt: "2026-06-10T17:30",
    status: "Published",
  },
  {
    id: 4,
    title: "Counting Principles Practice",
    exam: "NMTC",
    topic: "Combinatorics",
    lectureNumber: 4,
    type: "Live",
    youtubeUrl: "https://www.youtube.com/watch?v=mbc-live-004",
    scheduledAt: "2026-06-18T19:00",
    status: "Draft",
  },
  {
    id: 5,
    title: "Modular Arithmetic Sprint",
    exam: "SEHSS",
    topic: "Number Theory",
    lectureNumber: 5,
    type: "Recorded",
    youtubeUrl: "https://www.youtube.com/watch?v=mbc-recorded-005",
    scheduledAt: "2026-06-08T16:30",
    status: "Published",
  },
  {
    id: 6,
    title: "Linear Equations Foundation",
    exam: "CBSE Class IX",
    topic: "Algebra",
    lectureNumber: 6,
    type: "Recorded",
    youtubeUrl: "https://www.youtube.com/watch?v=mbc-recorded-006",
    scheduledAt: "2026-06-06T18:30",
    status: "Draft",
  },
];

export const manageLecturesAdminNotes = [
  "Upload YouTube links only for MVP.",
  "PDFs should not be attached to lectures.",
  "Study materials are managed separately.",
  "Students see only published lectures.",
];
