import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  CalendarCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Repeat2,
  Sparkles,
  Target,
  Users,
  Video,
} from "lucide-react";

import DashboardNavbar from "../Dashboard/DashboardNavbar";
import PageTransition from "../../components/PageTransition";
import "./About.css";

const offerCards = [
  {
    title: "Live Classes",
    description: "Interactive sessions that build clarity through discussion, examples, and guided problem solving.",
    icon: Video,
  },
  {
    title: "Recorded Lectures",
    description: "Structured lessons students can revisit anytime for revision, catch-up, and deeper understanding.",
    icon: BookOpenCheck,
  },
  {
    title: "Practice Sheets",
    description: "Carefully selected problems that move from core ideas to Olympiad-level applications.",
    icon: FileText,
  },
  {
    title: "Mock Tests",
    description: "Exam-style assessments for IOQM, RMO, NMTC, SEHSS, and school-level preparation.",
    icon: ClipboardList,
  },
  {
    title: "Problem of the Day",
    description: "A daily challenge to keep mathematical thinking active, sharp, and consistent.",
    icon: Lightbulb,
  },
  {
    title: "Personal Support",
    description: "Mentorship and doubt support so students know what to practice and how to improve.",
    icon: MessageCircle,
  },
];

const choiceCards = [
  {
    title: "Concept-first Learning",
    description: "We focus on why a method works before asking students to apply it.",
    icon: Brain,
  },
  {
    title: "Olympiad-focused Content",
    description: "Lessons and practice are aligned with the thinking style required for competitive mathematics.",
    icon: Target,
  },
  {
    title: "Regular Practice",
    description: "Frequent sheets, PYQs, POTD, and mock tests help turn understanding into performance.",
    icon: Repeat2,
  },
  {
    title: "Dedicated Mentorship",
    description: "Students get direction, feedback, and support throughout their preparation journey.",
    icon: Users,
  },
];

function About() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="about-page">
        <DashboardNavbar />

        <main className="about-shell">
          <section className="about-hero">
            <div className="about-hero-copy">
              <span className="about-kicker">
                <Sparkles size={18} />
                Olympiad Mathematics
              </span>
              <h1>
                About Maths Beyond <span>Classroom</span>
              </h1>
              <p>
                Maths Beyond Classroom helps students prepare for Olympiad
                Mathematics with clear concepts, consistent practice, and
                mentor-led guidance for IOQM, RMO, NMTC, SEHSS, CBSE IX, and
                CBSE X.
              </p>
            </div>

            <div className="about-hero-panel" aria-hidden="true">
              <div className="about-equation-card">
                <span>Think</span>
                <strong>Understand</strong>
                <em>Solve</em>
              </div>
              <div className="about-topic-grid">
                <span>IOQM</span>
                <span>RMO</span>
                <span>NMTC</span>
                <span>SEHSS</span>
                <span>CBSE IX</span>
                <span>CBSE X</span>
              </div>
            </div>
          </section>

          <section className="about-mission">
            <div className="about-section-label">Mission</div>
            <div>
              <h2>Build mathematical thinking, not memorized shortcuts.</h2>
              <p>
                Our goal is to help students understand ideas deeply, connect
                concepts across topics, and approach unfamiliar problems with
                confidence. Instead of treating mathematics as a list of tricks,
                we train students to reason, explore, test patterns, and write
                solutions with clarity.
              </p>
            </div>
          </section>

          <section className="about-section">
            <div className="about-section-heading">
              <span>What We Offer</span>
              <h2>Everything students need for steady preparation</h2>
            </div>

            <div className="about-offer-grid">
              {offerCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article className="about-feature-card" key={card.title}>
                    <div className="about-card-icon">
                      <Icon size={26} />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="about-kota-card">
            <div className="about-kota-icon">
              <GraduationCap size={30} />
            </div>
            <div>
              <span>Faculty Network</span>
              <h2>Learn from Top Faculties of Kota</h2>
              <p>
                Maths Beyond Classroom brings together experienced educators
                inspired by Kota's renowned Olympiad coaching culture. Our goal
                is to provide high-quality guidance, concept-driven learning and
                structured preparation to students across India through
                accessible online education.
              </p>
            </div>
          </section>

          <section className="about-section">
            <div className="about-section-heading">
              <span>Why Choose Us</span>
              <h2>A focused path for serious learners</h2>
            </div>

            <div className="about-choice-grid">
              {choiceCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article className="about-choice-card" key={card.title}>
                    <Icon size={24} />
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="about-vision">
            <div className="about-section-label">Our Vision</div>
            <h2>Make Olympiad Mathematics approachable, rigorous, and inspiring.</h2>
            <p>
              We want every motivated student to have access to high-quality
              mathematical training, whether they are beginning with school
              fundamentals or preparing for advanced competitions. The long-term
              vision is to create a learning environment where curiosity,
              discipline, and problem-solving maturity grow together.
            </p>
          </section>

          <section className="about-bottom-cta">
            <div>
              <CalendarCheck size={30} />
              <h2>Ready to begin your Olympiad journey?</h2>
              <p>Start with the topics, then build through lectures, sheets, PYQs, and tests.</p>
            </div>
            <button type="button" onClick={() => navigate("/topics")}>
              Explore Courses
              <ArrowRight size={17} />
            </button>
          </section>
        </main>
      </div>
    </PageTransition>
  );
}

export default About;
