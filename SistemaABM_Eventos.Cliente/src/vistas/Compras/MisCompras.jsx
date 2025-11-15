import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import "./MisCompras.css";

export default function MisCompras() {
  const { user } = useAuth();
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5281/api/compras/usuario/${user.id}`)
      .then((res) => res.json())
      .then((data) => setCompras(data));
  }, [user]);

  if (!user) return <p className="mc-login-msg">Debés iniciar sesión para ver tus compras.</p>;

  return (
    <div className="mc-page">
      <h1 className="mc-title">📦 Mis Compras</h1>

      {compras.length === 0 && <p className="mc-empty">No tenés compras aún.</p>}

      {compras.map((c) => (
        <div key={c.id} className="mc-card">
          <h2 className="mc-card-title">Compra #{c.id}</h2>
          <p><strong>Fecha:</strong> {c.creada}</p>
          <p><strong>Total:</strong> ${c.total}</p>

          <h3 className="mc-subtitle">Entradas:</h3>
          <ul className="mc-list">
            {c.entradas.map((e) => (
              <li key={e.id} className="mc-item">
                🎫 {e.eventoNombre} — {e.loteNombre} — ${e.precio}
                <br />
                <span className="mc-code">Código: {e.codigo}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
