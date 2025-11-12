import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Eventos" },
    { to: "/venues", label: "Venues" },
    { to: "/compras", label: "Comprar" },
    { to: "/validar", label: "Validar" },
  ];

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-pink-400 hover:text-pink-300 transition-colors"
        >
          🎟 <span>Sistema Eventos</span>
        </Link>

        <div className="hidden md:flex gap-6">
          {links.map((link) => (
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
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-gray-800 flex flex-col items-center gap-4 py-4 border-t border-gray-700">
          {links.map((link) => (
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
        </div>
      )}
    </nav>
  );
}
