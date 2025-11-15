// ModalEvento.jsx
export default function ModalEvento({ evento, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          width: "340px",
          color: "white",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.4)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ color: "#93c5fd" }}>{evento.nombre}</h2>

        <img
          src={evento.imagenPortadaUrl}
          alt={evento.nombre}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginTop: "10px"
          }}
        />

        <p style={{ marginTop: "10px" }}>
          {evento.descripcion}
        </p>

        <button
          onClick={onClose}
          style={{
            marginTop: "1rem",
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "none",
            background: "#60a5fa",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
