import React, { useState, useEffect } from "react";

export default function ComprarEntradas() {
  const [eventos, setEventos] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [cargandoLotes, setCargandoLotes] = useState(false);

  const [compra, setCompra] = useState({
    usuarioId: null,
    email: "",
    direccionEnvio: "",
    metodoPago: "Simulado",
    items: [
      {
        eventoId: "",
        loteId: "",
        cantidad: 1,
      },
    ],
  });

  // Traer todos los eventos
  useEffect(() => {
    fetch("http://localhost:5281/api/eventos")
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((err) => console.error("Error al cargar eventos:", err));
  }, []);

  // Cuando selecciono un evento, traigo los lotes de ese evento
  const handleEventoChange = async (e) => {
    const eventoId = e.target.value;

    // Actualizo el estado de compra de forma segura
    setCompra((prev) => ({
      ...prev,
      items: [{ ...prev.items[0], eventoId, loteId: "" }],
    }));

    if (!eventoId) {
      setLotes([]);
      return;
    }

    // Traer lotes del evento seleccionado
    setCargandoLotes(true);
    try {
      const res = await fetch(`http://localhost:5281/api/lotes?eventoId=${eventoId}`);
      const data = await res.json();
      setLotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar lotes:", err);
      setLotes([]);
    } finally {
      setCargandoLotes(false);
    }
  };

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["loteId", "cantidad"].includes(name)) {
      setCompra((prev) => ({
        ...prev,
        items: [{ ...prev.items[0], [name]: value }],
      }));
    } else {
      setCompra((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Enviar la compra
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!compra.items[0].loteId) {
      alert("⚠️ Debes seleccionar un lote disponible antes de comprar.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5281/api/compras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compra),
      });

      if (res.ok) {
        alert("✅ Compra realizada con éxito");
        // Limpiar el formulario
        setCompra({
          usuarioId: null,
          email: "",
          direccionEnvio: "",
          metodoPago: "Simulado",
          items: [
            {
              eventoId: "",
              loteId: "",
              cantidad: 1,
            },
          ],
        });
        setLotes([]);
      } else {
        const error = await res.text();
        console.error("Error en la compra:", error);
        alert("❌ Error en la compra (ver consola)");
      }
    } catch (err) {
      console.error("Error al enviar compra:", err);
      alert("❌ No se pudo completar la compra");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🎟️ Comprar Entradas</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto"
      >
        {/* Email */}
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          placeholder="tuemail@ejemplo.com"
          value={compra.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          required
        />

        {/* Dirección */}
        <label className="block mb-2 font-semibold">Dirección</label>
        <input
          type="text"
          name="direccionEnvio"
          placeholder="Av. Siempre Viva 742"
          value={compra.direccionEnvio}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />

        {/* Evento */}
        <label className="block mb-2 font-semibold">Evento</label>
        <select
          name="eventoId"
          value={compra.items[0].eventoId}
          onChange={handleEventoChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          required
        >
          <option value="">Selecciona un evento</option>
          {eventos.map((evento) => (
            <option key={evento.id} value={evento.id}>
              {evento.nombre}
            </option>
          ))}
        </select>

        {/* Lote */}
        <label className="block mb-2 font-semibold">Lote</label>
        <select
          name="loteId"
          value={compra.items[0].loteId}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          required
          disabled={
            !compra.items[0].eventoId || cargandoLotes || lotes.length === 0
          }
        >
          <option value="">
            {cargandoLotes
              ? "Cargando lotes..."
              : !compra.items[0].eventoId
              ? "Selecciona un evento primero"
              : lotes.length === 0
              ? "Este evento no tiene lotes disponibles"
              : "Selecciona un lote"}
          </option>
          {lotes.map((lote) => (
            <option key={lote.id} value={lote.id}>
              {lote.nombre} - ${lote.precio} (Disp: {lote.cupo - lote.vendidas})
            </option>
          ))}
        </select>

        {/* Cantidad */}
        <label className="block mb-2 font-semibold">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          min="1"
          value={compra.items[0].cantidad}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
          required
        />

        {/* Botón */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg w-full transition-colors font-semibold"
        >
          Comprar
        </button>
      </form>
    </div>
  );
}
