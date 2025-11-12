import React, { useState, useEffect } from "react";
import "./CrearEvento.css";

export default function CrearEvento() {
  const [form, setForm] = useState({
    nombre: "", descripcion: "", fechaHora: "",
    venueId: "", categoria: "", imagenPortadaUrl: "",
  });
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5281/api/venues")
      .then((res) => res.json()).then(setVenues).catch(console.error);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5281/api/eventos", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then((res) => { if (res.ok) alert("Evento creado con éxito"); })
      .catch(console.error);
  };

  return (
    <div className="ce2-page">
      <h1 className="ce2-title">➕ Crear nuevo evento</h1>
      <form onSubmit={handleSubmit} className="ce2-card">
        <input className="ce2-input" type="text" name="nombre" placeholder="Nombre del evento" value={form.nombre} onChange={handleChange}/>
        <textarea className="ce2-textarea" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange}/>
        <input className="ce2-input" type="datetime-local" name="fechaHora" value={form.fechaHora} onChange={handleChange}/>
        <select className="ce2-select" name="venueId" value={form.venueId} onChange={handleChange}>
          <option value="">Seleccionar venue</option>
          {venues.map((v) => <option key={v.id} value={v.id}>{v.nombre} - {v.ciudad}</option>)}
        </select>
        <input className="ce2-input" type="text" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange}/>
        <input className="ce2-input" type="text" name="imagenPortadaUrl" placeholder="URL de imagen de portada" value={form.imagenPortadaUrl} onChange={handleChange}/>
        <button type="submit" className="ce2-btn">Crear evento</button>
      </form>
    </div>
  );
}
