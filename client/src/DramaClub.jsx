
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DramaClub.css";

const teamDetails = {
  Pratibimb: {
    image: "/pratibimb.png",
    description:
      "Pratibimb is SDMCET's Hindi dramatics club, established in 2009. It brings stories to life through street plays, mad ads, and skits, providing students a platform to express their creativity and showcase their acting talents.",
    members: "25+ Members",
    link: "/clubs/drama/pratibimb",
  },

  Antaranga: {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDWHYJoQIpzCqL_tIDbi_ahlz6j3kJ0ovudEr5_pcHiA&s=10",
    description:
      "Antaranga celebrates Kannada culture through drama, music, dance, and creative initiatives, bringing students together to express their talents and promote social awareness.",
    members: "20+ Members",
    link: "/clubs/drama/antaranga",
  },

  Astitva: {
    image: "/astitva.png",
    description:
      "Astitva is one of the creative teams of the Drama Club, providing students a platform to express their talents through theatre and performances.",
    members: "20+ Members",
    link: "/clubs/drama/astitva",
  },
};

export default function DramaClub() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/clubs/1/teams")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }
        return response.json();
      })
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load Drama Club teams.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="drama-page">
      <header className="drama-navbar">
        <a href="/" className="drama-brand">
          <span className="drama-brand-mark">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>ClubGrid</span>
        </a>

        <nav className="drama-nav">
          <a href="/">Home</a>
          <a href="/#clubs" className="selected">Clubs</a>
          <a href="/login">My Application</a>
          <a href="/events">Events</a>
          <a href="/announcements">Announcement</a>
        </nav>

        <a href="/login" className="drama-profile" aria-label="Profile">
          <span>B</span>
          <span className="drama-profile-arrow">▾</span>
        </a>
      </header>

      <section className="drama-hero">
        <h1>DRAMA CLUB</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZL5oYoyZnUQOm7qMXFTk6ZDg92ciFyiGGxclf9-Azhko1eNpRCRNsNY4&s=10"
          alt="Drama theatre masks"
        />
      </section>

      <main className="drama-content">
        <section className="drama-about">
          <h2>About Drama Club</h2>
          <p>
            A creative space for aspiring actors, storytellers,
            and performers to explore theatre, develop their
            stage presence, and bring powerful stories to life
            through plays, skits, and performances.
          </p>
        </section>

        <section className="drama-teams">
          <h2>Our Teams</h2>
          <p className="drama-teams-intro">
            Explore the Drama Club's teams, discover your
            passion, and join the one that suits you best!
          </p>

          <div className="drama-team-list">
            {loading && <p>Loading teams...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && teams.map((team) => {
              const details = teamDetails[team.name] || {};

              return (
                <article className="drama-team-card" key={team.id}>
                  <div className="drama-team-image">
                    <img
                      src={details.image}
                      alt={`${team.name} logo`}
                    />
                  </div>

                  <div className="drama-team-info">
                    <h3>{team.name}</h3>
                    <p>{details.description}</p>

                    <div className="drama-team-bottom">
                      <div className="drama-team-badges">
                        <span className="drama-badge">
                          Applications are open
                        </span>
                        <span className="drama-badge">
                          {details.members}
                        </span>
                      </div>

                      <Link
                        to={details.link || "/clubs/drama"}
                        className="drama-details-button"
                      >
                        View Details <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
