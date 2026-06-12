import { useState } from "react";
import { ArrowRight, BellRing, Check, Clock3, LockKeyhole, X } from "lucide-react";

import "./AdminDashboard.css";

import {
  adminDashboardActivities,
  adminDashboardManagementCards,
  adminDashboardPayments,
  adminDashboardReminders,
  adminDashboardSecurity,
  adminDashboardStats,
} from "./adminDashboardData";

function AdminDashboard() {
  const [payments, setPayments] = useState(adminDashboardPayments);
  const SecurityIcon = adminDashboardSecurity.icon;

  const updatePaymentStatus = (paymentId, status) => {
    setPayments((currentPayments) =>
      currentPayments.map((payment) =>
        payment.id === paymentId ? { ...payment, status } : payment,
      ),
    );
  };

  return (
    <main className="admin-dashboard-page">
      <section className="admin-dashboard-hero" aria-labelledby="admin-dashboard-title">
        <div className="admin-dashboard-hero-shell">
          <div className="admin-dashboard-hero-copy">
            <span className="admin-dashboard-secure-badge">
              <SecurityIcon size={16} aria-hidden="true" />
              {adminDashboardSecurity.badge}
            </span>
            <h1 id="admin-dashboard-title">Admin Dashboard</h1>
            <p>Manage lectures, study materials, PYQs, POTD, tests, and payment approvals.</p>
          </div>

          <aside className="admin-dashboard-hero-panel" aria-label="Admin workspace status">
            <div className="admin-dashboard-hero-panel-icon" aria-hidden="true">
              <LockKeyhole size={28} />
            </div>
            <div>
              <span>{adminDashboardSecurity.label}</span>
              <p>{adminDashboardSecurity.message}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="admin-dashboard-content" aria-label="Admin dashboard workspace">
        <div className="admin-dashboard-section-heading">
          <div>
            <span>Platform Overview</span>
            <h2>Today&apos;s control room</h2>
          </div>
          <p>Dummy data for MVP layout and future backend connection.</p>
        </div>

        <section className="admin-dashboard-stats-grid" aria-label="Overview stats">
          {adminDashboardStats.map((stat) => {
            const StatIcon = stat.icon;

            return (
              <article
                className={`admin-dashboard-stat-card admin-dashboard-tone-${stat.tone}`}
                key={stat.label}
              >
                <div className="admin-dashboard-stat-icon" aria-hidden="true">
                  <StatIcon size={25} />
                </div>
                <div>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <p>{stat.note}</p>
                </div>
              </article>
            );
          })}
        </section>

        <div className="admin-dashboard-workspace-grid">
          <section className="admin-dashboard-management-panel" aria-labelledby="admin-management-title">
            <div className="admin-dashboard-card-heading">
              <div>
                <span>Quick Management</span>
                <h2 id="admin-management-title">Admin actions</h2>
              </div>
            </div>

            <div className="admin-dashboard-management-grid">
              {adminDashboardManagementCards.map((card) => {
                const CardIcon = card.icon;

                return (
                  <article
                    className={`admin-dashboard-management-card admin-dashboard-tone-${card.tone}`}
                    key={card.title}
                  >
                    <div className="admin-dashboard-management-topline">
                      <div className="admin-dashboard-management-icon" aria-hidden="true">
                        <CardIcon size={26} />
                      </div>
                      <span>{card.meta}</span>
                    </div>

                    <h3>{card.title}</h3>
                    <p>{card.description}</p>

                    <a className="admin-dashboard-open-link" href={card.href}>
                      Open
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="admin-dashboard-notes-card" aria-labelledby="admin-notes-title">
            <div className="admin-dashboard-notes-icon" aria-hidden="true">
              <BellRing size={26} />
            </div>
            <div>
              <span>Admin Notes</span>
              <h2 id="admin-notes-title">Reminder checklist</h2>
            </div>
            <ul>
              {adminDashboardReminders.map((reminder) => (
                <li key={reminder}>
                  <Check size={16} aria-hidden="true" />
                  <span>{reminder}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="admin-dashboard-lower-grid">
          <section className="admin-dashboard-payments-card" aria-labelledby="admin-payments-title">
            <div className="admin-dashboard-card-heading">
              <div>
                <span>Payment Requests</span>
                <h2 id="admin-payments-title">Manual UPI preview</h2>
              </div>
              <span className="admin-dashboard-pending-pill">
                <Clock3 size={14} aria-hidden="true" />
                {payments.filter((payment) => payment.status === "Pending").length} pending
              </span>
            </div>

            <div className="admin-dashboard-payment-list" role="table" aria-label="Payment requests">
              <div className="admin-dashboard-payment-row admin-dashboard-payment-row-head" role="row">
                <span role="columnheader">Student Name</span>
                <span role="columnheader">Plan</span>
                <span role="columnheader">Amount</span>
                <span role="columnheader">Status</span>
                <span role="columnheader">Action</span>
              </div>

              {payments.map((payment) => (
                <div className="admin-dashboard-payment-row" role="row" key={payment.id}>
                  <span role="cell" data-label="Student Name">
                    {payment.studentName}
                  </span>
                  <span role="cell" data-label="Plan">
                    {payment.plan}
                  </span>
                  <span role="cell" data-label="Amount">
                    {payment.amount}
                  </span>
                  <span role="cell" data-label="Status">
                    <span
                      className={`admin-dashboard-status-pill admin-dashboard-status-${payment.status.toLowerCase()}`}
                    >
                      {payment.status}
                    </span>
                  </span>
                  <span className="admin-dashboard-payment-actions" role="cell" data-label="Action">
                    <button
                      className="admin-dashboard-approve-button"
                      type="button"
                      onClick={() => updatePaymentStatus(payment.id, "Approved")}
                    >
                      <Check size={15} aria-hidden="true" />
                      Approve
                    </button>
                    <button
                      className="admin-dashboard-reject-button"
                      type="button"
                      onClick={() => updatePaymentStatus(payment.id, "Rejected")}
                    >
                      <X size={15} aria-hidden="true" />
                      Reject
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="admin-dashboard-activity-card" aria-labelledby="admin-activity-title">
            <div className="admin-dashboard-card-heading">
              <div>
                <span>Recent Activity</span>
                <h2 id="admin-activity-title">Latest admin updates</h2>
              </div>
            </div>

            <div className="admin-dashboard-activity-list">
              {adminDashboardActivities.map((activity) => {
                const ActivityIcon = activity.icon;

                return (
                  <article className="admin-dashboard-activity-item" key={`${activity.title}-${activity.time}`}>
                    <div
                      className={`admin-dashboard-activity-icon admin-dashboard-tone-${activity.tone}`}
                      aria-hidden="true"
                    >
                      <ActivityIcon size={19} />
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
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
