import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://foreverclothesapi.vercel.app',
});

// const instance = axios.create({
//   baseURL: 'https://tr46rk4w-8000.asse.devtunnels.ms',
// });

// Interceptor buat otomatis tambahin Authorization token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default instance;
