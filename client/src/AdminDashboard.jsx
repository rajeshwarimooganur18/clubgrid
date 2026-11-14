import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Ananya Sharma",
      department: "ISE",
      year: "3rd Year",
      club: "Coding Club",
      status: "Pending",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      department: "CSE",
      year: "2nd Year",
      club: "Robotics Club",
      status: "Pending",
    },
    {
      id: 3,
      name: "Priya Patel",
      department: "ECE",
      year: "3rd Year",
      club: "Photography Club",
      status: "Accepted",
    },
    {
      id: 4,
      name: "Arjun Rao",
      department: "ISE",
      year: "1st Year",
      club: "Music Club",
      status: "Rejected",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setApplications((currentApplications) =>
      currentApplications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("clubgridUser");
    navigate("/login", { replace: true });
  };

  const pending = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const accepted = applications.filter(
    (app) => app.status === "Accepted"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  return (
    <div className="admin-dashboard">

      <header className="admin-header">

        <a href="/" className="admin-logo">
          ClubGrid<span>.</span>
        </a>

        <span className="admin-heading-label">
          ADMIN PANEL
        </span>

      <button
  type="button"
  className="admin-logout"
  onClick={() => {
    localStorage.removeItem("clubgridUser");
    window.location.replace("/login");
  }}
>
  <span>↪</span>
  Logout
</button>

      </header>

      <main className="admin-main">

        <section className="admin-welcome">
          <p className="admin-eyebrow">CLUB MANAGEMENT</p>
          <h1>Admin Dashboard</h1>
          <p>
            Review applications and manage student club recruitment.
          </p>
        </section>

        <section className="admin-stats">

          <div className="admin-stat-card">
            <span>📋</span>
            <p>Total Applications</p>
            <h2>{applications.length}</h2>
          </div>

          <div className="admin-stat-card">
            <span>⏳</span>
            <p>Pending</p>
            <h2>{pending}</h2>
          </div>

          <div className="admin-stat-card">
            <span>✅</span>
            <p>Accepted</p>
            <h2>{accepted}</h2>
          </div>

          <div className="admin-stat-card">
            <span>❌</span>
            <p>Rejected</p>
            <h2>{rejected}</h2>
          </div>

        </section>

        <section className="admin-applications">

          <div className="admin-section-title">

            <div>
              <h2>Student Applications</h2>
              <p>
                Review each application and update its status.
              </p>
            </div>

            <span className="admin-total">
              {applications.length} applications
            </span>

          </div>

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Student</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Club</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {applications.map((app) => (
                  <tr key={app.id}>

                    <td className="admin-student-name">
                      {app.name}
                    </td>

                    <td>{app.department}</td>
                    <td>{app.year}</td>
                    <td>{app.club}</td>

                    <td>
                      <span
                        className={`admin-status admin-status-${app.status.toLowerCase()}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td>

                      {app.status === "Pending" ? (

                        <div className="admin-actions">

                          <button
                            className="admin-accept"
                            onClick={() =>
                              updateStatus(app.id, "Accepted")
                            }
                          >
                            Accept
                          </button>

                          <button
                            className="admin-reject"
                            onClick={() =>
                              updateStatus(app.id, "Rejected")
                            }
                          >
                            Reject
                          </button>

                        </div>

                      ) : (

                        <button
                          className="admin-reset"
                          onClick={() =>
                            updateStatus(app.id, "Pending")
                          }
                        >
                          Reset
                        </button>

                      )}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

        <p className="admin-note">
          Demo mode: changes are temporary and will reset when this page reloads.
        </p>

      </main>

      <footer className="admin-footer">
        ClubGrid — Admin Panel
      </footer>

      {/* ALL CSS IS INSIDE THIS FILE */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .admin-dashboard {
          min-height: 100vh;
          width: 100%;
          background: #ffffff;
          color: #151515;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* HEADER */

        .admin-header {
          width: 100%;
          min-height: 85px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #eeeeee;
          background: #ffffff;
        }

        .admin-logo {
          color: #000000;
          font-size: 30px;
          font-weight: 750;
          letter-spacing: -1px;
          text-decoration: none;
        }

        .admin-logo span {
          color: #7953ed;
        }

        .admin-heading-label {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #777777;
        }

        /* LOGOUT BUTTON */

        .admin-logout {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 11px 20px;
          border: 1px solid #f2caca;
          border-radius: 8px;
          background: #fff1f1;
          color: #d93636;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-logout span {
          font-size: 20px;
        }

        .admin-logout:hover {
          background: #d93636;
          color: #ffffff;
          border-color: #d93636;
          transform: translateY(-2px);
        }

        /* MAIN CONTENT */

        .admin-main {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 45px 40px;
        }

        .admin-welcome {
          margin-bottom: 35px;
        }

        .admin-eyebrow {
          margin: 0 0 10px;
          color: #7953ed;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .admin-welcome h1 {
          margin: 0 0 10px;
          font-size: 36px;
          font-weight: 750;
          letter-spacing: -1px;
        }

        .admin-welcome > p:last-child {
          margin: 0;
          color: #777777;
          font-size: 16px;
        }

        /* STATISTICS */

        .admin-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 35px;
        }

        .admin-stat-card {
          padding: 22px;
          min-height: 145px;
          border: 1px solid #eeeeee;
          border-radius: 12px;
          background: #fafafa;
        }

        .admin-stat-card > span {
          font-size: 25px;
        }

        .admin-stat-card p {
          margin: 13px 0 7px;
          color: #666666;
          font-size: 14px;
        }

        .admin-stat-card h2 {
          margin: 0;
          font-size: 30px;
          font-weight: 750;
        }

        /* APPLICATION SECTION */

        .admin-applications {
          padding: 25px;
          border: 1px solid #e8e8e8;
          border-radius: 12px;
          background: #ffffff;
        }

        .admin-section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 25px;
        }

        .admin-section-title h2 {
          margin: 0 0 7px;
          font-size: 23px;
        }

        .admin-section-title p {
          margin: 0;
          color: #777777;
          font-size: 14px;
        }

        .admin-total {
          padding: 9px 14px;
          border-radius: 20px;
          background: #f0ebff;
          color: #7953ed;
          font-size: 13px;
          white-space: nowrap;
        }

        /* TABLE */

        .admin-table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          min-width: 700px;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          padding: 16px 12px;
          color: #777777;
          background: #fafafa;
          font-size: 13px;
          font-weight: 600;
        }

        .admin-table td {
          padding: 18px 12px;
          border-bottom: 1px solid #eeeeee;
          font-size: 14px;
        }

        .admin-student-name {
          font-weight: 600;
        }

        /* STATUS */

        .admin-status {
          display: inline-block;
          padding: 7px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .admin-status-pending {
          background: #fff1c9;
          color: #8b6500;
        }

        .admin-status-accepted {
          background: #d8f8e8;
          color: #087747;
        }

        .admin-status-rejected {
          background: #ffe1e1;
          color: #c52c2c;
        }

        /* ACTION BUTTONS */

        .admin-actions {
          display: flex;
          gap: 8px;
        }

        .admin-actions button,
        .admin-reset {
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .admin-accept {
          background: #d8f8e8;
          color: #087747;
        }

        .admin-accept:hover {
          background: #27c77a;
          color: #ffffff;
        }

        .admin-reject {
          background: #ffe1e1;
          color: #c52c2c;
        }

        .admin-reject:hover {
          background: #dc3636;
          color: #ffffff;
        }

        .admin-reset {
          background: #eeeeee;
          color: #444444;
        }

        .admin-reset:hover {
          background: #7953ed;
          color: #ffffff;
        }

        /* FOOTER */

        .admin-note {
          margin-top: 20px;
          color: #888888;
          font-size: 13px;
          text-align: center;
        }

        .admin-footer {
          padding: 22px;
          border-top: 1px solid #eeeeee;
          color: #888888;
          font-size: 13px;
          text-align: center;
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {
          .admin-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .admin-main {
            padding: 35px 25px;
          }
        }

        @media (max-width: 600px) {
          .admin-header {
            min-height: 75px;
            padding: 0 15px;
          }

          .admin-logo {
            font-size: 24px;
          }

          .admin-heading-label {
            display: none;
          }

          .admin-logout {
            padding: 9px 13px;
          }

          .admin-main {
            padding: 28px 15px;
          }

          .admin-welcome h1 {
            font-size: 28px;
          }

          .admin-stats {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .admin-stat-card {
            padding: 15px;
            min-height: 125px;
          }

          .admin-stat-card h2 {
            font-size: 25px;
          }

          .admin-applications {
            padding: 15px;
          }

          .admin-section-title {
            align-items: flex-start;
            flex-direction: column;
          }
        }

      `}</style>

    </div>
  );
}

export default AdminDashboard;