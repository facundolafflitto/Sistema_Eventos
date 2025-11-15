import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./VerEvento.css";
import { useAuth } from "../../context/useAuth";

export default function VerEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [evento, setEvento] = useState(null);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5281/api/eventos/${id}`)
      .then((res) => res.json())
      .then(setEvento)
      .catch(console.error);
  }, [id]);

  if (!evento) return <p className="vv-loading">Cargando...</p>;

  return (
    <div className="vv-page">
      <Link to="/" className="vv-back">← Volver a la lista</Link>

      <h1 className="vv-title">{evento.nombre}</h1>

      {/* ✏️ SOLO ADMIN */}
      {user?.role === "Admin" && (
        <button
          className="vv-boton"
          style={{ background: "#f59e0b", marginBottom: "10px" }}
          onClick={() => navigate(`/eventos/editar/${id}`)}
        >
          Editar evento
        </button>
      )}

      <p className="vv-text">
        📅 {new Date(evento.fechaHora).toLocaleString("es-AR")}
      </p>

      <img
        src={evento.imagenPortadaUrl || "https://via.placeholder.com/800"}
        alt={evento.nombre}
        className="vv-img"
      />

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={() => setMostrarDescripcion(true)} className="vv-boton">
          Ver descripción
        </button>

        <button
          className="vv-boton"
          style={{ background: "green" }}
          onClick={() => {
            localStorage.setItem("carrito_evento", JSON.stringify(evento));
            navigate("/carrito");
          }}
        >
          Comprar / Agregar al carrito
        </button>
      </div>

      {/* Popup descripción */}
      {mostrarDescripcion && (
        <div
          className="vv-popup-overlay"
          onClick={() => setMostrarDescripcion(false)}
        >
          <div
            className="vv-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{evento.nombre}</h3>
            <p style={{ marginTop: "10px" }}>{evento.descripcion}</p>

            <button
              className="vv-boton"
              onClick={() => setMostrarDescripcion(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
