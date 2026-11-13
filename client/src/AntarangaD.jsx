import { useState } from "react";
import { Link } from "react-router-dom";

export default function AntarangaD() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);

  const initialForm = {
    name: "",
    usn: "",
    department: "",
    year: "",
    danceStyle: "",
    experience: "",
    reason: "",
  };

  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Antaranga Application:", formData);
    alert("Your application has been submitted!");
    setFormData(initialForm);
    setShowModal(false);
  };

  return (
    <div className="antaranga-page">

      {/* NAVBAR */}
      <nav className="antaranga-navbar">
        <Link to="/" className="antaranga-brand">
          ClubGrid<span>.</span>
        </Link>

        <div className="antaranga-nav-links">
          <Link to="/">Home</Link>
          <Link to="/clubs/dance">Dance Club</Link>
          <a href="#about">About</a>
          <button onClick={() => setShowModal(true)}>
            Join Team
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="antaranga-hero">
        <div className="antaranga-hero-logo">
          <img
            src="/antaranga-dance.png"
            alt="Antaranga Logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="antaranga-hero-title">
          <span>SDMCET · DANCE TEAM</span>
          <h1>ANTARANGA</h1>
          <p>Every move has a meaning.</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="antaranga-content">

        {/* INTRODUCTION AND TABS */}
        <section className="antaranga-intro" id="about">
          <div className="antaranga-intro-text">
            <span className="antaranga-eyebrow">
              ABOUT THE TEAM
            </span>

            <h1>Every Move Has a Meaning.</h1>

            <p>
              Antaranga is a dance team that celebrates artistic
              expression, creativity and the beauty of movement.
              It provides students with a platform to explore
              different dance styles, discover their talents and
              express themselves through performance. Beyond the
              stage, the team encourages collaboration, confidence
              and a shared passion for dance, creating memorable
              experiences through every performance.
            </p>
          </div>

          <div className="antaranga-tabs">
            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>

            <button
              className={activeTab === "gallery" ? "active" : ""}
              onClick={() => setActiveTab("gallery")}
            >
              Gallery
            </button>
          </div>
        </section>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <section className="antaranga-dashboard">

            {/* LEFT PANEL */}
            <div className="antaranga-panel antaranga-highlights">
              <h2>
                <span className="antaranga-heading-icon">🎨</span>
                The Antaranga Experience
              </h2>

              <div className="antaranga-highlight-list">

                <div className="antaranga-highlight-row">
                  <div className="antaranga-highlight-icon">🎨</div>
                  <div className="antaranga-highlight-description">
                    <h3>Artistic Expression</h3>
                    <p>
                      Exploring creativity and individuality
                      through dance and movement.
                    </p>
                  </div>
                </div>

                <div className="antaranga-highlight-row">
                  <div className="antaranga-highlight-icon">🎭</div>
                  <div className="antaranga-highlight-description">
                    <h3>Culture & Creativity</h3>
                    <p>
                      Celebrating diverse dance forms and
                      expressing stories through performances.
                    </p>
                  </div>
                </div>

                <div className="antaranga-highlight-row">
                  <div className="antaranga-highlight-icon">🤝</div>
                  <div className="antaranga-highlight-description">
                    <h3>Team Spirit</h3>
                    <p>
                      Growing together through practice,
                      collaboration and shared experiences.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="antaranga-right-column">

              {/* TEAM INFORMATION */}
              <div className="antaranga-panel antaranga-team-info">
                <h2>Team Information</h2>

                <div className="antaranga-info-row">
                  <span>👥 Team</span>
                  <strong>Antaranga</strong>
                </div>

                <div className="antaranga-info-row">
                  <span>💃 Category</span>
                  <strong>Dance</strong>
                </div>

                <div className="antaranga-info-row">
                  <span>🧑‍🤝‍🧑 Members</span>
                  <strong>To be updated</strong>
                </div>

                <div className="antaranga-info-row">
                  <span>👤 Coordinator</span>
                  <strong>To be announced</strong>
                </div>

                <div className="antaranga-info-row">
                  <span>🏫 College</span>
                  <strong>SDMCET</strong>
                </div>
              </div>

              {/* JOIN CARD */}
              <div className="antaranga-panel antaranga-apply-panel">
                <h2>
                  <span className="antaranga-apply-icon">✨</span>
                  Ready to Take the Stage?
                </h2>

                <p>
                  Bring your creativity, energy and passion.
                  Your journey with Antaranga starts here!
                </p>

                <button
                  className="antaranga-apply-button"
                  onClick={() => setShowModal(true)}
                >
                  Apply Now ↗
                </button>
              </div>

            </div>
          </section>
        )}

        {/* GALLERY */}
        {activeTab === "gallery" && (
          <section className="antaranga-panel antaranga-gallery">
            <span className="antaranga-eyebrow">
              MOMENTS & MEMORIES
            </span>

            <h2>Our Gallery</h2>

            <p>
              A collection of performances, celebrations
              and unforgettable team moments.
            </p>

            <div className="antaranga-gallery-grid">
              <div className="antaranga-gallery-item gallery-one">
                <span>💃</span>
                <h3>Stage Performances</h3>
              </div>

              <div className="antaranga-gallery-item gallery-two">
                <span>🎉</span>
                <h3>Team Celebrations</h3>
              </div>

              <div className="antaranga-gallery-item gallery-three">
                <span>📸</span>
                <h3>Behind the Scenes</h3>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* APPLICATION MODAL */}
      {showModal && (
        <div
          className="antaranga-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <section
            className="antaranga-application-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="antaranga-modal-header">
              <div>
                <span className="antaranga-modal-eyebrow">
                  CLUBGRID · ANTARANGA
                </span>

                <h2>Join Antaranga 💃</h2>

                <p>
                  Tell us a little about yourself!
                </p>
              </div>

              <button
                className="antaranga-modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form
              className="antaranga-application-form"
              onSubmit={handleSubmit}
            >

              <div className="antaranga-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="antaranga-form-group">
                <label>USN</label>
                <input
                  type="text"
                  name="usn"
                  placeholder="Enter your USN"
                  value={formData.usn}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="antaranga-form-row">
                <div className="antaranga-form-group">
                  <label>Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="CSE">CSE</option>
                    <option value="ISE">ISE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="ME">ME</option>
                    <option value="CE">CE</option>
                  </select>
                </div>

                <div className="antaranga-form-group">
                  <label>Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <div className="antaranga-form-group">
                <label>Preferred Dance Style</label>
                <select
                  name="danceStyle"
                  value={formData.danceStyle}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose your style</option>
                  <option value="Hip-Hop">Hip-Hop</option>
                  <option value="Contemporary">Contemporary</option>
                  <option value="Classical">Classical</option>
                  <option value="Bollywood">Bollywood</option>
                  <option value="Western">Western</option>
                  <option value="Folk">Folk</option>
                  <option value="Freestyle">Freestyle</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="antaranga-form-group">
                <label>Dance Experience</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select experience</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Less than 1 year">
                    Less than 1 year
                  </option>
                  <option value="1–2 years">1–2 years</option>
                  <option value="3–5 years">3–5 years</option>
                  <option value="More than 5 years">
                    More than 5 years
                  </option>
                </select>
              </div>

              <div className="antaranga-form-group">
                <label>Why do you want to join Antaranga?</label>
                <textarea
                  name="reason"
                  placeholder="Tell us about your passion for dance..."
                  value={formData.reason}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="antaranga-modal-footer">
                <button
                  type="button"
                  className="antaranga-cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="antaranga-submit-button"
                >
                  Submit Application
                </button>
              </div>

              <p className="antaranga-modal-note">
                Your details will be used only for the club application.
              </p>

            </form>
          </section>
        </div>
      )}

      {/* CSS */}
      <style>{`

        /* BASE */
        .antaranga-page {
          min-height: 100vh;
          width: 100%;
          background: #fff;
          color: #111;
          font-family: Arial, Helvetica, sans-serif;
        }

        .antaranga-page *,
        .antaranga-page *::before,
        .antaranga-page *::after {
          box-sizing: border-box;
        }

        /* NAVBAR */
        .antaranga-navbar {
          height: 85px;
          padding: 0 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e5e5e5;
          background: #fff;
        }

        .antaranga-brand {
          display: flex;
          align-items: center;
          color: #080808;
          font-size: 31px;
          font-weight: 750;
          letter-spacing: -1.2px;
          text-decoration: none;
        }

        .antaranga-brand span {
          color: #7953ed;
        }

        .antaranga-nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .antaranga-nav-links a {
          color: #111;
          font-size: 17px;
          text-decoration: none;
          white-space: nowrap;
        }

        .antaranga-nav-links a:hover {
          color: #7953ed;
        }

        .antaranga-nav-links button {
          padding: 12px 23px;
          border: none;
          border-radius: 8px;
          background: #7953ed;
          color: #fff;
          font-family: inherit;
          font-size: 15px;
          cursor: pointer;
        }

        .antaranga-nav-links button:hover,
        .antaranga-apply-button:hover,
        .antaranga-submit-button:hover {
          background: #6842dc;
        }

        /* HERO */
        .antaranga-hero {
          height: 307px;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: linear-gradient(110deg, #211638, #493078);
          color: white;
        }

        .antaranga-hero-logo {
          position: absolute;
          left: 4.2%;
          top: 12%;
          width: 8.8%;
          height: 79%;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: white;
        }

        .antaranga-hero-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .antaranga-hero-title {
          position: absolute;
          left: 24.2%;
          top: 0;
          width: 52%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .antaranga-hero-title > span {
          color: #c9b8ff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 4px;
        }

        .antaranga-hero-title h1 {
          margin: 10px 0;
          font-size: clamp(38px, 5vw, 68px);
          font-weight: 800;
          letter-spacing: 6px;
          color: #fff;
        }

        .antaranga-hero-title p {
          margin: 0;
          color: #ded5f5;
          font-size: 22px;
        }

        /* MAIN CONTENT */
        .antaranga-content {
          padding: 22px 2.5% 30px;
        }

        /* INTRO */
        .antaranga-intro {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 20px;
        }

        .antaranga-intro-text {
          max-width: 950px;
        }

        .antaranga-eyebrow {
          display: block;
          color: #7953ed;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.8px;
        }

        .antaranga-intro h1 {
          margin: 8px 0 10px;
          font-size: 38px;
          line-height: 1.2;
          font-weight: 750;
          letter-spacing: -0.8px;
        }

        .antaranga-intro p {
          margin: 0;
          font-size: 20px;
          line-height: 1.4;
        }

        /* TABS */
        .antaranga-tabs {
          display: flex;
          align-items: flex-start;
          gap: 62px;
          padding: 0 5px;
          flex-shrink: 0;
        }

        .antaranga-tabs button {
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

        .antaranga-tabs button.active {
          border-bottom-color: #7953ed;
        }

        /* DASHBOARD */
        .antaranga-dashboard {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 22px;
          align-items: stretch;
        }

        .antaranga-panel {
          min-width: 0;
          border: 1.5px solid #d1d1d1;
          border-radius: 11px;
          background: #fff;
        }

        /* HIGHLIGHTS */
        .antaranga-highlights {
          padding: 16px 22px 24px;
        }

        .antaranga-highlights > h2,
        .antaranga-apply-panel > h2 {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0 0 16px;
          font-size: 29px;
          line-height: 1.2;
          font-weight: 750;
          letter-spacing: -0.6px;
        }

        .antaranga-heading-icon {
          font-size: 29px;
        }

        .antaranga-highlight-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .antaranga-highlight-row {
          min-height: 96px;
          padding: 12px 18px;
          display: grid;
          grid-template-columns: 61px minmax(0, 1fr);
          align-items: center;
          gap: 14px;
          border: 1.5px solid #d1d1d1;
          border-radius: 11px;
          background: #fafafa;
        }

        .antaranga-highlight-icon {
          font-size: 37px;
          line-height: 1;
          text-align: center;
        }

        .antaranga-highlight-description h3 {
          margin: 0 0 5px;
          font-size: 21px;
          line-height: 1.2;
          font-weight: 750;
        }

        .antaranga-highlight-description p {
          margin: 0;
          font-size: 18px;
          line-height: 1.3;
        }

        /* RIGHT COLUMN */
        .antaranga-right-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
        }

        /* TEAM INFORMATION */
        .antaranga-team-info {
          padding: 18px 24px 14px;
        }

        .antaranga-team-info > h2 {
          margin: 0 0 12px;
          font-size: 25px;
          font-weight: 750;
        }

        .antaranga-info-row {
          min-height: 43px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          border-bottom: 1px solid #dedede;
          font-size: 18px;
        }

        .antaranga-info-row:last-child {
          border-bottom: none;
        }

        .antaranga-info-row span {
          color: #555;
        }

        .antaranga-info-row strong {
          text-align: right;
          font-size: 17px;
          font-weight: 700;
        }

        /* JOIN CARD */
        .antaranga-apply-panel {
          min-height: 232px;
          padding: 18px 28px 20px;
        }

        .antaranga-apply-panel > h2 {
          margin-bottom: 14px;
          font-size: 27px;
        }

        .antaranga-apply-icon {
          font-size: 29px;
        }

        .antaranga-apply-panel > p {
          margin: 0 0 15px;
          font-size: 20px;
          line-height: 1.35;
        }

        .antaranga-apply-button {
          min-width: 217px;
          height: 50px;
          padding: 0 24px;
          border: 0;
          border-radius: 7px;
          background: #7953ed;
          color: white;
          font-family: inherit;
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
        }

        /* GALLERY */
        .antaranga-gallery {
          padding: 22px;
        }

        .antaranga-gallery > h2 {
          margin: 8px 0;
          font-size: 30px;
        }

        .antaranga-gallery > p {
          margin: 0 0 22px;
          font-size: 19px;
          line-height: 1.4;
        }

        .antaranga-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .antaranga-gallery-item {
          min-height: 190px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border-radius: 11px;
          color: white;
        }

        .antaranga-gallery-item span {
          margin-bottom: 12px;
          font-size: 36px;
        }

        .antaranga-gallery-item h3 {
          margin: 0;
          font-size: 21px;
        }

        .antaranga-gallery-item.gallery-one {
          background: linear-gradient(135deg, #35234e, #7953ed);
        }

        .antaranga-gallery-item.gallery-two {
          background: linear-gradient(135deg, #4c2d67, #a16ee8);
        }

        .antaranga-gallery-item.gallery-three {
          background: linear-gradient(135deg, #29213b, #7659b9);
        }

        /* APPLICATION MODAL */
        .antaranga-modal-overlay {
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
        }

        .antaranga-application-modal {
          width: 100%;
          max-width: 540px;
          max-height: 90vh;
          overflow-y: auto;
          background: #fff;
          border-radius: 18px;
          padding: 30px;
          box-shadow: 0 20px 65px rgba(0, 0, 0, 0.22);
        }

        .antaranga-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
          padding-bottom: 22px;
          border-bottom: 1px solid #eeeaf5;
        }

        .antaranga-modal-eyebrow {
          display: inline-block;
          color: #8170bc;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          margin-bottom: 9px;
        }

        .antaranga-modal-header h2 {
          font-size: 25px;
          color: #29253d;
          margin: 0 0 8px;
          font-weight: 700;
        }

        .antaranga-modal-header p {
          color: #777387;
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }

        .antaranga-modal-close {
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          border: none;
          border-radius: 50%;
          background: #f3f1f8;
          color: #29253d;
          font-size: 25px;
          cursor: pointer;
        }

        .antaranga-application-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding-top: 20px;
        }

        .antaranga-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
        }

        .antaranga-form-group label {
          color: #46364f;
          font-size: 13px;
          font-weight: 600;
        }

        .antaranga-form-group input,
        .antaranga-form-group select,
        .antaranga-form-group textarea {
          width: 100%;
          min-height: 43px;
          padding: 11px 12px;
          border: 1px solid #e2ddea;
          border-radius: 8px;
          outline: none;
          background: #fff;
          color: #30263d;
          font-family: inherit;
          font-size: 13px;
        }

        .antaranga-form-group input:focus,
        .antaranga-form-group select:focus,
        .antaranga-form-group textarea:focus {
          border-color: #7953ed;
        }

        .antaranga-form-group textarea {
          min-height: 90px;
          resize: vertical;
        }

        .antaranga-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .antaranga-modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 5px;
        }

        .antaranga-cancel-button,
        .antaranga-submit-button {
          min-height: 43px;
          padding: 0 20px;
          border-radius: 7px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .antaranga-cancel-button {
          border: 1px solid #ddd7e8;
          background: #fff;
          color: #514a60;
        }

        .antaranga-submit-button {
          border: none;
          background: #7953ed;
          color: #fff;
        }

        .antaranga-modal-note {
          margin: 0;
          color: #888;
          font-size: 11px;
          text-align: center;
        }

        /* TABLET */
        @media (max-width: 1200px) {
          .antaranga-navbar {
            padding: 0 18px;
          }

          .antaranga-brand {
            font-size: 25px;
          }

          .antaranga-nav-links {
            gap: 16px;
          }

          .antaranga-nav-links a {
            font-size: 14px;
          }

          .antaranga-intro {
            flex-direction: column;
          }

          .antaranga-tabs {
            align-self: flex-end;
          }

          .antaranga-intro p {
            font-size: 18px;
          }

          .antaranga-highlight-description h3 {
            font-size: 18px;
          }

          .antaranga-highlight-description p {
            font-size: 15px;
          }

          .antaranga-dashboard {
            grid-template-columns: 1.15fr 1fr;
          }
        }

        /* MOBILE */
        @media (max-width: 760px) {
          .antaranga-navbar {
            height: auto;
            min-height: 68px;
            flex-wrap: wrap;
            gap: 12px;
            padding: 12px 16px;
          }

          .antaranga-brand {
            font-size: 24px;
          }

          .antaranga-nav-links {
            width: 100%;
            justify-content: space-between;
            gap: 8px;
          }

          .antaranga-nav-links a {
            font-size: 11px;
          }

          .antaranga-nav-links button {
            padding: 9px 12px;
            font-size: 11px;
          }

          .antaranga-hero {
            height: 190px;
          }

          .antaranga-hero-logo {
            left: 3%;
            width: 18%;
          }

          .antaranga-hero-title {
            left: 24%;
            width: 72%;
          }

          .antaranga-hero-title > span {
            font-size: 9px;
            letter-spacing: 2px;
          }

          .antaranga-hero-title h1 {
            font-size: 32px;
            letter-spacing: 3px;
          }

          .antaranga-hero-title p {
            font-size: 15px;
          }

          .antaranga-content {
            padding: 20px 14px;
          }

          .antaranga-intro h1 {
            font-size: 29px;
          }

          .antaranga-intro p {
            font-size: 15px;
          }

          .antaranga-tabs {
            align-self: flex-start;
            gap: 30px;
          }

          .antaranga-tabs button {
            font-size: 18px;
          }

          .antaranga-dashboard {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .antaranga-highlights {
            padding: 14px 12px;
          }

          .antaranga-highlights > h2 {
            font-size: 23px;
          }

          .antaranga-highlight-row {
            grid-template-columns: 40px minmax(0, 1fr);
            gap: 10px;
            padding: 10px;
          }

          .antaranga-highlight-icon {
            font-size: 27px;
          }

          .antaranga-highlight-description h3 {
            font-size: 16px;
          }

          .antaranga-highlight-description p {
            font-size: 13px;
          }

          .antaranga-team-info {
            padding: 16px;
          }

          .antaranga-info-row {
            font-size: 14px;
          }

          .antaranga-info-row strong {
            font-size: 13px;
          }

          .antaranga-apply-panel {
            padding: 17px;
          }

          .antaranga-apply-panel > h2 {
            font-size: 22px;
          }

          .antaranga-apply-panel > p {
            font-size: 15px;
          }

          .antaranga-apply-button {
            height: 45px;
            font-size: 17px;
          }

          .antaranga-gallery-grid {
            grid-template-columns: 1fr;
          }

          .antaranga-gallery-item {
            min-height: 150px;
          }
        }

        @media (max-width: 480px) {
          .antaranga-hero {
            height: 155px;
          }

          .antaranga-hero-title h1 {
            font-size: 23px;
            letter-spacing: 2px;
          }

          .antaranga-hero-title > span {
            font-size: 7px;
          }

          .antaranga-hero-title p {
            font-size: 12px;
          }

          .antaranga-form-row {
            grid-template-columns: 1fr;
          }

          .antaranga-application-modal {
            padding: 22px 18px;
          }

          .antaranga-modal-footer {
            flex-direction: column-reverse;
          }

          .antaranga-cancel-button,
          .antaranga-submit-button {
            width: 100%;
          }
        }

      `}</style>
    </div>
  );
}