import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { commonRoute } from "../../constants";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { email: "", username: "", isLoggedIn: false, token: "", role: "" };
  });

  const login = (email, username, token, role) => {
    const userData = { email, username, isLoggedIn: true, token, role };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    if (user?.token) {
      axios
        .post(
          `${commonRoute}/auth/logout`,
          {},
          {
            headers: {
              Authorization: user.token,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          setUser({
            email: "",
            username: "",
            isLoggedIn: false,
            token: "",
            role: "",
          });
          localStorage.removeItem("user");
          window.location.href = "/login";
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    } else {
      setUser({
        email: "",
        username: "",
        isLoggedIn: false,
        token: "",
        role: "",
      });
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
