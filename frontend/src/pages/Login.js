import { useState, useContext } from "react";
import { Link ,useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  //when form is submitted this function runs
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Show loading toast
    const toastId = toast.loading('Logging in...');

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      //login is used from authContext so its take token and user object as input
      //and as login function is defined the token is stored in local storage and user data also to react state memory
      login(res.data.token, res.data.user);

      // Update loading toast to success
      toast.update(toastId, {
        render: 'Login successful!',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });

      //then navigates back to home
      navigate("/");
    } 
    catch (err) {

      // Update loading toast to error
      toast.update(toastId, {
        render: err.response?.data?.message || 'Login failed',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading} className="auth-btn">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="auth-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;