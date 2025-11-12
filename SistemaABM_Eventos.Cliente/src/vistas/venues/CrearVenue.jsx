import React, { useState } from "react";

export default function CrearVenue() {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    capacidadTotal: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5281/api/venues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) alert("Lugar creado con éxito");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">➕ Crear lugar</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={form.ciudad}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="number"
          name="capacidadTotal"
          placeholder="Capacidad total"
          value={form.capacidadTotal}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg w-full"
        >
          Crear lugar
        </button>
      </form>
    </div>
  );
}
