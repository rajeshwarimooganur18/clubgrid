import { Link } from "react-router-dom";

const teams = [
  {
    name: "Antaranga",
    image: "/antaranga-dance.png",
    description:
      "Antaranga celebrates the beauty of dance, culture, and artistic expression. It brings students together through energetic performances, traditional movements, and creative choreography.",
    members: "20+ Members",
    link: "/clubs/dance/antaranga",
  },
  {
    name: "Diversity",
    image: "/diversity.png",
    description:
      "Diversity brings together different dance styles, cultures, and expressions. It provides students a platform to explore their creativity, showcase their talents, and celebrate the art of movement.",
    members: "20+ Members",
    link: "/clubs/dance/diversity",
  },
  {
    name: "Alphas",
    image: "/alphas.png",
    description:
      "Alphas is a passionate dance team that brings energy, coordination, and creativity to every performance. The team encourages students to develop their dancing skills and express themselves through movement.",
    members: "20+ Members",
    link: "/clubs/dance/alphas",
  },
  {
    name: "Intensity",
    image: "/intensity.png",
    description:
      "Intensity is all about powerful performances, energetic choreography, and stage presence. The team gives passionate dancers an opportunity to challenge themselves and shine on stage.",
    members: "20+ Members",
    link: "/clubs/dance/intensity",
  },
  {
    name: "Dmax",
    image: "/dance-team5.png",
    description:
      "Discover another talented Dance Club team, bringing together passionate performers who express their creativity through dance.",
    members: "20+ Members",
    link: "/clubs/dance/dmax",
  },
  {
    name: "Tushan",
    image: "/dance-team6.png",
    description:
      "A creative space for dancers to learn, collaborate, explore different dance forms, and showcase their passion through performances.",
    members: "20+ Members",
    link: "/clubs/dance/tushan",
  },
];

export default function DanceClub() {
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
          <a href="/login">My Application</a>
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
        <h1>DANCE CLUB</h1>
        <img
          src="/dance-banner.png"
          alt="Dance Club banner"
        />
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
          <h2>Our Teams</h2>

          <p className="dance-teams-intro">
            Explore the Dance Club's teams, discover your
            passion, and join the one that suits you best!
          </p>

          <div className="dance-team-list">
            {teams.map((team) => (
              <article
                className="dance-team-card"
                key={team.name}
              >
                <div className="dance-team-image">
                  <img
                    src={team.image}
                    alt={`${team.name} logo`}
                  />
                </div>

                <div className="dance-team-info">
                  <h3>{team.name}</h3>

                  <p>{team.description}</p>

                  <div className="dance-team-bottom">

                    <div className="dance-team-badges">
                      <span className="dance-badge">
                        Applications are open
                      </span>

                      <span className="dance-badge">
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
          background: #f7f8fc;
          color: #20243a;
          font-family: Arial, sans-serif;
        }

        /* NAVBAR */

        .dance-navbar {
          height: 85px;
          padding: 0 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          box-shadow: 0 2px 15px rgba(0,0,0,0.05);
          position: relative;
          z-index: 10;
        }

        .dance-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          text-decoration: none;
          color: #24243d;
          font-size: 23px;
          font-weight: 800;
        }

        .dance-brand-mark {
          display: grid;
          grid-template-columns: repeat(2, 9px);
          gap: 3px;
        }

        .dance-brand-mark i {
          width: 9px;
          height: 9px;
          background: #7561d8;
          border-radius: 3px;
        }

        .dance-brand-mark i:nth-child(2),
        .dance-brand-mark i:nth-child(3) {
          background: #b5a8f2;
        }

        .dance-nav {
          display: flex;
          align-items: center;
          gap: 34px;
        }

        .dance-nav a {
          text-decoration: none;
          color: #656579;
          font-size: 14px;
          font-weight: 600;
          transition: 0.2s;
        }

        .dance-nav a:hover,
        .dance-nav a.selected {
          color: #7561d8;
        }

        .dance-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #555;
        }

        .dance-profile span:first-child {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #7561d8;
          color: white;
          font-weight: 700;
        }

        .dance-profile-arrow {
          font-size: 13px;
        }

        /* HERO */

        .dance-hero {
          height: 307px;
          position: relative;
          overflow: hidden;
          background: #27223d;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dance-hero img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.48;
        }

        .dance-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(26,20,48,0.85),
            rgba(65,48,105,0.35)
          );
        }

        .dance-hero h1 {
          position: relative;
          z-index: 2;
          color: white;
          font-size: 48px;
          letter-spacing: 5px;
          font-weight: 800;
          text-align: center;
        }

        /* MAIN CONTENT */

        .dance-content {
          max-width: 1150px;
          margin: auto;
          padding: 55px 25px 80px;
        }

        /* ABOUT */

        .dance-about {
          background: white;
          padding: 30px 35px;
          border-radius: 13px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.04);
          margin-bottom: 45px;
        }

        .dance-about h2,
        .dance-teams h2 {
          font-size: 25px;
          color: #282442;
          margin: 0 0 15px;
        }

        .dance-about p {
          color: #6d6d7d;
          font-size: 15px;
          line-height: 1.8;
          margin: 0;
        }

        /* TEAMS */

        .dance-teams-intro {
          color: #77778a;
          font-size: 14px;
          margin-bottom: 27px;
          line-height: 1.6;
        }

        .dance-team-list {
          display: flex;
          flex-direction: column;
          gap: 23px;
        }

        .dance-team-card {
          display: flex;
          background: white;
          border-radius: 14px;
          overflow: hidden;
          min-height: 220px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.045);
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .dance-team-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 9px 25px rgba(0,0,0,0.09);
        }

        .dance-team-image {
          width: 245px;
          min-width: 245px;
          background: #eeeafa;
          overflow: hidden;
        }

        .dance-team-image img {
          width: 100%;
          height: 100%;
          min-height: 220px;
          object-fit: cover;
        }

        .dance-team-info {
          flex: 1;
          padding: 25px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .dance-team-info h3 {
          color: #30294d;
          font-size: 21px;
          margin: 0 0 11px;
        }

        .dance-team-info p {
          color: #727284;
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 20px;
        }

        .dance-team-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .dance-team-badges {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
        }

        .dance-badge {
          background: #f0edfc;
          color: #7561d8;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        .dance-details-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 11px 19px;
          background: #7561d8;
          color: white;
          text-decoration: none;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 700;
          transition: 0.2s;
          white-space: nowrap;
        }

        .dance-details-button:hover {
          background: #5d49bf;
          transform: translateX(2px);
        }

        .dance-details-button span {
          font-size: 17px;
        }

        /* RESPONSIVE */

        @media (max-width: 850px) {
          .dance-navbar {
            padding: 0 4%;
          }

          .dance-nav {
            gap: 15px;
          }

          .dance-team-image {
            width: 200px;
            min-width: 200px;
          }
        }

        @media (max-width: 650px) {
          .dance-navbar {
            height: auto;
            padding: 18px 5%;
            flex-wrap: wrap;
            gap: 18px;
          }

          .dance-nav {
            order: 3;
            width: 100%;
            overflow-x: auto;
            padding-bottom: 5px;
          }

          .dance-nav a {
            white-space: nowrap;
          }

          .dance-hero {
            height: 220px;
          }

          .dance-hero h1 {
            font-size: 32px;
          }

          .dance-content {
            padding: 35px 16px 55px;
          }

          .dance-about {
            padding: 23px;
          }

          .dance-team-card {
            flex-direction: column;
          }

          .dance-team-image {
            width: 100%;
            height: 190px;
          }

          .dance-team-image img {
            min-height: 190px;
          }

          .dance-team-info {
            padding: 22px;
          }

          .dance-team-bottom {
            align-items: flex-start;
          }
        }

      `}</style>
    </div>
  );
}