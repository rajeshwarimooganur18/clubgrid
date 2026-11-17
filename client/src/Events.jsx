import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { eventsAPI, getCurrentUser } from "./api";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    eventsAPI.getAll()
      .then((data) => setEvents(data || []))
      .catch((err) => console.error("Error loading events:", err))
      .finally(() => setLoading(false));
  }, []);

  const userInitial = (currentUser?.name || currentUser?.fullName || "Student").charAt(0).toUpperCase();

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

          <Link to="/my-applications">
            <span className="cg-nav-icon">▤</span>
            My Applications
          </Link>

          <Link to="/events" className="cg-nav-active">
            <span className="cg-nav-icon">▣</span>
            Events
          </Link>

          <Link to="/announcements">
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
              aria-label="Login"
              title="Login"
            >
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.2 3.6-7 8-7s8 2.8 8 7" />
              </svg>
            </Link>
          )}
          <span className="cg-profile-arrow">▾</span>
        </div>
      </header>

      {/* PAGE HEADER */}
      <section style={{ color: "#7953ed" }} className="events-hero">
        <div className="events-hero-content">
          <p className="events-eyebrow">WHAT'S HAPPENING ON CAMPUS?</p>
          <h1 style={{ color: "white" }}>
            Discover <span>Events</span>
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

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 20px", background: "#fff", borderRadius: "14px", border: "1px solid #eee" }}>
            <p style={{ fontSize: "18px", color: "#555" }}>No events scheduled at the moment.</p>
            <p style={{ fontSize: "14px", color: "#888" }}>Check back soon for upcoming club workshops and showcases!</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <article className="event-card" key={event._id || event.id}>

                <div
                  className="event-banner"
                  style={{ background: event.background || "#f0ebff" }}
                >
                  <div
                    className="event-banner-icon"
                    style={{ color: event.color || "#7953ed" }}
                  >
                    {event.icon || "📅"}
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
                      {event.countdown || "Upcoming soon"}
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
                        `Event: ${event.title}\nClub: ${event.club}\nDate: ${event.date} at ${event.time}\nVenue: ${event.venue}\n\n${event.description}`
                      )
                    }
                    style={{ background: event.color || "#7953ed" }}
                  >
                    View Event Details <span>→</span>
                  </button>

                </div>
              </article>
            ))}
          </div>
        )}

      </section>

      <footer className="events-footer">
        <p>ClubGrid © 2026. Discover. Connect. Experience.</p>
      </footer>
    </div>
  );
}

export default Events;
