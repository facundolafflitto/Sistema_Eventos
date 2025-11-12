import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ListaEventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5281/api/eventos")
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((err) => console.error("Error al cargar eventos:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 flex items-center gap-3 text-blue-400">
          🎭 Eventos
        </h1>

        {eventos.length === 0 ? (
          <p className="text-gray-400 text-lg">No hay eventos disponibles.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-[1.03] hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <img
                  src={evento.imagenPortadaUrl || "https://via.placeholder.com/400x250"}
                  alt={evento.nombre}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-2xl font-semibold mb-2 text-blue-300">
                    {evento.nombre}
                  </h2>
                  <p className="text-gray-300 mb-3 line-clamp-3">
                    {evento.descripcion}
                  </p>
                  <p className="text-sm flex items-center gap-2 text-gray-400 mb-4">
                    📅{" "}
                    {evento.fechaHora
                      ? new Date(evento.fechaHora).toLocaleString("es-AR", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })
                      : "Fecha no disponible"}
                  </p>
                  <Link
                    to={`/eventos/${evento.id}`}
                    className="mt-auto block w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors text-center font-medium"
                  >
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
