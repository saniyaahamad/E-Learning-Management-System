import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/home");
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="login-logo"
        />

        <h1 className="login-title">
          E-Learning Management System
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="login-input"
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
        />

        <br />

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;