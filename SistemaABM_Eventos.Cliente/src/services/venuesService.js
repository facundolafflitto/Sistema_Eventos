import axios from "axios";

const API_URL = "http://localhost:5281/api/venues";

export const listarVenues = () =>
  axios.get(API_URL).then(res => res.data);

export const crearVenue = (venue) =>
  axios.post(API_URL, venue).then(res => res.data);

export const editarVenue = (id, venue) =>
  axios.put(`${API_URL}/${id}`, venue).then(res => res.data);

export const eliminarVenue = (id) =>
  axios.delete(`${API_URL}/${id}`).then(res => res.data);
