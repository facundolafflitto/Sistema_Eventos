import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditarLote.css"; 

export default function EditarLote() {
  const { id } = useParams();

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    cupo: "",
    eventoId: "",
  });

  const [eventos, setEventos] = useState([]);

  // Cargar datos del lote y lista de eventos
  useEffect(() => {
    fetch(`http://localhost:5281/api/lotes/${id}`)
      .then((res) => res.json())
      .then(setForm)
      .catch((err) => console.error("Error al cargar lote:", err));

    fetch("http://localhost:5281/api/eventos")
      .then((res) => res.json())
      .then(setEventos)
      .catch((err) => console.error("Error al cargar eventos:", err));
  }, [id]);

  // Manejo de cambios
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5281/api/lotes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          alert("✅ Lote editado con éxito");
        } else {
          alert("❌ Error al editar el lote");
        }
      })
      .catch((err) => console.error("Error al guardar:", err));
  };

  return (
    <div className="el-page">
      <h1 className="el-title">✏️ Editar lote</h1>

      <form className="el-card" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del lote"
          value={form.nombre}
          onChange={handleChange}
          className="el-input"
          required
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="el-input"
          required
        />

        <input
          type="number"
          name="cupo"
          placeholder="Cupo"
          value={form.cupo}
          onChange={handleChange}
          className="el-input"
          required
        />

        <select
          name="eventoId"
          value={form.eventoId}
          onChange={handleChange}
          className="el-select"
          required
        >
          <option value="">Seleccionar evento</option>
          {eventos.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>

        <button type="submit" className="el-btn">
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
