
import { useEffect, useState } from 'react';
import './Application.css';
import { applicationsAPI, authAPI, teamsAPI, getToken } from './api';

function Application() {
  const [student, setStudent] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');

  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState('');

  const [skills, setSkills] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [teamsLoading, setTeamsLoading] = useState(true);

  // Load the logged-in student's profile
  useEffect(() => {
    let active = true;

    authAPI.getProfile()
      .then(data => {
        if (!active) return;
        setStudent(data.student);
        setProfileError('');
      })
      .catch(error => {
        if (!active) return;

        setStudent(null);
        setProfileError(
          error.status === 401
            ? 'Please log in before applying.'
            : 'Unable to load your profile. Please try again.'
        );
      })
      .finally(() => {
        if (active) setProfileLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Load active standalone Teams
  useEffect(() => {
    let active = true;

    teamsAPI.getActive()
      .then(data => {
        if (!active) return;

        setTeams(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        if (!active) return;
        setMessage(error.message);
      })
      .finally(() => {
        if (active) setTeamsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    const token = getToken();

    if (profileLoading || !token || !student) {
      setMessage(profileError || 'Please log in before applying.');
      return;
    }

    if (!teamId) {
      setMessage('Please select a Team.');
      return;
    }

    const selectedTeam = teams.find(
      team => String(team._id) === String(teamId)
    );

    if (!selectedTeam) {
      setMessage('Please select a valid Team.');
      return;
    }

    setLoading(true);

    try {
      const data = await applicationsAPI.submit({
        teamId: selectedTeam._id,
        name: student.fullName || student.name || '',
        email: student.email || '',
        usn: student.studentId || student.usn || '',
        department: student.department || '',
        year: student.year || '',
        teamName: selectedTeam.name,
        skills,
        reason
      });

      setMessage(data.message || 'Application submitted successfully!');
      setSkills('');
      setReason('');
      setTeamId('');

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="application-page">
      <header className="application-header">
        <a href="/" className="application-logo">
          ClubGrid<span>.</span>
        </a>

        <a href="/clubs" className="application-back">
          ← Explore Clubs
        </a>
      </header>

      <main className="application-container">
        <div className="application-heading">
          <p className="application-label">
            YOUR JOURNEY STARTS HERE
          </p>

          <h1>Join a Club</h1>

          <p>
            Tell us about yourself and apply to your favourite team.
          </p>
        </div>

        <form className="application-form" onSubmit={handleSubmit}>
          <label>Full Name *</label>
          <input
            type="text"
            value={student?.fullName || ''}
            readOnly
            required
          />

          <label>College Email *</label>
          <input
            type="email"
            value={student?.email || ''}
            readOnly
            required
          />

          <label>Department *</label>
          <input
            type="text"
            value={student?.department || ''}
            readOnly
            required
          />

          <label>Year of Study *</label>
          <input
            type="text"
            value={student?.year || ''}
            readOnly
            required
          />

          <label htmlFor="team">Choose a Team *</label>

          <select
            id="team"
            value={teamId}
            onChange={event => setTeamId(event.target.value)}
            required
            disabled={teamsLoading || teams.length === 0}
          >
            <option value="">
              {teamsLoading
                ? 'Loading Teams...'
                : teams.length === 0
                  ? 'No active Teams available'
                  : 'Select a Team'}
            </option>

            {teams.map(team => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>

          <label htmlFor="skills">
            Your Skills and Interests *
          </label>

          <textarea
            id="skills"
            value={skills}
            onChange={event => setSkills(event.target.value)}
            placeholder="Tell us about your skills and interests"
            rows="3"
            required
          />

          <label htmlFor="reason">
            Why do you want to join this team? *
          </label>

          <textarea
            id="reason"
            value={reason}
            onChange={event => setReason(event.target.value)}
            placeholder="Explain why you would like to join"
            rows="4"
            required
          />

          <button
            type="submit"
            className="application-submit"
            disabled={
              loading ||
              profileLoading ||
              !student ||
              teamsLoading ||
              teams.length === 0
            }
          >
            {loading ? 'Submitting...' : 'Submit Application →'}
          </button>

          {message && (
            <p role="status">{message}</p>
          )}

          {profileError && (
            <p role="alert">{profileError}</p>
          )}

          <p className="application-note">
            * Please fill in all required fields.
          </p>
        </form>
      </main>
    </div>
  );
}

export default Application;
