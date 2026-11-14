
import { useEffect, useState } from 'react';
import './Clubs.css';

const clubIcons = {
  'Drama Club': '🎭',
  'Dance Club': '💃',
  'Music Club': '🎵',
  'Coding Club': '💻',
};

const clubCategories = {
  'Drama Club': 'Cultural',
  'Dance Club': 'Cultural',
  'Music Club': 'Cultural',
  'Coding Club': 'Technical',
};

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/clubs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch clubs');
        }
        return response.json();
      })
      .then((data) => {
        setClubs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching clubs:', error);
        setError('Unable to load clubs. Please try again.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="clubs-page">
      <header className="clubs-header">
        <a className="clubs-logo" href="/">ClubGrid<span>.</span></a>
        <a className="back-home" href="/">← Home</a>
      </header>

      <section className="clubs-intro">
        <p className="clubs-label">FIND YOUR COMMUNITY</p>
        <h1>Explore College Clubs</h1>
        <p>Discover your interests, learn new skills, and meet your people.</p>
      </section>

      <section className="clubs-list">

        {loading && <p>Loading clubs...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && clubs.map((club) => (
          <article className="club-item" key={club.id}>
            <div className="club-icon">
              {clubIcons[club.name] || '🎯'}
            </div>

            <span className="club-category">
              {clubCategories[club.name] || club.category}
            </span>

            <h2>{club.name}</h2>
            <p>{club.description}</p>

            <button
              className="club-join-button"
              onClick={() =>
                window.location.href =
                  `/application?club=${encodeURIComponent(club.name)}`
              }
            >
              Apply Now →
            </button>
          </article>
        ))}

      </section>

      <footer className="clubs-footer">
        <p>ClubGrid — Discover your passion. Find your community.</p>
      </footer>
    </div>
  );
}

export default Clubs;
