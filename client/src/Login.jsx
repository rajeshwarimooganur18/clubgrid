import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // ADMIN LOGIN
    // Temporary demo authentication.
    // Replace with backend authentication before deployment.
    if (role === "admin") {
      if (
        email === "admin@clubgrid.com" &&
        password === "admin123"
      ) {
        const admin = {
          name: "ClubGrid Admin",
          email,
          role: "admin",
          loggedIn: true,
        };

        localStorage.setItem(
          "clubgridUser",
          JSON.stringify(admin)
        );

        navigate("/admin");
      } else {
        alert("Invalid admin email or password.");
      }

      return;
    }

    // STUDENT LOGIN
    // Temporary demo login until backend is connected.
    const studentName = email
      .split("@")[0]
      .replace(/[._]/g, " ");

    const student = {
      name: studentName,
      email,
      department: "Not added yet",
      year: "Not added yet",
      role: "student",
      loggedIn: true,
    };

    localStorage.setItem(
      "clubgridUser",
      JSON.stringify(student)
    );

    navigate("/");
  };

  return (
    <>
      <div className="cg-login-page">

        {/* LEFT SIDE - BRANDING */}
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

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="cg-login-right">
          <div className="cg-login-form-container">

            <h2>WELCOME BACK</h2>

            <p className="cg-login-description">
              Enter your email and password to access your account
            </p>

            {/* STUDENT / ADMIN SELECTION */}
            <div className="cg-login-role-selector">

              <button
                type="button"
                className={
                  role === "student"
                    ? "cg-login-role active"
                    : "cg-login-role"
                }
                onClick={() => setRole("student")}
              >
                🎓 Student
              </button>

              <button
                type="button"
                className={
                  role === "admin"
                    ? "cg-login-role active"
                    : "cg-login-role"
                }
                onClick={() => setRole("admin")}
              >
                🛡 Admin
              </button>

            </div>

            {/* LOGIN FORM */}
            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="cg-login-form-group">
                <label htmlFor="cg-login-email">
                  Email
                </label>

                <input
                  type="email"
                  id="cg-login-email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="cg-login-form-group">
                <label htmlFor="cg-login-password">
                  Password
                </label>

                <div className="cg-login-password-wrapper">

                  <input
                    type={showPassword ? "text" : "password"}
                    id="cg-login-password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="cg-login-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "◉" : "◎"}
                  </button>

                </div>
              </div>

              {/* REMEMBER ME */}
              <div className="cg-login-options">

                <label className="cg-login-remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <a href="/forgot-password">
                  Forgot Password
                </a>

              </div>

              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                className="cg-login-submit"
              >
                <span>
                  {role === "admin" ? "Admin Sign in" : "Sign in"}
                </span>

                <span className="cg-login-arrow">
                  →
                </span>
              </button>

            </form>

            {/* BOTTOM SECTION */}
            <div className="cg-login-extra">

              {role === "student" ? (
                <>
                  <button
                    type="button"
                    className="cg-login-google"
                  >
                    <span className="cg-login-google-icon">
                      G
                    </span>

                    <span>Continue with google</span>
                  </button>

                  <p className="cg-login-register-text">
                    Don't have an account?{" "}
                    <a href="/register">
                      Create Account
                    </a>
                  </p>
                </>
              ) : (
                <p className="cg-login-admin-note">
                  Authorized administrators only.
                </p>
              )}

            </div>

          </div>
        </div>

      </div>

      {/* =========================
          LOGIN PAGE CSS
      ========================= */}

      <style>{`

        /* =========================
           MAIN CONTAINER
        ========================= */

        .cg-login-page,
        .cg-login-page * {
          box-sizing: border-box;
        }

        .cg-login-page {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: row;
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f8f0ed;
        }

        /* =========================
           LEFT SIDE - LOGO
        ========================= */

        .cg-login-page .cg-login-left {
          width: 55.5%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #e7baff 0%,
            #d8d5ff 50%,
            #d6c5ff 100%
          );
          padding: 30px;
        }

        .cg-login-page .cg-login-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .cg-login-page .cg-login-brand h1 {
          margin: 0;
          padding: 0;
          font-size: 66px;
          font-weight: 700;
          color: #000;
          letter-spacing: -3px;
        }

        /* FOUR SQUARE LOGO */

        .cg-login-page .cg-login-logo-grid {
          display: grid;
          grid-template-columns: repeat(2, 24px);
          grid-template-rows: repeat(2, 24px);
          gap: 8px;
        }

        .cg-login-page .cg-login-logo-grid span {
          width: 24px;
          height: 24px;
          background: #000;
          border-radius: 7px;
        }

        /* =========================
           RIGHT SIDE - LOGIN FORM
        ========================= */

        .cg-login-page .cg-login-right {
          width: 44.5%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px 50px;
          background: #f8f0ed;
        }

        .cg-login-page .cg-login-form-container {
          width: 100%;
          max-width: 600px;
        }

        /* =========================
           HEADING
        ========================= */

        .cg-login-page .cg-login-form-container h2 {
          margin: 0 0 12px;
          padding: 0;
          text-align: center;
          font-size: 32px;
          font-weight: 800;
          color: #000;
        }

        .cg-login-page .cg-login-description {
          margin: 0 0 28px;
          padding: 0;
          text-align: center;
          font-size: 18px;
          line-height: 1.5;
          color: #222;
        }

        /* =========================
           STUDENT / ADMIN SELECTOR
        ========================= */

        .cg-login-page .cg-login-role-selector {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          justify-content: center;
          gap: 12px;
          margin: 0 0 25px;
        }

        .cg-login-page .cg-login-role {
          flex: 1 1 0;
          width: 50%;
          min-width: 0;
          height: 48px;
          padding: 0 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #dedede;
          border-radius: 6px;

          background: #fff;
          color: #444;

          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px;
          font-weight: 600;

          white-space: nowrap;
          cursor: pointer;

          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease;
        }

        .cg-login-page .cg-login-role.active {
          background: #7953ed;
          color: #fff;
          border-color: #7953ed;
        }

        .cg-login-page .cg-login-role:not(.active):hover {
          border-color: #9278f5;
          background: #f5f1ff;
        }

        /* =========================
           EMAIL AND PASSWORD
        ========================= */

        .cg-login-page .cg-login-form-group {
          width: 100%;
          display: block;
          margin-bottom: 18px;
        }

        .cg-login-page .cg-login-form-group label {
          display: block;
          margin-bottom: 10px;
          font-size: 18px;
          font-weight: 700;
          color: #111;
        }

        .cg-login-page .cg-login-form-group input {
          display: block;
          width: 100%;
          height: 65px;
          padding: 0 24px;
          border: 1px solid #dedede;
          border-radius: 6px;
          background: #fff;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 18px;
          color: #222;
          outline: none;
        }

        .cg-login-page .cg-login-form-group input::placeholder {
          color: #999;
        }

        .cg-login-page .cg-login-form-group input:focus {
          border-color: #9278f5;
          box-shadow: 0 0 0 2px #e5dfff;
        }

        /* =========================
           PASSWORD EYE ICON
        ========================= */

        .cg-login-page .cg-login-password-wrapper {
          position: relative;
          width: 100%;
        }

        .cg-login-page .cg-login-password-wrapper input {
          padding-right: 60px;
        }

        .cg-login-page .cg-login-eye {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          padding: 0;
          border: none;
          background: transparent;
          font-size: 27px;
          color: #777;
          cursor: pointer;
        }

        /* =========================
           REMEMBER ME
        ========================= */

        .cg-login-page .cg-login-options {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 20px 0;
        }

        .cg-login-page .cg-login-remember {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 17px;
          color: #222;
          cursor: pointer;
        }

        .cg-login-page .cg-login-remember input {
          width: 32px;
          height: 32px;
          margin: 0;
          accent-color: #7654ed;
          cursor: pointer;
        }

        .cg-login-page .cg-login-options a {
          color: #222;
          font-size: 16px;
          text-decoration: none;
        }

        .cg-login-page .cg-login-options a:hover {
          text-decoration: underline;
        }

        /* =========================
           SIGN IN BUTTON
        ========================= */

        .cg-login-page .cg-login-submit {
          position: relative;
          width: 100%;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 6px;
          background: #000;
          color: #fff;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
        }

        .cg-login-page .cg-login-submit:hover {
          background: #292929;
        }

        .cg-login-page .cg-login-arrow {
          position: absolute;
          right: 25px;
          font-size: 32px;
          font-weight: 400;
        }

        /* =========================
           GOOGLE BUTTON
        ========================= */

        .cg-login-page .cg-login-google {
          width: 100%;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-top: 10px;
          padding: 0;
          border: none;
          background: transparent;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 18px;
          color: #222;
          cursor: pointer;
        }

        .cg-login-page .cg-login-google-icon {
          font-size: 28px;
          font-weight: 800;
          background: conic-gradient(
            #4285f4 0deg 90deg,
            #34a853 90deg 180deg,
            #fbbc05 180deg 270deg,
            #ea4335 270deg 360deg
          );
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        /* =========================
           REGISTER TEXT
        ========================= */

        .cg-login-page .cg-login-register-text {
          text-align: center;
          font-size: 13px;
          color: #777;
          margin-top: 12px;
        }

        .cg-login-page .cg-login-register-text a {
          color: #7953ed;
          font-weight: 600;
          text-decoration: none;
        }

        .cg-login-page .cg-login-register-text a:hover {
          text-decoration: underline;
        }

        /* =========================
           ADMIN NOTE
        ========================= */

        .cg-login-page .cg-login-admin-note {
          text-align: center;
          color: #777;
          font-size: 12px;
          margin-top: 20px;
        }

        /* =========================
           BOTTOM SECTION
           Keeps layout stable when
           switching between roles.
        ========================= */

        .cg-login-page .cg-login-extra {
          min-height: 110px;
        }

        /* =========================
           TABLET RESPONSIVE
        ========================= */

        @media (max-width: 1000px) {

          .cg-login-page .cg-login-left {
            width: 40%;
          }

          .cg-login-page .cg-login-right {
            width: 60%;
            padding: 30px;
          }

          .cg-login-page .cg-login-brand h1 {
            font-size: 42px;
          }

          .cg-login-page .cg-login-logo-grid {
            grid-template-columns: repeat(2, 17px);
            grid-template-rows: repeat(2, 17px);
            gap: 5px;
          }

          .cg-login-page .cg-login-logo-grid span {
            width: 17px;
            height: 17px;
            border-radius: 5px;
          }

        }

        /* =========================
           MOBILE RESPONSIVE
        ========================= */

        @media (max-width: 600px) {

          .cg-login-page {
            flex-direction: column;
          }

          .cg-login-page .cg-login-left {
            width: 100%;
            min-height: 180px;
          }

          .cg-login-page .cg-login-right {
            width: 100%;
            min-height: calc(100vh - 180px);
            padding: 30px 22px;
          }

          .cg-login-page .cg-login-brand h1 {
            font-size: 42px;
          }

          .cg-login-page .cg-login-form-container h2 {
            font-size: 28px;
          }

          .cg-login-page .cg-login-description {
            font-size: 15px;
            margin-bottom: 25px;
          }

          .cg-login-page .cg-login-form-group input {
            height: 55px;
            font-size: 16px;
          }

          .cg-login-page .cg-login-remember {
            font-size: 14px;
          }

          .cg-login-page .cg-login-remember input {
            width: 24px;
            height: 24px;
          }

          .cg-login-page .cg-login-options a {
            font-size: 14px;
          }

          .cg-login-page .cg-login-role {
            height: 45px;
            font-size: 13px;
          }

        }

      `}</style>
    </>
  );
}

export default Login;