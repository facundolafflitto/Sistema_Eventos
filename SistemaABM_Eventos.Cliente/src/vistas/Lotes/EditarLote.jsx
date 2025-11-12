import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditarLote() {
  const { id } = useParams();
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
    eventoId: "",
  });
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5281/api/lotes/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => console.error(err));

    fetch("http://localhost:5281/api/eventos")
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5281/api/lotes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) alert("Lote editado con éxito");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">✏️ Editar lote</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del lote"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <select
          name="eventoId"
          value={form.eventoId}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        >
          <option value="">Seleccionar evento</option>
          {eventos.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg w-full"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
