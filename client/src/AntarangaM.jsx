import { useState } from "react";
import { Link } from "react-router-dom";

export default function AntarangaM() {
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
    console.log("AntarangaM Application:", formData);
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
          <Link to="/clubs" className="prati-nav-active">
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
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTRKQgBSW6_F5E3Birg-517VBXMq2bHiAc7lTHX576kj7fhPxfkhtg84WC&s=10"
          alt="AntarangaM logo"
        />

        <img style={{width:"1500px"}}
          className="prati-hero-banner"
          src="https://i.pinimg.com/736x/59/23/d5/5923d5cd34aa937249940382cc3f8e9f.jpg"
          alt="AntarangaM banner"
        />
      </section>

      {/* MAIN CONTENT */}
      <main className="prati-content">

        <section className="prati-intro">
          <div className="prati-intro-text">
            <h1>AntarangaM</h1>
            <p>
              Welcome to AntarangaM! A space for students to explore their
              passion for music, express their creativity, and connect
              through performances and musical experiences.
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
                    <h3>Music Achievements</h3>
                    <p>AntarangaM achievements will be updated soon.</p>
                  </div>
                </article>

                <article className="prati-achievement-row">
                  <span className="prati-trophy">🌟</span>
                  <span className="prati-year">2025</span>

                  <div className="prati-achievement-text">
                    <h3>Musical Activities</h3>
                    <p>Performances and activity highlights will be updated soon.</p>
                  </div>
                </article>

              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="prati-right-column">

              <div className="prati-panel prati-team-info">

                <div className="prati-member-count">
                  <span className="prati-group-icon">👥</span>
                  <span><strong>Members: To be updated</strong></span>
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
                  Join AntarangaM
                </h2>

                <p>
                  Become a part of AntarangaM and explore your musical
                  interests, develop your talents, and connect
                  with fellow music enthusiasts.
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
            <h2>AntarangaM Gallery</h2>

            <p>AntarangaM gallery images will be updated soon.</p>

            <img src="/antarangam.png" alt="AntarangaM logo" />
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
                  CLUBGRID · ANTARANGAM
                </span>

                <h2>Join AntarangaM</h2>

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
                <label>Why do you want to join AntarangaM?</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
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

      {/* CSS */}
      <style>{`

/* BASE */
.prati-page {
  min-height: 100vh;
  background: #fff;
  color: #111;
  font-family: Arial, Helvetica, sans-serif;
}

/* NAVBAR */
.prati-navbar {
  height: 85px;
  padding: 0 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
}

.prati-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #080808;
  font-size: 31px;
  font-weight: 750;
  letter-spacing: -1.2px;
  text-decoration: none;
  white-space: nowrap;
}

.prati-brand-mark {
  display: grid;
  grid-template-columns: repeat(2, 11px);
  grid-template-rows: repeat(2, 11px);
  gap: 3px;
}

.prati-brand-mark i {
  display: block;
  border-radius: 4px;
  background: #080808;
}

.prati-nav {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
}

.prati-nav a {
  height: 48px;
  padding: 0 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  color: #111;
  font-size: 17px;
  text-decoration: none;
  white-space: nowrap;
}

.prati-nav a.prati-nav-active {
  min-width: 130px;
  background: #7953ed;
  color: white;
}

.prati-profile {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #111;
  text-decoration: none;
}

.prati-profile > span:first-child {
  width: 53px;
  height: 53px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #123779;
  color: white;
  font-size: 22px;
  font-weight: 600;
}

.prati-profile-arrow {
  font-size: 19px;
}

/* HERO */
.prati-hero {
  height: 307px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #000;
}

.prati-hero-logo {
  position: absolute;
  z-index: 1;
  left: 4.2%;
  top: 12%;
  width: 8.8%;
  height: 79%;
  object-fit: fill;
}

.prati-hero-banner {
  position: absolute;
  left: 24.2%;
  top: 0;
  width: 52%;
  height: 100%;
  object-fit: fill;
}

/* MAIN CONTENT */
.prati-content {
  padding: 22px 2.5% 30px;
}

.prati-intro {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 20px;
}

.prati-intro-text {
  max-width: 950px;
}

.prati-intro h1 {
  margin: 8px 0 10px;
  font-size: 38px;
  line-height: 1.2;
  font-weight: 750;
  letter-spacing: -0.8px;
}

.prati-intro p {
  margin: 0;
  font-size: 25px;
  line-height: 1.25;
}

/* TABS */
.prati-tabs {
  display: flex;
  align-items: flex-start;
  gap: 62px;
  padding: 0 5px;
  flex-shrink: 0;
}

.prati-tabs button {
  padding: 0 0 9px;
  border: 0;
  border-bottom: 3px solid transparent;
  background: transparent;
  color: #111;
  font-family: inherit;
  font-size: 23px;
  font-weight: 700;
  cursor: pointer;
}

.prati-tabs button.active {
  border-bottom-color: #7953ed;
}

/* DASHBOARD */
.prati-dashboard {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 22px;
  align-items: stretch;
}

.prati-panel {
  min-width: 0;
  border: 1.5px solid #d1d1d1;
  border-radius: 11px;
  background: #fff;
  box-sizing: border-box;
}

.prati-achievements {
  padding: 16px 22px 24px;
}

.prati-achievements > h2,
.prati-apply-panel > h2 {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 16px;
  font-size: 31px;
  line-height: 1.2;
  font-weight: 750;
  letter-spacing: -0.6px;
}

.prati-heading-icon {
  font-size: 29px;
}

.prati-achievement-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.prati-achievement-row {
  min-height: 96px;
  padding: 12px 18px;
  display: grid;
  grid-template-columns: 61px 106px minmax(0, 1fr);
  align-items: center;
  gap: 14px;
  box-sizing: border-box;
  border: 1.5px solid #d1d1d1;
  border-radius: 11px;
  background: #fafafa;
}

.prati-trophy {
  font-size: 37px;
  line-height: 1;
  text-align: center;
}

.prati-year {
  min-height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  background: #7953ed;
  color: white;
  font-size: 22px;
  font-weight: 600;
}

.prati-achievement-text {
  min-width: 0;
}

.prati-achievement-text h3 {
  margin: 0 0 5px;
  font-size: 21px;
  line-height: 1.2;
  font-weight: 750;
}

.prati-achievement-text p {
  margin: 0;
  font-size: 19px;
  line-height: 1.25;
}

/* RIGHT COLUMN */
.prati-right-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.prati-team-info {
  min-height: 177px;
  padding: 18px 24px 14px;
}

.prati-member-count {
  min-height: 55px;
  display: flex;
  align-items: flex-start;
  gap: 23px;
  border-bottom: 1px solid #dedede;
  font-size: 22px;
}

.prati-group-icon {
  min-width: 42px;
  font-size: 27px;
  line-height: 1;
}

.prati-coordinator {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-top: 14px;
}

.prati-person-icon {
  width: 48px;
  flex-shrink: 0;
  font-size: 38px;
  text-align: center;
}

.prati-coordinator-text {
  flex: 1;
  min-width: 0;
}

.prati-coordinator-text h3 {
  margin: 0 0 4px;
  font-size: 22px;
  line-height: 1.2;
  font-weight: 750;
}

.prati-coordinator-text p {
  margin: 0;
  font-size: 22px;
  line-height: 1.2;
}

.prati-coordinator-year {
  min-width: 120px;
  padding: 7px 14px;
  border: 1.5px solid #d1d1d1;
  border-radius: 9px;
  background: #f8f8f8;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
}

/* APPLY CARD */
.prati-apply-panel {
  min-height: 232px;
  padding: 18px 28px 20px;
}

.prati-apply-panel > h2 {
  margin-bottom: 14px;
  font-size: 28px;
}

.prati-apply-icon {
  font-size: 29px;
}

.prati-apply-panel > p {
  margin: 0 0 15px;
  font-size: 22px;
  line-height: 1.25;
}

.prati-apply-button {
  min-width: 217px;
  height: 50px;
  padding: 0 24px;
  border: 0;
  border-radius: 7px;
  background: #7953ed;
  color: white;
  font-family: inherit;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
}

.prati-apply-button:hover {
  background: #6842dc;
}

/* GALLERY */
.prati-gallery {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 20px;
  padding: 22px;
}

.prati-gallery h2 {
  width: 100%;
  margin: 0;
  font-size: 30px;
}

.prati-gallery img {
  width: min(320px, 100%);
  height: 200px;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .prati-navbar {
    padding: 0 18px;
  }

  .prati-brand {
    font-size: 25px;
  }

  .prati-nav {
    gap: 3px;
  }

  .prati-nav a {
    padding: 0 12px;
    font-size: 14px;
  }

  .prati-intro {
    flex-direction: column;
  }

  .prati-tabs {
    align-self: flex-end;
  }

  .prati-intro p {
    font-size: 20px;
  }

  .prati-achievement-row {
    grid-template-columns: 42px 80px minmax(0, 1fr);
    gap: 9px;
    padding: 10px;
  }

  .prati-achievement-text h3 {
    font-size: 17px;
  }

  .prati-achievement-text p {
    font-size: 15px;
  }

  .prati-year {
    font-size: 18px;
  }

  .prati-dashboard {
    grid-template-columns: 1.15fr 1fr;
  }
}

@media (max-width: 760px) {
  .prati-navbar {
    height: auto;
    min-height: 72px;
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 16px;
  }

  .prati-brand {
    font-size: 24px;
  }

  .prati-profile {
    margin-left: auto;
  }

  .prati-profile > span:first-child {
    width: 40px;
    height: 40px;
  }

  .prati-nav {
    order: 3;
    width: 100%;
    overflow-x: auto;
  }

  .prati-nav a {
    height: 38px;
    padding: 0 12px;
  }

  .prati-hero {
    height: 190px;
  }

  .prati-hero-logo {
    left: 3%;
    width: 18%;
  }

  .prati-hero-banner {
    left: 24%;
    width: 72%;
  }

  .prati-content {
    padding: 20px 14px;
  }

  .prati-intro h1 {
    font-size: 29px;
  }

  .prati-intro p {
    font-size: 17px;
  }

  .prati-tabs {
    align-self: flex-start;
    gap: 30px;
  }

  .prati-tabs button {
    font-size: 18px;
  }

  .prati-dashboard {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .prati-achievements {
    padding: 14px 12px;
  }

  .prati-achievements > h2 {
    font-size: 25px;
  }

  .prati-achievement-row {
    grid-template-columns: 34px 66px minmax(0, 1fr);
    gap: 8px;
    padding: 9px;
  }

  .prati-trophy {
    font-size: 25px;
  }

  .prati-year {
    min-height: 36px;
    font-size: 15px;
  }

  .prati-achievement-text h3 {
    font-size: 15px;
  }

  .prati-achievement-text p {
    font-size: 13px;
  }

  .prati-team-info {
    padding: 16px;
  }

  .prati-coordinator {
    gap: 10px;
  }

  .prati-coordinator-text h3,
  .prati-coordinator-text p {
    font-size: 17px;
  }

  .prati-coordinator-year {
    min-width: 65px;
    padding: 7px;
    font-size: 16px;
  }

  .prati-apply-panel {
    padding: 17px;
  }

  .prati-apply-panel > p {
    font-size: 17px;
  }

  .prati-apply-button {
    height: 45px;
    font-size: 18px;
  }
}

/* APPLICATION MODAL */
.prati-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(20, 19, 35, 0.58);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
  animation: pratiFadeIn 0.25s ease;
}

.prati-application-modal {
  width: 100%;
  max-width: 540px;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 18px;
  padding: 30px;
  box-shadow: 0 20px 65px rgba(0, 0, 0, 0.22);
  animation: pratiModalIn 0.3s ease;
}

.prati-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  padding-bottom: 22px;
  border-bottom: 1px solid #eeeaf5;
}

.prati-modal-eyebrow {
  display: inline-block;
  color: #8170bc;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  margin-bottom: 9px;
}

.prati-modal-header h2 {
  font-size: 25px;
  color: #29253d;
  margin: 0 0 8px;
  font-weight: 700;
}

.prati-modal-header p {
  color: #777387;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
}

.prati-modal-close {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border: none;
  border-radius: 50%;
  background: #f1eff7;
  color: #51486f;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
}

.prati-modal-close:hover {
  background: #e4dff2;
  transform: rotate(90deg);
}

/* FORM */
.prati-application-form {
  padding-top: 22px;
}

.prati-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
  min-width: 0;
}

.prati-form-group label {
  color: #39344c;
  font-size: 13px;
  font-weight: 600;
}

.prati-form-group input,
.prati-form-group select,
.prati-form-group textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e4e0ed;
  border-radius: 9px;
  background: #faf9fc;
  color: #39344c;
  padding: 12px 14px;
  font-family: inherit;
  font-size: 13px;
  outline: none;
  transition: 0.2s ease;
}

.prati-form-group input,
.prati-form-group select {
  height: 44px;
}

.prati-form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.prati-form-group input:focus,
.prati-form-group select:focus,
.prati-form-group textarea:focus {
  border-color: #8977c5;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(137, 119, 197, 0.12);
}

.prati-form-group input::placeholder,
.prati-form-group textarea::placeholder {
  color: #aaa5b7;
}

.prati-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

/* BUTTONS */
.prati-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.prati-cancel-button,
.prati-submit-button {
  min-height: 43px;
  padding: 0 20px;
  border-radius: 9px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.prati-cancel-button {
  background: #f3f1f7;
  color: #5e5870;
  border: 1px solid #e7e3ef;
}

.prati-cancel-button:hover {
  background: #eae6f2;
}

.prati-submit-button {
  background: #7968b5;
  color: #fff;
  border: 1px solid #7968b5;
}

.prati-submit-button:hover {
  background: #65539f;
  transform: translateY(-1px);
}

.prati-modal-note {
  color: #938ca3;
  text-align: center;
  font-size: 11px;
  margin: 22px 0 0;
}

/* ANIMATIONS */
@keyframes pratiFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes pratiModalIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* RESPONSIVE MODAL */
@media (max-width: 600px) {
  .prati-modal-overlay {
    padding: 12px;
  }

  .prati-application-modal {
    padding: 22px 18px;
    max-height: 94vh;
  }

  .prati-modal-header h2 {
    font-size: 21px;
  }

  .prati-form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .prati-modal-footer {
    flex-direction: column-reverse;
  }

  .prati-cancel-button,
  .prati-submit-button {
    width: 100%;
  }
}

      `}</style>
    </div>
  );
}