import React from "react";
import { Link } from "react-router-dom";

const teams = [
  {
    name: "AntarangaM",
    description:
      "AntarangaM brings together students who share a passion for music, performance, and creative expression. A space to explore musical talents and celebrate the joy of music.",
    members: "20+ Members",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDWHYJoQIpzCqL_tIDbi_ahlz6j3kJ0ovudEr5_pcHiA&s=10",
    link: "/clubs/music/antarangam",
  },
  {
    name: "Finearts",
    description:
      "Finearts is a creative community for students passionate about art, painting, sketching, and visual expression. It encourages creativity and gives artistic talents a platform to shine.",
    members: "20+ Members",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGqomeqdTNJnjHlBpptMymthezcmgHewSQ0TGycrACcQ&s",
    link: "/clubs/music/finearts",
  },
  {
    name: "Musearts",
    description:
      "Musearts celebrates creativity through music, art, and artistic performances. It brings imaginative minds together to explore new ideas and express themselves.",
    members: "20+ Members",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzphEUh1YzrbpB7aOtgCj91EFdzYXntGsXdrN4U5L_tqVBs8BfpWwKckFO&s=10",
    link: "/clubs/music/musearts",
  },
  {
    name: "Nadamrita",
    description:
      "Nadamrita is a platform for students who love music and cultural performances. It celebrates musical traditions, encourages participation, and brings people together through rhythm and melody.",
    members: "20+ Members",
    image:
      "C:\Users\Rameshgouda S\Downloads\Nadamrita.jpeg",
    link: "/clubs/music/nadamrita",
  },
];

function MusicClub() {
  return (
    <div className="music-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .music-page {
          min-height: 100vh;
          background: #ffffff;
          color: #171717;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* NAVBAR */

        .music-navbar {
          height: 68px;
          padding: 0 4%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-bottom: 1px solid #e8e8e8;
          box-shadow: 0 2px 7px rgba(0,0,0,0.05);
          position: relative;
          z-index: 5;
        }

        .music-logo {
          font-size: 22px;
          font-weight: 800;
          color: #171717;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .music-logo-icon {
          display: grid;
          grid-template-columns: repeat(2, 8px);
          gap: 3px;
        }

        .music-logo-icon span {
          width: 8px;
          height: 8px;
          background: #171717;
          border-radius: 2px;
        }

        .music-nav-links {
          display: flex;
          align-items: center;
          gap: 38px;
        }

        .music-nav-links a {
          color: #222;
          font-size: 14px;
          text-decoration: none;
          transition: 0.2s;
        }

        .music-nav-links a:hover {
          color: #7547e8;
        }

        .music-nav-links .active {
          background: #7849ed;
          color: white;
          padding: 10px 28px;
          border-radius: 7px;
        }

        .music-profile {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #102c68;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        /* HERO */

        .music-hero {
          min-height: 260px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          background: #100d17;
          color: white;
          position: relative;
        }

        .music-hero-title {
          width: 30%;
          padding: 35px 3%;
          z-index: 1;
        }

        .music-hero-title h1 {
          font-size: clamp(25px, 3vw, 38px);
          margin: 0;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .music-hero-art {
          width: 70%;
          height: 260px;
          background:
            linear-gradient(90deg, rgba(16,13,23,0.1), rgba(16,13,23,0.1)),
            url("https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1400")
            center 42% / cover no-repeat;
        }

        /* CONTENT */

        .music-content {
          padding: 25px 3% 45px;
          max-width: 1500px;
          margin: auto;
        }

        .music-about h2,
        .music-teams-heading h2 {
          font-size: 25px;
          margin: 0 0 10px;
          font-weight: 750;
        }

        .music-about p,
        .music-teams-heading p {
          font-size: 15px;
          line-height: 1.55;
          margin: 0;
          color: #333;
        }

        .music-teams-heading {
          margin-top: 25px;
          margin-bottom: 14px;
        }

        /* TEAM CARDS */

        .music-team-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .music-team-card {
          display: flex;
          align-items: stretch;
          gap: 20px;
          min-height: 170px;
          padding: 10px;
          border: 1px solid #d7d7d7;
          border-radius: 9px;
          background: #fff;
          transition: 0.25s ease;
        }

        .music-team-card:hover {
          border-color: #9b7ae9;
          box-shadow: 0 4px 14px rgba(90, 55, 160, 0.09);
          transform: translateY(-2px);
        }

        .music-team-image {
          width: 10%;
          min-width: 210px;
          min-height: 80px;
          object-fit: cover;
          border-radius: 4px;
          background: #eee;
        }

        .music-team-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5px 8px 5px 0;
        }

        .music-team-info h3 {
          font-size: 22px;
          margin: 0 0 8px;
          font-weight: 750;
        }

        .music-team-info p {
          font-size: 14px;
          line-height: 1.45;
          color: #333;
          margin: 0 0 12px;
        }

        .music-team-bottom {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .music-team-badge {
          background: linear-gradient(110deg, #8152ef, #a17af7);
          color: white;
          padding: 9px 20px;
          border-radius: 25px;
          font-size: 13px;
          text-align: center;
          min-width: 145px;
        }

        .music-team-members {
          background: linear-gradient(110deg, #8152ef, #a17af7);
          color: white;
          padding: 9px 22px;
          border-radius: 25px;
          font-size: 13px;
          text-align: center;
          min-width: 145px;
        }

        .music-team-link {
          margin-left: auto;
          text-decoration: none;
          color: #7550c9;
          border: 1px solid #7550c9;
          padding: 9px 22px;
          border-radius: 5px;
          font-size: 13px;
          text-align: center;
          white-space: nowrap;
          transition: 0.2s;
        }

        .music-team-link:hover {
          background: #7550c9;
          color: white;
        }

        /* RESPONSIVE */

        @media (max-width: 800px) {
          .music-nav-links {
            gap: 12px;
          }

          .music-nav-links a {
            font-size: 12px;
          }

          .music-team-card {
            gap: 12px;
          }

          .music-team-image {
            width: 30%;
            min-width: 150px;
          }

          .music-team-bottom {
            gap: 8px;
          }

          .music-team-badge,
          .music-team-members {
            min-width: unset;
            padding: 8px 12px;
          }

          .music-team-link {
            margin-left: 0;
          }
        }

        @media (max-width: 600px) {
          .music-navbar {
            height: auto;
            min-height: 60px;
            padding: 12px 4%;
          }

          .music-logo {
            font-size: 18px;
          }

          .music-nav-links {
            display: none;
          }

          .music-hero {
            min-height: 180px;
          }

          .music-hero-title {
            width: 42%;
            padding: 15px;
          }

          .music-hero-title h1 {
            font-size: 22px;
          }

          .music-hero-art {
            width: 58%;
            height: 180px;
          }

          .music-content {
            padding: 22px 4%;
          }

          .music-about h2,
          .music-teams-heading h2 {
            font-size: 21px;
          }

          .music-team-card {
            flex-direction: column;
            gap: 12px;
          }

          .music-team-image {
            width: 100%;
            height: 180px;
          }

          .music-team-info {
            padding: 5px;
          }

          .music-team-info h3 {
            font-size: 20px;
          }

          .music-team-bottom {
            align-items: flex-start;
          }

          .music-team-link {
            width: 100%;
            margin-top: 5px;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="music-navbar">
        <Link to="/" className="music-logo">
          <span className="music-logo-icon">
            <span />
            <span />
            <span />
            <span />
          </span>
          ClubGrid
        </Link>

        <div className="music-nav-links">
          <Link to="/">Home</Link>
          <Link to="/clubs/drama" className="active">Clubs</Link>
          <Link to="/my-application">My Application</Link>
          <Link to="/events">Events</Link>
          <Link to="/announcements">Announcement</Link>
        </div>

        <div className="music-profile">B</div>
      </nav>

      {/* HERO BANNER */}
      <section className="music-hero">
        <div className="music-hero-title">
          <h1>MUSIC CLUB</h1>
        </div>
        <div className="music-hero-art" />
      </section>

      {/* MAIN CONTENT */}
      <main className="music-content">

        {/* ABOUT */}
        <section className="music-about">
          <h2>About Music Club</h2>
          <p>
            A vibrant space for music enthusiasts to explore their talents,
            express their creativity, and connect through the universal
            language of music. From soulful melodies to energetic performances,
            discover your rhythm with us.
          </p>
        </section>

        {/* TEAMS HEADING */}
        <section className="music-teams-heading">
          <h2>Our Teams</h2>
          <p>
            Explore the Music Club's teams, discover your passion, and join
            the one that suits you best!
          </p>
        </section>

        {/* TEAM CARDS */}
        <section className="music-team-list">
          {teams.map((team) => (
            <article className="music-team-card" key={team.name}>
              <img
                src={team.image}
                alt={`${team.name} team`}
                className="music-team-image"
              />

              <div className="music-team-info">
                <h3>{team.name}</h3>
                <p>{team.description}</p>

                <div className="music-team-bottom">
                  <span className="music-team-badge">
                    Application is open
                  </span>

                  <span className="music-team-members">
                    {team.members}
                  </span>

                  <Link to={team.link} className="music-team-link">
                    View Details →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

      </main>
    </div>
  );
}

export default MusicClub;