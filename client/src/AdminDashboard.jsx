import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  adminAPI,
  applicationsAPI,
  eventsAPI,
  announcementsAPI,
  getCurrentUser,
  logout
} from "./api";
import { AppDetailsModal, AddEventModal, AddAnnouncementModal } from "./AdminModals";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [activeTab, setActiveTab] = useState("applications");
  const [stats, setStats] = useState({
    totalApplications: 0, pending: 0, accepted: 0, rejected: 0,
    totalStudents: 0, totalEvents: 0, totalAnnouncements: 0
  });

  const [applications, setApplications] = useState([]);
  const [promotingStudentId, setPromotingStudentId] = useState(null);
  const [selectedClub, setSelectedClub] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedAppModal, setSelectedAppModal] = useState(null);

  const [students, setStudents] = useState([]);
  const [studentMasterFile, setStudentMasterFile] = useState(null);
const [uploadingStudentMaster, setUploadingStudentMaster] = useState(false);
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "", club: "Drama Club", category: "Technical Workshop",
    date: "", time: "", venue: "", description: "", status: "Upcoming"
  });

  const [announcements, setAnnouncements] = useState([]);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: "", category: "General", description: ""
  });

  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    if (!currentUser || currentUser.role !== "super_admin") {
      navigate("/login", { replace: true });
      return;
    }
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, appsData, studentsData, eventsData, announcementsData] = await Promise.all([
        adminAPI.getStats().catch(() => ({})),
        applicationsAPI.getAll({ club: selectedClub, status: selectedStatus }).catch(() => []),
        adminAPI.getStudents().catch(() => []),
        eventsAPI.getAll().catch(() => []),
        announcementsAPI.getAll().catch(() => [])
      ]);

      setStats(statsData || {});
      setApplications(appsData || []);
      setStudents(studentsData || []);
      setEvents(eventsData || []);
      setAnnouncements(announcementsData || []);
    } catch (err) {
      console.error("Error loading admin dashboard:", err);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "super_admin") {
      applicationsAPI.getAll({ club: selectedClub, status: selectedStatus })
        .then((data) => setApplications(data || []))
        .catch(console.error);
    }
  }, [selectedClub, selectedStatus]);

  const updateStatus = async (id, newStatus) => {
    try {
      const result = await applicationsAPI.updateStatus(id, newStatus);
      setApplications((curr) =>
        curr.map((app) => ((app._id === id || app.id === id) ? { ...app, status: newStatus } : app))
      );
      const newStats = await adminAPI.getStats();
      setStats(newStats);
      showMessage(result.emailSent === false
        ? `Status updated to ${newStatus}, but the email notification failed. Check backend logs.`
        : `Application status updated to ${newStatus}`);
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  const showMessage = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(""), 3000);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await eventsAPI.create(eventForm);
      setEvents([res.event, ...events]);
      setShowEventModal(false);
      setEventForm({ title: "", club: "Drama Club", category: "Technical Workshop", date: "", time: "", venue: "", description: "", status: "Upcoming" });
      showMessage("Event created successfully!");
    } catch (err) {
      alert(err.message || "Failed to create event");
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await eventsAPI.delete(id);
      setEvents(events.filter((e) => (e._id !== id && e.id !== id)));
      showMessage("Event deleted successfully!");
    } catch (err) {
      alert(err.message || "Failed to delete event");
    }
  };

const handleStudentMasterUpload = async () => {
  if (!studentMasterFile) {
    showMessage("Please select an Excel file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", studentMasterFile);

  try {
    setUploadingStudentMaster(true);

    const result = await adminAPI.uploadStudentMaster(formData);

    showMessage(
      `Upload successful! ${result.inserted} inserted, ${result.updated} updated.`
    );

    setStudentMasterFile(null);
  } catch (error) {
    showMessage(error.message || "Student Master upload failed.");
  } finally {
    setUploadingStudentMaster(false);
  }
};


  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const res = await announcementsAPI.create(announcementForm);
      setAnnouncements([res.announcement, ...announcements]);
      setShowAnnouncementModal(false);
      setAnnouncementForm({ title: "", category: "General", description: "" });
      showMessage("Announcement posted successfully!");
    } catch (err) {
      alert(err.message || "Failed to post announcement");
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await announcementsAPI.delete(id);
      setAnnouncements(announcements.filter((a) => (a._id !== id && a.id !== id)));
      showMessage("Announcement deleted successfully!");
    } catch (err) {
      alert(err.message || "Failed to delete announcement");
    }
  };
  const handlePromoteToTeamAdmin = async (student) => {
  setPromotingStudentId(student._id);
  setActionMessage("");

  try {
    await adminAPI.promoteStudentToTeamAdmin(student._id, {
      studentId: student.studentId
    });

    setActionMessage(`${student.fullName} promoted to Team Admin successfully!`);
    loadDashboardData();
  } catch (err) {
    setActionMessage(err.message || "Promotion failed");
  } finally {
    setPromotingStudentId(null);
  }
};

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <a href="/" className="admin-logo">
          ClubGrid<span>.</span>
        </a>
        <span className="admin-heading-label">ADMIN PANEL</span>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px",
            border: "1px solid #dedede", borderRadius: "8px", background: "#ffffff",
            fontSize: "13px", fontWeight: "600", color: "#555", cursor: "pointer"
          }}
        >
          <span>↪</span> Logout
        </button>
      </header>

      <main className="admin-main">
        <section className="admin-welcome">
          <p className="admin-eyebrow">CLUB MANAGEMENT</p>
          <h1>Admin Dashboard</h1>
          <p>Review applications, manage recruitment, students, events, and announcements.</p>
        </section>

        {actionMessage && (
          <div style={{
            background: "#e8f5e9", color: "#2e7d32", padding: "12px 20px",
            borderRadius: "8px", marginBottom: "20px", fontWeight: "600", border: "1px solid #c8e6c9"
          }}>
            ✅ {actionMessage}
          </div>
        )}

        {/* STATS */}
        <section className="admin-stats">
          <div className="admin-stat-card">
            <span>📋</span>
            <p>Total Applications</p>
            <h2>{stats.totalApplications || applications.length}</h2>
          </div>
          <div className="admin-stat-card">
            <span>⏳</span>
            <p>Pending</p>
            <h2>{stats.pending || applications.filter(a => a.status === 'Pending').length}</h2>
          </div>
          <div className="admin-stat-card">
            <span>✅</span>
            <p>Accepted</p>
            <h2>{stats.accepted || applications.filter(a => a.status === 'Accepted').length}</h2>
          </div>
          <div className="admin-stat-card">
            <span>❌</span>
            <p>Rejected</p>
            <h2>{stats.rejected || applications.filter(a => a.status === 'Rejected').length}</h2>
          </div>
        </section>

        {/* TABS */}
        <div style={{ display: "flex", gap: "10px", borderBottom: "2px solid #eeebf8", marginBottom: "25px", paddingBottom: "10px", flexWrap: "wrap" }}>
          {[
            { id: "applications", label: "📋 Applications", count: applications.length },
            { id: "students", label: "🎓 Registered Students", count: students.length },
            { id: "events", label: "📅 Events", count: events.length },
            { id: "announcements", label: "📢 Announcements", count: announcements.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 20px", borderRadius: "8px", border: "none",
                background: activeTab === tab.id ? "#7953ed" : "#f4f1ff",
                color: activeTab === tab.id ? "#fff" : "#444", fontWeight: "700",
                fontSize: "14px", cursor: "pointer", transition: "all 0.2s ease"
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* TAB 1: APPLICATIONS */}
        {activeTab === "applications" && (
          <section className="admin-applications">
            <div className="admin-section-title" style={{ flexWrap: "wrap", gap: "15px" }}>
              <div>
                <h2>Student Applications</h2>
                <p>Review each application and update its status.</p>
              </div>

              <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#666", marginRight: "6px" }}>Club:</label>
                  <select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)} style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd" }}>
                    <option value="All">All Clubs</option>
                    <option value="Drama Club">Drama Club</option>
                    <option value="Dance Club">Dance Club</option>
                    <option value="Music Club">Music Club</option>
                    <option value="Coding Club">Coding Club</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "#666", marginRight: "6px" }}>Status:</label>
                  <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ddd" }}>
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <span className="admin-total">{applications.length} applications</span>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>USN</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Club & Team</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", padding: "30px", color: "#888" }}>
                        No applications found for the selected filter.
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app._id || app.id}>
                        <td className="admin-student-name">
                          <strong>{app.name}</strong>
                          <div style={{ fontSize: "11px", color: "#888" }}>{app.email}</div>
                        </td>
                        <td>{app.usn}</td>
                        <td>{app.department}</td>
                        <td>{app.year}</td>
                        <td>
                          <strong>{app.teamName}</strong>
                          <div style={{ fontSize: "12px", color: "#666" }}>{app.clubName}</div>
                        </td>
                        <td>
                          <span className={`admin-status admin-status-${(app.status || 'pending').toLowerCase()}`}>
                            {app.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                            <button
                              type="button"
                              onClick={() => setSelectedAppModal(app)}
                              style={{
                                padding: "6px 10px", background: "#f0ebff", color: "#7953ed",
                                border: "1px solid #d4c7ff", borderRadius: "4px", fontSize: "12px", fontWeight: "600", cursor: "pointer"
                              }}
                            >
                              Details
                            </button>
                            {app.status === "Pending" ? (
                              <div className="admin-actions">
                                <button className="admin-accept" onClick={() => updateStatus(app._id || app.id, "Accepted")}>Accept</button>
                                <button className="admin-reject" onClick={() => updateStatus(app._id || app.id, "Rejected")}>Reject</button>
                              </div>
                            ) : (
                              <button className="admin-reset" onClick={() => updateStatus(app._id || app.id, "Pending")}>Reset</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        
{/* TAB 2: STUDENTS */}
{activeTab === "students" && (
  <section className="admin-applications">

    {/* STUDENT MASTER EXCEL UPLOAD */}
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #eee",
        marginBottom: "24px"
      }}
    >
      <h2>Student Master Upload</h2>
      <p>
        Upload the authorized student roster in Excel (.xlsx) format.
      </p>

      <input
        type="file"
        accept=".xlsx"
        onChange={(e) =>
          setStudentMasterFile(
            e.target.files && e.target.files.length > 0
              ? e.target.files[0]
              : null
          )
        }
      />

      {studentMasterFile && (
        <p>Selected file: {studentMasterFile.name}</p>
      )}

      <button
        type="button"
        onClick={handleStudentMasterUpload}
        disabled={!studentMasterFile || uploadingStudentMaster}
        style={{
          background: "#7953ed",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          marginTop: "12px",
          cursor: "pointer",
          opacity: uploadingStudentMaster ? 0.6 : 1
        }}
      >
        {uploadingStudentMaster ? "Uploading..." : "Upload Excel"}
      </button>
    </div>

    {/* REGISTERED STUDENTS TABLE */}
    <div className="admin-section-title">
      <div>
        <h2>Registered Students</h2>
        <p>List of all students registered on ClubGrid.</p>
      </div>
      <span className="admin-total">
        {students.length} students
      </span>
    </div>

    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
  <tr>
    <th>Full Name</th>
    <th>Email</th>
    <th>Department</th>
    <th>Year</th>
    <th>USN</th>
    <th>Role</th>
    <th>Action</th>
    <th>Registered</th>
  </tr>
</thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#888"
                }}
              >
                No registered students yet.
              </td>
            </tr>
          ) : (
            students.map((st) => (
              <tr key={st._id}>
                <td className="admin-student-name">{st.fullName}</td>
<td>{st.email}</td>
<td>{st.department}</td>
<td>{st.year}</td>
<td>{st.studentId || "—"}</td>
<td>
  <span>
    {st.role === "team_admin" ? "Team Admin" : "Student"}
  </span>
</td>
<td>
  {st.role === "student" && st.studentId && (
    <button
      type="button"
      onClick={() => handlePromoteToTeamAdmin(st)}
      disabled={promotingStudentId === st._id}
      style={{
        background: "#e8f5e9",
        color: "#2e7d32",
        border: "1px solid #c8e6c9",
        padding: "6px 12px",
        borderRadius: "4px",
        fontWeight: "600",
        fontSize: "12px",
        cursor: "pointer",
        opacity: promotingStudentId === st._id ? 0.6 : 1
      }}
    >
      {promotingStudentId === st._id ? "Promoting..." : "Promote to Team Admin"}
    </button>
  )}
  {st.role === "team_admin" && (
    <span style={{ color: "#2e7d32", fontWeight: "600", fontSize: "12px" }}>
      Team Admin
    </span>
  )}
  {!st.studentId && st.role === "student" && (
    <span style={{ color: "#888", fontSize: "12px" }}>
      No Student ID
    </span>
  )}
</td>
<td>{new Date(st.createdAt).toLocaleDateString("en-GB")}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

  </section>
)}


        {/* TAB 3: EVENTS */}
        {activeTab === "events" && (
          <section className="admin-applications">
            <div className="admin-section-title">
              <div>
                <h2>Manage Events</h2>
                <p>Create and update college club events.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowEventModal(true)}
                style={{ background: "#7953ed", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}
              >
                + Add Event
              </button>
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Club</th>
                    <th>Date & Time</th>
                    <th>Venue</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length === 0 ? (
                    <tr><td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "#888" }}>No events found.</td></tr>
                  ) : (
                    events.map((ev) => (
                      <tr key={ev._id || ev.id}>
                        <td className="admin-student-name">{ev.title}</td>
                        <td>{ev.club}</td>
                        <td>{ev.date} • {ev.time}</td>
                        <td>{ev.venue}</td>
                        <td><span className="admin-status admin-status-accepted">{ev.status}</span></td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleDeleteEvent(ev._id || ev.id)}
                            style={{ background: "#ffebeb", color: "#c62828", border: "1px solid #ffcdd2", padding: "6px 12px", borderRadius: "4px", fontWeight: "600", cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 4: ANNOUNCEMENTS */}
        {activeTab === "announcements" && (
          <section className="admin-applications">
            <div className="admin-section-title">
              <div>
                <h2>Manage Announcements</h2>
                <p>Publish important notices and updates.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAnnouncementModal(true)}
                style={{ background: "#7953ed", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}
              >
                + Post Announcement
              </button>
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "#888" }}>No announcements yet.</td></tr>
                  ) : (
                    announcements.map((an) => (
                      <tr key={an._id || an.id}>
                        <td className="admin-student-name">{an.title}</td>
                        <td>{an.category}</td>
                        <td>{an.date}</td>
                        <td style={{ maxWidth: "300px", whiteSpace: "normal" }}>{an.description}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleDeleteAnnouncement(an._id || an.id)}
                            style={{ background: "#ffebeb", color: "#c62828", border: "1px solid #ffcdd2", padding: "6px 12px", borderRadius: "4px", fontWeight: "600", cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>

      <AppDetailsModal app={selectedAppModal} onClose={() => setSelectedAppModal(null)} onUpdateStatus={updateStatus} />
      <AddEventModal isOpen={showEventModal} onClose={() => setShowEventModal(false)} form={eventForm} setForm={setEventForm} onSubmit={handleCreateEvent} />
      <AddAnnouncementModal isOpen={showAnnouncementModal} onClose={() => setShowAnnouncementModal(false)} form={announcementForm} setForm={setAnnouncementForm} onSubmit={handleCreateAnnouncement} />

      <footer className="admin-footer" style={{ textAlign: "center", padding: "24px", color: "#8c899c", fontSize: "13px", borderTop: "1px solid #eeeeee" }}>
        ClubGrid — Admin Panel
      </footer>
    </div>
  );
}

export default AdminDashboard;
