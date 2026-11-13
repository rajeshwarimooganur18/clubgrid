
import './Clubs.css';

const clubs = [
  {
    name: 'Coding Club',
    category: 'Technical',
    icon: '💻',
    description: 'Learn programming, solve coding challenges, and build projects together.',
  },
  {
    name: 'Robotics Club',
    category: 'Technical',
    icon: '🤖',
    description: 'Explore robotics, electronics, automation, and innovative ideas.',
  },
  {
    name: 'Music Club',
    category: 'Cultural',
    icon: '🎵',
    description: 'Share your musical talent through singing, instruments, and performances.',
  },
  {
    name: 'Dance Club',
    category: 'Cultural',
    icon: '💃',
    description: 'Express yourself through dance, practice, and campus performances.',
  },
  {
    name: 'Sports Club',
    category: 'Sports',
    icon: '⚽',
    description: 'Participate in sports, improve your fitness, and build team spirit.',
  },
  {
    name: 'Photography Club',
    category: 'Creative',
    icon: '📸',
    description: 'Capture moments, learn photography skills, and share your creativity.',
  },
];

function Clubs() {
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
        {clubs.map((club) => (
          <article className="club-item" key={club.name}>
            <div className="club-icon">{club.icon}</div>
            <span className="club-category">{club.category}</span>
            <h2>{club.name}</h2>
            <p>{club.description}</p>
            
<button
  className="club-join-button"
  onClick={() => window.location.href = `/application?club=${encodeURIComponent(club.name)}`}
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
