import { useNavigate } from "react-router-dom";
import heroLogo from "../../assets/mbc-logo-3.png";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-left">
        <div className="exam-pill">
        SEHSS&nbsp;&nbsp; | &nbsp;&nbsp;NMTC&nbsp;&nbsp; | &nbsp;&nbsp;IOQM&nbsp;&nbsp; | &nbsp;&nbsp;RMO & BEYOND    
        </div>
        <h1>
          Think Beyond.
          <br />
          <span>Solve Beyond.</span>
          <br />
          Achieve Beyond.
        </h1>

        <p>
          India’s most focused platform for Olympiad preparation, problem solving
          and mathematical excellence.
        </p>

        <div className="hero-actions">
          <button className="primary-action" onClick={() => navigate("/topics")}>Start Learning →</button>
          <button className="secondary-action" onClick={() => navigate("/mock-tests")}>Take a Mock Test →</button>
        </div>
      </div>

      <div className="hero-right">
        <div className="premium-math-visual">
          <div className="visual-glow"></div>

          <svg viewBox="0 0 520 520" className="math-network-svg">
            <circle cx="260" cy="260" r="170" className="orbit-ring ring-one" />
            <circle cx="260" cy="260" r="115" className="orbit-ring ring-two" />

            <line x1="260" y1="120" x2="135" y2="310" className="network-line" />
            <line x1="260" y1="120" x2="385" y2="310" className="network-line" />
            <line x1="135" y1="310" x2="385" y2="310" className="network-line" />
            <line x1="260" y1="120" x2="260" y2="260" className="network-line soft" />
            <line x1="135" y1="310" x2="260" y2="260" className="network-line soft" />
            <line x1="385" y1="310" x2="260" y2="260" className="network-line soft" />

            <circle cx="260" cy="120" r="13" className="node main-node" />
<circle cx="135" cy="310" r="11" className="node" />
<circle cx="385" cy="310" r="11" className="node" />

<text x="260" y="105" textAnchor="middle" className="svg-formula">
  A
</text>
            <text x="115" y="330" textAnchor="middle" className="svg-formula">
              B
            </text>
            <text x="405" y="330" textAnchor="middle" className="svg-formula">
              C
            </text>
            <circle cx="260" cy="260" r="27" className="hero-logo-backplate" />

            <image
  href={heroLogo}
  x="238"
  y="238"
  width="44"
  height="44"
  className="hero-center-logo"
/>

            <text x="92" y="190" className="floating-equation">
              x²+y²=r²
            </text>
            <text x="345" y="180" className="floating-equation">
              ∠ABC
            </text>
            <text x="205" y="420" className="floating-equation">
              a²+b²=c²
            </text>
            
          </svg>
        </div>

        <div className="float-card rank-card">
          🏆 <div><b>Your Rank</b><span># 12<br />This week</span></div>
        </div>

        <div className="float-card challenge-card">
          🔥 <div><b>Daily Challenge</b><span>10 / 10 solved<br />+10 Points</span></div>
        </div>

        <div className="float-card streak-card">
          ⚡ <div><b>Streak</b><span>23 Days<br />Keep it up!</span></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
