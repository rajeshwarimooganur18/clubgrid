import { Link } from "react-router-dom";

export default function Application() {

  // DEMO APPLICATION DATA
  const applications = [
    {
      id: 1,
      name: "QWERTY.I/O",
      logo: "/qwerty.png",
      appliedOn: "12 November 2026",
      status: "Pending",
      description: "Technical Club",
    },
    {
      id: 2,
      name: "Google Developer Group",
      logo: "/gdg.png",
      appliedOn: "08 November 2026",
      status: "Accepted",
      description: "Developer Community",
    },
    {
      id: 3,
      name: "Aerospace Club",
      logo: "/aerospace.png",
      appliedOn: "05 November 2026",
      status: "Rejected",
      description: "Technical Club",
    },
  ];

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
    <div className="application-page">

      {/* NAVBAR */}
      <header className="application-navbar">

        <Link to="/" className="application-brand">
          <span className="application-brand-mark">
            <i /><i /><i /><i />
          </span>
          <span>ClubGrid</span>
        </Link>

        <nav className="application-nav">
          <Link to="/">⌂ &nbsp;Home</Link>
          <Link to="/#clubs">♧ &nbsp;Clubs</Link>

          <Link
            to="/my-application"
            className="application-nav-active"
          >
            ▤ &nbsp;My Application
          </Link>

          <Link to="/events">▣ &nbsp;Events</Link>
          <Link to="/announcements">⚑ &nbsp;Announcement</Link>
        </nav>

        <Link to="/login" className="application-profile">
          <span>B</span>
          <span>▾</span>
        </Link>

      </header>

      {/* PAGE CONTENT */}
      <main className="application-content">

        {/* PAGE HEADING */}
        <section className="application-heading">
          <div>
            <span className="application-eyebrow">
              STUDENT DASHBOARD
            </span>

            <h1>My Applications</h1>

            <p>
              Track and manage all your club applications in one place.
            </p>
          </div>

          <div className="application-heading-icon">
            <span>📋</span>
          </div>
        </section>

        {/* SUMMARY CARDS */}
        <section className="application-summary">

          <div className="summary-card">
            <div className="summary-icon total-icon">📁</div>
            <div>
              <h2>{applications.length}</h2>
              <p>Total Applications</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon pending-icon">⏳</div>
            <div>
              <h2>{pendingCount}</h2>
              <p>Pending</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon accepted-icon">✓</div>
            <div>
              <h2>{acceptedCount}</h2>
              <p>Accepted</p>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon rejected-icon">✕</div>
            <div>
              <h2>{rejectedCount}</h2>
              <p>Rejected</p>
            </div>
          </div>

        </section>

        {/* APPLICATION LIST */}
        <section className="application-list-section">

          <div className="application-list-heading">
            <div>
              <h2>Your Applications</h2>
              <p>View the current status of your applications.</p>
            </div>

            <span className="application-count">
              {applications.length} Applications
            </span>
          </div>

          <div className="application-list">

            {applications.map((app) => (
              <article className="application-card" key={app.id}>

                {/* CLUB LOGO */}
                <div className="application-logo">
                  <img
                    src={app.logo}
                    alt={`${app.name} logo`}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                {/* CLUB DETAILS */}
                <div className="application-details">
                  <span className="application-category">
                    {app.description}
                  </span>

                  <h3>{app.name}</h3>

                  <div className="application-date">
                    <span>📅</span>
                    <span>Applied on: {app.appliedOn}</span>
                  </div>
                </div>

                {/* STATUS */}
                <div className="application-status-section">
                  <span className="status-label">Application Status</span>

                  <span
                    className={`application-status ${app.status.toLowerCase()}`}
                  >
                    <span className="status-dot"></span>
                    {app.status}
                  </span>
                </div>

              </article>
            ))}

          </div>

        </section>

        {/* STATUS INFORMATION */}
        <section className="application-info">
          <div className="application-info-icon">ⓘ</div>

          <div>
            <h3>Understanding your application status</h3>

            <p>
              <strong>Pending:</strong> Your application is waiting
              for review.
              <br />

              <strong>Accepted:</strong> Your application has been
              approved by the club.
              <br />

              <strong>Rejected:</strong> Your application was not
              selected.
            </p>
          </div>
        </section>

      </main>

      {/* CSS */}
      <style>{`

/* PAGE */
.application-page {
  min-height: 100vh;
  background: #f8f8fc;
  color: #171525;
  font-family: Arial, Helvetica, sans-serif;
}

/* NAVBAR */
.application-navbar {
  height: 85px;
  padding: 0 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
}

.application-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #080808;
  font-size: 31px;
  font-weight: 750;
  letter-spacing: -1.2px;
  text-decoration: none;
  white-space: nowrap;
}

.application-brand-mark {
  display: grid;
  grid-template-columns: repeat(2, 11px);
  grid-template-rows: repeat(2, 11px);
  gap: 3px;
}

.application-brand-mark i {
  display: block;
  border-radius: 4px;
  background: #080808;
}

.application-nav {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
}

.application-nav a {
  height: 48px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  color: #111;
  font-size: 16px;
  text-decoration: none;
  white-space: nowrap;
}

.application-nav a:hover {
  background: #f4f1ff;
}

.application-nav a.application-nav-active {
  background: #7953ed;
  color: white;
}

.application-profile {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #111;
  text-decoration: none;
}

.application-profile span:first-child {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #123779;
  color: white;
  font-size: 21px;
  font-weight: 600;
}

/* MAIN CONTENT */
.application-content {
  max-width: 1450px;
  margin: auto;
  padding: 42px 45px 55px;
  box-sizing: border-box;
}

/* HEADING */
.application-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.application-eyebrow {
  color: #7953ed;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 2px;
}

.application-heading h1 {
  margin: 10px 0;
  font-size: 38px;
  font-weight: 750;
  letter-spacing: -1px;
}

.application-heading p {
  margin: 0;
  color: #777487;
  font-size: 17px;
}

.application-heading-icon {
  width: 75px;
  height: 75px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  background: #eee9ff;
  font-size: 35px;
}

/* SUMMARY */
.application-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 38px;
}

.summary-card {
  min-height: 110px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 17px;
  box-sizing: border-box;
  border: 1px solid #e8e6ef;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 3px 12px rgba(20, 15, 50, 0.025);
}

.summary-icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 13px;
  font-size: 24px;
  font-weight: 700;
}

.total-icon {
  background: #eee9ff;
  color: #7953ed;
}

.pending-icon {
  background: #fff4df;
  color: #d89422;
}

.accepted-icon {
  background: #e5f8ec;
  color: #269b57;
}

.rejected-icon {
  background: #ffebeb;
  color: #db5050;
}

.summary-card h2 {
  margin: 0 0 5px;
  font-size: 27px;
  font-weight: 750;
}

.summary-card p {
  margin: 0;
  color: #777487;
  font-size: 14px;
}

/* APPLICATION LIST */
.application-list-section {
  padding: 26px;
  border: 1px solid #e8e6ef;
  border-radius: 15px;
  background: #fff;
  box-shadow: 0 3px 12px rgba(20, 15, 50, 0.025);
}

.application-list-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 24px;
}

.application-list-heading h2 {
  margin: 0 0 7px;
  font-size: 23px;
  font-weight: 750;
}

.application-list-heading p {
  margin: 0;
  color: #858194;
  font-size: 14px;
}

.application-count {
  padding: 9px 15px;
  border-radius: 20px;
  background: #f0ecff;
  color: #7953ed;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

/* APPLICATION CARD */
.application-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.application-card {
  min-height: 120px;
  padding: 19px 22px;
  display: flex;
  align-items: center;
  gap: 22px;
  border: 1px solid #e9e7ef;
  border-radius: 12px;
  background: #fff;
  box-sizing: border-box;
  transition: 0.2s ease;
}

.application-card:hover {
  border-color: #c8baff;
  box-shadow: 0 5px 18px rgba(80, 60, 150, 0.07);
  transform: translateY(-2px);
}

/* LOGO */
.application-logo {
  width: 78px;
  height: 78px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #eeeaf5;
  border-radius: 12px;
  background: #faf9fd;
}

.application-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* DETAILS */
.application-details {
  flex: 1;
  min-width: 0;
}

.application-category {
  display: inline-block;
  margin-bottom: 7px;
  color: #8a849b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.application-details h3 {
  margin: 0 0 10px;
  color: #201d30;
  font-size: 21px;
  font-weight: 750;
}

.application-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #858194;
  font-size: 13px;
}

/* STATUS */
.application-status-section {
  min-width: 155px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 9px;
}

.status-label {
  color: #9691a2;
  font-size: 12px;
  font-weight: 600;
}

.application-status {
  min-width: 105px;
  padding: 9px 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 25px;
  font-size: 13px;
  font-weight: 700;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.application-status.pending {
  background: #fff4df;
  color: #b47a17;
}

.application-status.pending .status-dot {
  background: #d99b2d;
}

.application-status.accepted {
  background: #e5f8ec;
  color: #24894c;
}

.application-status.accepted .status-dot {
  background: #2ba45b;
}

.application-status.rejected {
  background: #ffebeb;
  color: #cb4545;
}

.application-status.rejected .status-dot {
  background: #d84d4d;
}

/* STATUS INFORMATION */
.application-info {
  margin-top: 25px;
  padding: 20px 23px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border: 1px solid #e5e0f6;
  border-radius: 12px;
  background: #f4f1ff;
}

.application-info-icon {
  color: #7953ed;
  font-size: 23px;
  font-weight: 700;
}

.application-info h3 {
  margin: 0 0 8px;
  color: #39314f;
  font-size: 15px;
}

.application-info p {
  margin: 0;
  color: #716b82;
  font-size: 13px;
  line-height: 1.9;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .application-navbar {
    padding: 0 18px;
  }

  .application-brand {
    font-size: 25px;
  }

  .application-nav {
    gap: 3px;
  }

  .application-nav a {
    padding: 0 10px;
    font-size: 13px;
  }

  .application-content {
    padding: 35px 25px;
  }

  .application-summary {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 760px) {
  .application-navbar {
    height: auto;
    min-height: 72px;
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 16px;
  }

  .application-brand {
    font-size: 24px;
  }

  .application-profile {
    margin-left: auto;
  }

  .application-nav {
    order: 3;
    width: 100%;
    overflow-x: auto;
  }

  .application-nav a {
    height: 38px;
    padding: 0 12px;
    font-size: 13px;
  }

  .application-content {
    padding: 27px 15px;
  }

  .application-heading h1 {
    font-size: 29px;
  }

  .application-heading p {
    max-width: 270px;
    font-size: 14px;
    line-height: 1.5;
  }

  .application-heading-icon {
    width: 55px;
    height: 55px;
    font-size: 25px;
  }

  .application-summary {
    gap: 10px;
  }

  .summary-card {
    min-height: 90px;
    padding: 12px;
    gap: 10px;
  }

  .summary-icon {
    width: 40px;
    height: 40px;
    font-size: 19px;
  }

  .summary-card h2 {
    font-size: 22px;
  }

  .summary-card p {
    font-size: 11px;
  }

  .application-list-section {
    padding: 17px 12px;
  }

  .application-list-heading h2 {
    font-size: 19px;
  }

  .application-list-heading p {
    font-size: 12px;
  }

  .application-count {
    padding: 7px 10px;
    font-size: 11px;
  }

  .application-card {
    padding: 15px 12px;
    gap: 12px;
    flex-wrap: wrap;
  }

  .application-logo {
    width: 58px;
    height: 58px;
  }

  .application-details h3 {
    font-size: 16px;
  }

  .application-category {
    font-size: 10px;
  }

  .application-date {
    font-size: 11px;
  }

  .application-status-section {
    width: 100%;
    padding-left: 70px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .application-info {
    padding: 16px;
  }
}

@media (max-width: 420px) {
  .application-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .application-heading-icon {
    display: none;
  }

  .application-list-heading {
    align-items: flex-start;
  }
}

      `}</style>
    </div>
  );
}