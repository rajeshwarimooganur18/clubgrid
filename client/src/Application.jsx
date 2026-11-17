
import { useEffect, useState } from 'react';
import './Application.css';
import { applicationsAPI, authAPI, clubsAPI, getToken } from './api';

function Application() {
  const [student, setStudent] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [clubs, setClubs] = useState([]);
  const [teams, setTeams] = useState([]);
  const [clubId, setClubId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [skills, setSkills] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedClub =
    new URLSearchParams(window.location.search).get('club') || '';

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

  // Load clubs from backend
  useEffect(() => {
    clubsAPI.getAll()
      .then(data => {
        setClubs(data);

        if (selectedClub) {
          const matchedClub = data.find(
            club => club.name.toLowerCase() === selectedClub.toLowerCase()
          );

          if (matchedClub) {
            setClubId(String(matchedClub.clubId));
          }
        }
      })
      .catch(error => setMessage(error.message));
  }, []);

  // Load teams whenever the selected club changes
  useEffect(() => {
    if (!clubId) {
      setTeams([]);
      setTeamName('');
      return;
    }

    clubsAPI.getTeams(clubId)
      .then(data => {
        setTeams(data);
        setTeamName('');
      })
      .catch(error => setMessage(error.message));
  }, [clubId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    const token = getToken();

    if (profileLoading || !token || !student) {
      setMessage(profileError || 'Please log in before applying.');
      return;
    }

    if (!clubId || !teamName) {
      setMessage('Please select a club and team.');
      return;
    }

    const selectedClubData = clubs.find(
      club => String(club.clubId) === clubId
    );

    if (!selectedClubData) {
      setMessage('Please select a valid club.');
      return;
    }

    setLoading(true);

    try {
      const data = await applicationsAPI.submit({
        clubId: Number(clubId),
        name: student.fullName || student.name || '',
        email: student.email || '',
        usn: student.studentId || student.usn || '',
        department: student.department || '',
        year: student.year || '',
        clubName: selectedClubData.name,
        teamName,
        skills,
        reason
      });

      setMessage(data.message || 'Application submitted successfully!');
      setSkills('');
      setReason('');
      setTeamName('');

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
          <p className="application-label">YOUR JOURNEY STARTS HERE</p>
          <h1>Join a Club</h1>
          <p>Tell us about yourself and apply to your favourite club.</p>
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

          <label htmlFor="club">Choose a Club *</label>
          <select
            id="club"
            value={clubId}
            onChange={event => setClubId(event.target.value)}
            required
          >
            <option value="">Select a club</option>
            {clubs.map(club => (
              <option key={club.clubId} value={club.clubId}>
                {club.name}
              </option>
            ))}
          </select>

          <label htmlFor="team">Choose a Team *</label>
          <select
            id="team"
            value={teamName}
            onChange={event => setTeamName(event.target.value)}
            required
            disabled={!clubId || teams.length === 0}
          >
            <option value="">Select a team</option>
            {teams.map(team => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>

          <label htmlFor="skills">Your Skills and Interests *</label>
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
            disabled={loading || profileLoading || !student}
          >
            {loading ? 'Submitting...' : 'Submit Application →'}
          </button>

          {message && <p role="status">{message}</p>}
          {profileError && <p role="alert">{profileError}</p>}

          <p className="application-note">
            * Please fill in all required fields.
          </p>
        </form>
      </main>
    </div>
  );
}

export default Application;
