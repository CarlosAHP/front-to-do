// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/proyectos'  // Actualiza esta URL al desplegar
});

export default api;