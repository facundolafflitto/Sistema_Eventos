import React, { useState } from "react";
import "./ValidarEntrada.css";

export default function ValidarEntrada() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5281/api/compras/validar/${codigo}`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Código inválido");
        return res.json();
      })
      .then(() => {
        setResultado({ success: true, mensaje: "Entrada validada con éxito" });
      })
      .catch(() => {
        setResultado({ success: false, mensaje: "Entrada inválida o ya usada" });
      });
  };

  return (
    <div className="ve-page">
      <h1 className="ve-title">✅ Validar Entrada</h1>

      <form onSubmit={handleSubmit} className="ve-form">
        <input
          type="text"
          placeholder="Código de entrada"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="ve-input"
        />
        <button type="submit" className="ve-btn">
          Validar
        </button>
      </form>

      {resultado && (
        <p className={`ve-result ${resultado.success ? "ok" : "err"}`}>
          {resultado.mensaje}
        </p>
      )}
    </div>
  );
}
