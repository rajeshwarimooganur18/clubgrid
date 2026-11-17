
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const teamDetails = {
  Antaranga: {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDWHYJoQIpzCqL_tIDbi_ahlz6j3kJ0ovudEr5_pcHiA&s=10",
    description: "Antaranga celebrates the beauty of dance, culture, and artistic expression. It brings students together through energetic performances, traditional movements, and creative choreography.",
    members: "20+ Members",
    link: "/clubs/dance/antaranga",
  },
  Diversity: {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmwYEeeRfG8hMlntg8rdIGZmvaBRivv6vJJyXi-bocrw&s=10",
    description: "Diversity brings together different dance styles, cultures, and expressions. It provides students a platform to explore their creativity, showcase their talents, and celebrate the art of movement.",
    members: "20+ Members",
    link: "/clubs/dance/diversity",
  },
  Alphas: {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIRjU6Dxa9WHNDaKqzgXmQY_2cX19bBebZsijGAaUNQ&s=10",
    description: "Alphas is a passionate dance team that brings energy, coordination, and creativity to every performance. The team encourages students to develop their dancing skills and express themselves through movement.",
    members: "20+ Members",
    link: "/clubs/dance/alphas",
  },
  Intensity: {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEROpy1I2oBE3pVmonDopp14_-rDuilLO6mFSd9tX3Hw&s",
    description: "Intensity is all about powerful performances, energetic choreography, and stage presence. The team gives passionate dancers an opportunity to challenge themselves and shine on stage.",
    members: "20+ Members",
    link: "/clubs/dance/intensity",
  },
  Dmax: {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI3GeQE8DiZdMdBbULHGwM63fXHlvHJaxSvl5erj75Vg&s=10",
    description: "Discover another talented Dance Club team, bringing together passionate performers who express their creativity through dance.",
    members: "20+ Members",
    link: "/clubs/dance/dmax",
  },
  Tashan: {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpPiHd_t4shas6cLygwgDPgbNzDRUfpbgi9LY2GvuSXw&s=10",
    description: "A creative space for dancers to learn, collaborate, explore different dance forms, and showcase their passion through performances.",
    members: "20+ Members",
    link: "/clubs/dance/tashan",
  },
};


export default function DanceClub() {
  const [teams, setTeams] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/clubs/2/teams")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch Dance Club teams");
      }
      return response.json();
    })
    .then((data) => {
      const updatedTeams = data
        .map((backendTeam) => {
          const displayName =
            backendTeam.name === "AntarangaD"
              ? "Antaranga"
              : backendTeam.name;

          const details = teamDetails[displayName];

          if (!details) return null;

          return {
            ...details,
            id: backendTeam.id,
            name: displayName,
          };
        })
        .filter(Boolean);

      setTeams(updatedTeams);
    })
    .catch((error) => console.error(error));
}, []);
  return (
    <div className="dance-page">

      {/* NAVBAR */}
      <header className="dance-navbar">
        <a href="/" className="dance-brand">
          <span className="dance-brand-mark">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>ClubGrid</span>
        </a>

        <nav className="dance-nav">
          <a href="/">Home</a>
          <a href="/#clubs" className="selected">
            Clubs
          </a>
          <a href="/my-applications">My Applications</a>
          <a href="/events">Events</a>
          <a href="/announcements">Announcement</a>
        </nav>

        <a
          href="/login"
          className="dance-profile"
          aria-label="Profile"
        >
          <span>B</span>
          <span className="dance-profile-arrow">▾</span>
        </a>
      </header>

      {/* HERO */}
      <section className="dance-hero">
        <div className="dance-hero-title">
          <h1  style={{color:"white"}}>DANCE CLUB</h1>
        </div>

        <div className="dance-hero-art">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6jz56oduMWQ1EduOfYWCppizy0hx-uB_GwllFHjWoUQPLddGw-BYkRE&s=10"
            alt="Dance Club banner"
          />
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="dance-content">

        {/* ABOUT DANCE CLUB */}
        <section className="dance-about">
          <h2>About Dance Club</h2>
          <p>
            A vibrant space for passionate dancers and performers
            to explore different dance styles, develop their skills,
            express their creativity, and bring energy to the stage
            through exciting performances and choreography.
          </p>
        </section>

        {/* OUR TEAMS */}
        <section className="dance-teams">
          <div className="dance-teams-heading">
            <h2>Our Teams</h2>

            <p className="dance-teams-intro">
              Explore the Dance Club's teams, discover your
              passion, and join the one that suits you best!
            </p>
          </div>

          <div className="dance-team-list">
            {teams.map((team) => (
              <article
                className="dance-team-card"
                key={team.name}
              >
                <img
                  className="dance-team-image"
                  src={team.image}
                  alt={`${team.name} logo`}
                />

                <div className="dance-team-info">
                  <h3>{team.name}</h3>

                  <p>{team.description}</p>

                  <div className="dance-team-bottom">

                    <div className="dance-team-badges">
                      <span className="dance-badge">
                        Applications are open
                      </span>

                      <span className="dance-badge dance-team-members">
                        {team.members}
                      </span>
                    </div>

                    <Link
                      to={team.link}
                      className="dance-details-button"
                    >
                      View Details <span>→</span>
                    </Link>

                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>

      {/* CSS */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .dance-page {
          min-height: 100vh;
          background: #ffffff;
          color: #171717;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* NAVBAR */

        .dance-navbar {
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

        .dance-brand {
          font-size: 22px;
          font-weight: 800;
          color: #171717;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dance-brand-mark {
          display: grid;
          grid-template-columns: repeat(2, 8px);
          gap: 3px;
        }

        .dance-brand-mark i {
          width: 8px;
          height: 8px;
          background: #171717;
          border-radius: 2px;
        }

        .dance-nav {
          display: flex;
          align-items: center;
          gap: 38px;
        }

        .dance-nav a {
          color: #222;
          font-size: 14px;
          text-decoration: none;
          transition: 0.2s;
        }

        .dance-nav a:hover {
          color: #7547e8;
        }

        .dance-nav .selected {
          background: #7849ed;
          color: white;
          padding: 10px 28px;
          border-radius: 7px;
        }

        .dance-profile {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #102c68;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          text-decoration: none;
          gap: 5px;
        }

        .dance-profile-arrow {
          display: none;
        }

        /* HERO */

        .dance-hero {
          min-height: 260px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          background: #100d17;
          color: white;
          position: relative;
        }

        .dance-hero-title {
          width: 30%;
          padding: 35px 3%;
          z-index: 1;
        }

        .dance-hero-title h1 {
          font-size: clamp(25px, 3vw, 38px);
          margin: 0;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .dance-hero-art {
          width: 70%;
          height: 260px;
          overflow: hidden;
          position: relative;
        }

        .dance-hero-art img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 42%;
          display: block;
        }

        /* CONTENT */

        .dance-content {
          padding: 25px 3% 45px;
          max-width: 1500px;
          margin: auto;
        }

        .dance-about h2,
        .dance-teams-heading h2 {
          font-size: 25px;
          margin: 0 0 10px;
          font-weight: 750;
        }

        .dance-about p,
        .dance-teams-heading p {
          font-size: 15px;
          line-height: 1.55;
          margin: 0;
          color: #333;
        }

        .dance-teams-heading {
          margin-top: 25px;
          margin-bottom: 14px;
        }

        .dance-teams-intro {
          margin-bottom: 0;
        }

        /* TEAM CARDS */

        .dance-team-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .dance-team-card {
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

        .dance-team-card:hover {
          border-color: #9b7ae9;
          box-shadow: 0 4px 14px rgba(90, 55, 160, 0.09);
          transform: translateY(-2px);
        }

     .dance-team-image {
  width: 190px;
  height: 145px;
  min-width: 190px;
  object-fit: cover;
  object-position: center;
  border-radius: 6px;
  background: #eee;
}

        .dance-team-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5px 8px 5px 0;
        }

        .dance-team-info h3 {
          font-size: 22px;
          margin: 0 0 8px;
          font-weight: 750;
        }

        .dance-team-info p {
          font-size: 14px;
          line-height: 1.45;
          color: #333;
          margin: 0 0 12px;
        }

        .dance-team-bottom {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .dance-team-badges {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .dance-badge {
          background: linear-gradient(110deg, #8152ef, #a17af7);
          color: white;
          padding: 9px 20px;
          border-radius: 25px;
          font-size: 13px;
          text-align: center;
          min-width: 145px;
        }

        .dance-team-members {
          background: linear-gradient(110deg, #8152ef, #a17af7);
          color: white;
          padding: 9px 22px;
          border-radius: 25px;
          font-size: 13px;
          text-align: center;
          min-width: 145px;
        }

        .dance-details-button {
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

        .dance-details-button:hover {
          background: #7550c9;
          color: white;
        }

        .dance-details-button span {
          margin-left: 5px;
        }

        /* RESPONSIVE */

        @media (max-width: 800px) {

          .dance-nav {
            gap: 12px;
          }

          .dance-nav a {
            font-size: 12px;
          }

          .dance-team-card {
            gap: 12px;
          }

          .dance-team-image {
            width: 30%;
            min-width: 150px;
          }

          .dance-team-bottom {
            gap: 8px;
          }

          .dance-badge,
          .dance-team-members {
            min-width: unset;
            padding: 8px 12px;
          }

          .dance-details-button {
            margin-left: 0;
          }

        }

        @media (max-width: 600px) {

          .dance-navbar {
            height: auto;
            min-height: 60px;
            padding: 12px 4%;
          }

          .dance-brand {
            font-size: 18px;
          }

          .dance-nav {
            display: none;
          }

          .dance-hero {
            min-height: 180px;
          }

          .dance-hero-title {
            width: 42%;
            padding: 15px;
          }

          .dance-hero-title h1 {
            font-size: 22px;
          }

          .dance-hero-art {
            width: 58%;
            height: 180px;
          }

          .dance-content {
            padding: 22px 4%;
          }

          .dance-about h2,
          .dance-teams-heading h2 {
            font-size: 21px;
          }

          .dance-team-card {
            flex-direction: column;
            gap: 12px;
          }

          .dance-team-image {
            width: 100%;
            height: 180px;
            min-height: 180px;
          }

          .dance-team-info {
            padding: 5px;
          }

          .dance-team-info h3 {
            font-size: 20px;
          }

          .dance-team-bottom {
            align-items: flex-start;
          }

          .dance-details-button {
            width: 100%;
            margin-top: 5px;
          }

        }

      `}</style>
    </div>
  );
}