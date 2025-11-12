import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./VerEvento.css";

export default function VerEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

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
      <p className="vv-text">{evento.descripcion}</p>
      <p className="vv-text">📅 {new Date(evento.fechaHora).toLocaleString("es-AR")}</p>
      <img
        src={evento.imagenPortadaUrl || "https://via.placeholder.com/800"}
        alt={evento.nombre}
        className="vv-img"
      />
    </div>
  );
}
