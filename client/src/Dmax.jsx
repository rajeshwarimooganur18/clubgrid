import { authAPI, submitTeamApplication } from "./api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dmax() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    department: "",
    year: "",
    danceStyle: "",
    experience: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileLoaded) {
      alert(profileError || "Please wait for your profile to load before applying.");
      return;
    }


    try {
      const result = await submitTeamApplication(formData, "Dance Club", "Dmax", 2);
      if (!result || !result.application || !result.application._id) {
        throw new Error("The server did not confirm that your application was saved.");
      }

      alert("Your application has been submitted successfully!");
      setFormData((current) => ({
        ...current,
        danceStyle: "",
        experience: "",
        reason: "",
      }));
      setShowModal(false);
    } catch (error) {
      alert(error.message || "Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="dmax-page">

      {/* NAVBAR */}
      <nav className="dmax-navbar">
        <Link to="/" className="dmax-brand">
          Club<span>Grid</span>
        </Link>

        <div className="dmax-nav-links">
          <Link to="/">Home</Link>
          <Link to="/clubs/dance">Dance Club</Link>
          <button onClick={() => setShowModal(true)}>
            Join Team
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="dmax-hero">
        <div className="dmax-hero-inner">
          <div className="dmax-logo-box">
            <img src="/dmax.png" alt="DMAX team logo" />
          </div>

          <h1>DMAX</h1>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="dmax-content">

        {/* INTRODUCTION */}
        <section className="dmax-intro">
          <p>
            Welcome to DMAX! A vibrant dance team bringing together
            passionate performers who express themselves through
            rhythm, creativity and movement. With a shared love for
            dance and teamwork, DMAX creates exciting performances
            and unforgettable experiences.
          </p>
        </section>

        {/* TABS */}
        <div className="dmax-tabs">
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
          <section className="dmax-dashboard">

            {/* ACHIEVEMENTS */}
            <div className="dmax-card dmax-achievements">

              <div className="dmax-card-heading">
                <h3>
                  <span className="dmax-heading-icon">✨</span>
                  Achievements
                </h3>
              </div>

              <div className="dmax-achievement-item">
                <span className="dmax-year">2026</span>

                <div>
                  <h4>💃 Dance Performances</h4>
                  <p>
                    Showcasing talent, creativity and passion
                    through stage performances.
                  </p>
                </div>
              </div>

              <div className="dmax-achievement-item">
                <span className="dmax-year">2025</span>

                <div>
                  <h4>🏆 Team Activities</h4>
                  <p>
                    Building teamwork and creating memorable
                    experiences through dance.
                  </p>
                </div>
              </div>

              <div className="dmax-achievement-item">
                <span className="dmax-year">2024</span>

                <div>
                  <h4>🌟 Creative Expression</h4>
                  <p>
                    Celebrating rhythm, movement and artistic
                    expression together.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="dmax-right-column">

              {/* TEAM INFORMATION */}
              <div className="dmax-card dmax-team-info">

                <div className="dmax-info-row">
                  <span className="dmax-info-icon">👥</span>
                  <div>
                    <strong>Team Members</strong>
                    <p>To be updated</p>
                  </div>
                </div>

                <div className="dmax-info-row">
                  <span className="dmax-info-icon">👤</span>
                  <div>
                    <strong>Team Coordinator</strong>
                    <p>To be announced</p>
                  </div>
                </div>

                <div className="dmax-info-row">
                  <span className="dmax-info-icon">🏫</span>
                  <div>
                    <strong>SDMCET</strong>
                    <p>Dance Club</p>
                  </div>
                </div>

              </div>

              {/* JOIN DMAX */}
              <div className="dmax-card dmax-join-card">

                <h3>
                  <span className="dmax-heading-icon">✨</span>
                  Join DMAX
                </h3>

                <p>
                  Love dancing? Bring your energy, explore your
                  creativity and become a part of DMAX. Let your
                  passion shine on stage!
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
          <section className="dmax-gallery">

            <div className="dmax-gallery-heading">
              <span>📸 OUR MOMENTS</span>
              <h3>Our Gallery</h3>
              <p>
                A glimpse into the performances, memories
                and experiences of DMAX.
              </p>
            </div>

            <div className="dmax-gallery-grid">

              <div className="dmax-gallery-item gallery-one">
                <span>💃</span>
                <h4>Performances</h4>
              </div>

              <div className="dmax-gallery-item gallery-two">
                <span>🤍</span>
                <h4>Team Memories</h4>
              </div>

              <div className="dmax-gallery-item gallery-three">
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
          className="dmax-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="dmax-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="dmax-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <span className="dmax-modal-label">
              ✨ JOIN OUR TEAM
            </span>

            <h2>Apply for DMAX</h2>

            <p className="dmax-modal-subtitle">
              Tell us a little about yourself.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="dmax-form-grid">

                <div className="dmax-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    readOnly
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="dmax-form-group">
                  <label>USN</label>
                  <input
                    type="text"
                    name="usn"
                    value={formData.usn}
                    readOnly
                    onChange={handleChange}
                    placeholder="Enter your USN"
                    required
                  />
                </div>

                <div className="dmax-form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    readOnly
                    onChange={handleChange}
                    placeholder="Enter your department"
                    required
                  />
                </div>

                <div className="dmax-form-group">
                  <label>Year of Study</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    readOnly
                    required
                  />
                </div>

                <div className="dmax-form-group">
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

                <div className="dmax-form-group">
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

              <div className="dmax-form-group">
                <label>Why do you want to join DMAX?</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Tell us why you want to join..."
                  rows="4"
                  required
                />
              </div>

              {!profileLoaded && <p role={profileError ? "alert" : "status"}>{profileError || "Loading your profile..."}</p>}
              <button type="submit" className="dmax-submit" disabled={!profileLoaded}>
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

        .dmax-page {
          min-height: 100vh;
          background: #ffffff;
          color: #29243a;
          font-family: "Inter", "Segoe UI", sans-serif;
        }

        /* NAVBAR */

        .dmax-navbar {
          height: 65px;
          padding: 0 8%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-bottom: 1px solid #eeeef2;
        }

        .dmax-brand {
          font-size: 24px;
          font-weight: 800;
          color: #29243a;
          text-decoration: none;
        }

        .dmax-brand span {
          color: #7953ed;
        }

        .dmax-nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .dmax-nav-links a {
          color: #555164;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
        }

        .dmax-nav-links a:hover {
          color: #7953ed;
        }

        .dmax-nav-links button {
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

        .dmax-hero {
          height: 165px;
          background: linear-gradient(110deg, #21143e, #51357f);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dmax-hero-inner {
          width: 84%;
          max-width: 1080px;
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .dmax-logo-box {
          width: 78px;
          height: 78px;
          background: white;
          border-radius: 10px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dmax-logo-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .dmax-hero h1 {
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

        .dmax-content {
          max-width: 1080px;
          width: 84%;
          margin: auto;
          padding: 30px 0 42px;
        }

        .dmax-intro {
          max-width: 760px;
          margin: 0 auto 22px;
          text-align: center;
        }

        .dmax-intro p {
          color: #777384;
          font-size: 12px;
          line-height: 1.7;
          margin: 0;
        }

        /* TABS */

        .dmax-tabs {
          display: flex;
          justify-content: flex-end;
          gap: 22px;
          border-bottom: 1px solid #eeeaf3;
          margin-bottom: 17px;
        }

        .dmax-tabs button {
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

        .dmax-tabs button.active {
          color: #7953ed;
          border-bottom-color: #7953ed;
        }

        /* DASHBOARD */

        .dmax-dashboard {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          align-items: stretch;
        }

        .dmax-card {
          background: #ffffff;
          border: 1px solid #eae8ef;
          border-radius: 9px;
          padding: 17px;
        }

        .dmax-card-heading {
          margin-bottom: 14px;
        }

        .dmax-card-heading h3,
        .dmax-join-card h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 750;
          color: #29243a;
        }

        .dmax-heading-icon {
          color: #7953ed;
          margin-right: 7px;
          font-size: 15px;
        }

        /* ACHIEVEMENTS */

        .dmax-achievement-item {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid #eeeaf3;
          border-radius: 7px;
          padding: 11px;
          margin-bottom: 10px;
        }

        .dmax-achievement-item:last-child {
          margin-bottom: 0;
        }

        .dmax-year {
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

        .dmax-achievement-item h4 {
          font-size: 11px;
          color: #393447;
          margin: 0 0 4px;
        }

        .dmax-achievement-item p {
          font-size: 9px;
          line-height: 1.5;
          color: #898593;
          margin: 0;
        }

        /* RIGHT COLUMN */

        .dmax-right-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .dmax-team-info {
          min-height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
        }

        .dmax-info-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .dmax-info-icon {
          font-size: 13px;
          width: 19px;
          flex-shrink: 0;
        }

        .dmax-info-row strong {
          display: block;
          font-size: 10px;
          color: #393447;
          font-weight: 650;
        }

        .dmax-info-row p {
          font-size: 9px;
          color: #898593;
          margin: 5px 0 0;
        }

        /* JOIN CARD */

        .dmax-join-card {
          text-align: left;
          padding: 15px 17px;
        }

        .dmax-join-card p {
          color: #898593;
          font-size: 9px;
          line-height: 1.6;
          margin: 8px 0 12px;
        }

        .dmax-join-card button {
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

        .dmax-join-card button:hover,
        .dmax-submit:hover {
          background: #6240cf;
        }

        .dmax-join-card button span {
          margin-left: 5px;
        }

        /* GALLERY */

        .dmax-gallery-heading {
          margin-bottom: 17px;
        }

        .dmax-gallery-heading > span {
          color: #7953ed;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .dmax-gallery-heading h3 {
          margin: 7px 0 5px;
          font-size: 17px;
        }

        .dmax-gallery-heading p {
          color: #898593;
          font-size: 11px;
          margin: 0;
        }

        .dmax-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .dmax-gallery-item {
          height: 160px;
          padding: 15px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .dmax-gallery-item span {
          font-size: 19px;
        }

        .dmax-gallery-item h4 {
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

        .dmax-modal-overlay {
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

        .dmax-modal {
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

        .dmax-close {
          position: absolute;
          top: 12px;
          right: 17px;
          border: none;
          background: transparent;
          color: #777384;
          font-size: 26px;
          cursor: pointer;
        }

        .dmax-modal-label {
          color: #7953ed;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .dmax-modal h2 {
          font-size: 22px;
          color: #29243a;
          margin: 8px 0 5px;
        }

        .dmax-modal-subtitle {
          font-size: 11px;
          color: #898593;
          margin: 0 0 20px;
        }

        .dmax-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 13px;
        }

        .dmax-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }

        .dmax-form-group label {
          font-size: 10px;
          font-weight: 700;
          color: #4a4558;
        }

        .dmax-form-group input,
        .dmax-form-group select,
        .dmax-form-group textarea {
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

        .dmax-form-group input:focus,
        .dmax-form-group select:focus,
        .dmax-form-group textarea:focus {
          border-color: #7953ed;
        }

        .dmax-form-group textarea {
          resize: vertical;
        }

        .dmax-submit {
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
          .dmax-content {
            width: 90%;
          }

          .dmax-dashboard {
            grid-template-columns: 1fr;
          }

          .dmax-hero-inner {
            width: 90%;
          }

          .dmax-hero h1 {
            padding-right: 0;
            font-size: 32px;
          }
        }

        @media (max-width: 520px) {
          .dmax-navbar {
            height: auto;
            min-height: 60px;
            padding: 12px 5%;
            gap: 10px;
          }

          .dmax-brand {
            font-size: 20px;
          }

          .dmax-nav-links {
            gap: 10px;
          }

          .dmax-nav-links a {
            font-size: 10px;
          }

          .dmax-nav-links button {
            padding: 8px 10px;
            font-size: 9px;
          }

          .dmax-hero {
            height: 140px;
          }

          .dmax-logo-box {
            width: 62px;
            height: 62px;
          }

          .dmax-hero h1 {
            font-size: 27px;
          }

          .dmax-content {
            padding-top: 24px;
          }

          .dmax-gallery-grid {
            grid-template-columns: 1fr;
          }

          .dmax-gallery-item {
            height: 140px;
          }

          .dmax-form-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .dmax-modal {
            padding: 24px 18px;
          }
        }

      `}</style>
    </div>
  );
}