import axios from "axios";

const API_URL = "http://localhost:5281/api/compras";

export const realizarCompra = (compra) =>
  axios.post(API_URL, compra).then(res => res.data);

export const validarEntrada = (codigo) =>
  axios.put(`${API_URL}/validar/${codigo}`).then(res => res.data);
