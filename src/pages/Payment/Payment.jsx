import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  BadgeIndianRupee,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Copy,
  CreditCard,
  FileImage,
  LockKeyhole,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Sparkles,
  Upload,
  WalletCards,
} from "lucide-react";
import DashboardNavbar from "../Dashboard/DashboardNavbar";
import "./Payment.css";
import {
  paymentHeroChips,
  paymentStatusSteps,
  paymentSupport,
  upiPaymentDetails,
} from "./paymentData";
import api from "../../utils/api";

function Payment() {
  const [searchParams] = useSearchParams();
  const selectedPlanId = searchParams.get("plan");
  const [transactionId, setTransactionId] = useState("");
  const [note, setNote] = useState("");
  const [screenshotName, setScreenshotName] = useState("");
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isPlanLoading, setIsPlanLoading] = useState(true);
  const [planError, setPlanError] = useState("");

  const paymentStatus = isSubmitted ? "Pending" : selectedPlan?.status || "Not Submitted";
  const selectedPlanPrice = selectedPlan
    ? `Rs ${selectedPlan.price}`
    : "";

  useEffect(() => {
    const fetchSelectedPlan = async () => {
      if (!selectedPlanId) {
        setSelectedPlan(null);
        setPlanError("We could not find the selected plan. Please choose a plan again.");
        setIsPlanLoading(false);
        return;
      }

      try {
        setIsPlanLoading(true);
        setPlanError("");

        const response = await api.get("/plans");
        const plans = response.data?.data || [];
        const matchingPlan = plans.find((plan) => String(plan.id) === selectedPlanId);

        if (!matchingPlan) {
          setSelectedPlan(null);
          setPlanError("We could not find the selected plan. Please choose a plan again.");
          return;
        }

        setSelectedPlan(matchingPlan);
      } catch (requestError) {
        setSelectedPlan(null);
        setPlanError(
          requestError.response?.data?.message ||
            "Unable to load the selected plan. Please try again."
        );
      } finally {
        setIsPlanLoading(false);
      }
    };

    fetchSelectedPlan();
  }, [selectedPlanId]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "potd_images");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/awz3yehg/image/upload",
      formData
    );

    return response.data.secure_url;
  };

  const handleScreenshotChange = (event) => {
    const file = event.target.files?.[0] || null;

    setScreenshotFile(file);
    setScreenshotName(file?.name || "");

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    if (!transactionId.trim()) {
      setError("Please enter your transaction ID.");
      setIsLoading(false);
      return;
    }

    if (!screenshotFile) {
      setError("Please upload your payment screenshot.");
      setIsLoading(false);
      return;
    }

    try {
      const screenshotUrl = await uploadToCloudinary(screenshotFile);

      await api.post("/payments", {
        planId: selectedPlan.id,
        amount: Number(String(selectedPlan.price).replace(/[^\d.]/g, "")),
        transactionId: transactionId.trim(),
        screenshotUrl,
      });

      setIsSubmitted(true);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to submit payment request. Please try again."
      );
      setIsSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <DashboardNavbar />

      <main className="payment-shell">
        {isPlanLoading ? (
          <p>Loading selected plan...</p>
        ) : planError ? (
          <p>{planError}</p>
        ) : (
          <>
        <section className="payment-hero">
          <div className="payment-hero-copy">
            <span className="payment-hero-kicker">
              <WalletCards size={17} />
              Manual Payment
            </span>
            <h1>
              Complete Your <span>Payment</span>
            </h1>
            <p>Secure your Pro access through manual UPI payment and admin approval.</p>

            <div className="payment-hero-chips">
              {paymentHeroChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>

          <div className="payment-hero-visual" aria-hidden="true">
            <div className="payment-orbit payment-orbit-one"></div>
            <div className="payment-orbit payment-orbit-two"></div>
            <div className="payment-wallet-mark">
              <BadgeIndianRupee size={84} />
            </div>
            <div className="payment-wallet-base"></div>
            <span className="payment-float payment-float-one">UPI</span>
            <span className="payment-float payment-float-two">₹</span>
            <span className="payment-float payment-float-three">✓</span>
          </div>
        </section>

        <section className="payment-main-grid">
          <div className="payment-left-column">
            <article className="payment-plan-card">
              <div className="payment-card-heading">
                <span>
                  <Sparkles size={22} />
                </span>
                <div>
                  <h2>Selected Plan Summary</h2>
                  <p>Review your plan before completing payment.</p>
                </div>
              </div>

              <div className="payment-plan-header">
                <div>
                  <span className="payment-plan-label">Selected Plan</span>
                  <h3>{selectedPlan.name}</h3>
                </div>
                <strong>{selectedPlanPrice}</strong>
              </div>

              <div className="payment-student-row">
                <span>Student Name</span>
                <strong>{selectedPlan.studentName}</strong>
              </div>

              <div className={`payment-status-pill ${isSubmitted ? "payment-status-pending" : ""}`}>
                <Clock3 size={16} />
                Payment Status: {paymentStatus}
              </div>

              <div className="payment-feature-list">
                {(selectedPlan.features || []).map((feature) => (
                  <div key={feature}>
                    <CheckCircle2 size={17} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="payment-submit-card">
              <div className="payment-card-heading">
                <span>
                  <Upload size={22} />
                </span>
                <div>
                  <h2>Submit Payment Request</h2>
                  <p>Share payment proof for manual admin verification.</p>
                </div>
              </div>

              <form className="payment-form" onSubmit={handleSubmit}>
                <label>
                  Transaction ID
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(event) => setTransactionId(event.target.value)}
                    placeholder="Enter UPI transaction/reference ID"
                  />
                </label>

                <label>
                  Upload Payment Screenshot
                  <div className="payment-upload-field">
                    <FileImage size={20} />
                    <span>{screenshotName || "Choose screenshot placeholder"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotChange}
                    />
                  </div>
                </label>

                <label>
                  Optional Note
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Add any payment note for admin"
                    rows="4"
                  />
                </label>

                {error && <p>{error}</p>}

                <button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Payment Request
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>

              {isSubmitted && (
                <div className="payment-success-message">
                  <ClipboardCheck size={21} />
                  <div>
                    <h3>Payment request submitted</h3>
                    <p>Your status is now Pending. Admin approval will activate Pro access.</p>
                  </div>
                </div>
              )}
            </article>
          </div>

          <aside className="payment-right-column">
            <article className="payment-upi-card">
              <div className="payment-card-heading">
                <span>
                  <QrCode size={22} />
                </span>
                <div>
                  <h2>UPI Payment</h2>
                  <p>Pay manually using your preferred UPI app.</p>
                </div>
              </div>

              <div className="payment-qr-placeholder">
                <QrCode size={74} />
                <span>QR Code Placeholder</span>
              </div>

              <div className="payment-detail-list">
                <div>
                  <span>UPI ID</span>
                  <strong>{upiPaymentDetails.upiId}</strong>
                  <Copy size={16} />
                </div>
                <div>
                  <span>Phone Number</span>
                  <strong>{upiPaymentDetails.phone}</strong>
                  <Copy size={16} />
                </div>
                <div>
                  <span>Amount</span>
                  <strong>{selectedPlanPrice}</strong>
                </div>
              </div>

              <p className="payment-upi-note">{upiPaymentDetails.note}</p>
            </article>

            <article className="payment-info-card">
              <div className="payment-card-heading compact">
                <span>
                  <ShieldCheck size={22} />
                </span>
                <div>
                  <h2>Status & Verification</h2>
                  <p>How manual approval works.</p>
                </div>
              </div>

              <div className="payment-status-list">
                {paymentStatusSteps.map((step, index) => (
                  <div key={step}>
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="payment-support-card">
              <span>
                <MessageCircle size={25} />
              </span>
              <div>
                <h2>{paymentSupport.title}</h2>
                <p>{paymentSupport.description}</p>
                <button
  type="button"
  onClick={() => window.open("https://wa.me/91XXXXXXXXXX", "_blank")}
>
  {paymentSupport.action}
  <ArrowRight size={16} />
</button>
              </div>
            </article>
          </aside>
        </section>

        <section className="payment-bottom-cta">
          <div>
            <h2>Admin approval activates your Pro access.</h2>
            <p>Submit the payment proof once you complete the UPI transfer.</p>
          </div>
          <div className="payment-bottom-lock">
            <LockKeyhole size={32} />
            <span>Manual Verification</span>
          </div>
        </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Payment;
