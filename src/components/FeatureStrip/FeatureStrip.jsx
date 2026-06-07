import {
  FileQuestion,
  Layers,
  BarChart3,
  FileText,
} from "lucide-react";

import "./FeatureStrip.css";

function FeatureStrip() {
  const features = [
    {
      icon: <FileQuestion size={30} strokeWidth={2.3} />,
      title: "Past Year Questions",
      text: "10K+ Questions",
      color: "orange",
    },
    {
      icon: <Layers size={30} strokeWidth={2.3} />,
      title: "Daily Practice Questions",
      text: "New challenges daily",
      color: "green",
    },
    {
      icon: <BarChart3 size={30} strokeWidth={2.3} />,
      title: "Performance Analytics",
      text: "Track & improve",
      color: "purple",
    },
    {
      icon: <FileText size={30} strokeWidth={2.3} />,
      title: "Topic-wise Modules",
      text: "Structured learning",
      color: "blue",
    },
  ];

  return (
    <section className="feature-strip">
      {features.map((feature) => (
        <div className="feature-item" key={feature.title}>
          <div className={`feature-icon ${feature.color}`}>
            {feature.icon}
          </div>

          <div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default FeatureStrip;