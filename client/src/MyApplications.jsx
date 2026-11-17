
import { useEffect, useState } from 'react';
import { applicationsAPI, getToken } from './api';

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('Loading applications...');
  const statusLabels = {
    Pending: 'Pending',
    Accepted: 'Approved',
    Approved: 'Approved',
    Rejected: 'Rejected'
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setMessage('Please log in to view your applications.');
      return;
    }

    applicationsAPI.getMy()
      .then(data => {
        setApplications(data);
        setMessage(
          data.length === 0
              ? "You haven't submitted any applications yet."
            : ''
        );
      })
      .catch(error => setMessage(error.message));
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <a href="/">← Home</a>

      <h1>My Applications</h1>
      <p>Track the status of your club applications.</p>

      {message && <p>{message}</p>}

      {applications.map(application => (
        <div
          key={application._id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '15px'
          }}
        >
          <h3>{application.clubName}</h3>
          <p><strong>Team:</strong> {application.teamName}</p>
          <p><strong>Application date:</strong>{' '}
            {new Date(application.appliedOn || application.createdAt).toLocaleDateString()}
          </p>
          <p><strong>Status:</strong> {statusLabels[application.status] || application.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;
