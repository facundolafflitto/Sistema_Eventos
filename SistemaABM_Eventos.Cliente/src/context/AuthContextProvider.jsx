import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      setUser({ email: decoded?.email }); 
    } catch (e) {
      console.error("Token inválido", e);
    }
  }
});

function login(token) {
  localStorage.setItem("token", token);
  const decoded = jwtDecode(token);
  setUser({ email: decoded?.email }); 
}


  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
