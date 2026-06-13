import {
  BadgeIndianRupee,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileCheck2,
  ReceiptIndianRupee,
  ShieldCheck,
  XCircle,
} from "lucide-react";

export const managePaymentsPlans = [
  "Starter Pro (SEHSS)",
  "Starter Pro (IOQM)",
  "Pro Plus",
  "Pro Max",
];

export const managePaymentsStatuses = ["Pending", "Approved", "Rejected"];

export const managePaymentsRequests = [
  {
    id: 1,
    studentName: "Arjun Mehta",
    studentEmail: "arjun.mehta@gmail.com",
    plan: "Starter Pro (SEHSS)",
    amount: 499,
    transactionId: "UPI-MBC-SEHSS-4821",
    screenshotLabel: "arjun-upi-proof.png",
    submissionDate: "10 Jun 2026",
    status: "Pending",
    notes: "Paid through Google Pay. Student requested access for SEHSS preparation.",
  },
  {
    id: 2,
    studentName: "Nisha Rao",
    studentEmail: "nisha.rao@gmail.com",
    plan: "Pro Plus",
    amount: 799,
    transactionId: "UPI-MBC-PLUS-7518",
    screenshotLabel: "nisha-payment-shot.jpg",
    submissionDate: "10 Jun 2026",
    status: "Pending",
    notes: "Transaction ID shared with screenshot placeholder for manual verification.",
  },
  {
    id: 3,
    studentName: "Kabir Shah",
    studentEmail: "kabir.shah@gmail.com",
    plan: "Pro Max",
    amount: 1299,
    transactionId: "UPI-MBC-MAX-3204",
    screenshotLabel: "kabir-phonepe-proof.png",
    submissionDate: "09 Jun 2026",
    status: "Approved",
    notes: "Amount matched the Pro Max plan and access was enabled.",
  },
  {
    id: 4,
    studentName: "Meera Iyer",
    studentEmail: "meera.iyer@gmail.com",
    plan: "Starter Pro (IOQM)",
    amount: 499,
    transactionId: "UPI-MBC-IOQM-9182",
    screenshotLabel: "meera-upi-reference.png",
    submissionDate: "09 Jun 2026",
    status: "Rejected",
    notes: "Transaction reference did not match the visible proof. Resubmission required.",
  },
  {
    id: 5,
    studentName: "Rohan Das",
    studentEmail: "rohan.das@gmail.com",
    plan: "Pro Plus",
    amount: 799,
    transactionId: "UPI-MBC-PLUS-6840",
    screenshotLabel: "rohan-bank-proof.jpg",
    submissionDate: "08 Jun 2026",
    status: "Approved",
    notes: "UPI payment confirmed after manual review.",
  },
  {
    id: 6,
    studentName: "Ishita Sharma",
    studentEmail: "ishita.sharma@gmail.com",
    plan: "Pro Max",
    amount: 1299,
    transactionId: "UPI-MBC-MAX-1947",
    screenshotLabel: "ishita-payment-proof.png",
    submissionDate: "08 Jun 2026",
    status: "Pending",
    notes: "Awaiting verification against the UPI statement.",
  },
];

export const managePaymentsActivity = [
  {
    id: 1,
    title: "Payment Approved",
    detail: "Kabir Shah received Pro Max access.",
    time: "Today, 10:15 AM",
    icon: CheckCircle2,
    tone: "green",
  },
  {
    id: 2,
    title: "Payment Rejected",
    detail: "Meera Iyer was asked to resubmit proof.",
    time: "Today, 09:40 AM",
    icon: XCircle,
    tone: "red",
  },
  {
    id: 3,
    title: "New Request Received",
    detail: "Ishita Sharma submitted a Pro Max payment.",
    time: "Yesterday",
    icon: Clock3,
    tone: "purple",
  },
];

export const managePaymentsAdminNotes = [
  "Verify UPI payments carefully.",
  "Confirm transaction IDs before approval.",
  "Approved users receive Pro access.",
  "Rejected requests require resubmission.",
];

export const managePaymentsHeroBadges = [
  "Manual UPI",
  "Payment Verification",
  "Pro Access",
  "Admin Only",
];

export const managePaymentsSummaryConfig = [
  {
    key: "pending",
    label: "Pending Requests",
    note: "Awaiting manual verification",
    icon: Clock3,
    tone: "amber",
  },
  {
    key: "approved",
    label: "Approved Payments",
    note: "Pro access enabled",
    icon: FileCheck2,
    tone: "green",
  },
  {
    key: "rejected",
    label: "Rejected Payments",
    note: "Require resubmission",
    icon: XCircle,
    tone: "red",
  },
  {
    key: "revenue",
    label: "Revenue Overview",
    note: "Approved payment value",
    icon: BadgeIndianRupee,
    tone: "purple",
  },
];

export const managePaymentsSecurityPanel = {
  icon: ShieldCheck,
  title: "Secure verification desk",
  message: "Frontend-only approval controls for the MVP manual UPI workflow.",
};

export const managePaymentsWorkflowPanel = {
  icon: ReceiptIndianRupee,
  label: "Manual UPI Queue",
  description: "Review submitted transaction IDs and screenshot placeholders before enabling Pro access.",
};

export const managePaymentsScreenshotIcon = CreditCard;
