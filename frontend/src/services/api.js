import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from '../config/apiConfig';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error reading token from storage:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
