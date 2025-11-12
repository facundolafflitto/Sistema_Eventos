import axios from "axios";

const API_URL = "http://localhost:5281/api/eventos";

export const listarEventos = (params = {}) =>
  axios.get(API_URL, { params }).then(res => res.data);

export const obtenerEvento = (id) =>
  axios.get(`${API_URL}/${id}`).then(res => res.data);

export const crearEvento = (evento) =>
  axios.post(API_URL, evento).then(res => res.data);

export const editarEvento = (id, evento) =>
  axios.put(`${API_URL}/${id}`, evento).then(res => res.data);

export const eliminarEvento = (id) =>
  axios.delete(`${API_URL}/${id}`).then(res => res.data);
