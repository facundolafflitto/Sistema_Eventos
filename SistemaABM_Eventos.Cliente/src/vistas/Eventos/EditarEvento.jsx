import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditarEvento.css";
import { useAuth } from "../../context/useAuth";

export default function EditarEvento() {
  const { id } = useParams();
  const { user } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fechaHora: "",
    venueId: "",
    categoria: "",
    imagenPortadaUrl: "",
  });

  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5281/api/eventos/${id}`)
      .then((r) => r.json())
      .then(setForm)
      .catch(console.error);

    fetch("http://localhost:5281/api/venues")
      .then((r) => r.json())
      .then(setVenues)
      .catch(console.error);
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5281/api/eventos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) alert("Evento editado con éxito");
      })
      .catch(console.error);
  };

  if (!user || user.rol !== "Admin") {
    return (
      <div className="ee-denied">
        <h1>⛔ Acceso denegado</h1>
        <p>No tenés permiso para editar eventos.</p>
      </div>
    );
  }

  // 🟢 5. RENDER NORMAL
  return (
    <div className="ee-page">
      <h1 className="ee-title">✏️ Editar evento</h1>

      <form onSubmit={handleSubmit} className="ee-card">
        <input
          className="ee-input"
          type="text"
          name="nombre"
          placeholder="Nombre del evento"
          value={form.nombre}
          onChange={handleChange}
        />

        <textarea
          className="ee-textarea"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <input
          className="ee-input"
          type="datetime-local"
          name="fechaHora"
          value={form.fechaHora}
          onChange={handleChange}
        />

        <select
          className="ee-select"
          name="venueId"
          value={form.venueId}
          onChange={handleChange}
        >
          <option value="">Seleccionar venue</option>
          {venues.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nombre} - {v.ciudad}
            </option>
          ))}
        </select>

        <input
          className="ee-input"
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
        />

        <input
          className="ee-input"
          type="text"
          name="imagenPortadaUrl"
          placeholder="URL de imagen de portada"
          value={form.imagenPortadaUrl}
          onChange={handleChange}
        />

        <button type="submit" className="ee-btn">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
