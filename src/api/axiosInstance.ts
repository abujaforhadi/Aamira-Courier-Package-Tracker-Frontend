import axios from 'axios';

const API_BASE_URL = 'https://aamira-courier-server.vercel.app/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
