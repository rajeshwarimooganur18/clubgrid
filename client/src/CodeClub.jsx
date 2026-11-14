import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const teamDetails = {
  "Anonymous": {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFFjQZrlg6KJBt-IrQGUews1Yp-wv1H2HR7bY_Z1ks5Q&s=10",
    description: "Anonymous brings together passionate technology enthusiasts who enjoy exploring cybersecurity, ethical hacking, digital security, and solving technical challenges. A space to learn, experiment, and grow together.",
    members: "20+ Members",
    link: "/clubs/coding/Anonymous",
  },
  "QWERTY.I/O": {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQld7GFR1LpIINM8eC5UEHe0qnyo_Yd5oFivMocgc2hVA&s=10",
    description: "QWERTY.I/O is a technical community that encourages students to explore programming, development, emerging technologies, and innovation through workshops, collaborative projects, and hands-on learning.",
    members: "20+ Members",
    link: "/clubs/coding/qwerty",
  },
  "Google Developer Team": {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj6MAoH6o6WifnIFq1AnXcAOAWgbElOPqoybe8sZhAuQ&s",
    description: "Google Developer Team inspires students to build innovative solutions using modern technologies. It provides opportunities to explore development, participate in technical events, collaborate on projects, and improve practical skills.",
    members: "20+ Members",
    link: "/clubs/coding/google-developer",
  },
  "Aerospace Club": {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRkTgjCRbmwcbOwTd8r2cWNeiwUjj7KxjXYVNYBd-P0g&s",
    description: "Aerospace Club brings together curious minds interested in aviation, space exploration, aerodynamics, and aerospace technology. It encourages innovation, experimentation, and learning beyond the classroom.",
    members: "20+ Members",
    link: "/clubs/coding/aerospace",
  },
};

export default function CodingClub() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clubs/4/teams")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Coding Club teams");
        }
        return response.json();
      })
      .then((data) => {
        const updatedTeams = data
          .map((backendTeam) => {
            const details = teamDetails[backendTeam.name];

            if (!details) return null;

            return {
              ...details,
              id: backendTeam.id,
              name: backendTeam.name,
            };
          })
          .filter(Boolean);

        setTeams(updatedTeams);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="coding-page">

      {/* NAVBAR */}
      <header className="coding-navbar">
        <Link to="/" className="coding-brand">
          <span className="coding-brand-mark">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>ClubGrid</span>
        </Link>

        <nav className="coding-nav">
          <Link to="/">Home</Link>
          <Link to="/#clubs" className="selected">
            Clubs
          </Link>
          <Link to="/login">My Application</Link>
          <Link to="/events">Events</Link>
          <Link to="/announcements">Announcement</Link>
        </nav>

        <Link
          to="/login"
          className="coding-profile"
          aria-label="Profile"
        >
          B
        </Link>
      </header>

      {/* HERO */}
      <section className="coding-hero">
        <div className="coding-hero-title">
          <h1 style={{color:"white"}}>CODING CLUB</h1>
        </div>

        <div className="coding-hero-art">
          <img
            src="https://i.pinimg.com/1200x/6b/0f/a7/6b0fa79313ad9b00039d18b7c2ddab2e.jpg"
            alt="Coding Club banner"
          />
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="coding-content">

        {/* ABOUT CODING CLUB */}
        <section className="coding-about">
          <h2>About Coding Club</h2>

          <p>
            A dynamic community for technology enthusiasts,
            developers, innovators, and curious minds. Coding
            Club provides students with opportunities to explore
            programming, develop technical skills, collaborate
            on projects, and discover emerging technologies.
            Learn, build, innovate, and turn your ideas into reality.
          </p>
        </section>

        {/* OUR TEAMS */}
        <section className="coding-teams">

          <div className="coding-teams-heading">
            <h2>Our Teams</h2>

            <p>
              Explore the Coding Club's technical teams, discover
              your interests, and find the community that inspires you!
            </p>
          </div>

          <div className="coding-team-list">

            {teams.map((team) => (
              <article
                className="coding-team-card"
                key={team.name}
              >

                <img
                  className="coding-team-image"
                  src={team.image}
                  alt={`${team.name} team`}
                />

                <div className="coding-team-info">

                  <h3>{team.name}</h3>

                  <p>{team.description}</p>

                  <div className="coding-team-bottom">

                    <div className="coding-team-badges">

                      <span className="coding-badge">
                        Applications are open
                      </span>

                      <span className="coding-badge coding-team-members">
                        {team.members}
                      </span>

                    </div>

                    <Link
                      to={team.link}
                      className="coding-details-button"
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

        .coding-page {
          min-height: 100vh;
          background: #ffffff;
          color: #171717;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* NAVBAR */

        .coding-navbar {
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

        .coding-brand {
          font-size: 22px;
          font-weight: 800;
          color: #171717;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .coding-brand-mark {
          display: grid;
          grid-template-columns: repeat(2, 8px);
          gap: 3px;
        }

        .coding-brand-mark i {
          width: 8px;
          height: 8px;
          background: #171717;
          border-radius: 2px;
        }

        .coding-nav {
          display: flex;
          align-items: center;
          gap: 38px;
        }

        .coding-nav a {
          color: #222;
          font-size: 14px;
          text-decoration: none;
          transition: 0.2s;
        }

        .coding-nav a:hover {
          color: #7547e8;
        }

        .coding-nav .selected {
          background: #7849ed;
          color: white;
          padding: 10px 28px;
          border-radius: 7px;
        }

        .coding-profile {
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
        }

        /* HERO */

        .coding-hero {
          min-height: 260px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          background: #100d17;
          color: white;
          position: relative;
        }

        .coding-hero-title {
          width: 30%;
          padding: 35px 3%;
          z-index: 1;
        }

        .coding-hero-title h1 {
          font-size: clamp(25px, 3vw, 38px);
          margin: 0;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .coding-hero-art {
          width: 70%;
          height: 260px;
          overflow: hidden;
        }

        .coding-hero-art img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* CONTENT */

        .coding-content {
          padding: 25px 3% 45px;
          max-width: 1500px;
          margin: auto;
        }

        .coding-about h2,
        .coding-teams-heading h2 {
          font-size: 25px;
          margin: 0 0 10px;
          font-weight: 750;
        }

        .coding-about p,
        .coding-teams-heading p {
          font-size: 15px;
          line-height: 1.55;
          margin: 0;
          color: #333;
        }

        .coding-teams-heading {
          margin-top: 25px;
          margin-bottom: 14px;
        }

        /* TEAM CARDS */

        .coding-team-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .coding-team-card {
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

        .coding-team-card:hover {
          border-color: #9b7ae9;
          box-shadow: 0 4px 14px rgba(90, 55, 160, 0.09);
          transform: translateY(-2px);
        }

       .coding-team-image {
  width: 170px;
  height: 135px;
  min-width: 170px;
  min-height: 135px;
}

        .coding-team-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5px 8px 5px 0;
        }

        .coding-team-info h3 {
          font-size: 22px;
          margin: 0 0 8px;
          font-weight: 750;
        }

        .coding-team-info p {
          font-size: 14px;
          line-height: 1.45;
          color: #333;
          margin: 0 0 12px;
        }

        .coding-team-bottom {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .coding-team-badges {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .coding-badge {
          background: linear-gradient(110deg, #8152ef, #a17af7);
          color: white;
          padding: 9px 20px;
          border-radius: 25px;
          font-size: 13px;
          text-align: center;
          min-width: 145px;
        }

        .coding-team-members {
          background: linear-gradient(110deg, #8152ef, #a17af7);
          color: white;
          padding: 9px 22px;
          border-radius: 25px;
          font-size: 13px;
          text-align: center;
          min-width: 145px;
        }

        .coding-details-button {
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

        .coding-details-button:hover {
          background: #7550c9;
          color: white;
        }

        .coding-details-button span {
          margin-left: 5px;
        }

        /* RESPONSIVE */

        @media (max-width: 800px) {

          .coding-nav {
            gap: 12px;
          }

          .coding-nav a {
            font-size: 12px;
          }

          .coding-team-card {
            gap: 12px;
          }

          .coding-team-image {
             width: 170px;
            height: 135px;
             min-width: 170px;
}

          .coding-team-bottom {
            gap: 8px;
          }

          .coding-badge,
          .coding-team-members {
            min-width: unset;
            padding: 8px 12px;
          }

          .coding-details-button {
            margin-left: 0;
          }

        }

        @media (max-width: 600px) {

          .coding-navbar {
            height: auto;
            min-height: 60px;
            padding: 12px 4%;
          }

          .coding-brand {
            font-size: 18px;
          }

          .coding-nav {
            display: none;
          }

          .coding-hero {
            min-height: 180px;
          }

          .coding-hero-title {
            width: 42%;
            padding: 15px;
          }

          .coding-hero-title h1 {
            font-size: 22px;
          }

          .coding-hero-art {
            width: 58%;
            height: 180px;
          }

          .coding-content {
            padding: 22px 4%;
          }

          .coding-about h2,
          .coding-teams-heading h2 {
            font-size: 21px;
          }

          .coding-team-card {
            flex-direction: column;
            gap: 12px;
          }

          .coding-team-image {
            width: 100%;
            height: 180px;
            min-height: 180px;
          }

          .coding-team-info {
            padding: 5px;
          }

          .coding-team-info h3 {
            font-size: 20px;
          }

          .coding-team-bottom {
            align-items: flex-start;
          }

          .coding-details-button {
            width: 100%;
            margin-top: 5px;
          }

        }
    

      `}</style>
    </div>
  );
}