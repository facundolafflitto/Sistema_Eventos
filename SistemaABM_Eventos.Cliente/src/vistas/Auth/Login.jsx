import { useState, useContext } from "react";
import { login as loginService } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = await loginService(email, password);
      // suponiendo que tu backend te devuelve también el nombre o email
      const userInfo = { email }; 
      login(token, userInfo);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Credenciales incorrectas");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 bg-gray-800 rounded">
      <h2 className="text-white text-xl mb-4">Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-2 p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-4 p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Entrar
      </button>
    </form>
  );
}

export default Login;
