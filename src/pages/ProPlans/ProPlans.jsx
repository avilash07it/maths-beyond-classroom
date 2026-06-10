import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Crown,
  FileText,
  Flame,
  Gem,
  HelpCircle,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import "./ProPlans.css";
import {
  freeFeatures,
  paidFeatures,
  proBenefits,
  proHeroChips,
  proPlans,
} from "./proPlansData";

const accentIcons = {
  blue: Target,
  purple: Sparkles,
  gold: Crown,
};

const freeIcons = [BookOpen, FileText, BadgeCheck, Flame];
const paidIcons = [Trophy, MessageCircle, HelpCircle];

function ProPlans() {
  const navigate = useNavigate();

  const handleChoosePlan = (planId) => {
    navigate(`/manual-payment?plan=${planId}`);
  };

  return (
    <div className="proplans-page">
      <DashboardNavbar />

      <main className="proplans-shell">
        <section className="proplans-hero">
          <div className="proplans-hero-copy">
            <span className="proplans-hero-kicker">
              <Crown size={18} />
              Go Pro
            </span>
            <h1>
              Choose Your <span>Plan</span>
            </h1>
            <p>
              Unlock premium practice, expert guidance, and advanced Olympiad
              preparation.
            </p>

            <div className="proplans-hero-chips">
              {proHeroChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>

          <div className="proplans-crown-visual" aria-hidden="true">
            <span className="proplans-gold-star proplans-gold-star-one">✦</span>
            <span className="proplans-gold-star proplans-gold-star-two">✦</span>
            <span className="proplans-gold-star proplans-gold-star-three">✦</span>
            <div className="proplans-crown-orbit"></div>
            <div className="proplans-crown">
              <Crown size={116} />
            </div>
            <div className="proplans-crown-base"></div>
          </div>
        </section>

        <section className="proplans-plans-area" aria-labelledby="proplans-pricing-title">
          <div className="proplans-section-heading">
            <div>
              <span>Plans</span>
              <h2 id="proplans-pricing-title">Pick the preparation track that fits you</h2>
            </div>
            <p>Prices are simple, manual, and easy to update later.</p>
          </div>

          <div className="proplans-card-grid">
            {proPlans.map((plan) => {
              const Icon = accentIcons[plan.accent] || Target;

              return (
                <article
                  className={`proplans-price-card proplans-price-card-${plan.accent} ${
                    plan.recommended ? "proplans-price-card-recommended" : ""
                  } ${plan.premium ? "proplans-price-card-premium" : ""}`}
                  key={plan.id}
                >
                  {plan.badge && (
                    <span className="proplans-recommended-badge">
                      <Sparkles size={14} />
                      {plan.badge}
                    </span>
                  )}

                  <div className="proplans-price-icon">
                    <Icon size={34} />
                  </div>
                  <h3>{plan.name}</h3>
                  <strong>{plan.price}</strong>
                  <p>{plan.description}</p>

                  <h4 className="proplans-includes-heading">{plan.includesHeading}</h4>

                  <div className="proplans-feature-list">
                    {plan.features.map((feature) => (
                      <div key={feature}>
                        <CheckCircle2 size={17} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="proplans-best-for">
                    <span>Best For:</span>
                    <p>{plan.bestFor}</p>
                  </div>

                  <button type="button" onClick={() => handleChoosePlan(plan.id)}>
                    Choose Plan
                    <ArrowRight size={17} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="proplans-comparison-area">
          <div className="proplans-comparison-card proplans-free-card">
            <div className="proplans-comparison-heading">
              <span>
                <ShieldCheck size={23} />
              </span>
              <div>
                <h2>Free For All Students</h2>
                <p>These core resources stay open and accessible.</p>
              </div>
            </div>

            <div className="proplans-comparison-list">
              {freeFeatures.map((feature, index) => {
                const Icon = freeIcons[index] || BookOpen;
                return (
                  <div key={feature}>
                    <Icon size={18} />
                    {feature}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="proplans-comparison-card proplans-paid-card">
            <div className="proplans-comparison-heading">
              <span>
                <LockKeyhole size={23} />
              </span>
              <div>
                <h2>Included In Pro</h2>
                <p>Paid features focus on assessment and personal guidance.</p>
              </div>
            </div>

            <div className="proplans-comparison-list">
              {paidFeatures.map((feature, index) => {
                const Icon = paidIcons[index] || Trophy;
                return (
                  <div key={feature}>
                    <Icon size={18} />
                    {feature}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="proplans-manual-note">
          <span>
            <Gem size={28} />
          </span>
          <div>
            <h2>Manual UPI Payment Approval</h2>
            <p>
              Payment is currently handled manually through UPI. After payment,
              admin approval activates Pro access for the selected plan.
            </p>
          </div>
        </section>

        <section className="proplans-benefit-strip">
          <div className="proplans-benefit-title">
            <span>
              <Gem size={30} />
            </span>
            <h2>Why Upgrade to Pro?</h2>
          </div>
          {proBenefits.map((benefit) => (
            <div className="proplans-benefit-item" key={benefit}>
              <CheckCircle2 size={20} />
              <span>{benefit}</span>
            </div>
          ))}
        </section>

        <section className="proplans-bottom-cta">
          <div>
            <h2>Start with the right plan for your exam goal.</h2>
            <p>Choose IOQM, SEHSS, or the combo plan and continue with manual payment approval.</p>
          </div>
          <button type="button" onClick={() => handleChoosePlan("ioqm-sehss-combo")}>
            Choose Best Value
            <ArrowRight size={17} />
          </button>
        </section>
      </main>
    </div>
  );
}

export default ProPlans;
