import { createContext, useState, useEffect } from "react";
import API from "../api/api";
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      // fetch user on refresh
      API.get("/auth/me")
        .then((res) => { setUser(res.data); })

        .catch(() => {
          logout();
          toast.error('Session expired. Please login again.');
        })
        
        .finally(() => {
          setLoading(false);
        });
    }else{
      setLoading(false);
    }
  }, []);
  //as only token is stored in local storage after refresh we loose user info so we fetch it again using get

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  //token and user can be called in any function login and logout as well
  return (
    <AuthContext.Provider value={{ token, user,loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};