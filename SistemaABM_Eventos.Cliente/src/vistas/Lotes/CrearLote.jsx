import React, { useState, useEffect } from "react";
import "./CrearLote.css"; 

export default function CrearLote() {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    cupo: "",
    eventoId: "",
  });

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5281/api/eventos")
      .then((res) => res.json())
      .then(setEventos)
      .catch((err) => console.error("Error al cargar eventos:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5281/api/lotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          alert("✅ Lote creado con éxito");
          setForm({ nombre: "", precio: "", cupo: "", eventoId: "" });
        } else {
          alert("❌ Error al crear el lote");
        }
      })
      .catch((err) => console.error("Error al crear lote:", err));
  };

  return (
    <div className="cl-page">
      <h1 className="cl-title">➕ Crear nuevo lote</h1>

      <form className="cl-card" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del lote"
          value={form.nombre}
          onChange={handleChange}
          className="cl-input"
          required
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="cl-input"
          required
        />

        <input
          type="number"
          name="cupo"
          placeholder="Cupo"
          value={form.cupo}
          onChange={handleChange}
          className="cl-input"
          required
        />

        <select
          name="eventoId"
          value={form.eventoId}
          onChange={handleChange}
          className="cl-select"
          required
        >
          <option value="">Seleccionar evento</option>
          {eventos.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>

        <button type="submit" className="cl-btn">
          Crear lote
        </button>
      </form>
    </div>
  );
}
