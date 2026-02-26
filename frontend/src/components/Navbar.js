import { Link ,useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import './Navbar.css'; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/');
    //after logout redirects to home page
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">BlogPlatform</Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>

          {user ? (
            <>
              <Link to="/create" className="nav-link">Create Post</Link>
              <Link to="/profile" className="nav-link">My Profile</Link>

              <span className="nav-user">Hello, {user.username}</span>
              <button onClick={handleLogout} className="nav-logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;