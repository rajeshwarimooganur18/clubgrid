
import './Application.css';

function Application() {
  const selectedClub = new URLSearchParams(window.location.search).get('club') || '';
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Application submitted successfully!');
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
          <label htmlFor="studentName">Full Name *</label>
          <input
            id="studentName"
            name="studentName"
            type="text"
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">College Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
          />

          <label htmlFor="department">Department *</label>
          <select id="department" name="department" required defaultValue="">
            <option value="" disabled>Select your department</option>
            <option value="ISE">Information Science (ISE)</option>
            <option value="CSE">Computer Science (CSE)</option>
            <option value="ECE">Electronics (ECE)</option>
            <option value="EEE">Electrical (EEE)</option>
            <option value="ME">Mechanical (ME)</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="year">Year of Study *</label>
          <select id="year" name="year" required defaultValue="">
            <option value="" disabled>Select your year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          <label htmlFor="club">Choose a Club *</label>
          <select
  id="club"
  name="club"
  required
  value={selectedClub}
  onChange={(event) => {}}
>
            <option value="" disabled>Select a club</option>
            <option value="Coding Club">Coding Club</option>
            <option value="Robotics Club">Robotics Club</option>
            <option value="Music Club">Music Club</option>
            <option value="Dance Club">Dance Club</option>
            <option value="Sports Club">Sports Club</option>
            <option value="Photography Club">Photography Club</option>
          </select>

          <label htmlFor="skills">Your Skills and Interests *</label>
          <textarea
            id="skills"
            name="skills"
            placeholder="Tell us about your skills and interests"
            rows="3"
            required
          />

          <label htmlFor="reason">Why do you want to join this club? *</label>
          <textarea
            id="reason"
            name="reason"
            placeholder="Explain why you would like to join"
            rows="4"
            required
          />

          <button type="submit" className="application-submit">
            Submit Application →
          </button>

          <p className="application-note">
            * Please fill in all required fields.
          </p>
        </form>
      </main>
    </div>
  );
}

export default Application;
