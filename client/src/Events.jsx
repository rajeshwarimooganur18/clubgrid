import React from "react";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "Generative AI & Agentic AI Workshop",
    club: "QWERTY.I/O",
    category: "Technical Workshop",
    date: "14 November 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "Seminar Hall, SDMCET",
    description:
      "Explore the world of Generative AI and Agentic AI through hands-on sessions, demonstrations and interactive learning.",
    status: "Ongoing",
    icon: "🤖",
    color: "#7953ed",
    background: "#f0ebff",
  },
  {
    id: 2,
    title: "Rhythm & Beats – Dance Showcase",
    club: "Dance Club",
    category: "Cultural Event",
    date: "18 November 2026",
    time: "5:00 PM onwards",
    venue: "Near the Main Auditorium",
    description:
      "Get ready for an exciting evening filled with energetic performances, music and incredible dance talent.",
    status: "Upcoming",
    countdown: "Starts in 4 days",
    icon: "💃",
    color: "#e65c8a",
    background: "#fff0f5",
  },
];

function Events() {
  return (
    <div className="events-page">

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

          <Link to="/events" className="cg-nav-active">
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

      {/* PAGE HEADER */}
      <section style={{color:"#7953ed"}} className="events-hero">
        <div className="events-hero-content">
          <p className="events-eyebrow">WHAT'S HAPPENING ON CAMPUS?</p>

          <h1 style={{color:"white"}}>
            Discover  <span>Events</span>
          </h1>

          <p>
            Stay connected, explore exciting experiences and never miss
            what's happening around your campus.
          </p>
        </div>
      </section>

      {/* EVENT SUMMARY */}
      <section className="events-content">

        <div className="events-heading">
          <div>
            <h2>Campus Events</h2>
            <p>Explore ongoing activities and upcoming experiences.</p>
          </div>

          <span className="events-total">
            {events.length} Events
          </span>
        </div>

        {/* EVENT CARDS */}
        <div className="events-grid">
          {events.map((event) => (
            <article className="event-card" key={event.id}>

              <div
                className="event-banner"
                style={{ background: event.background }}
              >
                <div
                  className="event-banner-icon"
                  style={{ color: event.color }}
                >
                  {event.icon}
                </div>

                <span
                  className={`event-status ${
                    event.status === "Ongoing"
                      ? "event-status-ongoing"
                      : "event-status-upcoming"
                  }`}
                >
                  {event.status === "Ongoing" && (
                    <span className="event-live-dot"></span>
                  )}
                  {event.status}
                </span>
              </div>

              <div className="event-card-content">

                <div className="event-category">
                  {event.category}
                </div>

                <h3>{event.title}</h3>

                <p className="event-organizer">
                  Organized by <strong>{event.club}</strong>
                </p>

                <p className="event-description">
                  {event.description}
                </p>

                <div className="event-details">

                  <div>
                    <span className="event-detail-icon">📅</span>
                    <span>{event.date}</span>
                  </div>

                  <div>
                    <span className="event-detail-icon">🕒</span>
                    <span>{event.time}</span>
                  </div>

                  <div>
                    <span className="event-detail-icon">📍</span>
                    <span>{event.venue}</span>
                  </div>

                </div>

                {event.status === "Upcoming" ? (
                  <div className="event-countdown">
                    <span>⏳</span>
                    {event.countdown}
                  </div>
                ) : (
                  <div className="event-countdown event-countdown-live">
                    <span>●</span>
                    Happening right now
                  </div>
                )}

                <button
                  className="event-action-button"
                  onClick={() =>
                    alert(
                      `More information about ${event.title} will be available soon!`
                    )
                  }
                  style={{ background: event.color }}
                >
                  View Event Details <span>→</span>
                </button>

              </div>
            </article>
          ))}
        </div>

      </section>

      <footer className="events-footer">
        <p>ClubGrid © 2026. Discover. Connect. Experience.</p>
      </footer>

      <style>{`

        .events-page {
          min-height: 100vh;
          background: #f8f8fc;
          font-family: inherit;
          color: #171717;
        }

        /* HERO */

        .events-hero {
          min-height: 250px;
          display: flex;
          align-items: center;
          padding: 40px 8%;
          box-sizing: border-box;
          background: linear-gradient(
            120deg,
            #17132e,
            #35245e,
            #7953ed
          );
          color: white;
        }

        .events-hero-content {
          max-width: 750px;
        }

        .events-eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #c8b9ff;
          margin-bottom: 16px;
        }

        .events-hero h1 {
          font-size: 44px;
          font-weight: 750;
          letter-spacing: -1.5px;
          margin: 0 0 12px;
        }

        .events-hero h1 span {
          color: #c5b2ff;
        }

        .events-hero-content > p:last-child {
          color: #e2dcf5;
          font-size: 15px;
          line-height: 1.7;
          max-width: 600px;
          margin: 0;
        }

        /* CONTENT */

        .events-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 55px 35px 75px;
        }

        .events-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          gap: 15px;
        }

        .events-heading h2 {
          font-size: 27px;
          font-weight: 750;
          margin: 0 0 8px;
          color: #171717;
        }

        .events-heading p {
          font-size: 14px;
          color: #777;
          margin: 0;
        }

        .events-total {
          padding: 10px 18px;
          background: #eee9ff;
          color: #7953ed;
          border-radius: 25px;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
        }

        /* EVENT GRID */

        .events-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
        }

        .event-card {
          background: white;
          border: 1px solid #ececf2;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 5px 22px rgba(25, 20, 55, 0.045);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(25, 20, 55, 0.09);
        }

        /* EVENT BANNER */

        .event-banner {
          height: 175px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .event-banner-icon {
          font-size: 75px;
          filter: drop-shadow(0 5px 5px rgba(0,0,0,0.08));
        }

        .event-status {
          position: absolute;
          top: 17px;
          right: 17px;
          padding: 8px 13px;
          border-radius: 30px;
          font-size: 11px;
          font-weight: 750;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .event-status-ongoing {
          background: #e2f8eb;
          color: #16834a;
        }

        .event-status-upcoming {
          background: #fff1d9;
          color: #b77914;
        }

        .event-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #20ad61;
        }

        /* CARD CONTENT */

        .event-card-content {
          padding: 24px;
        }

        .event-category {
          color: #7953ed;
          font-size: 11px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .event-card-content h3 {
          font-size: 21px;
          line-height: 1.35;
          font-weight: 750;
          margin: 0 0 8px;
          color: #1c1c1c;
        }

        .event-organizer {
          color: #777;
          font-size: 13px;
          margin: 0 0 15px;
        }

        .event-organizer strong {
          color: #4e3b91;
        }

        .event-description {
          font-size: 13px;
          color: #777;
          line-height: 1.7;
          min-height: 66px;
          margin: 0 0 20px;
        }

        /* EVENT DETAILS */

        .event-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 17px 0;
          border-top: 1px solid #eeeef2;
          border-bottom: 1px solid #eeeef2;
        }

        .event-details > div {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #555;
          font-size: 13px;
        }

        .event-detail-icon {
          width: 22px;
          text-align: center;
        }

        /* COUNTDOWN */

        .event-countdown {
          margin-top: 18px;
          padding: 12px 14px;
          border-radius: 9px;
          background: #fff7e9;
          color: #a96c0d;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .event-countdown-live {
          background: #eaf8ef;
          color: #16834a;
        }

        /* BUTTON */

        .event-action-button {
          width: 100%;
          margin-top: 18px;
          padding: 14px;
          border: none;
          border-radius: 9px;
          color: white;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .event-action-button:hover {
          opacity: 0.88;
        }

        .event-action-button span {
          margin-left: 8px;
        }

        /* FOOTER */

        .events-footer {
          padding: 22px;
          text-align: center;
          border-top: 1px solid #eaeaf0;
          background: white;
        }

        .events-footer p {
          margin: 0;
          color: #888;
          font-size: 12px;
        }

        /* RESPONSIVE */

        @media (max-width: 850px) {
          .events-grid {
            grid-template-columns: 1fr;
          }

          .events-hero h1 {
            font-size: 36px;
          }
        }

        @media (max-width: 600px) {
          .events-hero {
            min-height: 220px;
            padding: 35px 22px;
          }

          .events-hero h1 {
            font-size: 31px;
          }

          .events-content {
            padding: 35px 18px 50px;
          }

          .events-heading {
            align-items: flex-start;
          }

          .events-heading h2 {
            font-size: 23px;
          }

          .event-banner {
            height: 145px;
          }

          .event-card-content {
            padding: 19px;
          }
        }

      `}</style>
    </div>
  );
}

export default Events;