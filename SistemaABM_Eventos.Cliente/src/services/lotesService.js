import axios from "axios";

const API_URL = "http://localhost:5281/api/lotes";

export const listarLotesPorEvento = (eventoId) =>
  axios.get(API_URL, { params: { eventoId } }).then(res => res.data);

export const crearLote = (lote) =>
  axios.post(API_URL, lote).then(res => res.data);

export const editarLote = (id, lote) =>
  axios.put(`${API_URL}/${id}`, lote).then(res => res.data);

export const eliminarLote = (id) =>
  axios.delete(`${API_URL}/${id}`).then(res => res.data);
