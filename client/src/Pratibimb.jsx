import { authAPI, submitTeamApplication } from "./api";

import { useEffect, useState } from "react";
import "./Pratibimb.css";

const achievements = [
  {
    year: "2024",
    title: "First Prize - Inter-College Drama Festival",
    description:
      "Recognized for an original production on social themes.",
  },
  {
    year: "2023",
    title: "Best Script Award",
    description:
      "For a self-written play at the university Youth Festival.",
  },
  {
    year: "2022",
    title: "Second Prize - State Level Theatre Competition",
    description:
      "Appreciated for innovative storytelling and direction.",
  },
];

export default function Pratibimb() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showApplication, setShowApplication] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    department: "",
    year: "",
    reason: "",
  });

  useEffect(() => {
    let active = true;

    authAPI.getProfile()
      .then((data) => {
        if (!active) return;
        if (!data.student) {
          setProfileError("Unable to load your profile. Please try again.");
          return;
        }

        setFormData((current) => ({
          ...current,
          name: data.student.fullName || "",
          usn: data.student.studentId || "",
          department: data.student.department || "",
          year: data.student.year || "",
        }));
        setProfileLoaded(true);
      })
      .catch((error) => {
        if (!active) return;
        setProfileError(
          error.status === 401
            ? "Please log in before applying."
            : "Unable to load your profile. Please try again."
        );
      });

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit application to backend
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileLoaded) {
      alert(profileError || "Please wait for your profile to load before applying.");
      return;
    }

    try {
      await submitTeamApplication(formData, "Drama Club", "Pratibimb");
      alert("Your application to Pratibimb has been submitted successfully! You can track its status under 'My Application'.");
      setShowApplication(false);
      setFormData((current) => ({ ...current, reason: "" }));
    } catch (err) {
      alert(err.message || "Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="prati-page">

      {/* NAVBAR */}
      <header className="prati-navbar">
        <a href="/" className="prati-brand">
          <span className="prati-brand-mark">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>ClubGrid</span>
        </a>

        <nav className="prati-nav">
          <a href="/">Home</a>
          <a href="/#clubs" className="prati-nav-active">
            Clubs
          </a>
          <a href="/my-applications">My Applications</a>
          <a href="/events">Events</a>
          <a href="/announcements">Announcement</a>
        </nav>

        <a
          href="/login"
          className="prati-profile"
          aria-label="Profile"
        >
          <span>B</span>
          <span className="prati-profile-arrow">▾</span>
        </a>
      </header>

      {/* HERO */}
      <section className="prati-hero">
        <img style={{width:"250px"}}
          className="prati-hero-logo"
          src="/pratibimb.png"
          alt="PratiBimb logo"
        />

        <img style={{width:"1500px"}}
          className="prati-hero-banner"
          src="https://i.pinimg.com/1200x/f0/06/00/f006006db1cd84abd389c29cc49b6cb4.jpg"
          alt="Drama theatrical masks"
        />
      </section>

      {/* CLUB INTRODUCTION */}
      <main className="prati-content">
        <section className="prati-intro">
          <div className="prati-intro-text">
            <h1>About PratiBimb</h1>

            <p>
              Pratibimb is SDMCET’s Hindi dramatics club, established
              in 2009. It brings stories to life through street plays,
              mad ads, and skits, providing students a platform to
              express their creativity and showcase their acting
              talents.
            </p>
          </div>

          <div className="prati-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "Overview"}
              className={activeTab === "Overview" ? "active" : ""}
              onClick={() => setActiveTab("Overview")}
            >
              Overview
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "Gallary"}
              className={activeTab === "Gallary" ? "active" : ""}
              onClick={() => setActiveTab("Gallary")}
            >
              Gallary
            </button>
          </div>
        </section>

        {activeTab === "Overview" ? (
          <section className="prati-dashboard">

            {/* ACHIEVEMENTS */}
            <article className="prati-panel prati-achievements">
              <h2>
                <span className="prati-heading-icon">🏆</span>
                Achievements
              </h2>

              <div className="prati-achievement-list">
                {achievements.map((item) => (
                  <div
                    className="prati-achievement-row"
                    key={item.year}
                  >
                    <span className="prati-trophy">🏆</span>

                    <span className="prati-year">
                      {item.year}
                    </span>

                    <div className="prati-achievement-text">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* RIGHT COLUMN */}
            <div className="prati-right-column">

              <article className="prati-panel prati-team-info">
                <div className="prati-member-count">
                  <span className="prati-group-icon">♟♟</span>
                  <span>25+ Members</span>
                </div>

                <div className="prati-coordinator">
                  <span className="prati-person-icon">♟</span>

                  <div className="prati-coordinator-text">
                    <h3>Team Coordinator</h3>
                    <p>Prof. A.K.Desai</p>
                  </div>

                  <span className="prati-coordinator-year">
                    2018
                  </span>
                </div>
              </article>

              {/* APPLY PANEL */}
              <article className="prati-panel prati-apply-panel">
                <h2>
                  <span className="prati-apply-icon">▤</span>
                  Apply to join
                </h2>

                <p>
                  Ready to step into the spotlight? Take your first
                  step with Pratibimb and let your passion for drama
                  shine!
                </p>

                <button
                  type="button"
                  className="prati-apply-button"
                  onClick={() => setShowApplication(true)}
                >
                  Apply to join
                </button>
              </article>

            </div>
          </section>
        ) : (
          <section className="prati-panel prati-gallery">
            <h2>Gallary</h2>

            <img
              src="/pratibimb.png"
              alt="PratiBimb logo"
            />

            <img
              src="/drama-banner.png"
              alt="PratiBimb theatre masks"
            />
          </section>
        )}
      </main>

      {/* APPLICATION OVERLAY */}
      {showApplication && (
        <div
          className="prati-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget && !submitting) {
              setShowApplication(false);
            }
          }}
        >
          <div
            className="prati-application-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="prati-modal-title"
          >

            {/* MODAL HEADER */}
            <div className="prati-modal-header">
              <div>
                <span className="prati-modal-eyebrow">
                  CLUBGRID APPLICATION
                </span>

                <h2 id="prati-modal-title">
                  Join PratiBimb 🎭
                </h2>

                <p>
                  Your stage awaits. Tell us a little about yourself!
                </p>
              </div>

              <button
                type="button"
                className="prati-modal-close"
                onClick={() => setShowApplication(false)}
                aria-label="Close application"
                disabled={submitting}
              >
                ×
              </button>
            </div>

            {/* MODAL FORM */}
            <form
              className="prati-application-form"
              onSubmit={handleSubmit}
            >

              <div className="prati-form-group">
                <label htmlFor="prati-name">
                  Full Name
                </label>

                <input
                  id="prati-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  readOnly
                  required
                />
              </div>

              <div className="prati-form-group">
                <label htmlFor="prati-usn">
                  USN
                </label>

                <input
                  id="prati-usn"
                  type="text"
                  name="usn"
                  placeholder="Enter your USN"
                  value={formData.usn}
                  readOnly
                  required
                />
              </div>

              <div className="prati-form-row">

                <div className="prati-form-group">
                  <label htmlFor="prati-department">
                    Department
                  </label>

                  <input
                    id="prati-department"
                    type="text"
                    value={formData.department}
                    readOnly
                    required
                  />
                </div>

                <div className="prati-form-group">
                  <label htmlFor="prati-year">
                    Academic Year
                  </label>

                  <input
                    id="prati-year"
                    type="text"
                    value={formData.year}
                    readOnly
                    required
                  />
                </div>

              </div>

              <div className="prati-form-group">
                <label htmlFor="prati-reason">
                  Why do you want to join PratiBimb?
                </label>

                <textarea
                  id="prati-reason"
                  name="reason"
                  placeholder="Tell us about your interest in drama, acting or storytelling..."
                  rows="4"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* FORM FOOTER */}
              <div className="prati-modal-footer">
                <button
                  type="button"
                  className="prati-cancel-button"
                  onClick={() => setShowApplication(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="prati-submit-button"
                  disabled={submitting || !profileLoaded}
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Application"}
                </button>
              </div>

              <p className="prati-modal-note">
                🎭 Your journey with PratiBimb starts here.
              </p>

              {profileError && <p role="alert">{profileError}</p>}

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
