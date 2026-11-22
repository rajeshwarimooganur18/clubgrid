import React, { useState, useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { authAPI, applicationsAPI, getCurrentUser, setCurrentUser, logout } from "./api";

function Profile() {
  const navigate = useNavigate();
  const initialUser = getCurrentUser();

  const [student, setStudent] = useState(initialUser);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: initialUser ? initialUser.fullName || initialUser.name || "" : "",
    department: initialUser ? initialUser.department || "" : "",
    year: initialUser ? initialUser.year || "" : "",
    studentId: initialUser ? initialUser.studentId || initialUser.usn || "" : ""
  });
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load fresh profile from backend
    const loadProfileAndApps = async () => {
      try {
        const res = await authAPI.getProfile();
        if (res && res.student) {
          const updated = {
            ...res.student,
            name: res.student.fullName,
            loggedIn: true
          };
          setStudent(updated);
          setCurrentUser(updated);
          setEditForm({
            fullName: updated.fullName || "",
            department: updated.department || "",
            year: updated.year || "",
            studentId: updated.studentId || ""
          });
        }
      } catch (err) {
        console.warn("Could not fetch remote profile:", err.message);
      }

      // Load student's applications
      try {
        const myApps = await applicationsAPI.getMy();
        setApplications(myApps || []);
      } catch (err) {
        console.warn("Could not fetch user applications:", err.message);
      }
    };

    if (initialUser && initialUser.loggedIn) {
      loadProfileAndApps();
    }
  }, []);

  if (!initialUser || !initialUser.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaveMessage("");
    setSaveError("");
    setSaving(true);

    try {
      const res = await authAPI.updateProfile(editForm);
      if (res && res.student) {
        const updated = {
          ...res.student,
          name: res.student.fullName,
          loggedIn: true
        };
        setStudent(updated);
        setCurrentUser(updated);
        setSaveMessage("Profile updated successfully!");
        setTimeout(() => {
          setShowEditModal(false);
          setSaveMessage("");
        }, 1200);
      }
    } catch (err) {
      setSaveError(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const displayName = (student?.name || student?.fullName || "Student")
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
      value: student?.email || "Not provided",
    },
    {
      icon: "🎓",
      label: "Department",
      value: student?.department || "Not provided",
    },
    {
      icon: "📚",
      label: "Academic Year",
      value: student?.year || "Not provided",
    },
    {
      icon: "🆔",
      label: "Student ID / USN",
      value: student?.studentId || "Not added yet",
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

          <Link to="/my-applications">
            <span className="cg-nav-icon">▤</span>
            My Applications
          </Link>

          <Link to="/events">
            <span className="cg-nav-icon">▣</span>
            Events
          </Link>

          <Link to="/announcements">
            <span className="cg-nav-icon">⚐</span>
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
              {student?.email}
            </p>

            <div className="profile-status">
              <span className="profile-status-dot"></span>
              Active {student?.role === 'super_admin' ? 'Super Admin' : 'Student'}
            </div>

            <div className="profile-divider"></div>

            {/* PERSONAL INFORMATION */}
            <div className="profile-section-heading">
              <div>
                <h3>Personal Information</h3>
                <p>Your registered student details</p>
              </div>

              <button
                type="button"
                onClick={() => setShowEditModal(true)}
                style={{
                  background: "#7953ed",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                ✏️ Edit Profile
              </button>
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

            {/* MY APPLICATIONS PREVIEW */}
            <div className="profile-divider"></div>

            <div className="profile-section-heading">
              <div>
                <h3>My Club Applications ({applications.length})</h3>
                <p>Status of applications submitted to college clubs</p>
              </div>

              <Link
                to="/my-applications"
                style={{
                  color: "#7953ed",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: "700"
                }}
              >
                View Details →
              </Link>
            </div>

            {applications.length === 0 ? (
              <div style={{
                background: "#faf9ff",
                border: "1px dashed #d1c8ef",
                borderRadius: "10px",
                padding: "24px",
                textAlign: "center",
                color: "#7b7788",
                fontSize: "14px"
              }}>
                <p style={{ margin: "0 0 10px" }}>You have not submitted any club applications yet.</p>
                <Link
                  to="/#clubs"
                  style={{
                    color: "#7953ed",
                    fontWeight: "700",
                    textDecoration: "none"
                  }}
                >
                  Explore Clubs to Apply →
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "left" }}>
                {applications.slice(0, 3).map((app) => (
                  <div
                    key={app._id || app.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      background: "#faf9ff",
                      border: "1px solid #efecf8",
                      borderRadius: "10px"
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: "15px", color: "#201d2c", display: "block" }}>
                        {app.teamName} <span style={{ fontSize: "12px", color: "#888", fontWeight: "normal" }}>({app.clubName})</span>
                      </strong>
                      <span style={{ fontSize: "12px", color: "#9995a5" }}>
                        Applied on {new Date(app.appliedOn || app.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <span
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "700",
                        background: app.status === "Accepted" ? "#e5f8ec" : app.status === "Rejected" ? "#ffebeb" : "#fff4df",
                        color: app.status === "Accepted" ? "#24894c" : app.status === "Rejected" ? "#cb4545" : "#b47a17"
                      }}
                    >
                      ● {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

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

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px",
          boxSizing: "border-box"
        }}>
          <div style={{
            background: "#fff",
            borderRadius: "14px",
            width: "100%",
            maxWidth: "480px",
            padding: "30px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "20px", color: "#1f1d2b" }}>Edit Profile Details</h2>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#888" }}
              >
                ×
              </button>
            </div>

            {saveError && (
              <div style={{ background: "#ffebee", color: "#c62828", padding: "10px", borderRadius: "6px", marginBottom: "15px", fontSize: "13px" }}>
                ⚠️ {saveError}
              </div>
            )}

            {saveMessage && (
              <div style={{ background: "#e8f5e9", color: "#2e7d32", padding: "10px", borderRadius: "6px", marginBottom: "15px", fontSize: "13px" }}>
                ✅ {saveMessage}
              </div>
            )}

            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  style={{ width: "100%", padding: "11px 14px", border: "1px solid #ddd", borderRadius: "8px", boxSizing: "border-box", fontSize: "14px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444" }}>
                  Department
                </label>
                <select
                  required
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  style={{ width: "100%", padding: "11px 14px", border: "1px solid #ddd", borderRadius: "8px", boxSizing: "border-box", fontSize: "14px" }}
                >
                  <option value="ISE">ISE</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444" }}>
                  Academic Year
                </label>
                <select
                  required
                  value={editForm.year}
                  onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                  style={{ width: "100%", padding: "11px 14px", border: "1px solid #ddd", borderRadius: "8px", boxSizing: "border-box", fontSize: "14px" }}
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#444" }}>
                  USN
                </label>
                <input
                  type="text"
                  name="studentId"
                  placeholder="Enter your USN"
                  required
                  value={editForm.studentId}
                  onChange={(e) => setEditForm({ ...editForm, studentId: e.target.value })}
                  style={{ width: "100%", padding: "11px 14px", border: "1px solid #ddd", borderRadius: "8px", boxSizing: "border-box", fontSize: "14px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  style={{ padding: "10px 18px", border: "1px solid #ddd", borderRadius: "8px", background: "#fff", cursor: "pointer", fontWeight: "600" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  style={{ padding: "10px 20px", border: "none", borderRadius: "8px", background: "#7953ed", color: "#fff", cursor: "pointer", fontWeight: "600" }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
          letter-spacing: 2px;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .profile-heading h1 {
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -1px;
          margin: 0 0 10px;
          color: #1e1b29;
        }

        .profile-heading h1 span {
          color: #7953ed;
        }

        .profile-heading p {
          color: #8c8998;
          font-size: 15px;
          margin: 0;
        }

        /* CARD */

        .profile-card {
          background: #ffffff;
          border: 1px solid #eae8f2;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(45, 30, 80, 0.04);
        }

        .profile-cover {
          height: 120px;
          background: linear-gradient(135deg, #7953ed 0%, #a482ff 60%, #c4b5fd 100%);
          position: relative;
        }

        .profile-cover-decoration {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          background-image: radial-gradient(#fff 1px, transparent 1px);
          background-size: 12px 12px;
        }

        .profile-card-content {
          padding: 0 45px 38px;
          text-align: center;
          position: relative;
        }

        /* AVATAR */

        .profile-avatar {
          width: 95px;
          height: 95px;
          border-radius: 50%;
          background: #1e1b2b;
          color: white;
          font-size: 32px;
          font-weight: 800;
          display: grid;
          place-items: center;
          border: 4px solid #ffffff;
          margin: -48px auto 14px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        }

        .profile-name {
          font-size: 26px;
          font-weight: 800;
          margin: 0 0 6px;
          color: #1f1c2b;
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
