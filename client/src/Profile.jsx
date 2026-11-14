import React from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const student = JSON.parse(
    localStorage.getItem("clubgridUser") || "null"
  );

  if (!student || !student.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("clubgridUser");
    navigate("/login");
  };

  const displayName = (student.name || "Student")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const initials = displayName
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .slice(0, 2);

  const details = [
    {
      icon: "✉",
      label: "Email Address",
      value: student.email || "Not provided",
    },
    {
      icon: "🎓",
      label: "Department",
      value: student.department || "Not provided",
    },
    {
      icon: "📚",
      label: "Academic Year",
      value: student.year || "Not provided",
    },
  ];

  return (
    <div className="profile-page">

      {/* NAVBAR */}
      <header className="cg-navbar">
        <Link to="/" className="cg-brand">
          <span className="cg-brand-symbol">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>ClubGrid</span>
        </Link>

        <nav className="cg-nav">
          <Link to="/">
            <span className="cg-nav-icon">⌂</span>
            Home
          </Link>

          <Link to="/#clubs">
            <span className="cg-nav-icon">♧</span>
            Clubs
          </Link>

          <Link to="/my-application">
            <span className="cg-nav-icon">▤</span>
            My Application
          </Link>

          <Link to="/events">
            <span className="cg-nav-icon">▣</span>
            Events
          </Link>

          <Link to="/announcements">
            <span className="cg-nav-icon">⚑</span>
            Announcement
          </Link>
        </nav>

        <div className="cg-profile">
          <Link
            to="/profile"
            className="cg-profile-circle"
            aria-label="Open My Profile"
            title="My Profile"
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
            </svg>
          </Link>

          <span className="cg-profile-arrow">▾</span>
        </div>
      </header>

      {/* PROFILE CONTENT */}
      <main className="profile-main">

        {/* PAGE HEADING */}
        <div className="profile-heading">
          <p className="profile-eyebrow">STUDENT ACCOUNT</p>
          <h1>My <span>Profile</span></h1>
          <p>
            Manage your personal information and account details.
          </p>
        </div>

        {/* PROFILE CARD */}
        <section className="profile-card">

          <div className="profile-cover">
            <div className="profile-cover-decoration"></div>
          </div>

          <div className="profile-card-content">

            {/* AVATAR */}
            <div className="profile-avatar">
              {initials}
            </div>

            <h2 className="profile-name">
              {displayName}
            </h2>

            <p className="profile-email">
              {student.email}
            </p>

            <div className="profile-status">
              <span className="profile-status-dot"></span>
              Active Student
            </div>

            <div className="profile-divider"></div>

            {/* PERSONAL INFORMATION */}
            <div className="profile-section-heading">
              <div>
                <h3>Personal Information</h3>
                <p>Your registered student details</p>
              </div>

              <span className="profile-section-icon">✦</span>
            </div>

            <div className="profile-details-grid">
              {details.map((item) => (
                <div className="profile-detail-box" key={item.label}>

                  <div className="profile-detail-icon">
                    {item.icon}
                  </div>

                  <div className="profile-detail-text">
                    <span className="profile-detail-label">
                      {item.label}
                    </span>

                    <strong className="profile-detail-value">
                      {item.value}
                    </strong>
                  </div>

                </div>
              ))}
            </div>

            {/* BUTTONS */}
            <div className="profile-buttons">

              <button
                className="profile-home-button"
                onClick={() => navigate("/")}
              >
                <span>←</span> Back to Home
              </button>

              <button
                className="profile-logout-button"
                onClick={handleLogout}
              >
                <span>↪</span> Logout
              </button>

            </div>

          </div>
        </section>

        <p className="profile-footer">
          CLUBGRID · YOUR CAMPUS, YOUR COMMUNITY
        </p>

      </main>

      {/* CSS */}
      <style>{`

        .profile-page {
          min-height: 100vh;
          background: #f8f8fc;
          font-family: inherit;
          color: #171717;
        }

        /* PAGE LAYOUT */

        .profile-main {
          max-width: 1050px;
          margin: 0 auto;
          padding: 45px 30px 35px;
        }

        /* PAGE HEADING */

        .profile-heading {
          text-align: center;
          margin-bottom: 32px;
        }

        .profile-eyebrow {
          color: #7953ed;
          font-size: 11px;
          font-weight: 750;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }

        .profile-heading h1 {
          font-size: 36px;
          font-weight: 750;
          letter-spacing: -1px;
          margin: 0 0 10px;
          color: #171717;
        }

        .profile-heading h1 span {
          color: #7953ed;
        }

        .profile-heading > p:last-child {
          font-size: 14px;
          color: #85838f;
          margin: 0;
        }

        /* PROFILE CARD */

        .profile-card {
          max-width: 780px;
          margin: 0 auto;
          background: white;
          border: 1px solid #eeeef3;
          border-radius: 17px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(30, 20, 70, 0.055);
        }

        /* COVER */

        .profile-cover {
          height: 145px;
          background: linear-gradient(
            115deg,
            #30205e,
            #6242b7,
            #9274f2
          );
          position: relative;
          overflow: hidden;
        }

        .profile-cover-decoration {
          position: absolute;
          width: 260px;
          height: 260px;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 50%;
          right: 10%;
          top: -125px;
          box-shadow:
            0 0 0 30px rgba(255,255,255,0.045),
            0 0 0 65px rgba(255,255,255,0.035);
        }

        /* PROFILE CONTENT */

        .profile-card-content {
          padding: 0 42px 38px;
          text-align: center;
        }

        .profile-avatar {
          width: 108px;
          height: 108px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #7953ed,
            #a58cf7
          );
          color: white;
          border: 6px solid white;
          margin: -56px auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          font-weight: 750;
          position: relative;
          box-shadow: 0 4px 14px rgba(70, 45, 150, 0.16);
        }

        .profile-name {
          font-size: 26px;
          font-weight: 750;
          color: #191725;
          margin: 8px 0;
        }

        .profile-email {
          color: #888594;
          font-size: 14px;
          margin: 0 0 16px;
        }

        /* STATUS */

        .profile-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #eaf8ef;
          color: #21834b;
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 700;
        }

        .profile-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #27ad60;
        }

        /* DIVIDER */

        .profile-divider {
          height: 1px;
          background: #eeeef2;
          margin: 30px 0;
        }

        /* SECTION HEADING */

        .profile-section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          margin-bottom: 20px;
        }

        .profile-section-heading h3 {
          font-size: 18px;
          font-weight: 750;
          margin: 0 0 6px;
          color: #201d2c;
        }

        .profile-section-heading p {
          font-size: 12px;
          color: #9996a3;
          margin: 0;
        }

        .profile-section-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #f0ebff;
          color: #7953ed;
          font-size: 19px;
        }

        /* DETAILS GRID */

        .profile-details-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
          text-align: left;
        }

        .profile-detail-box {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
          background: #faf9ff;
          border: 1px solid #efecf8;
          padding: 17px;
          border-radius: 11px;
          transition: 0.2s ease;
        }

        .profile-detail-box:hover {
          border-color: #cfc0ff;
          background: #f7f4ff;
        }

        .profile-detail-icon {
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          background: #eee9ff;
          border-radius: 11px;
          font-size: 19px;
        }

        .profile-detail-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .profile-detail-label {
          color: #9995a5;
          font-size: 11px;
          font-weight: 500;
        }

        .profile-detail-value {
          font-size: 13px;
          color: #292536;
          overflow-wrap: anywhere;
        }

        /* BUTTONS */

        .profile-buttons {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 30px;
        }

        .profile-home-button,
        .profile-logout-button {
          padding: 13px 25px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .profile-home-button {
          background: #7953ed;
          color: white;
          border: 1px solid #7953ed;
        }

        .profile-home-button:hover {
          background: #6540d5;
          border-color: #6540d5;
        }

        .profile-logout-button {
          background: white;
          color: #d64d55;
          border: 1px solid #f1d6d8;
        }

        .profile-logout-button:hover {
          background: #fff3f3;
          border-color: #e9aeb2;
        }

        .profile-home-button span,
        .profile-logout-button span {
          margin-right: 6px;
        }

        /* FOOTER */

        .profile-footer {
          text-align: center;
          color: #aaa6b4;
          font-size: 10px;
          letter-spacing: 2px;
          margin-top: 30px;
        }

        /* RESPONSIVE */

        @media (max-width: 760px) {
          .profile-main {
            padding: 35px 18px;
          }

          .profile-heading h1 {
            font-size: 30px;
          }

          .profile-card-content {
            padding: 0 22px 28px;
          }

          .profile-details-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .profile-buttons {
            flex-direction: column;
          }

          .profile-home-button,
          .profile-logout-button {
            width: 100%;
          }

          .profile-name {
            font-size: 23px;
          }
        }

      `}</style>

    </div>
  );
}

export default Profile;