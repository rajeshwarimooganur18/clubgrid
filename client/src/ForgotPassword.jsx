import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import './ForgotPassword.css';
import { authAPI } from './api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);

    try {
      await authAPI.forgotPassword(email);
      setSuccess(
        'If an account with that email exists, a password reset link has been sent.'
      );
    } catch {
      setError('We could not send the reset link right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cg-login-page cg-forgot-page">
      <div className="cg-login-left">
        <div className="cg-login-brand">
          <div className="cg-login-logo-grid" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <h1>ClubGrid</h1>
        </div>
      </div>

      <div className="cg-login-right">
        <div className="cg-login-form-container cg-forgot-form-container">
          <h2>FORGOT PASSWORD</h2>
          <p className="cg-login-description">
            Enter your email address and we will send you a password reset link.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="cg-login-form-group">
              <label htmlFor="cg-forgot-email">Email</label>
              <input
                type="email"
                id="cg-forgot-email"
                name="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            {success && (
              <p className="cg-forgot-feedback cg-forgot-success" role="status">
                {success}
              </p>
            )}
            {error && (
              <p className="cg-forgot-feedback cg-forgot-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="cg-login-submit"
              disabled={loading}
            >
              <span>{loading ? 'Sending...' : 'Send Reset Link'}</span>
              <span className="cg-login-arrow" aria-hidden="true">→</span>
            </button>
          </form>

          <Link to="/login" className="cg-forgot-back">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
