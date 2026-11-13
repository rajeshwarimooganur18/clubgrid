
import './StudentDashboard.css';

function StudentDashboard() {
  const applications = [
    {
      id: 1,
      club: 'Coding Club',
      category: 'Technical',
      date: '28 Oct 2026',
      status: 'Pending',
    },
    {
      id: 2,
      club: 'Photography Club',
      category: 'Creative',
      date: '25 Oct 2026',
      status: 'Accepted',
    },
    {
      id: 3,
      club: 'Dance Club',
      category: 'Cultural',
      date: '20 Oct 2026',
      status: 'Rejected',
    },
  ];

  return (
    <div className="student-dashboard">
      <header className="student-header">
  <a href="/" className="student-logo">
    ClubGrid<span>.</span>
  </a>

  <span className="student-welcome">Student Dashboard</span>

  <button onClick={() => window.location.href = '/'}>
    Logout
  </button>
</header>

      <main className="student-main">
        <section className="student-greeting">
          <p className="student-label">YOUR CLUB ACTIVITY</p>
          <h1>Welcome, Student! 👋</h1>
          <p>Track your applications and discover your campus community.</p>
        </section>

        <section className="student-stats">
          <div className="student-stat-card">
            <span className="student-stat-icon">📋</span>
            <p>Total Applications</p>
            <h2>{applications.length}</h2>
          </div>

          <div className="student-stat-card">
            <span className="student-stat-icon">⏳</span>
            <p>Pending</p>
            <h2>{applications.filter((app) => app.status === 'Pending').length}</h2>
          </div>

          <div className="student-stat-card">
            <span className="student-stat-icon">✅</span>
            <p>Accepted</p>
            <h2>{applications.filter((app) => app.status === 'Accepted').length}</h2>
          </div>
        </section>

        <section className="student-applications">
          <div className="student-section-heading">
            <div>
              <h2>My Applications</h2>
              <p>Check the latest status of your club applications.</p>
            </div>
            <a href="/clubs" className="student-explore-button">
              Explore Clubs +
            </a>
          </div>

          <div className="student-table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Club Name</th>
                  <th>Category</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.club}</td>
                    <td>{app.category}</td>
                    <td>{app.date}</td>
                    <td>
                      <span
                        className={`student-status status-${app.status.toLowerCase()}`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="student-tip">
          <span>💡</span>
          <div>
            <h3>Keep exploring!</h3>
            <p>
              Find a club that matches your interests and take the next step
              toward learning something new.
            </p>
          </div>
        </section>
      </main>

      <footer className="student-footer">
        ClubGrid — Discover your passion. Find your community.
      </footer>
    </div>
  );
}

export default StudentDashboard;
