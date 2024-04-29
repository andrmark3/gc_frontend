import axios from 'axios';
import Cookies from 'js-cookie';
import EventEmitter from 'eventemitter3'; // Import EventEmitter

const eventEmitter = new EventEmitter(); // Create an instance of EventEmitter

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Adjust the base URL as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Check if the response body contains the expected error message
      if (error.response.data && error.response.data.error === 'Token has expired') {
        Cookies.remove('token');
        eventEmitter.emit('logout'); // Emit 'logout' event
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, eventEmitter }; // Export axiosInstance and eventEmitter
