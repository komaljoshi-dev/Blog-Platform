import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from './Loading';

//it checks for token using context API and if not authorized send back to login page
const ProtectedRoute = ({ children }) => {
  const { user ,loading} = useContext(AuthContext);

  if (loading) return <Loading message="Checking authentication..." />;

  
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
// we use it with create post route because it is only for logged in users