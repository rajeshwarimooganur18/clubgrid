import { authAPI, submitTeamApplication } from "./api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Alphas() {
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
      await submitTeamApplication(formData, "Dance Club", "Alphas");
      alert("Your application to Alphas has been submitted successfully! You can track its status under 'My Application'.");
      setShowModal(false);
      setFormData((current) => ({
        ...current,
        danceStyle: "",
        experience: "",
        reason: "",
      }));
    } catch (err) {
      alert(err.message || "Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="alphas-page">

      {/* NAVBAR */}
      <nav className="alphas-navbar">
        <Link to="/" className="alphas-brand">
          ClubGrid<span>.</span>
        </Link>

        <div className="alphas-nav-links">
          <Link to="/">Home</Link>
          <Link to="/clubs/dance">Dance Club</Link>
          <a href="#about">About</a>
          <button onClick={() => setShowModal(true)}>
            Join Team
          </button>
        </div>
      </nav>

      {/* HERO BANNER */}
      <section className="alphas-hero">

        <div className="alphas-logo-box">
          <img
            src="/alphas.png"
            alt="Alphas Team Logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span>TEAM LOGO</span>
        </div>

        <div className="alphas-hero-title">
          <h1>ALPHAS</h1>
          <p>DANCE • PASSION • PERFORMANCE</p>
        </div>

      </section>

      {/* MAIN CONTENT */}
      <main className="alphas-main">

        {/* INTRODUCTION AND TABS */}
        <div className="alphas-heading-row" id="about">

          <div className="alphas-intro">
            <h2>Alphas</h2>

            <p>
              Alphas is a dance team that brings together
              enthusiastic performers who share a love for
              movement, music and artistic expression.

              Through practice, collaboration and performances,
              the team provides students with an opportunity to
              develop their skills, build confidence and create
              lasting memories on and off the stage.
            </p>
          </div>

          <div className="alphas-tabs">
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

        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="alphas-overview">

            {/* ACHIEVEMENTS */}
            <section className="alphas-achievements">

              <h3>
                <span className="alphas-heading-icon">✦</span>
                Achievements
              </h3>

              <div className="alphas-achievement-item">
                <div className="alphas-achievement-icon">✦</div>

                <div className="alphas-achievement-content">
                  <span className="alphas-year">2026</span>

                  <div>
                    <h4>Dance Performances</h4>
                    <p>
                      Team performances and achievements
                      will be updated soon.
                    </p>
                  </div>
                </div>
              </div>

              <div className="alphas-achievement-item">
                <div className="alphas-achievement-icon">✦</div>

                <div className="alphas-achievement-content">
                  <span className="alphas-year">2025</span>

                  <div>
                    <h4>Dance Activities</h4>
                    <p>
                      Stay tuned for upcoming performances,
                      competitions and highlights.
                    </p>
                  </div>
                </div>
              </div>

            </section>

            {/* RIGHT COLUMN */}
            <div className="alphas-right-column">

              {/* TEAM INFORMATION */}
              <section className="alphas-team-info">

                <div className="alphas-info-item">
                  <span className="alphas-info-icon">♟</span>

                  <div>
                    <strong>Members: To be updated</strong>
                  </div>
                </div>

                <div className="alphas-info-item">
                  <span className="alphas-info-icon">♟</span>

                  <div>
                    <strong>Team Coordinator</strong>
                    <p>To be announced</p>
                  </div>
                </div>

              </section>

              {/* JOIN ALPHAS */}
              <section className="alphas-join-card">

                <h3>
                  <span className="alphas-heading-icon">✦</span>
                  Ready to Be an Alpha?
                </h3>

                <p>
                  Have a passion for dance and a desire to
                  perform? Bring your talent, energy and
                  creativity to the team!
                </p>

                <button onClick={() => setShowModal(true)}>
                  Apply Now <span>→</span>
                </button>

              </section>

            </div>
          </div>
        )}

        {/* GALLERY */}
        {activeTab === "gallery" && (
          <section className="alphas-gallery">

            <h3>Our Gallery</h3>

            <p>
              Explore the performances, memories and
              experiences of the Alphas dance team.
            </p>

            <div className="alphas-gallery-grid">

              <div className="alphas-gallery-item">
                <span>01</span>
                <p>Performances</p>
              </div>

              <div className="alphas-gallery-item">
                <span>02</span>
                <p>Team Memories</p>
              </div>

              <div className="alphas-gallery-item">
                <span>03</span>
                <p>Behind the Scenes</p>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* APPLICATION MODAL */}
      {showModal && (
        <div
          className="alphas-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="alphas-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="alphas-modal-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <span className="alphas-modal-label">
              BECOME A MEMBER
            </span>

            <h2>Join Alphas</h2>

            <p className="alphas-modal-subtitle">
              Tell us a little about yourself!
            </p>

            <form onSubmit={handleSubmit}>

              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                readOnly
                onChange={handleChange}
                required
              />

              <label>USN</label>
              <input
                type="text"
                name="usn"
                placeholder="Enter your USN"
                value={formData.usn}
                readOnly
                onChange={handleChange}
                required
              />

              <div className="alphas-form-row">

                <div>
                  <label>Department</label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    readOnly
                    required
                  />
                </div>

                <div>
                  <label>Year</label>

                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    readOnly
                    required
                  />
                </div>

              </div>

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

              <label>Why do you want to join Alphas?</label>

              <textarea
                name="reason"
                placeholder="Tell us about your passion for dance..."
                value={formData.reason}
                onChange={handleChange}
                required
              />

              {!profileLoaded && <p role={profileError ? "alert" : "status"}>{profileError || "Loading your profile..."}</p>}
              <button
                type="submit"
                className="alphas-submit-btn"
                disabled={!profileLoaded}
              >
                Submit Application →
              </button>

            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="alphas-footer">
        <h3>ALPHAS<span>.</span></h3>
        <p>Born to move. Built to perform.</p>

        <Link to="/clubs/dance">
          ← Back to Dance Club
        </Link>
      </footer>

      {/* CSS */}
      <style>{`

        /* GENERAL */

        .alphas-page {
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          color: #25212c;
          min-height: 100vh;
        }

        .alphas-page * {
          box-sizing: border-box;
        }

        /* NAVBAR */

        .alphas-navbar {
          height: 65px;
          padding: 0 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-bottom: 1px solid #eeeeee;
        }

        .alphas-brand {
          font-size: 23px;
          font-weight: 800;
          color: #21172f;
          text-decoration: none;
        }

        .alphas-brand span,
        .alphas-footer h3 span {
          color: #7953ed;
        }

        .alphas-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .alphas-nav-links a {
          text-decoration: none;
          color: #38333f;
          font-size: 13px;
          font-weight: 600;
        }

        .alphas-nav-links button {
          background: #7953ed;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 7px;
          font-weight: 600;
          cursor: pointer;
        }

        /* HERO BANNER */

        .alphas-hero {
          height: 180px;
          width: 100%;
          background: #30234c;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          color: white;
        }

        .alphas-logo-box {
          position: absolute;
          left: 5%;
          top: 50%;
          transform: translateY(-50%);
          width: 78px;
          height: 115px;
          border: 1px solid rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.18);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
          padding: 7px;
        }

        .alphas-logo-box img {
          max-width: 100%;
          max-height: 75px;
          object-fit: contain;
        }

        .alphas-logo-box span {
          font-size: 8px;
          color: white;
          letter-spacing: 1px;
        }

        .alphas-hero-title {
          text-align: center;
        }

        .alphas-hero-title h1 {
          font-size: 29px;
          font-weight: 800;
          letter-spacing: 4px;
          margin: 0 0 8px;
          color: white;
        }

        .alphas-hero-title p {
          font-size: 11px;
          letter-spacing: 1.5px;
          color: #ddd4ed;
          margin: 0;
        }

        /* MAIN CONTENT */

        .alphas-main {
          max-width: 1100px;
          margin: auto;
          padding: 18px 22px 65px;
        }

        .alphas-heading-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 12px;
        }

        .alphas-intro {
          max-width: 760px;
        }

        .alphas-intro h2 {
          font-size: 25px;
          font-weight: 800;
          margin: 0 0 5px;
          color: #25212c;
        }

        .alphas-intro p {
          font-size: 13px;
          line-height: 1.75;
          color: #55515d;
          margin: 0;
        }

        /* TABS */

        .alphas-tabs {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-shrink: 0;
        }

        .alphas-tabs button {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 10px 0;
          color: #29242f;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .alphas-tabs button.active {
          color: #7953ed;
          border-bottom-color: #7953ed;
        }

        /* OVERVIEW GRID */

        .alphas-overview {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 13px;
          align-items: stretch;
        }

        /* ACHIEVEMENTS */

        .alphas-achievements {
          border: 1px solid #d9d6df;
          border-radius: 9px;
          padding: 18px;
          background: #ffffff;
        }

        .alphas-achievements > h3,
        .alphas-join-card h3 {
          font-size: 19px;
          font-weight: 800;
          margin: 0 0 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #25212c;
        }

        .alphas-heading-icon {
          color: #7953ed;
          font-size: 19px;
        }

        .alphas-achievement-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          margin-bottom: 12px;
          background: #fafafa;
          border: 1px solid #d8d5de;
          border-radius: 8px;
        }

        .alphas-achievement-item:last-child {
          margin-bottom: 0;
        }

        .alphas-achievement-icon {
          width: 25px;
          height: 25px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          color: #7953ed;
          font-size: 17px;
        }

        .alphas-achievement-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .alphas-year {
          background: #7953ed;
          color: white;
          padding: 7px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
        }

        .alphas-achievement-content h4 {
          margin: 0 0 4px;
          font-size: 13px;
          color: #29242f;
        }

        .alphas-achievement-content p {
          margin: 0;
          font-size: 10px;
          line-height: 1.5;
          color: #77717f;
        }

        /* RIGHT COLUMN */

        .alphas-right-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* TEAM INFORMATION */

        .alphas-team-info {
          border: 1px solid #d9d6df;
          border-radius: 9px;
          padding: 10px 16px;
          background: #ffffff;
        }

        .alphas-info-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 0;
        }

        .alphas-info-item + .alphas-info-item {
          border-top: 1px solid #e5e2e9;
        }

        .alphas-info-icon {
          width: 20px;
          font-size: 17px;
          color: #7953ed;
        }

        .alphas-info-item strong {
          font-size: 13px;
          color: #29242f;
        }

        .alphas-info-item p {
          font-size: 11px;
          margin: 4px 0 0;
          color: #77717f;
        }

        /* JOIN CARD */

        .alphas-join-card {
          border: 1px solid #d9d6df;
          border-radius: 9px;
          padding: 15px 16px;
          background: #ffffff;
        }

        .alphas-join-card h3 {
          font-size: 17px;
          margin-bottom: 7px;
        }

        .alphas-join-card p {
          font-size: 11px;
          line-height: 1.7;
          color: #514c57;
          margin: 0 0 10px;
        }

        .alphas-join-card button {
          background: #7953ed;
          color: white;
          border: none;
          padding: 8px 17px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .alphas-join-card button span {
          margin-left: 6px;
        }

        /* GALLERY */

        .alphas-gallery {
          padding: 12px 0;
        }

        .alphas-gallery h3 {
          font-size: 22px;
          margin: 0 0 7px;
        }

        .alphas-gallery > p {
          font-size: 12px;
          color: #77717f;
          margin-bottom: 20px;
        }

        .alphas-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .alphas-gallery-item {
          min-height: 190px;
          padding: 18px;
          border-radius: 9px;
          background: linear-gradient(135deg, #30234c, #7953ed);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: white;
        }

        .alphas-gallery-item span {
          color: #ded1ff;
          font-size: 12px;
        }

        .alphas-gallery-item p {
          font-size: 14px;
          font-weight: 700;
        }

        /* APPLICATION MODAL */

        .alphas-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(20, 10, 28, 0.72);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          overflow-y: auto;
        }

        .alphas-modal {
          position: relative;
          background: white;
          width: 100%;
          max-width: 510px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 12px;
          padding: 30px;
        }

        .alphas-modal-close {
          position: absolute;
          top: 12px;
          right: 18px;
          border: none;
          background: none;
          font-size: 27px;
          cursor: pointer;
          color: #6e6077;
        }

        .alphas-modal-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #7953ed;
        }

        .alphas-modal h2 {
          font-size: 25px;
          margin: 10px 0 5px;
        }

        .alphas-modal-subtitle {
          font-size: 12px;
          color: #81758a;
          margin-bottom: 20px;
        }

        .alphas-modal form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .alphas-modal label {
          font-size: 12px;
          font-weight: 600;
          color: #46364f;
          margin-top: 5px;
        }

        .alphas-modal input,
        .alphas-modal select,
        .alphas-modal textarea {
          width: 100%;
          padding: 11px;
          border: 1px solid #ded9e5;
          border-radius: 7px;
          outline: none;
          font-family: inherit;
          font-size: 12px;
          background: white;
        }

        .alphas-modal input:focus,
        .alphas-modal select:focus,
        .alphas-modal textarea:focus {
          border-color: #7953ed;
        }

        .alphas-modal textarea {
          min-height: 85px;
          resize: vertical;
        }

        .alphas-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .alphas-form-row > div {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .alphas-submit-btn {
          margin-top: 12px;
          background: #7953ed;
          color: white;
          border: none;
          border-radius: 7px;
          padding: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        /* FOOTER */

        .alphas-footer {
          padding: 28px 20px;
          text-align: center;
          background: #30234c;
          color: white;
        }

        .alphas-footer h3 {
          letter-spacing: 3px;
          margin: 0 0 8px;
        }

        .alphas-footer p {
          color: #d2c8df;
          font-size: 12px;
        }

        .alphas-footer a {
          display: inline-block;
          margin-top: 8px;
          color: #d9c5ff;
          text-decoration: none;
          font-size: 12px;
        }

        /* TABLET */

        @media (max-width: 768px) {
          .alphas-navbar {
            padding: 0 4%;
          }

          .alphas-nav-links {
            gap: 15px;
          }

          .alphas-main {
            padding-left: 18px;
            padding-right: 18px;
          }

          .alphas-intro {
            max-width: 70%;
          }

          .alphas-overview {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* MOBILE */

        @media (max-width: 520px) {
          .alphas-navbar {
            height: auto;
            padding: 15px 5%;
            align-items: center;
          }

          .alphas-nav-links {
            gap: 10px;
          }

          .alphas-nav-links a {
            font-size: 10px;
          }

          .alphas-nav-links button {
            padding: 8px 11px;
            font-size: 10px;
          }

          .alphas-hero {
            height: 145px;
          }

          .alphas-logo-box {
            left: 4%;
            width: 58px;
            height: 85px;
          }

          .alphas-logo-box img {
            max-height: 55px;
          }

          .alphas-hero-title h1 {
            font-size: 19px;
            letter-spacing: 2px;
          }

          .alphas-hero-title p {
            font-size: 8px;
          }

          .alphas-main {
            padding: 18px 14px 40px;
          }

          .alphas-heading-row {
            flex-direction: column;
            gap: 10px;
          }

          .alphas-intro {
            max-width: 100%;
          }

          .alphas-intro h2 {
            font-size: 22px;
          }

          .alphas-intro p {
            font-size: 12px;
          }

          .alphas-tabs {
            align-self: flex-end;
          }

          .alphas-overview {
            grid-template-columns: 1fr;
          }

          .alphas-achievement-content {
            flex-wrap: wrap;
          }

          .alphas-gallery-grid {
            grid-template-columns: 1fr;
          }

          .alphas-form-row {
            grid-template-columns: 1fr;
          }

          .alphas-modal {
            padding: 25px 18px;
          }
        }

      `}</style>
    </div>
  );
}