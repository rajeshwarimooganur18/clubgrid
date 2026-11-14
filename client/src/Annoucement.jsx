import React from "react";
import { Link } from "react-router-dom";

function Announcement() {
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

          <Link to="/my-application">
            <span className="cg-nav-icon">▤</span>
            My Application
          </Link>

          <Link to="/events">
            <span className="cg-nav-icon">▣</span>
            Events
          </Link>

          <Link to="/announcements" className="cg-nav-active">
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

      {/* ANNOUNCEMENTS */}
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

      {/* CSS */}
      <style>{`

        .announcement-page {
          min-height: 100vh;
          background: #f8f8fc;
          font-family: inherit;
          color: #171717;
        }

        .announcement-content {
          min-height: calc(100vh - 85px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 30px 20px;
          box-sizing: border-box;
        }

        .announcement-icon {
          width: 100px;
          height: 100px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #eee9ff;
          margin-bottom: 25px;
        }

        .announcement-icon span {
          font-size: 43px;
        }

        .announcement-content h1 {
          font-size: 30px;
          font-weight: 750;
          letter-spacing: -0.7px;
          margin: 0 0 12px;
          color: #171717;
        }

        .announcement-content p {
          max-width: 430px;
          font-size: 15px;
          line-height: 1.7;
          color: #85838f;
          margin: 0;
        }

        @media (max-width: 600px) {
          .announcement-content h1 {
            font-size: 24px;
          }

          .announcement-content p {
            font-size: 13px;
          }
        }

      `}</style>

    </div>
  );
}

export default Announcement;