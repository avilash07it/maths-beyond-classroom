import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileQuestion,
  FileText,
  Flame,
  GraduationCap,
  Landmark,
  ListChecks,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

export const adminDashboardStats = [
  {
    label: "Total Lectures",
    value: "124",
    note: "18 updated this month",
    tone: "purple",
    icon: BookOpen,
  },
  {
    label: "Study Materials",
    value: "86",
    note: "PDFs and worksheets",
    tone: "green",
    icon: FileText,
  },
  {
    label: "PYQ Resources",
    value: "342",
    note: "Topic-wise questions",
    tone: "orange",
    icon: FileQuestion,
  },
  {
    label: "Active Mock Tests",
    value: "12",
    note: "Across Olympiad tracks",
    tone: "blue",
    icon: ClipboardList,
  },
  {
    label: "Pending Payments",
    value: "7",
    note: "Manual UPI checks",
    tone: "gold",
    icon: CreditCard,
  },
  {
    label: "POTD Updated",
    value: "Today",
    note: "Geometry challenge live",
    tone: "violet",
    icon: Flame,
  },
];

export const adminDashboardManagementCards = [
  {
    title: "Manage Lectures",
    description: "Add, edit, or replace live and recorded lecture links.",
    meta: "124 lectures",
    href: "/admin/manage-lectures",
    tone: "purple",
    icon: GraduationCap,
  },
  {
    title: "Manage Study Materials",
    description: "Upload notes, formula sheets, assignments, and PDFs.",
    meta: "86 resources",
    href: "/admin/manage-study-material",
    tone: "green",
    icon: UploadCloud,
  },
  {
    title: "Manage PYQs",
    description: "Organize previous year questions by topic and exam.",
    meta: "342 PYQs",
    href: "/admin/manage-pyqs",
    tone: "orange",
    icon: FileQuestion,
  },
  {
    title: "Manage POTD",
    description: "Update the daily challenge, hint, and solution content.",
    meta: "Updated today",
    href: "/admin/manage-potd",
    tone: "gold",
    icon: Flame,
  },
  {
    title: "Manage Mock Tests",
    description: "Maintain test links, schedules, duration, and syllabus.",
    meta: "12 active",
    href: "/admin/manage-mock-tests",
    tone: "blue",
    icon: ListChecks,
  },
  {
    title: "Manage Payments",
    description: "Review manual UPI requests before enabling pro access.",
    meta: "7 pending",
    href: "/admin/manage-payments",
    tone: "violet",
    icon: Landmark,
  },
];

export const adminDashboardPayments = [
  {
    id: 1,
    studentName: "Arjun Mehta",
    plan: "IOQM Pro",
    amount: "Rs. 1,499",
    status: "Pending",
  },
  {
    id: 2,
    studentName: "Nisha Rao",
    plan: "Test Series",
    amount: "Rs. 799",
    status: "Pending",
  },
  {
    id: 3,
    studentName: "Kabir Shah",
    plan: "Personal Support",
    amount: "Rs. 2,499",
    status: "Approved",
  },
  {
    id: 4,
    studentName: "Meera Iyer",
    plan: "Complete Pro",
    amount: "Rs. 3,999",
    status: "Pending",
  },
];

export const adminDashboardActivities = [
  {
    title: "Lecture link updated",
    detail: "Quadratic Equations recording replaced",
    time: "18 minutes ago",
    tone: "purple",
    icon: BookOpen,
  },
  {
    title: "New study material uploaded",
    detail: "Number Theory modular arithmetic notes",
    time: "1 hour ago",
    tone: "green",
    icon: FileText,
  },
  {
    title: "POTD changed",
    detail: "Geometry challenge refreshed for today",
    time: "3 hours ago",
    tone: "gold",
    icon: Flame,
  },
  {
    title: "Payment approved",
    detail: "Kabir Shah received pro access",
    time: "Yesterday",
    tone: "blue",
    icon: CheckCircle2,
  },
  {
    title: "Mock test link added",
    detail: "IOQM Test - 07 schedule updated",
    time: "Yesterday",
    tone: "orange",
    icon: ClipboardList,
  },
];

export const adminDashboardReminders = [
  "Manual UPI payments need verification before approving access.",
  "Content updates are visible to students after publishing.",
  "Admin portal is not visible to students.",
];

export const adminDashboardSecurity = {
  badge: "Super Admin Workspace",
  label: "Secure Admin Workspace",
  message: "Frontend-only MVP controls for the single primary administrator.",
  icon: ShieldCheck,
};
