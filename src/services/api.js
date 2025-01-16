import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6787cca8c4a42c9161084dad.mockapi.io/api/v1/videos',
});

export default api;
