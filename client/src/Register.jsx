
import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [role, setRole] = useState('Student');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration page is working! Account creation will be added later.');
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>ClubGrid</h1>
        <p className="register-subtitle">
          Join clubs. Explore your interests.
        </p>

        <h2>Create Account</h2>
        <p>Register to get started</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
          />

          <label>College Email</label>
          <input
            type="email"
            placeholder="Enter your college email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            minLength="6"
            required
          />

          <label>Department</label>
          <select required defaultValue="">
            <option value="" disabled>Select department</option>
            <option>ISE</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>Mechanical</option>
            <option>Civil</option>
            <option>Other</option>
          </select>

          <label>Year of Study</label>
          <select required defaultValue="">
            <option value="" disabled>Select year</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>

          <label>Register As</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Student">Student</option>
          </select>

          <button type="submit">Create Account</button>
        </form>

        <p className="register-footer">
          Already registered? <a href="/login">Login</a>
        </p>

        <a className="register-home" href="/">Back to Home</a>
      </div>
    </div>
  );
}

export default Register;
