import { Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./TestSeriesBanner.css";

function TestSeriesBanner() {
  const navigate = useNavigate();

  return (
    <section className="test-banner">
      <div className="banner-left">
        <div className="banner-icon">
          <Target size={48} strokeWidth={2.2} />
        </div>

        <div>
          <h2>Test Series: Simulate. Analyze. Improve.</h2>

          <p>Full length tests, detailed solutions and rank prediction.</p>
        </div>
      </div>

      <button className="banner-btn" onClick={() => navigate("/mock-tests")}>Explore Test Series →</button>
    </section>
  );
}

export default TestSeriesBanner;
