import {
  BookOpen,
  NotebookPen,
  FileText,
  Trophy,
} from "lucide-react";

import "./StatsBar.css";

function StatsBar() {
  const stats = [
    {
      icon: <BookOpen size={42} strokeWidth={2} />,
      number: "1000+",
      label: "Problems",
    },
    {
      icon: <NotebookPen size={42} strokeWidth={2} />,
      number: "50+",
      label: "Topic Notes",
    },
    {
      icon: <FileText size={42} strokeWidth={2} />,
      number: "30+",
      label: "Sample Papers",
    },
    {
      icon: <Trophy size={42} strokeWidth={2} />,
      number: "400+",
      label: "Olympiad Selections",
    },
  ];

  return (
    <section className="stats-bar">
      {stats.map((stat) => (
        <div className="stat-item" key={stat.label}>
          <div className="stat-icon">{stat.icon}</div>

          <div>
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default StatsBar;