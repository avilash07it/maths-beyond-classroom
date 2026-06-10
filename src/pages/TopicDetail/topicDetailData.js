export const topicDetail = {
  title: "Number Theory",
  breadcrumb: ["Topics", "Number Theory"],
  description:
    "Explore the fascinating world of numbers. Learn about divisibility, primes, congruences, Diophantine equations and classic Olympiad techniques.",
  icon: "1/3 + 1/3",
  stats: [
    { value: "48", label: "Lectures", type: "lectures" },
    { value: "312", label: "Practice Questions", type: "questions" },
    { value: "23", label: "PYQ Papers", type: "papers" },
    { value: "65%", label: "Your Progress", type: "progress" },
  ],
};

export const learningPath = [
  {
    step: "1",
    title: "Basics",
    subtitle: "Numbers & Divisibility",
    status: "Completed",
    progress: 100,
  },
  {
    step: "2",
    title: "Primes",
    subtitle: "Prime Numbers",
    status: "In Progress",
    progress: 60,
  },
  {
    step: "3",
    title: "Congruences",
    subtitle: "Modular Arithmetic",
    status: "Locked",
    progress: 0,
  },
  {
    step: "4",
    title: "Advanced",
    subtitle: "Diophantine Equations",
    status: "Locked",
    progress: 0,
  },
  {
    step: "5",
    title: "Applications",
    subtitle: "Theorems & Problems",
    status: "Locked",
    progress: 0,
  },
];

export const lectures = [
  { no: "01", title: "Introduction to Number Theory", time: "42 min", status: "Completed" },
  { no: "02", title: "Divisibility Rules", time: "38 min", status: "Completed" },
  {
    no: "03",
    title: "Prime Numbers & Composite Numbers",
    time: "45 min",
    status: "Continue",
    progress: "60%",
  },
  { no: "04", title: "Fundamental Theorem of Arithmetic", time: "50 min", status: "Locked" },
  { no: "05", title: "Highest Common Factor (HCF)", time: "35 min", status: "Locked" },
  { no: "06", title: "Lowest Common Multiple (LCM)", time: "32 min", status: "Locked" },
];

export const studyMaterials = [
  { title: "Number Theory Formula Sheet", meta: "PDF - 1.2 MB", tone: "gold" },
  { title: "Important Theorems & Lemmas", meta: "PDF - 890 KB", tone: "red" },
  { title: "Quick Revision Notes", meta: "PDF - 1.1 MB", tone: "green" },
  { title: "Practice Problems Set", meta: "PDF - 2.4 MB", tone: "blue" },
];

export const pyqPapers = [
  { title: "IOQM 2023", meta: "20 Questions" },
  { title: "RMO 2022", meta: "20 Questions" },
  { title: "NMTC 2023", meta: "20 Questions" },
  { title: "INMO 2021", meta: "20 Questions" },
];

export const importantTopics = [
  "Divisibility Rules",
  "Prime Numbers",
  "Congruences",
  "Euler's Totient Function",
  "Fermat's Little Theorem",
];

export const recommendedResources = [
  {
    title: "Algebra Basics",
    description: "Strengthen your algebra skills",
    tone: "green",
  },
  {
    title: "Problem Solving Strategies",
    description: "Improve your approach",
    tone: "blue",
  },
  {
    title: "Previous Year Papers",
    description: "Practice real exam papers",
    tone: "gold",
  },
];

export const streakDays = [
  { label: "17 May", done: true },
  { label: "18 May", done: true },
  { label: "19 May", done: true },
  { label: "20 May", done: true },
  { label: "21 May", done: true },
  { label: "22 May", done: true },
  { label: "Today", done: false },
];
