import axios from 'axios';

const adminAxios = axios.create({
  baseURL: 'https://server-kg.onrender.com/api',
  withCredentials: true,
});

export default adminAxios;
