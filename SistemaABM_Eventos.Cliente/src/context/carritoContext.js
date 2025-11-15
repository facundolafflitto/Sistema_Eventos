import { createContext, useContext, useState, useEffect, createElement } from "react";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("carrito");
    if (saved) setCarrito(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregar = (evento) => {
    setCarrito((prev) => {
      const existe = prev.find((i) => i.evento.id === evento.id);
      if (existe) return prev;
      return [...prev, { evento, loteId: "", cantidad: 1 }];
    });
  };

  const actualizar = (eventoId, cambios) => {
    setCarrito((prev) =>
      prev.map((i) =>
        i.evento.id === eventoId ? { ...i, ...cambios } : i
      )
    );
  };

  const eliminar = (eventoId) => {
    setCarrito((prev) =>
      prev.filter((i) => i.evento.id !== eventoId)
    );
  };

  const vaciar = () => setCarrito([]);

  return createElement(
    CarritoContext.Provider,
    { value: { carrito, agregar, actualizar, eliminar, vaciar } },
    children
  );
}

export default CarritoContext;
