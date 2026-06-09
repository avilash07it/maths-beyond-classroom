import {
  Trophy,
  Hexagon,
  Brain,
  ShieldCheck,
  BookOpen,
  Sigma,
  Calculator,
  Triangle,
  Network,
  PlayCircle,
  FileText,
  Library,
  ClipboardList,
  Lightbulb,
} from "lucide-react";

// Continue Learning Cards
export const continueLearning = [
  {
    exam: "IOQM",
    topic: "Number Theory",
    lecture: "Lecture 4",
    subtitle: "Divisibility Rules",
    color: "purple",
    icon: Sigma,
  },
  {
    exam: "RMO",
    topic: "Algebra",
    lecture: "Lecture 3",
    subtitle: "Quadratic Equations",
    color: "green",
    icon: Calculator,
  },
  {
    exam: "SEHSS",
    topic: "Geometry",
    lecture: "Lecture 5",
    subtitle: "Triangles and Properties",
    color: "orange",
    icon: Triangle,
  },
  {
    exam: "NMTC",
    topic: "Combinatorics",
    lecture: "Lecture 2",
    subtitle: "Counting Principles",
    color: "blue",
    icon: Network,
  },
];

// Quick Access
export const quickAccess = [
  {
    title: "Lectures",
    description: "Live & recorded lectures",
    icon: PlayCircle,
  },
  {
    title: "Study Material",
    description: "Notes, assignments & sheets",
    icon: FileText,
  },
  {
    title: "PYQ Library",
    description: "Topic-wise previous papers",
    icon: Library,
  },
  {
    title: "Mock Tests",
    description: "Practice test series",
    icon: ClipboardList,
  },
  {
    title: "Problem of the Day",
    description: "Daily challenge problems",
    icon: Lightbulb,
  },
];

// Exams We Cover
export const exams = [
  {
    name: "IOQM",
    subtitle: "Olympiad",
    icon: Trophy,
  },
  {
    name: "RMO",
    subtitle: "Olympiad",
    icon: Hexagon,
  },
  {
    name: "NMTC",
    subtitle: "Talent Contest",
    icon: Brain,
  },
  {
    name: "SEHSS",
    subtitle: "Scholarship",
    icon: ShieldCheck,
  },
  {
    name: "CBSE IX & X",
    subtitle: "School Exams",
    icon: BookOpen,
  },
];

// Problem of the Day
export const potd = {
  topic: "Geometry",
  title: "Problem of the Day",
  timeLeft: "10h 35m left",
  question: "In △ABC, AB = AC and ∠B = 50°. Find ∠C.",
};

// Upcoming Test
export const upcomingTest = {
  title: "IOQM Test - 07",
  date: "15 May 2026",
  time: "10:00 AM - 1:00 PM",
  questions: "60 Questions",
};

// Pro Banner
export const proPlan = {
  title: "Unlock Pro Features",
  description: "Get access to Test Series and Personal Support.",
};

// Welcome Section
export const welcomeData = {
  studentName: "Arjun",
  streak: "12 Day Streak",
};