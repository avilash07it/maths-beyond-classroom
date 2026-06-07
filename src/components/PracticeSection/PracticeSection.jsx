import {
  CalendarDays,
  Clock3,
  ClipboardList,
  Lightbulb,
} from "lucide-react";

import "./PracticeSection.css";

function PracticeSection() {
  return (
    <section className="practice-section">
      <div className="mock-card">
        <div className="mock-content">
          <span className="mock-label">UPCOMING MOCK TEST</span>
          <h2>INMO TEST-06</h2>

          <ul>
            <li>
              <CalendarDays size={17} strokeWidth={2.2} />
              10 September 2026
            </li>
            <li>
              <Clock3 size={17} strokeWidth={2.2} />
              10:00 AM - 1:00 PM
            </li>
            <li>
              <ClipboardList size={17} strokeWidth={2.2} />
              Full Syllabus | 60 Questions
            </li>
          </ul>

          <div className="mock-actions">
            <button>Register Now</button>
            <button className="outline-btn">View PYQs</button>
          </div>
        </div>

        <div className="trophy-area">
          <div className="trophy-ring"></div>

          <div className="premium-trophy">
            <div className="trophy-glow"></div>

            <svg viewBox="0 0 220 220" className="trophy-svg" aria-label="Trophy">
              <defs>
                <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff7ad" />
                  <stop offset="35%" stopColor="#facc15" />
                  <stop offset="70%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>

                <linearGradient id="trophyPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#4c1d95" />
                </linearGradient>
              </defs>

              <ellipse cx="110" cy="190" rx="62" ry="14" className="trophy-shadow" />

              <path
                d="M72 42 H148 V85 C148 118 132 136 110 136 C88 136 72 118 72 85 Z"
                className="cup-body"
              />

              <path
                d="M72 55 H45 C45 87 57 105 76 107"
                className="cup-handle"
              />

              <path
                d="M148 55 H175 C175 87 163 105 144 107"
                className="cup-handle"
              />

              <path d="M98 136 H122 V158 H98 Z" className="trophy-stem" />
              <path d="M75 158 H145 L158 185 H62 Z" className="trophy-base" />

              <path
                d="M88 58 C98 48 122 48 132 58"
                className="trophy-highlight"
              />

              <circle cx="110" cy="87" r="17" className="trophy-medal" />

              <text x="110" y="94" textAnchor="middle" className="trophy-star">
                ★
              </text>
            </svg>
          </div>

          <div className="registered-box">
            <b>1200+</b>
            <span>Students Registered</span>
          </div>
        </div>
      </div>

      <div className="problem-card">
        <div className="problem-header">
          <h2>Problem of the Day</h2>
          <span>10 hr 35 min left</span>
        </div>

        <p className="problem-topic">Geometry</p>

        <div className="problem-body">
          <div className="problem-text">
            <p>
              In triangle <b>ABC</b>, <b>AB = AC</b>. The bisectors of ∠B and ∠C
              intersect at <b>I</b>. If ∠A = 40°, find ∠BIC.
            </p>

            <div className="problem-actions">
              <button>
                View Hint <Lightbulb size={16} strokeWidth={2.2} />
              </button>
              <button className="solution-btn">View Solution</button>
            </div>

            <a href="#">Try more such challenges →</a>
          </div>

          <div className="triangle-diagram">
            <svg
              viewBox="0 0 220 180"
              className="geometry-svg"
              aria-label="Triangle ABC with angle bisectors meeting at I"
            >
              <polygon
                points="110,18 35,150 185,150"
                className="triangle-fill"
              />

              <path
                d="M110 18 L35 150 L185 150 Z"
                className="triangle-outline"
              />

              <path d="M35 150 L110 95" className="bisector-line" />
              <path d="M185 150 L110 95" className="bisector-line" />

              <circle cx="110" cy="95" r="4.5" className="point-dot" />

              <path d="M48 142 Q55 126 70 125" className="angle-arc" />
              <path d="M172 142 Q165 126 150 125" className="angle-arc" />
              <path d="M97 40 Q110 52 123 40" className="angle-arc" />

              <text x="110" y="11" className="svg-label" textAnchor="middle">
                A
              </text>
              <text x="26" y="164" className="svg-label" textAnchor="middle">
                B
              </text>
              <text x="194" y="164" className="svg-label" textAnchor="middle">
                C
              </text>
              <text x="110" y="88" className="svg-label" textAnchor="middle">
                I
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PracticeSection;