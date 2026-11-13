
import { useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: 'Ananya Sharma',
      department: 'ISE',
      year: '3rd Year',
      club: 'Coding Club',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      department: 'CSE',
      year: '2nd Year',
      club: 'Robotics Club',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Priya Patel',
      department: 'ECE',
      year: '3rd Year',
      club: 'Photography Club',
      status: 'Accepted',
    },
    {
      id: 4,
      name: 'Arjun Rao',
      department: 'ISE',
      year: '1st Year',
      club: 'Music Club',
      status: 'Rejected',
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setApplications((currentApplications) =>
      currentApplications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const pending = applications.filter((app) => app.status === 'Pending').length;
  const accepted = applications.filter((app) => app.status === 'Accepted').length;
  const rejected = applications.filter((app) => app.status === 'Rejected').length;

  return (
    <div className="admin-dashboard">
     
<header className="admin-header">
  <a href="/" className="admin-logo">
    ClubGrid<span>.</span>
  </a>

  <span className="admin-heading-label">ADMIN PANEL</span>

  <button onClick={() => window.location.href = '/'}>
    Logout
  </button>
</header>


      <main className="admin-main">
        <section className="admin-welcome">
          <p className="admin-eyebrow">CLUB MANAGEMENT</p>
          <h1>Admin Dashboard</h1>
          <p>Review applications and manage student club recruitment.</p>
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
              <p>Review each application and update its status.</p>
            </div>
            <span className="admin-total">{applications.length} applications</span>
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
                    <td className="admin-student-name">{app.name}</td>
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
                      {app.status === 'Pending' ? (
                        <div className="admin-actions">
                          <button
                            className="admin-accept"
                            onClick={() => updateStatus(app.id, 'Accepted')}
                          >
                            Accept
                          </button>
                          <button
                            className="admin-reject"
                            onClick={() => updateStatus(app.id, 'Rejected')}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          className="admin-reset"
                          onClick={() => updateStatus(app.id, 'Pending')}
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
    </div>
  );
}

export default AdminDashboard;
