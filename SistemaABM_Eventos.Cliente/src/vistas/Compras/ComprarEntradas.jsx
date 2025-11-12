import React, { useState, useEffect } from "react";
import "./ComprarEntradas.css";

export default function ComprarEntradas() {
  const [eventos, setEventos] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [cargandoLotes, setCargandoLotes] = useState(false);

  const [compra, setCompra] = useState({
    usuarioId: null,
    email: "",
    direccionEnvio: "",
    metodoPago: "Simulado",
    items: [{ eventoId: "", loteId: "", cantidad: 1 }],
  });

  useEffect(() => {
    fetch("http://localhost:5281/api/eventos")
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((err) => console.error("Error al cargar eventos:", err));
  }, []);

  const handleEventoChange = async (e) => {
    const eventoId = e.target.value;
    setCompra((prev) => ({
      ...prev,
      items: [{ ...prev.items[0], eventoId, loteId: "" }],
    }));

    if (!eventoId) {
      setLotes([]);
      return;
    }

    setCargandoLotes(true);
    try {
      const res = await fetch(
        `http://localhost:5281/api/lotes?eventoId=${eventoId}`
      );
      const data = await res.json();
      setLotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar lotes:", err);
      setLotes([]);
    } finally {
      setCargandoLotes(false);
    }
  };

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
        setCompra({
          usuarioId: null,
          email: "",
          direccionEnvio: "",
          metodoPago: "Simulado",
          items: [{ eventoId: "", loteId: "", cantidad: 1 }],
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
    <div className="ce-page">
      <h1 className="ce-title">🎟️ Comprar Entradas</h1>

      <form onSubmit={handleSubmit} className="ce-form">
        <label className="ce-label">Email</label>
        <input
          type="email"
          name="email"
          placeholder="tuemail@ejemplo.com"
          value={compra.email}
          onChange={handleChange}
          className="ce-input"
          required
        />

        <label className="ce-label">Dirección</label>
        <input
          type="text"
          name="direccionEnvio"
          placeholder="Av. Siempre Viva 742"
          value={compra.direccionEnvio}
          onChange={handleChange}
          className="ce-input"
        />

        <label className="ce-label">Evento</label>
        <select
          name="eventoId"
          value={compra.items[0].eventoId}
          onChange={handleEventoChange}
          className="ce-select"
          required
        >
          <option value="">Selecciona un evento</option>
          {eventos.map((evento) => (
            <option key={evento.id} value={evento.id}>
              {evento.nombre}
            </option>
          ))}
        </select>

        <label className="ce-label">Lote</label>
        <select
          name="loteId"
          value={compra.items[0].loteId}
          onChange={handleChange}
          className="ce-select"
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

        <label className="ce-label">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          min="1"
          value={compra.items[0].cantidad}
          onChange={handleChange}
          className="ce-input ce-number"
          required
        />

        <button type="submit" className="ce-btn">
          Comprar
        </button>
      </form>
    </div>
  );
}
