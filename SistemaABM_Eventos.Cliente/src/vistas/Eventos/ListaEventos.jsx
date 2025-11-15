import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListaEventos.css";
import ModalEvento from "./ModalEvento";
import { useAuth } from "../../context/useAuth";
import { useCarrito } from "../../context/carritoContext";

export default function ListaEventos() {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const navigate = useNavigate();

  const { user } = useAuth();
  const { agregar } = useCarrito();   // ✔️ CARRITO REAL

  useEffect(() => {
    fetch("http://localhost:5281/api/eventos")
      .then((res) => res.json())
      .then(setEventos)
      .catch((err) => console.error("Error al cargar eventos:", err));
  }, []);

  return (
    <div className="le-page">
      <div className="le-container">

        <h1 className="le-title">🎭 Eventos</h1>

        {eventos.length === 0 ? (
          <p className="le-empty">No hay eventos disponibles.</p>
        ) : (
          <div className="le-grid">

            {eventos.map((evento) => (
              <div key={evento.id} className="le-card">

                <img
                  src={evento.imagenPortadaUrl || "https://via.placeholder.com/400x250"}
                  alt={evento.nombre}
                  className="le-img"
                />

                <div className="le-body">
                  <h2 className="le-name">{evento.nombre}</h2>
                  <p className="le-desc">{evento.descripcion}</p>

                  <p className="le-date">
                    📅 {new Date(evento.fechaHora).toLocaleString("es-AR")}
                  </p>

                  <button
                    className="le-link"
                    onClick={() => setEventoSeleccionado(evento)}
                  >
                    Ver detalles
                  </button>

                  {/* 🛒 USAMOS CARRITO REAL */}
                  <button
                    className="le-link-green"
                    onClick={() => agregar(evento)}
                  >
                    Agregar al carrito
                  </button>

                  {/* ✏️ SOLO ADMIN */}
                  {user?.rol === "Admin" && (
                    <button
                      className="le-link-edit"
                      onClick={() => navigate(`/eventos/editar/${evento.id}`)}
                    >
                      Editar evento
                    </button>
                  )}

                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {eventoSeleccionado && (
        <ModalEvento
          evento={eventoSeleccionado}
          onClose={() => setEventoSeleccionado(null)}
        />
      )}
    </div>
  );
}
