
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Tashan() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    department: "",
    year: "",
    danceStyle: "",
    experience: "",
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

    console.log("Tashan Application:", formData);
    alert("Your application has been submitted successfully!");

    setFormData({
      name: "",
      usn: "",
      department: "",
      year: "",
      danceStyle: "",
      experience: "",
      reason: "",
    });

    setShowModal(false);
  };

  return (
    <div className="tashan-page">

      {/* NAVBAR */}
      <nav className="tashan-navbar">
        <Link to="/" className="tashan-brand">
          Club<span>Grid</span>
        </Link>

        <div className="tashan-nav-links">
          <Link to="/">Home</Link>
          <Link to="/clubs/dance">Dance Club</Link>
          <button onClick={() => setShowModal(true)}>
            Join Team
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="tashan-hero">
        <div className="tashan-hero-inner">
          <div className="tashan-logo-box">
            <img src="/tashan.png" alt="Tashan team logo" />
          </div>

          <h1>Tashan</h1>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="tashan-content">

        {/* INTRODUCTION */}
        <section className="tashan-intro">
          <p>
            Welcome to Tashan! A passionate dance team that brings
            together rhythm, creativity and artistic expression.
            Through energetic performances, teamwork and a shared
            love for movement, Tashan celebrates the spirit of dance
            and creates unforgettable experiences on and off stage.
          </p>
        </section>

        {/* TABS */}
        <div className="tashan-tabs">
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

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <section className="tashan-dashboard">

            {/* ACHIEVEMENTS */}
            <div className="tashan-card tashan-achievements">

              <div className="tashan-card-heading">
                <h3>
                  <span className="tashan-heading-icon">✨</span>
                  Achievements
                </h3>
              </div>

              <div className="tashan-achievement-item">
                <span className="tashan-year">2026</span>

                <div>
                  <h4>💃 Dance Performances</h4>
                  <p>
                    Showcasing creativity, talent and passion
                    through energetic stage performances.
                  </p>
                </div>
              </div>

              <div className="tashan-achievement-item">
                <span className="tashan-year">2025</span>

                <div>
                  <h4>🏆 Team Activities</h4>
                  <p>
                    Building teamwork and creating memorable
                    dance experiences together.
                  </p>
                </div>
              </div>

              <div className="tashan-achievement-item">
                <span className="tashan-year">2024</span>

                <div>
                  <h4>🌟 Creative Expression</h4>
                  <p>
                    Celebrating rhythm, movement and the art
                    of performance.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="tashan-right-column">

              {/* TEAM INFORMATION */}
              <div className="tashan-card tashan-team-info">

                <div className="tashan-info-row">
                  <span className="tashan-info-icon">👥</span>
                  <div>
                    <strong>Team Members</strong>
                    <p>To be updated</p>
                  </div>
                </div>

                <div className="tashan-info-row">
                  <span className="tashan-info-icon">👤</span>
                  <div>
                    <strong>Team Coordinator</strong>
                    <p>To be announced</p>
                  </div>
                </div>

                <div className="tashan-info-row">
                  <span className="tashan-info-icon">🏫</span>
                  <div>
                    <strong>SDMCET</strong>
                    <p>Dance Club</p>
                  </div>
                </div>

              </div>

              {/* JOIN TASHAN */}
              <div className="tashan-card tashan-join-card">

                <h3>
                  <span className="tashan-heading-icon">✨</span>
                  Join Tashan
                </h3>

                <p>
                  Love dancing? Bring your energy, explore your
                  creativity and become a part of the Tashan team.
                  Let your passion shine on stage!
                </p>

                <button onClick={() => setShowModal(true)}>
                  Apply Now <span>➜</span>
                </button>

              </div>

            </div>
          </section>
        )}

        {/* GALLERY */}
        {activeTab === "gallery" && (
          <section className="tashan-gallery">

            <div className="tashan-gallery-heading">
              <span>📸 OUR MOMENTS</span>
              <h3>Our Gallery</h3>
              <p>
                A glimpse into the performances, memories
                and experiences of Tashan.
              </p>
            </div>

            <div className="tashan-gallery-grid">

              <div className="tashan-gallery-item gallery-one">
                <span>💃</span>
                <h4>Performances</h4>
              </div>

              <div className="tashan-gallery-item gallery-two">
                <span>🤍</span>
                <h4>Team Memories</h4>
              </div>

              <div className="tashan-gallery-item gallery-three">
                <span>✨</span>
                <h4>Behind the Scenes</h4>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* APPLICATION MODAL */}
      {showModal && (
        <div
          className="tashan-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="tashan-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="tashan-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <span className="tashan-modal-label">
              ✨ JOIN OUR TEAM
            </span>

            <h2>Apply for Tashan</h2>

            <p className="tashan-modal-subtitle">
              Tell us a little about yourself.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="tashan-form-grid">

                <div className="tashan-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="tashan-form-group">
                  <label>USN</label>
                  <input
                    type="text"
                    name="usn"
                    value={formData.usn}
                    onChange={handleChange}
                    placeholder="Enter your USN"
                    required
                  />
                </div>

                <div className="tashan-form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter your department"
                    required
                  />
                </div>

                <div className="tashan-form-group">
                  <label>Year of Study</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div className="tashan-form-group">
                  <label>Preferred Dance Style</label>
                  <input
                    type="text"
                    name="danceStyle"
                    value={formData.danceStyle}
                    onChange={handleChange}
                    placeholder="e.g. Hip-hop, Classical"
                    required
                  />
                </div>

                <div className="tashan-form-group">
                  <label>Experience</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select experience</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

              </div>

              <div className="tashan-form-group">
                <label>Why do you want to join Tashan?</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Tell us why you want to join..."
                  rows="4"
                  required
                />
              </div>

              <button type="submit" className="tashan-submit">
                Submit Application ✨
              </button>

            </form>
          </div>
        </div>
      )}

      {/* EMBEDDED CSS */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .tashan-page {
          min-height: 100vh;
          background: #ffffff;
          color: #29243a;
          font-family: "Inter", "Segoe UI", sans-serif;
        }

        /* NAVBAR */

        .tashan-navbar {
          height: 65px;
          padding: 0 8%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-bottom: 1px solid #eeeef2;
        }

        .tashan-brand {
          font-size: 24px;
          font-weight: 800;
          color: #29243a;
          text-decoration: none;
        }

        .tashan-brand span {
          color: #7953ed;
        }

        .tashan-nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .tashan-nav-links a {
          color: #555164;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
        }

        .tashan-nav-links a:hover {
          color: #7953ed;
        }

        .tashan-nav-links button {
          background: #7953ed;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 19px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        /* HERO */

        .tashan-hero {
          height: 165px;
          background: linear-gradient(110deg, #21143e, #51357f);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tashan-hero-inner {
          width: 84%;
          max-width: 1080px;
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .tashan-logo-box {
          width: 78px;
          height: 78px;
          background: white;
          border-radius: 10px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tashan-logo-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .tashan-hero h1 {
          flex: 1;
          text-align: center;
          color: white;
          font-size: 38px;
          font-weight: 800;
          letter-spacing: 1px;
          margin: 0;
          padding-right: 100px;
        }

        /* CONTENT */

        .tashan-content {
          max-width: 1080px;
          width: 84%;
          margin: auto;
          padding: 30px 0 42px;
        }

        .tashan-intro {
          max-width: 760px;
          margin: 0 auto 22px;
          text-align: center;
        }

        .tashan-intro p {
          color: #777384;
          font-size: 12px;
          line-height: 1.7;
          margin: 0;
        }

        /* TABS */

        .tashan-tabs {
          display: flex;
          justify-content: flex-end;
          gap: 22px;
          border-bottom: 1px solid #eeeaf3;
          margin-bottom: 17px;
        }

        .tashan-tabs button {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 0 2px 9px;
          margin-bottom: -1px;
          color: #777384;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .tashan-tabs button.active {
          color: #7953ed;
          border-bottom-color: #7953ed;
        }

        /* DASHBOARD */

        .tashan-dashboard {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          align-items: stretch;
        }

        .tashan-card {
          background: #ffffff;
          border: 1px solid #eae8ef;
          border-radius: 9px;
          padding: 17px;
        }

        .tashan-card-heading {
          margin-bottom: 14px;
        }

        .tashan-card-heading h3,
        .tashan-join-card h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 750;
          color: #29243a;
        }

        .tashan-heading-icon {
          color: #7953ed;
          margin-right: 7px;
          font-size: 15px;
        }

        /* ACHIEVEMENTS */

        .tashan-achievement-item {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid #eeeaf3;
          border-radius: 7px;
          padding: 11px;
          margin-bottom: 10px;
        }

        .tashan-achievement-item:last-child {
          margin-bottom: 0;
        }

        .tashan-year {
          min-width: 39px;
          height: 29px;
          border-radius: 5px;
          background: #f0ebff;
          color: #7953ed;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
        }

        .tashan-achievement-item h4 {
          font-size: 11px;
          color: #393447;
          margin: 0 0 4px;
        }

        .tashan-achievement-item p {
          font-size: 9px;
          line-height: 1.5;
          color: #898593;
          margin: 0;
        }

        /* RIGHT COLUMN */

        .tashan-right-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tashan-team-info {
          min-height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
        }

        .tashan-info-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .tashan-info-icon {
          font-size: 13px;
          width: 19px;
          flex-shrink: 0;
        }

        .tashan-info-row strong {
          display: block;
          font-size: 10px;
          color: #393447;
          font-weight: 650;
        }

        .tashan-info-row p {
          font-size: 9px;
          color: #898593;
          margin: 5px 0 0;
        }

        /* JOIN CARD */

        .tashan-join-card {
          text-align: left;
          padding: 15px 17px;
        }

        .tashan-join-card p {
          color: #898593;
          font-size: 9px;
          line-height: 1.6;
          margin: 8px 0 12px;
        }

        .tashan-join-card button {
          background: #7953ed;
          color: #ffffff;
          border: none;
          border-radius: 5px;
          padding: 8px 16px;
          font-size: 9px;
          font-weight: 700;
          cursor: pointer;
          transition: background .2s ease;
        }

        .tashan-join-card button:hover,
        .tashan-submit:hover {
          background: #6240cf;
        }

        .tashan-join-card button span {
          margin-left: 5px;
        }

        /* GALLERY */

        .tashan-gallery-heading {
          margin-bottom: 17px;
        }

        .tashan-gallery-heading > span {
          color: #7953ed;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .tashan-gallery-heading h3 {
          margin: 7px 0 5px;
          font-size: 17px;
        }

        .tashan-gallery-heading p {
          color: #898593;
          font-size: 11px;
          margin: 0;
        }

        .tashan-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .tashan-gallery-item {
          height: 160px;
          padding: 15px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .tashan-gallery-item span {
          font-size: 19px;
        }

        .tashan-gallery-item h4 {
          color: white;
          font-size: 13px;
          margin: 0;
        }

        .gallery-one {
          background: linear-gradient(135deg, #30204f, #7652aa);
        }

        .gallery-two {
          background: linear-gradient(135deg, #52336f, #a77bc5);
        }

        .gallery-three {
          background: linear-gradient(135deg, #31214a, #9a72bc);
        }

        /* APPLICATION MODAL */

        .tashan-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(22, 15, 37, .65);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }

        .tashan-modal {
          width: 100%;
          max-width: 570px;
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border-radius: 12px;
          padding: 28px;
          position: relative;
          box-shadow: 0 15px 50px rgba(0,0,0,.2);
        }

        .tashan-close {
          position: absolute;
          top: 12px;
          right: 17px;
          border: none;
          background: transparent;
          color: #777384;
          font-size: 26px;
          cursor: pointer;
        }

        .tashan-modal-label {
          color: #7953ed;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .tashan-modal h2 {
          font-size: 22px;
          color: #29243a;
          margin: 8px 0 5px;
        }

        .tashan-modal-subtitle {
          font-size: 11px;
          color: #898593;
          margin: 0 0 20px;
        }

        .tashan-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 13px;
        }

        .tashan-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .tashan-form-group label {
          font-size: 10px;
          font-weight: 700;
          color: #4a4558;
        }

        .tashan-form-group input,
        .tashan-form-group select,
        .tashan-form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e1eb;
          border-radius: 5px;
          outline: none;
          font-family: inherit;
          font-size: 11px;
          color: #393447;
          background: white;
        }

        .tashan-form-group input:focus,
        .tashan-form-group select:focus,
        .tashan-form-group textarea:focus {
          border-color: #7953ed;
        }

        .tashan-form-group textarea {
          resize: vertical;
        }

        .tashan-submit {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 6px;
          background: #7953ed;
          color: white;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        /* RESPONSIVE */

        @media (max-width: 768px) {
          .tashan-content {
            width: 90%;
          }

          .tashan-dashboard {
            grid-template-columns: 1fr;
          }

          .tashan-hero-inner {
            width: 90%;
          }

          .tashan-hero h1 {
            padding-right: 0;
            font-size: 32px;
          }
        }

        @media (max-width: 520px) {
          .tashan-navbar {
            height: auto;
            min-height: 60px;
            padding: 12px 5%;
            gap: 10px;
          }

          .tashan-brand {
            font-size: 20px;
          }

          .tashan-nav-links {
            gap: 10px;
          }

          .tashan-nav-links a {
            font-size: 10px;
          }

          .tashan-nav-links button {
            padding: 8px 10px;
            font-size: 9px;
          }

          .tashan-hero {
            height: 140px;
          }

          .tashan-logo-box {
            width: 62px;
            height: 62px;
          }

          .tashan-hero h1 {
            font-size: 27px;
          }

          .tashan-content {
            padding-top: 24px;
          }

          .tashan-gallery-grid {
            grid-template-columns: 1fr;
          }

          .tashan-gallery-item {
            height: 140px;
          }

          .tashan-form-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .tashan-modal {
            padding: 24px 18px;
          }
        }

      `}</style>
    </div>
  );
}
