import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Адреса вашого сервера
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;