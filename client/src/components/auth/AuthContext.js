import React, { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();
const backendUrl = "http://localhost:8000";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/auth/isloggedin`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.loggedIn) {
          setAuthenticated(true);
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error while fetching the data", error);
      }
    };

    fetchData();
  }, []);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth, backendUrl };
