import { useState, useContext } from "react";
import { login as loginService } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importa el CSS externo

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = await loginService(email, password);
      const userInfo = { email };
      login(token, userInfo);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Credenciales incorrectas");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Iniciar sesión</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="login-input"
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="login-input"
        required
      />

      <button type="submit" className="login-button">
        Entrar
      </button>
    </form>
  );
}

export default Login;
