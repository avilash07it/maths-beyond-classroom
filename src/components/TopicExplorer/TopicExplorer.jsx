import "./TopicExplorer.css";

function TopicExplorer() {
  const topics = [
    { icon: "√x", title: "Algebra", problems: "320 Problems", color: "green", progress: 0 },
  
    { icon: "◼●", title: "Geometry", problems: "280 Problems", color: "purple", progress: 0 },
  
    { icon: "#", title: "Number Theory", problems: "250 Problems", color: "orange", progress: 0 },
  
    { icon: "△", title: "Combinatorics", problems: "210 Problems", color: "yellow", progress: 0 },
  
    { icon: "∞", title: "Advanced", problems: "70 Problems", color: "blue", progress: 0 },
  ];

  return (
    <section className="topic-section">
      <div className="topic-header">
      <h2>Master the Core Topics</h2>
        <a href="#">View all topics →</a>
      </div>

      <div className="topic-grid">
        {topics.map((topic) => (
          <div className={`topic-card ${topic.color}`} key={topic.title}>
            <div className="topic-icon">{topic.icon}</div>
            <h3>{topic.title}</h3>
            <span>{topic.problems}</span>
            <p>Explore →</p>

            <div className="topic-progress">
              <div style={{ width: `${topic.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopicExplorer;