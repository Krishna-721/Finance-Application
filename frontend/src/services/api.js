import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth endpoints
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => {
    const token = localStorage.getItem('token');
    return api.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

// Transaction endpoints - add token manually
export const transactionAPI = {
  getAll: (params) => {
    const token = localStorage.getItem('token');
    return api.get('/transactions/', { 
      params,
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  create: (data) => {
    const token = localStorage.getItem('token');
    return api.post('/transactions/', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  update: (id, data) => {
    const token = localStorage.getItem('token');
    return api.put(`/transactions/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  delete: (id) => {
    const token = localStorage.getItem('token');
    return api.delete(`/transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  getSummary: () => {
    const token = localStorage.getItem('token');
    return api.get('/transactions/summary', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

// Chat endpoints
export const chatAPI = {
  sendMessage: (message) => {
    const token = localStorage.getItem('token');
    return api.post('/chat/', { message }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
  getHistory: () => {
    const token = localStorage.getItem('token');
    return api.get('/chat/history', {
      headers: { Authorization: `Bearer ${token}` }
    });
  },
};

export default api;