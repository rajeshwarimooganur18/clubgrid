
import { useState } from 'react';
import './Login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    // Redirect to ClubGrid homepage
    window.location.href = '/';
  };

  return (
    <div className="cg-login-page">

      {/* Left logo section */}
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

      {/* Right login section */}
      <div className="cg-login-right">

        <div className="cg-login-form-container">

          <h2>WELCOME BACK</h2>

          <p className="cg-login-description">
            Enter your email and password to access your account
          </p>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="cg-login-form-group">

              <label htmlFor="cg-login-email">
                Email
              </label>

              <input
                type="email"
                id="cg-login-email"
                placeholder="Enter your email"
                required
              />

            </div>

            {/* Password */}
            <div className="cg-login-form-group">

              <label htmlFor="cg-login-password">
                Password
              </label>

              <div className="cg-login-password-wrapper">

                <input
                  type={showPassword ? 'text' : 'password'}
                  id="cg-login-password"
                  placeholder="Enter your Password"
                  required
                />

                <button
                  type="button"
                  className="cg-login-eye"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Show or hide password"
                >
                  {showPassword ? '◉' : '◎'}
                </button>

              </div>

            </div>

            {/* Remember me */}
            <div className="cg-login-options">

              <label className="cg-login-remember">

                <input type="checkbox" />

                <span>Remember me</span>

              </label>

              <a href="/forgot-password">
                Forgot Password
              </a>

            </div>

            {/* Login button */}
            <button
              type="submit"
              className="cg-login-submit"
            >

              <span>Sign in</span>

              <span className="cg-login-arrow">
                →
              </span>

            </button>

          </form>

          {/* Google button */}
          <button
            type="button"
            className="cg-login-google"
          >

            <span className="cg-login-google-icon">
              G
            </span>

            <span>Continue with google</span>

          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;
