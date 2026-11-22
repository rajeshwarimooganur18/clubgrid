
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { applicationsAPI, logout } from "./api";
import "./TeamAdminDashboard.css";

function TeamAdminDashboard() {
    const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate("/login", { replace: true });
};
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadApplications = async () => {
    try {
      setError("");
      const data = await applicationsAPI.getAll();

      if (!Array.isArray(data)) {
        throw new Error("Invalid applications response.");
      }

      setApplications(data);
    } catch (err) {
      setError(err.message || "Unable to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      setError("");
      setNotice("");

      const result = await applicationsAPI.updateStatus(id, status);

      setNotice(result.message || `Application ${status.toLowerCase()}.`);

      await loadApplications();
    } catch (err) {
      setError(err.message || "Unable to update application.");
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingCount = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const acceptedCount = applications.filter(
    (app) => app.status === "Accepted"
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <div className="team-admin-page">
      <header className="team-admin-header">
        <div>
          <p className="team-admin-eyebrow">CLUBGRID MANAGEMENT</p>
          <h1>Team Admin Dashboard</h1>
          <p>Review and manage applications submitted to your team.</p>
        </div>
        <button
  type="button"
  onClick={handleLogout}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "9px 17px",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: "8px",
    background: "#ffffff",
    fontSize: "13px",
    fontWeight: "600",
    color: "#5146a5",
    cursor: "pointer"
  }}
>
  <span>↪</span> Logout
</button>
      </header>

      <section className="team-admin-stats">
        <div className="team-stat-card">
          <span>Total Applications</span>
          <strong>{applications.length}</strong>
        </div>

        <div className="team-stat-card pending">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="team-stat-card accepted">
          <span>Accepted</span>
          <strong>{acceptedCount}</strong>
        </div>

        <div className="team-stat-card rejected">
          <span>Rejected</span>
          <strong>{rejectedCount}</strong>
        </div>
      </section>

      <section className="team-applications-section">
        <div className="team-applications-heading">
          <div>
            <h2>Applications</h2>
            <p>Review student details and application reasons.</p>
          </div>

          <button
            className="team-refresh-button"
            onClick={loadApplications}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        {error && <p className="team-admin-error">{error}</p>}
        {notice && <p className="team-admin-notice">{notice}</p>}

        {loading ? (
          <p className="team-admin-empty">Loading applications...</p>
        ) : applications.length === 0 ? (
          <p className="team-admin-empty">
            No applications have been submitted to your team yet.
          </p>
        ) : (
          <div className="team-application-list">
            {applications.map((app) => (
              <article className="team-application-card" key={app._id}>
                <div className="team-application-top">
                  <div>
                    <h3>{app.name}</h3>
                    <p>{app.usn || "USN not provided"}</p>
                  </div>

                  <span
                    className={`team-status-badge ${app.status?.toLowerCase()}`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="team-application-details">
                  <p><strong>Email:</strong> {app.email}</p>
                  <p><strong>Department:</strong> {app.department}</p>
                  <p><strong>Year:</strong> {app.year}</p>
                  <p><strong>Club:</strong> {app.clubName}</p>
                  <p><strong>Team:</strong> {app.teamName}</p>
                  <p>
                    <strong>Applied on:</strong>{" "}
                    {app.appliedOn
                      ? new Date(app.appliedOn).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>

                <div className="team-application-reason">
                  <strong>Why they want to join</strong>
                  <p>{app.reason}</p>
                </div>

                {app.skills && (
                  <div className="team-application-reason">
                    <strong>Skills</strong>
                    <p>{app.skills}</p>
                  </div>
                )}

                {app.status === "Pending" && (
                  <div className="team-application-actions">
                    <button
                      className="team-accept-button"
                      disabled={updatingId === app._id}
                      onClick={() =>
                        handleStatusChange(app._id, "Accepted")
                      }
                    >
                      {updatingId === app._id ? "Updating..." : "Accept"}
                    </button>

                    <button
                      className="team-reject-button"
                      disabled={updatingId === app._id}
                      onClick={() =>
                        handleStatusChange(app._id, "Rejected")
                      }
                    >
                      {updatingId === app._id ? "Updating..." : "Reject"}
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default TeamAdminDashboard;
