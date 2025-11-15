import { useCarrito } from "../../context/carritoContext";
import { useEffect, useState } from "react";
import "./CarritoPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function CarritoPage() {
  const { carrito, actualizar, eliminar, vaciar } = useCarrito();
  const [lotes, setLotes] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();

  // Cargar lotes de cada evento
  useEffect(() => {
    carrito.forEach(async (item) => {
      const res = await fetch(
        `http://localhost:5281/api/lotes?eventoId=${item.evento.id}`
      );
      const data = await res.json();

      setLotes((prev) => ({
        ...prev,
        [item.evento.id]: data,
      }));
    });
  }, [carrito]);

  const total = carrito.reduce((acc, item) => {
    const lista = lotes[item.evento.id] || [];
    const lote = lista.find((l) => l.id === Number(item.loteId));
    if (!lote) return acc;
    return acc + lote.precio * item.cantidad;
  }, 0);


  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const faltanLotes = carrito.some((item) => !item.loteId);
    if (faltanLotes) {
      alert("Seleccioná un lote para cada evento antes de comprar.");
      return;
    }

    // EMAIL para el backend
    const emailCompra =
      (user && user.email)        // Si está logueado → usa su email
        ? user.email
        : "invitado@eventos.com"; // Invitado (evita error 400)

    const payload = {
      usuarioId: user?.id || null, // Si tu modelo tiene id de usuario
      email: emailCompra,
      direccionEnvio: "",
      metodoPago: "Simulado",
      items: carrito.map((item) => ({
        eventoId: item.evento.id,
        loteId: Number(item.loteId),
        cantidad: item.cantidad,
      })),
    };

    console.log("Enviando compra:", payload);

    try {
      const res = await fetch("http://localhost:5281/api/compras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Error en compra:", txt);
        alert("❌ No se pudo procesar la compra.");
        return;
      }

      alert("✅ Compra realizada con éxito.");
      vaciar();              // Limpia carrito
      navigate("/");         // Volver a eventos
    } catch (err) {
      console.error(err);
      alert("❌ Error inesperado al procesar la compra.");
    }
  };

  if (carrito.length === 0)
    return <h2 className="carrito-empty">🛒 El carrito está vacío</h2>;

  return (
    <div className="carrito-page">
      <h1 className="carrito-title">🛒 Tu Carrito</h1>

      {carrito.map((item) => (
        <div key={item.evento.id} className="carrito-item">
          <img
            src={item.evento.imagenPortadaUrl}
            className="carrito-img"
            alt={item.evento.nombre}
          />

          <div className="carrito-info">
            <h2>{item.evento.nombre}</h2>

            {/* Lote */}
            <label>Lote</label>
            <select
              className="carrito-select"
              value={item.loteId}
              onChange={(e) =>
                actualizar(item.evento.id, { loteId: e.target.value })
              }
            >
              <option value="">Seleccionar lote</option>
              {(lotes[item.evento.id] || []).map((lote) => (
                <option value={lote.id} key={lote.id}>
                  {lote.nombre} - ${lote.precio}
                </option>
              ))}
            </select>

            {}
            <label>Cantidad</label>
            <div className="carrito-cantidad">
              <button
                onClick={() =>
                  actualizar(item.evento.id, {
                    cantidad: Math.max(1, item.cantidad - 1),
                  })
                }
              >
                -
              </button>

              <span>{item.cantidad}</span>

              <button
                onClick={() =>
                  actualizar(item.evento.id, {
                    cantidad: item.cantidad + 1,
                  })
                }
              >
                +
              </button>
            </div>

            <button
              className="carrito-remove"
              onClick={() => eliminar(item.evento.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <div className="carrito-total">
        <h2>Total: ${total}</h2>

        <button className="carrito-pagar" onClick={finalizarCompra}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
