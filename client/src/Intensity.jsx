import { authAPI, submitTeamApplication } from "./api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Intensity() {
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
      await submitTeamApplication(formData, "Dance Club", "Intensity");
      alert("Your application to Intensity has been submitted successfully! You can track its status under 'My Application'.");
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
    <div className="intensity-page">

      {/* NAVBAR */}
      <nav className="intensity-navbar">
        <Link to="/" className="intensity-brand">
          ClubGrid<span>.</span>
        </Link>

        <div className="intensity-nav-links">
          <Link to="/">Home</Link>
          <Link to="/clubs/dance">Dance Club</Link>
          <button onClick={() => setShowModal(true)}>
            Join Team
          </button>
        </div>
      </nav>

      {/* TEAM HERO BANNER */}
      <section className="intensity-hero">
        <div className="intensity-logo-box">
          <img
            src="/intensity.png"
            alt="Intensity Team Logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span>TEAM LOGO</span>
        </div>

        <div className="intensity-hero-title">
          <h1>INTENSITY</h1>
          <p>DANCE • ENERGY • PERFORMANCE</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="intensity-main">

        {/* INTRODUCTION AND TABS */}
        <div className="intensity-heading-row">
          <div className="intensity-intro">
            <h2>Intensity</h2>
            <p>
              Welcome to Intensity! A passionate dance team
              that celebrates movement, creativity and the
              energy of performance. Explore your passion
              for dance, showcase your talent and become a
              part of our energetic community.
            </p>
          </div>

          <div className="intensity-tabs">
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
          <div className="intensity-content-grid">

            {/* ACHIEVEMENTS */}
            <section className="intensity-achievements">
              <h3>
                <span className="intensity-heading-icon">✦</span>
                Achievements
              </h3>

              <div className="intensity-achievement-item">
                <div className="intensity-achievement-icon">✦</div>
                <div className="intensity-achievement-content">
                  <span className="intensity-year">2026</span>
                  <div>
                    <h4>Dance Performances</h4>
                    <p>
                      Team performances and achievements
                      will be updated soon.
                    </p>
                  </div>
                </div>
              </div>

              <div className="intensity-achievement-item">
                <div className="intensity-achievement-icon">✦</div>
                <div className="intensity-achievement-content">
                  <span className="intensity-year">2025</span>
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

            {/* RIGHT SIDE */}
            <div className="intensity-right-column">

              {/* TEAM INFORMATION */}
              <section className="intensity-team-info">

                <div className="intensity-info-item">
                  <span className="intensity-info-icon">♟</span>
                  <div>
                    <strong>Members: To be updated</strong>
                  </div>
                </div>

                <div className="intensity-info-item">
                  <span className="intensity-info-icon">♟</span>
                  <div>
                    <strong>Team Coordinator</strong>
                    <p>To be announced</p>
                  </div>
                </div>

              </section>

              {/* JOIN CARD */}
              <section className="intensity-join-card">
                <h3>
                  <span className="intensity-heading-icon">✦</span>
                  Join Intensity
                </h3>

                <p>
                  Love dancing? Become a part of Intensity,
                  explore your passion, develop your skills
                  and shine on stage!
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
          <section className="intensity-gallery">
            <h3>Our Gallery</h3>
            <p>
              Explore the performances, memories and
              experiences of the Intensity dance team.
            </p>

            <div className="intensity-gallery-grid">
              <div className="intensity-gallery-card">
                <img
                  src="/intensity-gallery1.jpg"
                  alt="Intensity performance"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span>Performance Moments</span>
              </div>

              <div className="intensity-gallery-card">
                <img
                  src="/intensity-gallery2.jpg"
                  alt="Intensity team"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span>Team Memories</span>
              </div>

              <div className="intensity-gallery-card">
                <img
                  src="/intensity-gallery3.jpg"
                  alt="Intensity activities"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span>Behind the Scenes</span>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* APPLICATION MODAL */}
      {showModal && (
        <div
          className="intensity-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="intensity-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="intensity-modal-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <span className="intensity-modal-label">
              BECOME A MEMBER
            </span>

            <h2>Join Intensity</h2>
            <p className="intensity-modal-subtitle">
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

              <div className="intensity-form-row">
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
                <option value="Less than 1 year">Less than 1 year</option>
                <option value="1–2 years">1–2 years</option>
                <option value="3–5 years">3–5 years</option>
                <option value="More than 5 years">More than 5 years</option>
              </select>

              <label>Why do you want to join Intensity?</label>
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
                className="intensity-submit-btn"
                disabled={!profileLoaded}
              >
                Submit Application →
              </button>

            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="intensity-footer">
        <h3>INTENSITY<span>.</span></h3>
        <p>Dance • Energy • Performance</p>
        <Link to="/clubs/dance">
          ← Back to Dance Club
        </Link>
      </footer>

      {/* CSS */}
      <style>{`

        /* GENERAL */

        .intensity-page {
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          color: #25212c;
          min-height: 100vh;
        }

        .intensity-page * {
          box-sizing: border-box;
        }

        /* NAVBAR */

        .intensity-navbar {
          height: 65px;
          padding: 0 7%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          border-bottom: 1px solid #eeeeee;
        }

        .intensity-brand {
          font-size: 23px;
          font-weight: 800;
          color: #21172f;
          text-decoration: none;
        }

        .intensity-brand span,
        .intensity-footer h3 span {
          color: #7953ed;
        }

        .intensity-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .intensity-nav-links a {
          text-decoration: none;
          color: #38333f;
          font-size: 13px;
          font-weight: 600;
        }

        .intensity-nav-links button {
          background: #7953ed;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 7px;
          font-weight: 600;
          cursor: pointer;
        }

        /* HERO BANNER */

        .intensity-hero {
          height: 180px;
          width: 100%;
          background: #30234c;
          display: flex;
          align-items: center;
          position: relative;
          justify-content: center;
          color: white;
        }

        .intensity-logo-box {
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

        .intensity-logo-box img {
          max-width: 100%;
          max-height: 75px;
          object-fit: contain;
        }

        .intensity-logo-box span {
          font-size: 8px;
          color: #ffffff;
          letter-spacing: 1px;
        }

        .intensity-hero-title {
          text-align: center;
        }

        .intensity-hero-title h1 {
          font-size: 29px;
          font-weight: 800;
          letter-spacing: 4px;
          margin: 0 0 8px;
          color: #ffffff;
        }

        .intensity-hero-title p {
          font-size: 11px;
          letter-spacing: 1.5px;
          color: #ddd4ed;
          margin: 0;
        }

        /* MAIN CONTENT */

        .intensity-main {
          max-width: 1100px;
          margin: auto;
          padding: 18px 22px 65px;
        }

        .intensity-heading-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 12px;
        }

        .intensity-intro {
          max-width: 760px;
        }

        .intensity-intro h2 {
          font-size: 25px;
          font-weight: 800;
          margin: 0 0 5px;
          color: #25212c;
        }

        .intensity-intro p {
          font-size: 13px;
          line-height: 1.75;
          color: #55515d;
          margin: 0;
        }

        /* TABS */

        .intensity-tabs {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-shrink: 0;
        }

        .intensity-tabs button {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 10px 0;
          color: #29242f;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .intensity-tabs button.active {
          color: #7953ed;
          border-bottom-color: #7953ed;
        }

        /* OVERVIEW GRID */

        .intensity-content-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 13px;
          align-items: stretch;
        }

        /* ACHIEVEMENTS */

        .intensity-achievements {
          border: 1px solid #d9d6df;
          border-radius: 9px;
          padding: 18px;
          background: #ffffff;
        }

        .intensity-achievements > h3,
        .intensity-join-card h3 {
          font-size: 19px;
          font-weight: 800;
          margin: 0 0 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #25212c;
        }

        .intensity-heading-icon {
          color: #7953ed;
          font-size: 19px;
        }

        .intensity-achievement-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          margin-bottom: 12px;
          background: #fafafa;
          border: 1px solid #d8d5de;
          border-radius: 8px;
        }

        .intensity-achievement-item:last-child {
          margin-bottom: 0;
        }

        .intensity-achievement-icon {
          width: 25px;
          height: 25px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          color: #7953ed;
          font-size: 17px;
        }

        .intensity-achievement-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .intensity-year {
          background: #7953ed;
          color: white;
          padding: 7px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
        }

        .intensity-achievement-content h4 {
          margin: 0 0 4px;
          font-size: 13px;
          color: #29242f;
        }

        .intensity-achievement-content p {
          margin: 0;
          font-size: 10px;
          line-height: 1.5;
          color: #77717f;
        }

        /* RIGHT COLUMN */

        .intensity-right-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* TEAM INFORMATION */

        .intensity-team-info {
          border: 1px solid #d9d6df;
          border-radius: 9px;
          padding: 10px 16px;
          background: #ffffff;
        }

        .intensity-info-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 0;
        }

        .intensity-info-item + .intensity-info-item {
          border-top: 1px solid #e5e2e9;
        }

        .intensity-info-icon {
          width: 20px;
          font-size: 17px;
          color: #7953ed;
        }

        .intensity-info-item strong {
          font-size: 13px;
          color: #29242f;
        }

        .intensity-info-item p {
          font-size: 11px;
          margin: 4px 0 0;
          color: #77717f;
        }

        /* JOIN CARD */

        .intensity-join-card {
          border: 1px solid #d9d6df;
          border-radius: 9px;
          padding: 15px 16px;
          background: #ffffff;
        }

        .intensity-join-card h3 {
          font-size: 17px;
          margin-bottom: 7px;
        }

        .intensity-join-card p {
          font-size: 11px;
          line-height: 1.7;
          color: #514c57;
          margin: 0 0 10px;
        }

        .intensity-join-card button {
          background: #7953ed;
          color: white;
          border: none;
          padding: 8px 17px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .intensity-join-card button span {
          margin-left: 6px;
        }

        /* GALLERY */

        .intensity-gallery {
          padding: 12px 0;
        }

        .intensity-gallery h3 {
          font-size: 22px;
          margin: 0 0 7px;
        }

        .intensity-gallery > p {
          font-size: 12px;
          color: #77717f;
          margin-bottom: 20px;
        }

        .intensity-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .intensity-gallery-card {
          height: 190px;
          position: relative;
          overflow: hidden;
          border-radius: 9px;
          background: linear-gradient(135deg, #30234c, #7953ed);
        }

        .intensity-gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .intensity-gallery-card span {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 15px;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          color: white;
          font-size: 13px;
          font-weight: 700;
        }

        /* APPLICATION MODAL */

        .intensity-modal-overlay {
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

        .intensity-modal {
          position: relative;
          background: white;
          width: 100%;
          max-width: 510px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 12px;
          padding: 30px;
        }

        .intensity-modal-close {
          position: absolute;
          top: 12px;
          right: 18px;
          border: none;
          background: none;
          font-size: 27px;
          cursor: pointer;
          color: #6e6077;
        }

        .intensity-modal-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #7953ed;
        }

        .intensity-modal h2 {
          font-size: 25px;
          margin: 10px 0 5px;
        }

        .intensity-modal-subtitle {
          font-size: 12px;
          color: #81758a;
          margin-bottom: 20px;
        }

        .intensity-modal form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .intensity-modal label {
          font-size: 12px;
          font-weight: 600;
          color: #46364f;
          margin-top: 5px;
        }

        .intensity-modal input,
        .intensity-modal select,
        .intensity-modal textarea {
          width: 100%;
          padding: 11px;
          border: 1px solid #ded9e5;
          border-radius: 7px;
          outline: none;
          font-family: inherit;
          font-size: 12px;
          background: white;
        }

        .intensity-modal input:focus,
        .intensity-modal select:focus,
        .intensity-modal textarea:focus {
          border-color: #7953ed;
        }

        .intensity-modal textarea {
          min-height: 85px;
          resize: vertical;
        }

        .intensity-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .intensity-form-row > div {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .intensity-submit-btn {
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

        .intensity-footer {
          padding: 28px 20px;
          text-align: center;
          background: #30234c;
          color: white;
        }

        .intensity-footer h3 {
          letter-spacing: 3px;
          margin: 0 0 8px;
        }

        .intensity-footer p {
          color: #d2c8df;
          font-size: 12px;
        }

        .intensity-footer a {
          display: inline-block;
          margin-top: 8px;
          color: #d9c5ff;
          text-decoration: none;
          font-size: 12px;
        }

        /* TABLET RESPONSIVE */

        @media (max-width: 768px) {
          .intensity-navbar {
            padding: 0 4%;
          }

          .intensity-nav-links {
            gap: 15px;
          }

          .intensity-main {
            padding-left: 18px;
            padding-right: 18px;
          }

          .intensity-intro {
            max-width: 70%;
          }

          .intensity-content-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* MOBILE RESPONSIVE */

        @media (max-width: 520px) {
          .intensity-navbar {
            height: auto;
            padding: 15px 5%;
            align-items: center;
          }

          .intensity-nav-links {
            gap: 10px;
          }

          .intensity-nav-links a {
            font-size: 10px;
          }

          .intensity-nav-links button {
            padding: 8px 11px;
            font-size: 10px;
          }

          .intensity-hero {
            height: 145px;
          }

          .intensity-logo-box {
            left: 4%;
            width: 58px;
            height: 85px;
          }

          .intensity-logo-box img {
            max-height: 55px;
          }

          .intensity-hero-title h1 {
            font-size: 19px;
            letter-spacing: 2px;
          }

          .intensity-hero-title p {
            font-size: 8px;
          }

          .intensity-main {
            padding: 18px 14px 40px;
          }

          .intensity-heading-row {
            flex-direction: column;
            gap: 10px;
          }

          .intensity-intro {
            max-width: 100%;
          }

          .intensity-intro h2 {
            font-size: 22px;
          }

          .intensity-intro p {
            font-size: 12px;
          }

          .intensity-tabs {
            align-self: flex-end;
          }

          .intensity-content-grid {
            grid-template-columns: 1fr;
          }

          .intensity-achievement-content {
            flex-wrap: wrap;
          }

          .intensity-gallery-grid {
            grid-template-columns: 1fr;
          }

          .intensity-form-row {
            grid-template-columns: 1fr;
          }

          .intensity-modal {
            padding: 25px 18px;
          }
        }

      `}</style>
    </div>
  );
}