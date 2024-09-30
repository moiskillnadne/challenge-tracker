import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.withCredentials = true;
