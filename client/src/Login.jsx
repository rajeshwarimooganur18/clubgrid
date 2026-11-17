
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { authAPI, setCurrentUser, setToken } from './api';

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage('');
    setLoading(true);

    const form = event.target;

    const loginData = {
      email: form.email.value,
      password: form.password.value
    };

    try {
      const data = await authAPI.login(loginData.email, loginData.password);
      if (!data.token || !data.student) {
        throw new Error('Login response was incomplete.');
      }

      // Save login information in the browser
      setToken(data.token);
      setCurrentUser({ ...data.student, loggedIn: true });

      navigate(data.student.role === 'admin' ? '/admin' : '/', { replace: true });

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cg-login-page">

      <div className="cg-login-left">
        <div className="cg-login-brand">
          <div className="cg-login-logo-grid">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <h1>ClubGrid</h1>
        </div>
      </div>

      <div className="cg-login-right">
        <div className="cg-login-form-container">

          <h2>WELCOME BACK</h2>

          <p className="cg-login-description">
            Enter your email and password to access your account
          </p>

          <form onSubmit={handleLogin}>

            <div className="cg-login-form-group">
              <label htmlFor="cg-login-email">Email</label>

              <input
                type="email"
                id="cg-login-email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="cg-login-form-group">
              <label htmlFor="cg-login-password">Password</label>

              <div className="cg-login-password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="cg-login-password"
                  name="password"
                  placeholder="Enter your Password"
                  required
                />

                <button
                  type="button"
                  className="cg-login-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Show or hide password"
                >
                  {showPassword ? '◉' : '◎'}
                </button>
              </div>
            </div>

            <div className="cg-login-options">
              <label className="cg-login-remember">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>

              <Link to="/forgot-password">
                Forgot Password
              </Link>
            </div>

            {message && (
              <p style={{ color: 'red' }}>{message}</p>
            )}

            <button
              type="submit"
              className="cg-login-submit"
              disabled={loading}
            >
              <span>
                {loading ? 'Signing in...' : 'Sign in'}
              </span>

              <span className="cg-login-arrow">→</span>
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;
