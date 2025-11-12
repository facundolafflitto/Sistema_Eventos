import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VerEvento() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5281/api/eventos/${id}`)
      .then((res) => res.json())
      .then((data) => setEvento(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!evento) return <p className="text-white p-6">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <Link to="/" className="text-blue-400 hover:underline mb-4 block">
        ← Volver a la lista
      </Link>
      <h1 className="text-3xl font-bold mb-4">{evento.nombre}</h1>
      <p className="mb-3">{evento.descripcion}</p>
      <p className="mb-3">
        📅 {new Date(evento.fechaHora).toLocaleString("es-AR")}
      </p>
<img
  src={evento.imagenPortadaUrl || "https://via.placeholder.com/800"}
  alt={evento.nombre}
  className="mt-4 rounded-lg shadow-lg w-full max-w-3xl object-cover"
/>
    </div>
  );
}
