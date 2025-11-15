import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function decodeToken(token) {
    const decoded = jwtDecode(token);

    const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    return {
      id,
      email,
      rol: role,   // ← ESTE ES EL QUE ROMPÍA TODO
    };
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setUser(decodeToken(token));
      } catch (err) {
        console.error("Token inválido", err);
      }
    }
  }, []);

  function login(token) {
    localStorage.setItem("token", token);

    try {
      setUser(decodeToken(token));
    } catch (err) {
      console.error("Error decodificando token", err);
    }
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
