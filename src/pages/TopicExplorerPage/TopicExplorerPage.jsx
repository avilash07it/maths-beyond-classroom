import { topics } from "./topicsData";
import "./TopicExplorerPage.css";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import { FaWhatsapp } from "react-icons/fa";

function TopicExplorerPage() {
  return (
    <div className="topics-page">
      <DashboardNavbar />

      <section className="topics-hero">
        <div className="topics-hero-content">
          <h1>
            Explore <span>Topics</span>
          </h1>

          <p>Choose a topic and begin your Olympiad journey.</p>

          <input
            className="topics-search"
            type="text"
            placeholder="Search topics, lectures, PYQs..."
          />

          <select className="topics-filter">
            <option>IOQM</option>
            <option>RMO</option>
            <option>NMTC</option>
            <option>SEHSS</option>
            <option>CBSE IX & X</option>
          </select>
        </div>

        <div className="topics-hero-visual">
  <div className="geometry-orbit orbit-one"></div>
  <div className="geometry-orbit orbit-two"></div>

  <div className="shape-card shape-triangle"></div>
  <div className="shape-card shape-circle"></div>
  <div className="shape-card shape-square"></div>

  <span className="glow-dot dot-one"></span>
  <span className="glow-dot dot-two"></span>
  <span className="glow-dot dot-three"></span>
</div>
      </section>

      <section className="topics-content">
        <main className="topics-main">
          <div className="topics-header">
            <h2>Core Topics</h2>
            <span>4 Core Topics</span>
          </div>

          <div className="topics-grid">
            {topics.map((topic) => {
              const TopicIcon = topic.icon;

              return (
                <div className={`topic-card ${topic.color}`} key={topic.title}>
                  <div className="topic-icon">
                    <TopicIcon size={38} />
                  </div>

                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>

                  <div className="topic-meta">
                    <span>{topic.lectures} Lectures</span>
                    <span>{topic.materials} Notes</span>
                  </div>

                  <button>Explore →</button>
                </div>
              );
            })}
          </div>
          <div className="topics-pro-card">
  <div>
    <span className="topics-pro-label">GO PRO</span>
    <h2>Unlock Test Series & Personal Support</h2>
    <p>
      Get access to advanced test series, detailed solutions and mentor support.
    </p>

    <div className="topics-pro-benefits">
      <span>Test Series</span>
      <span>Detailed Solutions</span>
      <span>Mentor Support</span>
    </div>

    <button>Explore Pro Plans →</button>
  </div>

  <div className="topics-pro-crown">♛</div>
</div>
        </main>

        <aside className="topics-sidebar">
          <div className="topics-side-card">
            <h3>Filter by Exam</h3>

            <div className="exam-filter-list">
              <button>IOQM</button>
              <button>RMO</button>
              <button>NMTC</button>
              <button>SEHSS</button>
              <button>CBSE IX & X</button>
            </div>
          </div>

          <div className="topics-help-card">
            <div className="topics-whatsapp-icon">
              <FaWhatsapp />
            </div>

            <div>
              <h3>Need help choosing a topic?</h3>
              <p>Talk to a mentor for guidance.</p>
              <a href="#">WhatsApp Support →</a>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default TopicExplorerPage;