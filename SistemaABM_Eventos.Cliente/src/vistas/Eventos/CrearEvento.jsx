import React, { useState, useEffect } from "react";

export default function CrearEvento() {
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
    fetch("http://localhost:5281/api/venues")
      .then((res) => res.json())
      .then((data) => setVenues(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5281/api/eventos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) alert("Evento creado con éxito");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">➕ Crear nuevo evento</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del evento"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="datetime-local"
          name="fechaHora"
          value={form.fechaHora}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <select
          name="venueId"
          value={form.venueId}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        >
          <option value="">Seleccionar venue</option>
          {venues.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nombre} - {v.ciudad}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="imagenPortadaUrl"
          placeholder="URL de imagen de portada"
          value={form.imagenPortadaUrl}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg w-full"
        >
          Crear evento
        </button>
      </form>
    </div>
  );
}
