import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

import DramaClub from "./DramaClub";
import Pratibimb from "./Pratibimb";
import Antaranga from "./Antaranga";
import Astitva from "./Astitva";

import DanceClub from "./DanceClub";
import Diversity from "./Diversity";
import Intensity from "./Intensity";
import Alphas from "./Alphas";
import AntarangaD from "./AntarangaD";
import Tashan from "./Tashan";
import Dmax from "./Dmax";

// MUSIC CLUB
import MusicClub from "./MusicClub";
import AntarangaM from "./AntarangaM";
import Finearts from "./Finearts";
import Museart from "./Museart";
import Nadamritaa from "./Nadamritaa";

// CODING CLUB
import CodeClub from "./CodeClub";
import Anonymous from "./Anonymous";
import QwertyIO from "./QwertyIO";
import GDG from "./GDG";
import Aerospace from "./Aerospace";
const clubs = [
  {
    name: "Drama Club",
    members: "80 + members",
    category: "Performing art",
    icon: "🎭",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Music Club",
    members: "100 + members",
    category: "Performing art",
    icon: "♫",
    image:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Coding Club",
    members: "180 + members",
    category: "Technical",
    icon: "</>",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Dance Club",
    members: "90 + members",
    category: "Performing art",
    icon: "💃",
    image:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=85",
  },
];

function Home() {
  return (
    <div className="clubgrid-page">

      {/* NAVBAR */}
      <header className="cg-navbar">
        <a href="/" className="cg-brand">
          <span className="cg-brand-symbol">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>ClubGrid</span>
        </a>

        <nav className="cg-nav">
          <a href="/" className="cg-nav-active">
            <span className="cg-nav-icon">⌂</span>
            Home
          </a>

          <a href="#clubs">
            <span className="cg-nav-icon">♧</span>
            Clubs
          </a>

          <a href="/login">
            <span className="cg-nav-icon">▤</span>
            My Application
          </a>

          <a href="/events">
            <span className="cg-nav-icon">▣</span>
            Events
          </a>

          <a href="/announcements">
            <span className="cg-nav-icon">⚑</span>
            Announcement
          </a>
        </nav>

        <div className="cg-profile">
          <button
            className="cg-profile-circle"
            type="button"
            onClick={() => {
              window.location.href = "/login";
            }}
            aria-label="Open login"
          >
            B
          </button>

          <span className="cg-profile-arrow">▾</span>
        </div>
      </header>

      {/* HERO */}
      <section className="cg-hero">
        <div className="cg-hero-background"></div>

        <div className="cg-hero-content">
          <p className="cg-hero-eyebrow">
            EXPLORE. APPLY. BE A PART
          </p>

          <h1>
            Explore Your <span>Interests</span>
          </h1>

          <p className="cg-hero-description">
            Discover clubs that match your passions, connect with like-minded
            <br className="cg-desktop-break" />
            students, and make the most of your college journey
          </p>

          <a href="#clubs" className="cg-explore-button">
            Explore Clubs <span>→</span>
          </a>
        </div>
      </section>

      {/* CLUBS */}
      <section className="cg-clubs-section" id="clubs">
        <h2 className="cg-clubs-title">
          Clubs to Explore <span>→</span>
        </h2>

        <div className="cg-clubs-grid">
          {clubs.map((club) => (
            <article className="cg-club-card" key={club.name}>
              <div className="cg-club-image">
                <img src={club.image} alt={club.name} />
                <div className="cg-club-icon">{club.icon}</div>
              </div>

              <div className="cg-club-information">
                <h3>{club.name}</h3>

                <div className="cg-club-meta">
                  <span>{club.members}</span>
                  <span>{club.category}</span>
                </div>

                <a
                  href={
                    club.name === "Drama Club"
                      ? "/clubs/drama"
                      : club.name === "Dance Club"
                      ? "/clubs/dance"
                      : club.name === "Music Club"
                      ? "/clubs/music"
                      : club.name === "Coding Club"
                      ? "/clubs/coding"
                      : `/login?club=${encodeURIComponent(club.name)}`
                  }
                  className="cg-view-details"
                >
                  View Details <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* LOGIN AND REGISTER */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DRAMA CLUB */}
        <Route path="/clubs/drama" element={<DramaClub />} />

        <Route
          path="/clubs/drama/pratibimb"
          element={<Pratibimb />}
        />

        <Route
          path="/clubs/drama/antaranga"
          element={<Antaranga />}
        />

        {/* ASTITVA */}
        <Route
          path="/clubs/astitva"
          element={<Astitva />}
        />

        {/* DANCE CLUB */}
        <Route
          path="/clubs/dance"
          element={<DanceClub />}
        />

        {/* DANCE TEAMS */}
        <Route
          path="/clubs/dance/diversity"
          element={<Diversity />}
        />

        <Route
          path="/clubs/dance/intensity"
          element={<Intensity />}
        />

        <Route
          path="/clubs/dance/alphas"
          element={<Alphas />}
        />

        <Route
          path="/clubs/dance/antaranga"
          element={<AntarangaD />}
        />

        <Route
          path="/clubs/dance/tashan"
          element={<Tashan />}
        />

        <Route
          path="/clubs/dance/dmax"
          element={<Dmax />}
        />

        {/* MUSIC CLUB */}
        <Route
          path="/clubs/music"
          element={<MusicClub />}
        />

        {/* MUSIC TEAMS */}
        <Route
          path="/clubs/music/antarangam"
          element={<AntarangaM />}
        />

        <Route
          path="/clubs/music/finearts"
          element={<Finearts />}
        />

        <Route
          path="/clubs/music/musearts"
          element={<Museart />}
        />

        <Route
          path="/clubs/music/nadamrita"
          element={<Nadamritaa />}
        />

        {/* CODING CLUB */}
        <Route
          path="/clubs/coding"
          element={<CodeClub />}
        />
         <Route
          path="/clubs/coding/anonymous"
          element={<Anonymous />}
        />
         <Route
          path="/clubs/coding/qwerty"
          element={<QwertyIO />}
        />
         <Route
          path="/clubs/coding/google-developer"
          element={<GDG />}
        />
         <Route
          path="/clubs/coding/aerospace"
          element={<Aerospace />}
        />

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;