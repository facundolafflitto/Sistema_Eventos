import React, { useEffect, useState } from "react";

export default function ListaLotes() {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5281/api/lotes")
      .then((res) => res.json())
      .then((data) => setLotes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">📦 Lotes</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">Evento</th>
            </tr>
          </thead>
          <tbody>
            {lotes.map((lote) => (
              <tr key={lote.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-3">{lote.id}</td>
                <td className="p-3">{lote.nombre}</td>
                <td className="p-3">${lote.precio}</td>
                <td className="p-3">{lote.cantidad}</td>
                <td className="p-3">{lote.evento?.nombre || "Sin evento"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
