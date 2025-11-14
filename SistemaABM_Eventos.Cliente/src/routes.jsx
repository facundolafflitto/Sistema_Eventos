import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Eventos
import ListaEventos from "./vistas/Eventos/ListaEventos";
import CrearEvento from "./vistas/Eventos/CrearEvento";
import EditarEvento from "./vistas/Eventos/EditarEvento";
import VerEvento from "./vistas/Eventos/VerEvento";

// Lotes
import ListaLotes from "./vistas/Lotes/ListaLotes";
import CrearLote from "./vistas/Lotes/CrearLote";
import EditarLote from "./vistas/Lotes/EditarLote";

// Venues
import ListaVenues from "./vistas/Venues/ListaVenues";
import CrearVenue from "./vistas/Venues/CrearVenue";

// Compras
import ComprarEntradas from "./vistas/Compras/ComprarEntradas";
import ValidarEntrada from "./vistas/Compras/ValidarEntrada";

// Auth
import Login from "./vistas/Auth/Login";

export default function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 md:p-8">
        <Routes>
          {/* Eventos */}
          <Route path="/" element={<ListaEventos />} />
          <Route path="/eventos/crear" element={<CrearEvento />} />
          <Route path="/eventos/editar/:id" element={<EditarEvento />} />
          <Route path="/eventos/:id" element={<VerEvento />} />

          {/* Lotes */}
          <Route path="/eventos/:eventoId/lotes" element={<ListaLotes />} />
          <Route path="/eventos/:eventoId/lotes/crear" element={<CrearLote />} />
          <Route path="/lotes/editar/:id" element={<EditarLote />} />

          {/* Venues */}
          <Route path="/venues" element={<ListaVenues />} />
          <Route path="/venues/crear" element={<CrearVenue />} />

          {/* Compras */}
          <Route path="/compras" element={<ComprarEntradas />} />
          <Route path="/validar" element={<ValidarEntrada />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}
