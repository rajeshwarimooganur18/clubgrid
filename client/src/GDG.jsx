import { useState } from "react";
import { Link } from "react-router-dom";

export default function GDG() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showApplication, setShowApplication] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    department: "",
    year: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("GDG Application:", formData);
    alert("Your application has been submitted successfully!");
    setShowApplication(false);
    setFormData({
      name: "",
      usn: "",
      department: "",
      year: "",
      reason: "",
    });
  };

  return (
    <div className="prati-page">

      {/* NAVBAR */}
      <header className="prati-navbar">
        <Link to="/" className="prati-brand">
          <span className="prati-brand-mark">
            <i /><i /><i /><i />
          </span>
          <span>ClubGrid</span>
        </Link>

        <nav className="prati-nav">
          <Link to="/">⌂ &nbsp;Home</Link>
          <Link to="/#clubs" className="prati-nav-active">
            ♧ &nbsp;Clubs
          </Link>
          <Link to="/login">▤ &nbsp;My Application</Link>
          <Link to="/events">▣ &nbsp;Events</Link>
          <Link to="/announcements">⚑ &nbsp;Announcement</Link>
        </nav>

        <Link to="/login" className="prati-profile">
          <span>B</span>
          <span className="prati-profile-arrow">▾</span>
        </Link>
      </header>

      {/* HERO */}
      <section className="prati-hero">
        <img style={{width:"250px"}}
          className="prati-hero-logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6MAoH6o6WifnIFq1AnXcAOAWgbElOPqoybe8sZhAuQ&s"
          alt="Google Developer Group logo"
        />
 
        <img style={{width:"1500px "}}
          className="prati-hero-banner"
          src="https://i.pinimg.com/1200x/19/ce/58/19ce58c4d49883197ed1b2dac5108079.jpg"
          alt="Google Developer Group banner"
        />
      </section>

      {/* MAIN CONTENT */}
      <main className="prati-content">

        <section className="prati-intro">
          <div className="prati-intro-text">
            <h1>Google Developer Group</h1>

            <p>
              Welcome to Google Developer Group (GDG)! A community
              of developers, innovators, and technology enthusiasts
              who come together to learn, share knowledge, and build
              meaningful solutions. Explore Google technologies,
              participate in technical workshops, collaborate on
              projects, and grow your skills alongside fellow
              developers.
            </p>
          </div>

          <div className="prati-tabs">
            <button
              className={activeTab === "Overview" ? "active" : ""}
              onClick={() => setActiveTab("Overview")}
            >
              Overview
            </button>

            <button
              className={activeTab === "Gallery" ? "active" : ""}
              onClick={() => setActiveTab("Gallery")}
            >
              Gallery
            </button>
          </div>
        </section>

        {activeTab === "Overview" ? (
          <section className="prati-dashboard">

            {/* ACHIEVEMENTS */}
            <div className="prati-panel prati-achievements">
              <h2>
                <span className="prati-heading-icon">🏆</span>
                Achievements
              </h2>

              <div className="prati-achievement-list">

                <article className="prati-achievement-row">
                  <span className="prati-trophy">🏆</span>
                  <span className="prati-year">2026</span>

                  <div className="prati-achievement-text">
                    <h3>Developer Community</h3>
                    <p>
                      GDG technical achievements will be updated soon.
                    </p>
                  </div>
                </article>

                <article className="prati-achievement-row">
                  <span className="prati-trophy">🌟</span>
                  <span className="prati-year">2025</span>

                  <div className="prati-achievement-text">
                    <h3>Workshops & Events</h3>
                    <p>
                      Developer events and activities will be updated soon.
                    </p>
                  </div>
                </article>

              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="prati-right-column">

              <div className="prati-panel prati-team-info">

                <div className="prati-member-count">
                  <span className="prati-group-icon">👥</span>
                  <span>
                    <strong>Members: To be updated</strong>
                  </span>
                </div>

                <div className="prati-coordinator">
                  <span className="prati-person-icon">👤</span>

                  <div className="prati-coordinator-text">
                    <h3>Team Coordinator</h3>
                    <p>To be announced</p>
                  </div>

                  <span className="prati-coordinator-year">—</span>
                </div>

              </div>

              {/* APPLY CARD */}
              <div className="prati-panel prati-apply-panel">
                <h2>
                  <span className="prati-apply-icon">✍️</span>
                  Join GDG
                </h2>

                <p>
                  Become a part of Google Developer Group! Learn
                  emerging technologies, explore Google developer
                  tools, build innovative projects, and connect
                  with a community of passionate developers.
                </p>

                <button
                  className="prati-apply-button"
                  onClick={() => setShowApplication(true)}
                >
                  Apply Now <span>→</span>
                </button>
              </div>

            </div>
          </section>

        ) : (

          /* GALLERY */
          <section className="prati-panel prati-gallery">
            <h2>GDG Gallery</h2>

            <p>
              Google Developer Group gallery images will be updated soon.
            </p>

            <img src="/gdg.png" alt="GDG logo" />
          </section>
        )}

      </main>

      {/* APPLICATION MODAL */}
      {showApplication && (
        <div
          className="prati-modal-overlay"
          onClick={() => setShowApplication(false)}
        >
          <section
            className="prati-application-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="prati-modal-header">
              <div>
                <span className="prati-modal-eyebrow">
                  CLUBGRID · GOOGLE DEVELOPER GROUP
                </span>

                <h2>Join GDG</h2>

                <p>
                  Fill in your details to apply for membership.
                </p>
              </div>

              <button
                className="prati-modal-close"
                onClick={() => setShowApplication(false)}
              >
                ×
              </button>
            </div>

            <form
              className="prati-application-form"
              onSubmit={handleSubmit}
            >

              <div className="prati-form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="prati-form-row">

                <div className="prati-form-group">
                  <label>USN</label>
                  <input
                    name="usn"
                    value={formData.usn}
                    onChange={handleChange}
                    placeholder="Enter your USN"
                    required
                  />
                </div>

                <div className="prati-form-group">
                  <label>Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select department</option>
                    <option>ISE</option>
                    <option>CSE</option>
                    <option>ECE</option>
                    <option>EEE</option>
                    <option>ME</option>
                    <option>CE</option>
                  </select>
                </div>

              </div>

              <div className="prati-form-group">
                <label>Academic Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select academic year</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>

              <div className="prati-form-group">
                <label>Why do you want to join GDG?</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Tell us about your interest in technology, Google tools, development, and innovation..."
                  required
                />
              </div>

              <div className="prati-modal-footer">
                <button
                  type="button"
                  className="prati-cancel-button"
                  onClick={() => setShowApplication(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="prati-submit-button"
                >
                  Submit Application
                </button>
              </div>

              <p className="prati-modal-note">
                Your details will be used only for the club application.
              </p>

            </form>
          </section>
        </div>
      )}

      {/* Keep the exact same <style> block from QwertyIO.jsx here.
          Do not change any CSS or class names. */}

    </div>
  );
}