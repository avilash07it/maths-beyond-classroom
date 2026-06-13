import { useMemo, useState } from "react";
import {
  Check,
  CheckCircle2,
  Eye,
  FileImage,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

import "./ManagePayments.css";

import {
  managePaymentsActivity,
  managePaymentsAdminNotes,
  managePaymentsHeroBadges,
  managePaymentsPlans,
  managePaymentsRequests,
  managePaymentsScreenshotIcon,
  managePaymentsSecurityPanel,
  managePaymentsStatuses,
  managePaymentsSummaryConfig,
  managePaymentsWorkflowPanel,
} from "./managePaymentsData";

const formatAmount = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function ManagePayments() {
  const [requests, setRequests] = useState(managePaymentsRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    plan: "All Plans",
    status: "All Status",
    date: "All Dates",
  });

  const SecurityIcon = managePaymentsSecurityPanel.icon;
  const WorkflowIcon = managePaymentsWorkflowPanel.icon;
  const ScreenshotIcon = managePaymentsScreenshotIcon;

  const updateFilter = (field, value) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  const updateRequestStatus = (requestId, status) => {
    setRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId ? { ...request, status } : request,
      ),
    );

    setSelectedRequest((currentRequest) =>
      currentRequest?.id === requestId ? { ...currentRequest, status } : currentRequest,
    );
  };

  const dateOptions = useMemo(
    () => ["All Dates", ...new Set(requests.map((request) => request.submissionDate))],
    [requests],
  );

  const summaryValues = useMemo(
    () => ({
      pending: requests.filter((request) => request.status === "Pending").length,
      approved: requests.filter((request) => request.status === "Approved").length,
      rejected: requests.filter((request) => request.status === "Rejected").length,
      revenue: formatAmount(
        requests
          .filter((request) => request.status === "Approved")
          .reduce((total, request) => total + request.amount, 0),
      ),
    }),
    [requests],
  );

  const filteredRequests = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    return requests.filter((request) => {
      const searchableText =
        `${request.studentName} ${request.studentEmail} ${request.plan} ${request.transactionId}`.toLowerCase();
      const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
      const matchesPlan = filters.plan === "All Plans" || request.plan === filters.plan;
      const matchesStatus = filters.status === "All Status" || request.status === filters.status;
      const matchesDate = filters.date === "All Dates" || request.submissionDate === filters.date;

      return matchesSearch && matchesPlan && matchesStatus && matchesDate;
    });
  }, [filters, requests]);

  return (
    <main className="manage-payments-page">
      <section className="manage-payments-hero" aria-labelledby="manage-payments-title">
        <div className="manage-payments-hero-copy">
          <span className="manage-payments-eyebrow">
            <SecurityIcon size={16} aria-hidden="true" />
            Payment Verification
          </span>
          <h1 id="manage-payments-title">Manage Payments</h1>
          <p>Review and approve Pro plan payment requests.</p>

          <div className="manage-payments-hero-badges" aria-label="Payment workflow tags">
            {managePaymentsHeroBadges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>

        <aside className="manage-payments-hero-panel" aria-label="Manual UPI workflow">
          <WorkflowIcon size={28} aria-hidden="true" />
          <div>
            <span>{managePaymentsWorkflowPanel.label}</span>
            <p>{managePaymentsWorkflowPanel.description}</p>
          </div>
        </aside>
      </section>

      <section className="manage-payments-shell" aria-label="Manage payments admin workspace">
        <section className="manage-payments-summary-grid" aria-label="Payment summary">
          {managePaymentsSummaryConfig.map((summary) => {
            const SummaryIcon = summary.icon;

            return (
              <article
                className={`manage-payments-summary-card manage-payments-summary-${summary.tone}`}
                key={summary.key}
              >
                <div className="manage-payments-summary-icon" aria-hidden="true">
                  <SummaryIcon size={25} />
                </div>
                <div>
                  <span>{summary.label}</span>
                  <strong>{summaryValues[summary.key]}</strong>
                  <p>{summary.note}</p>
                </div>
              </article>
            );
          })}
        </section>

        <div className="manage-payments-workspace-grid">
          <section className="manage-payments-table-card" aria-labelledby="manage-payments-table-title">
            <div className="manage-payments-section-heading">
              <div>
                <span>Payment Requests</span>
                <h2 id="manage-payments-table-title">Manual UPI approvals</h2>
              </div>
              <p>{filteredRequests.length} request rows visible</p>
            </div>

            <div className="manage-payments-filter-bar" aria-label="Payment request filters">
              <label className="manage-payments-search-field">
                <Search size={18} aria-hidden="true" />
                <input
                  type="search"
                  value={filters.search}
                  onChange={(event) => updateFilter("search", event.target.value)}
                  placeholder="Search student, email, or transaction ID"
                />
              </label>

              <label className="manage-payments-filter-field">
                <span>Plan Filter</span>
                <select value={filters.plan} onChange={(event) => updateFilter("plan", event.target.value)}>
                  <option>All Plans</option>
                  {managePaymentsPlans.map((plan) => (
                    <option key={plan}>{plan}</option>
                  ))}
                </select>
              </label>

              <label className="manage-payments-filter-field">
                <span>Status Filter</span>
                <select
                  value={filters.status}
                  onChange={(event) => updateFilter("status", event.target.value)}
                >
                  <option>All Status</option>
                  {managePaymentsStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>

              <label className="manage-payments-filter-field">
                <span>Date Filter</span>
                <select value={filters.date} onChange={(event) => updateFilter("date", event.target.value)}>
                  {dateOptions.map((date) => (
                    <option key={date}>{date}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="manage-payments-table-wrap">
              <div className="manage-payments-table" role="table" aria-label="Manual payment requests">
                <div className="manage-payments-table-row manage-payments-table-head" role="row">
                  <span role="columnheader">Student Name</span>
                  <span role="columnheader">Plan</span>
                  <span role="columnheader">Amount</span>
                  <span role="columnheader">Transaction ID</span>
                  <span role="columnheader">Date</span>
                  <span role="columnheader">Status</span>
                  <span role="columnheader">Screenshot</span>
                  <span role="columnheader">Actions</span>
                </div>

                {filteredRequests.map((request) => (
                  <div className="manage-payments-table-row" role="row" key={request.id}>
                    <span role="cell" data-label="Student Name">
                      <strong>{request.studentName}</strong>
                      <small>{request.studentEmail}</small>
                    </span>
                    <span role="cell" data-label="Plan">{request.plan}</span>
                    <span role="cell" data-label="Amount">{formatAmount(request.amount)}</span>
                    <span role="cell" data-label="Transaction ID">
                      <code>{request.transactionId}</code>
                    </span>
                    <span role="cell" data-label="Date">{request.submissionDate}</span>
                    <span role="cell" data-label="Status">
                      <span className={`manage-payments-status-pill manage-payments-status-${request.status.toLowerCase()}`}>
                        {request.status}
                      </span>
                    </span>
                    <span role="cell" data-label="Screenshot">
                      <span className="manage-payments-screenshot-pill">
                        <FileImage size={15} aria-hidden="true" />
                        Placeholder
                      </span>
                    </span>
                    <span className="manage-payments-row-actions" role="cell" data-label="Actions">
                      <button
                        className="manage-payments-approve-button"
                        type="button"
                        onClick={() => updateRequestStatus(request.id, "Approved")}
                      >
                        <Check size={15} aria-hidden="true" />
                        Approve
                      </button>
                      <button
                        className="manage-payments-reject-button"
                        type="button"
                        onClick={() => updateRequestStatus(request.id, "Rejected")}
                      >
                        <X size={15} aria-hidden="true" />
                        Reject
                      </button>
                      <button
                        className="manage-payments-details-button"
                        type="button"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <Eye size={15} aria-hidden="true" />
                        View Details
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {filteredRequests.length === 0 && (
              <div className="manage-payments-empty-state">
                <ShieldCheck size={28} aria-hidden="true" />
                <p>No payment requests match these filters.</p>
              </div>
            )}
          </section>

          <aside className="manage-payments-side-stack">
            <section className="manage-payments-activity-card" aria-labelledby="manage-payments-activity-title">
              <div className="manage-payments-section-heading manage-payments-section-heading-compact">
                <div>
                  <span>Recent Payment Activity</span>
                  <h2 id="manage-payments-activity-title">Latest updates</h2>
                </div>
              </div>

              <div className="manage-payments-activity-list">
                {managePaymentsActivity.map((activity) => {
                  const ActivityIcon = activity.icon;

                  return (
                    <article className="manage-payments-activity-item" key={activity.id}>
                      <div
                        className={`manage-payments-activity-icon manage-payments-activity-${activity.tone}`}
                        aria-hidden="true"
                      >
                        <ActivityIcon size={18} />
                      </div>
                      <div>
                        <h3>{activity.title}</h3>
                        <p>{activity.detail}</p>
                      </div>
                      <time>{activity.time}</time>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="manage-payments-notes-card" aria-labelledby="manage-payments-notes-title">
              <div className="manage-payments-notes-icon" aria-hidden="true">
                <CheckCircle2 size={28} />
              </div>
              <span>Admin Notes</span>
              <h2 id="manage-payments-notes-title">Verification reminders</h2>
              <ul>
                {managePaymentsAdminNotes.map((note) => (
                  <li key={note}>
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </section>

      {selectedRequest && (
        <div
          className="manage-payments-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedRequest(null)}
        >
          <section
            className="manage-payments-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="manage-payments-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="manage-payments-detail-heading">
              <div>
                <span>Payment Details</span>
                <h2 id="manage-payments-detail-title">{selectedRequest.studentName}</h2>
                <p>{selectedRequest.studentEmail}</p>
              </div>
              <button type="button" onClick={() => setSelectedRequest(null)} aria-label="Close payment details">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="manage-payments-detail-grid">
              <div className="manage-payments-detail-list">
                <div>
                  <span>Plan</span>
                  <strong>{selectedRequest.plan}</strong>
                </div>
                <div>
                  <span>Amount</span>
                  <strong>{formatAmount(selectedRequest.amount)}</strong>
                </div>
                <div>
                  <span>Transaction ID</span>
                  <strong>{selectedRequest.transactionId}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{selectedRequest.status}</strong>
                </div>
              </div>

              <div className="manage-payments-screenshot-preview">
                <ScreenshotIcon size={48} aria-hidden="true" />
                <strong>Screenshot Preview Placeholder</strong>
                <span>{selectedRequest.screenshotLabel}</span>
              </div>
            </div>

            <div className="manage-payments-submission-note">
              <span>Submission Notes</span>
              <p>{selectedRequest.notes}</p>
            </div>

            <div className="manage-payments-detail-actions">
              <button
                className="manage-payments-approve-button"
                type="button"
                onClick={() => updateRequestStatus(selectedRequest.id, "Approved")}
              >
                <Check size={15} aria-hidden="true" />
                Approve
              </button>
              <button
                className="manage-payments-reject-button"
                type="button"
                onClick={() => updateRequestStatus(selectedRequest.id, "Rejected")}
              >
                <X size={15} aria-hidden="true" />
                Reject
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default ManagePayments;
