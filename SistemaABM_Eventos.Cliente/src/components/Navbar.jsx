import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useCarrito } from "../context/carritoContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { carrito } = useCarrito();

  // 🔥 Eliminamos "Comprar" del menú
  const links = [
    { to: "/", label: "Eventos" },
    { to: "/venues", label: "Venues" },
    { to: "/validar", label: "Validar" },
  ];

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-pink-400 hover:text-pink-300"
        >
          🎟 <span>Sistema Eventos</span>
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex gap-6 items-center">

          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-blue-400 transition-colors ${
                location.pathname === link.to ? "text-blue-400 font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* --- CARRITO DESKTOP --- */}
          <button
            onClick={() => navigate("/carrito")}
            className="relative hover:text-blue-400 transition-colors text-2xl"
          >
            🛒
            {carrito.length > 0 && (
              <span className="
                absolute -top-2 -right-3 bg-red-500 text-white 
                text-xs font-bold px-2 py-0.5 rounded-full
              ">
                {carrito.length}
              </span>
            )}
          </button>

          {/* --- LOGIN / LOGOUT --- */}
          {user ? (
            <>
              <span className="text-white">Hola, {user.email}</span>
              <button onClick={logout} className="hover:text-blue-400 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link>
          )}
        </div>

        {/* --- MOBILE MENU BUTTON --- */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* --- MOBILE MENU --- */}
      {open && (
        <div className="md:hidden bg-gray-800 flex flex-col items-center gap-4 py-4 border-t border-gray-700">

          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-blue-400 transition-colors ${
                location.pathname === link.to ? "text-blue-400 font-semibold" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* --- CARRITO MOBILE --- */}
          <button
            onClick={() => { navigate("/carrito"); setOpen(false); }}
            className="relative text-2xl"
          >
            🛒
            {carrito.length > 0 && (
              <span className="
                absolute -top-2 -right-3 bg-red-500 text-white 
                text-xs font-bold px-2 py-0.5 rounded-full
              ">
                {carrito.length}
              </span>
            )}
          </button>

          {user ? (
            <>
              <span className="text-white">Hola, {user.email}</span>
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="hover:text-blue-400 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hover:text-blue-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
