import { Link } from "react-router-dom";
import "./DramaClub.css";

const teams = [
  {
    name: "PratiBimb",
    image: "/pratibimb.png",
    description:
      "Pratibimb is SDMCET’s Hindi dramatics club, established in 2009. It brings stories to life through street plays, mad ads, and skits, providing students a platform to express their creativity and showcase their acting talents.",
    members: "25+ Members",
    link: "/clubs/drama/pratibimb",
  },
  {
    name: "Antaranga",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDWHYJoQIpzCqL_tIDbi_ahlz6j3kJ0ovudEr5_pcHiA&s=10",
    description:
      "Antaranga celebrates Kannada culture through drama, music, dance, and creative initiatives, bringing students together to express their talents and promote social awareness.",
    members: "20+ Members",
    link: "/clubs/drama/antaranga",
  },
  {
    name: "Astitva",
    image: "/astitva.png",
    description:
      "Antaranga celebrates Kannada culture through drama, music, dance, and creative initiatives, bringing students together to express their talents and promote social awareness.",
    members: "20+ Members",
    link: "/clubs/drama/astitva",
  },
];

export default function DramaClub() {
  return (
    <div className="drama-page">
      {/* NAVBAR */}
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
          <a href="/#clubs" className="selected">
            Clubs
          </a>
          <a href="/login">My Application</a>
          <a href="/events">Events</a>
          <a href="/announcements">Announcement</a>
        </nav>

        <a
          href="/login"
          className="drama-profile"
          aria-label="Profile"
        >
          <span>B</span>
          <span className="drama-profile-arrow">▾</span>
        </a>
      </header>

      {/* HERO */}
      <section className="drama-hero">
        <h1>DRAMA CLUB</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZL5oYoyZnUQOm7qMXFTk6ZDg92ciFyiGGxclf9-Azhko1eNpRCRNsNY4&s=10"
          alt="Drama theatre masks"
        />
      </section>

      {/* MAIN CONTENT */}
      <main className="drama-content">

        {/* ABOUT DRAMA CLUB */}
        <section className="drama-about">
          <h2>About Drama Club</h2>
          <p>
            A creative space for aspiring actors, storytellers,
            and performers to explore theatre, develop their
            stage presence, and bring powerful stories to life
            through plays, skits, and performances.
          </p>
        </section>

        {/* OUR TEAMS */}
        <section className="drama-teams">
          <h2>Our Teams</h2>

          <p className="drama-teams-intro">
            Explore the Drama Club's teams, discover your
            passion, and join the one that suits you best!
          </p>

          <div className="drama-team-list">
            {teams.map((team) => (
              <article
                className="drama-team-card"
                key={team.name}
              >
                <div className="drama-team-image">
                  <img
                    src={team.image}
                    alt={`${team.name} logo`}
                  />
                </div>

                <div className="drama-team-info">
                  <h3>{team.name}</h3>

                  <p>{team.description}</p>

                  <div className="drama-team-bottom">

                    <div className="drama-team-badges">
                      <span className="drama-badge">
                        Application are open
                      </span>

                      <span className="drama-badge">
                        {team.members}
                      </span>
                    </div>

                    {/* NAVIGATION TO INDIVIDUAL TEAM PAGE */}
                    <Link
                      to={team.link}
                      className="drama-details-button"
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
    </div>
  );
}