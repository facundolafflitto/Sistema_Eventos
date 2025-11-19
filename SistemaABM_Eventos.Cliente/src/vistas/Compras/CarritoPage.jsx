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

    // 🚫 Frenar si no está logueado
    if (!user) {
      alert("Tenés que iniciar sesión para realizar una compra.");
      navigate("/login");
      return;
    }

    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const faltanLotes = carrito.some((item) => !item.loteId);
    if (faltanLotes) {
      alert("Seleccioná un lote para cada evento antes de comprar.");
      return;
    }

    // Validar stock antes de enviar
    for (const item of carrito) {
      const lista = lotes[item.evento.id] || [];
      const lote = lista.find((l) => l.id === Number(item.loteId));
      if (!lote) {
        alert("Hubo un problema al validar los lotes.");
        return;
      }

      const disponible = lote.cupo - lote.vendidas;

      if (item.cantidad > disponible) {
        alert(
          `No hay suficientes entradas disponibles para "${item.evento.nombre}".`
        );
        return;
      }
    }

    // Como ahora siempre hay user, usamos su email e id directamente
    const payload = {
      usuarioId: user.id,
      email: user.email,
      direccionEnvio: "",
      metodoPago: "Simulado",
      items: carrito.map((item) => ({
        eventoId: item.evento.id,
        loteId: Number(item.loteId),
        cantidad: item.cantidad,
      })),
    };

    try {
      const res = await fetch("http://localhost:5281/api/compras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Error en compra:", txt);
        alert("No se pudo procesar la compra.");
        return;
      }

      alert("Compra realizada con éxito.");
      vaciar();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error inesperado al procesar la compra.");
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
                onClick={() => {
                  const lista = lotes[item.evento.id] || [];
                  const lote = lista.find(
                    (l) => l.id === Number(item.loteId)
                  );

                  if (!lote) {
                    alert("Seleccioná un lote antes de aumentar la cantidad.");
                    return;
                  }

                  const disponible = lote.cupo - lote.vendidas;

                  if (item.cantidad + 1 > disponible) {
                    alert(
                      "Ya no hay más entradas disponibles para comprar esa cantidad."
                    );
                    return;
                  }

                  actualizar(item.evento.id, {
                    cantidad: item.cantidad + 1,
                  });
                }}
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
