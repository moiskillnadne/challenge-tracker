import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

api.defaults.headers.common['Content-Type'] = 'application/json';
api.defaults.headers.common[import.meta.env.VITE_SECURITY_HEADER_KEY] =
  import.meta.env.VITE_SECURITY_HEADER_VALUE;
api.defaults.withCredentials = true;
