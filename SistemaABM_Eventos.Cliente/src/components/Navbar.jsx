import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCarrito } from "../context/carritoContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { carrito } = useCarrito();

  const links = [
    { to: "/", label: "Eventos" },
    { to: "/venues", label: "Venues" },
  ];

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-pink-400 hover:text-pink-300"
        >
          🎟 <span>Sistema Eventos</span>
        </Link>

        <div className="flex gap-6 items-center">

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

          {user?.rol === "Admin" && (
            <Link
              to="/eventos/crear"
              className={`hover:text-green-400 transition-colors ${
                location.pathname === "/eventos/crear"
                  ? "text-green-400 font-semibold"
                  : ""
              }`}
            >
              Crear Evento
            </Link>
          )}

          {user && (
            <Link
              to="/mis-compras"
              className={`hover:text-blue-400 transition-colors ${
                location.pathname === "/mis-compras"
                  ? "text-blue-400 font-semibold"
                  : ""
              }`}
            >
              Mis Compras
            </Link>
          )}

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

          {user ? (
            <>
              <span className="text-white">Hola, {user.email}</span>
              <button
                onClick={logout}
                className="hover:text-blue-400 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hover:text-blue-400 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
