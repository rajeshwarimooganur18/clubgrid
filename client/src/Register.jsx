
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { authAPI } from './api';

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idCardFile, setIdCardFile] = useState(null);
  const [smsConsent, setSmsConsent] = useState(false);
  const [fileError, setFileError] = useState('');

  const handleIdCardChange = (e) => {
    const file = e.target.files[0];
    setFileError('');
    
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Only JPG, JPEG, PNG, and PDF files are allowed.');
        e.target.value = '';
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size must be less than 5MB.');
        e.target.value = '';
        return;
      }
      setIdCardFile(file);
    }
  };

  const handlePhoneChange = (e) => {
    // Only allow digits
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value.slice(0, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setFileError('');
    setLoading(true);

    const form = e.target;

    // Validate phone number
    if (!phoneNumber || phoneNumber.length !== 10) {
      setMessage('Please enter a valid 10-digit phone number.');
      setLoading(false);
      return;
    }

    // Validate ID card file
    if (!idCardFile) {
      setMessage('Please upload your college ID card.');
      setLoading(false);
      return;
    }

    // Create FormData for multipart/form-data
    const formData = new FormData();
    formData.append('fullName', form.fullName.value);
    formData.append('email', form.email.value);
    formData.append('password', form.password.value);
    formData.append('department', form.department.value);
    formData.append('year', form.year.value);
    formData.append('studentId', studentId.trim().toUpperCase());
    formData.append('phoneNumber', phoneNumber);
    formData.append('smsConsent', smsConsent ? 'true' : 'false');
    formData.append('idCard', idCardFile);

    try {
      const data = await authAPI.register(formData);

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

          <label>Phone Number (+91)</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value="+91"
              readOnly
              style={{
                width: '70px',
                background: '#f5f5f5',
                color: '#666',
                border: '1px solid #ccc',
                borderRadius: '7px',
                padding: '12px',
                fontSize: '15px',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="10-digit mobile number"
              value={phoneNumber}
              onChange={handlePhoneChange}
              maxLength={10}
              required
              style={{ flex: 1 }}
            />
          </div>

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

          <label>Upload College ID Card</label>
          <input
            type="file"
            name="idCard"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleIdCardChange}
            required
          />
          {idCardFile && (
            <p style={{ fontSize: '13px', color: '#666', marginTop: '-8px', marginBottom: '4px' }}>
              Selected: {idCardFile.name} ({(idCardFile.size / 1024).toFixed(1)} KB)
            </p>
          )}
          {fileError && (
            <p style={{ color: 'red', fontSize: '13px', marginTop: '-8px', marginBottom: '4px' }}>{fileError}</p>
          )}

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'normal' }}>
            <input
              type="checkbox"
              name="smsConsent"
              checked={smsConsent}
              onChange={(e) => setSmsConsent(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#3155c6' }}
            />
            <span style={{ fontSize: '14px' }}>I agree to receive SMS notifications about college events and announcements.</span>
          </label>

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
