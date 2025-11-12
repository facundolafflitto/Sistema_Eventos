import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListaEventos.css";

export default function ListaEventos() {
  const [eventos, setEventos] = useState([]);

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
                    📅{" "}
                    {evento.fechaHora
                      ? new Date(evento.fechaHora).toLocaleString("es-AR", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })
                      : "Fecha no disponible"}
                  </p>
                  <Link to={`/eventos/${evento.id}`} className="le-link">
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
