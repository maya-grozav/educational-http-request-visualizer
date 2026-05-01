import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    {
      id: localStorage.getItem("id") || null,
      username: localStorage.getItem("username") || null,
      email: localStorage.getItem("email") || null,
      account_type: localStorage.getItem("account_type") || null,
      next_billing_date: localStorage.getItem("next_billing_date") || null,
    } || null,
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const value = { user, setUser, token, setToken };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
