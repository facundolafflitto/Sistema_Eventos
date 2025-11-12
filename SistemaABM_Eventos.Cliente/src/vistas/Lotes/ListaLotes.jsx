import React, { useEffect, useState } from "react";
import "./ListaLotes.css"; 

export default function ListaLotes() {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5281/api/lotes")
      .then((res) => res.json())
      .then(setLotes)
      .catch((err) => console.error("Error al cargar lotes:", err));
  }, []);

  return (
    <div className="ll-page">
      <h1 className="ll-title">📦 Lista de Lotes</h1>

      <table className="ll-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cupo</th>
            <th>Evento</th>
          </tr>
        </thead>

        <tbody>
          {lotes.length > 0 ? (
            lotes.map((lote) => (
              <tr key={lote.id}>
                <td>{lote.nombre}</td>
                <td>${lote.precio}</td>
                <td>{lote.cupo}</td>
                <td>{lote.evento?.nombre || "Sin evento"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                No hay lotes disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
