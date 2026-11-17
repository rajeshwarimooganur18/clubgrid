
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { authAPI } from './api';

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setLoading(true);

    const form = e.target;

    const studentData = {
      fullName: form.fullName.value,
      email: form.email.value,
      password: form.password.value,
      department: form.department.value,
      year: form.year.value,
      studentId: studentId.trim().toUpperCase()
    };

    try {
      const data = await authAPI.register(studentData);

      alert(data.message);
      navigate('/login', { replace: true });

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
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
            name="fullName"
            placeholder="Enter your full name"
            required
          />

          <label>College Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your college email"
            required
          />

          <label>USN</label>
          <input
            type="text"
            name="studentId"
            placeholder="Enter your USN"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            minLength="6"
            required
          />

          <label>Department</label>
          <select name="department" required defaultValue="">
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
          <select name="year" required defaultValue="">
            <option value="" disabled>Select year</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </select>

          <label>Register As</label>
          <select value="Student" disabled>
            <option value="Student">Student</option>
          </select>

          {message && (
            <p style={{ color: 'red' }}>{message}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="register-footer">
          Already registered? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
