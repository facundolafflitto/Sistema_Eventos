import React, { useEffect, useState } from "react";

export default function ListaVenues() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5281/api/venues")
      .then((res) => res.json())
      .then((data) => setVenues(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">🏟️ Lugares</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Dirección</th>
              <th className="p-3">Ciudad</th>
              <th className="p-3">Capacidad Total</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((v) => (
              <tr
                key={v.id}
                className="border-b border-gray-700 hover:bg-gray-800"
              >
                <td className="p-3">{v.id}</td>
                <td className="p-3">{v.nombre}</td>
                <td className="p-3">{v.direccion}</td>
                <td className="p-3">{v.ciudad}</td>
                <td className="p-3">{v.capacidadTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
