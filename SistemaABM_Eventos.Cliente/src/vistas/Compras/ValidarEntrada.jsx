import React, { useState } from "react";

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
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">✅ Validar Entrada</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Código de entrada"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg w-full"
        >
          Validar
        </button>
      </form>
      {resultado && (
        <p
          className={`mt-4 font-semibold ${
            resultado.success ? "text-green-400" : "text-red-400"
          }`}
        >
          {resultado.mensaje}
        </p>
      )}
    </div>
  );
}
