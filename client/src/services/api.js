import axios from 'axios';
const API = 'http://localhost:5000/api';

const getHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

// Auth
export const registerUser = (data) =>
  axios.post(`${API}/auth/register`, data)
    .then(r => r.data)
    .catch(e => e.response?.data || { error: 'Error' });

export const loginUser = (data) =>
  axios.post(`${API}/auth/login`, data)
    .then(r => r.data)
    .catch(e => e.response?.data || { error: 'Error' });

// Notes
export const getNotes = () =>
  axios.get(`${API}/notes`, { headers: getHeaders() })
    .then(r => r.data)
    .catch(e => e.response?.data || []);

export const createNote = (data) =>
  axios.post(`${API}/notes`, data, { headers: getHeaders() })
    .then(r => r.data)
    .catch(e => e.response?.data);

export const updateNote = (id, data) =>
  axios.put(`${API}/notes/${id}`, data, { headers: getHeaders() })
    .then(r => r.data)
    .catch(e => e.response?.data);

export const deleteNote = (id) =>
  axios.delete(`${API}/notes/${id}`, { headers: getHeaders() })
    .then(r => r.data)
    .catch(e => e.response?.data);

// Profile
export const getUserProfile = () =>
  axios.get(`${API}/users/me`, { headers: getHeaders() })
    .then(r => r.data)
    .catch(e => e.response?.data || { error: 'Error al obtener perfil' });

export const updateUserProfile = (data) =>
  axios.put(`${API}/users/me`, data, { headers: { ...getHeaders(), 'Content-Type': 'application/json' } })
    .then(r => r.data)
    .catch(e => e.response?.data || { error: 'Error al actualizar perfil' });

    