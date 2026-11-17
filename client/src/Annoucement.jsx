import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { announcementsAPI, getCurrentUser } from "./api";
import "./Annoucement.css";

function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    announcementsAPI.getAll()
      .then((data) => setAnnouncements(data || []))
      .catch((err) => console.error("Error loading announcements:", err))
      .finally(() => setLoading(false));
  }, []);

  const userInitial = (currentUser?.name || currentUser?.fullName || "Student").charAt(0).toUpperCase();

  return (
    <div className="announcement-page">

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

          <Link to="/my-applications">
            <span className="cg-nav-icon">▤</span>
            My Applications
          </Link>

          <Link to="/events">
            <span className="cg-nav-icon">▣</span>
            Events
          </Link>

          <Link to="/announcements" className="cg-nav-active">
            <span className="cg-nav-icon">⚐</span>
            Announcement
          </Link>
        </nav>

        <div className="cg-profile">
          {currentUser && currentUser.loggedIn ? (
            <Link
              to="/profile"
              className="cg-profile-circle"
              aria-label="Open My Profile"
              title="My Profile"
            >
              <span style={{ color: "#fff", fontWeight: "700", fontSize: "14px" }}>
                {userInitial}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="cg-profile-circle"
              aria-label="Open My Profile"
              title="Login"
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
          )}
          <span className="cg-profile-arrow">▾</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      {loading ? (
        <main className="announcement-content">
          <p>Loading announcements...</p>
        </main>
      ) : announcements.length === 0 ? (
        <main className="announcement-content">
          <div className="announcement-icon">
            <span>📢</span>
          </div>

          <h1>No announcements yet.</h1>

          <p>
            There are no announcements at the moment.
            Check back later for updates!
          </p>
        </main>
      ) : (
        <main className="announcements-list-container">
          <div style={{ textAlign: "center", marginBottom: "35px" }}>
            <span style={{ color: "#7953ed", fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px" }}>
              CAMPUS NOTICES
            </span>
            <h1 style={{ fontSize: "36px", fontWeight: "800", margin: "8px 0" }}>
              Announcements & Notices
            </h1>
            <p style={{ color: "#726f83", margin: 0 }}>
              Stay informed with official updates from college club leaders.
            </p>
          </div>

          <div>
            {announcements.map((item) => (
              <article key={item._id || item.id} className="announcement-card-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span className="announcement-badge">
                    {item.category || "General"}
                  </span>
                  <span style={{ fontSize: "13px", color: "#8c899c" }}>
                    📅 {item.date}
                  </span>
                </div>

                <h2 style={{ fontSize: "20px", fontWeight: "750", margin: "0 0 10px", color: "#1f1d2b" }}>
                  {item.title}
                </h2>

                <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7", margin: "0 0 14px" }}>
                  {item.description}
                </p>

                <div style={{ fontSize: "12px", color: "#8c899c" }}>
                  Posted by: <strong>{item.postedBy || "ClubGrid Admin"}</strong>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}

    </div>
  );
}

export default Announcement;
