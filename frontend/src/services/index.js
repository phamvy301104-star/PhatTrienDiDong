import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.success && response.data.data.token) {
      await AsyncStorage.setItem('userToken', response.data.data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success && response.data.data.token) {
      await AsyncStorage.setItem('userToken', response.data.data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data.data));
    }
    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const barberService = {
  getBarbers: async () => {
    const response = await api.get('/barbers');
    return response.data;
  },

  getBarber: async (id) => {
    const response = await api.get(`/barbers/${id}`);
    return response.data;
  },
};

export const serviceService = {
  getServices: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  getService: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },
};

export const appointmentService = {
  getAppointments: async () => {
    const response = await api.get('/appointments');
    return response.data;
  },

  getAppointment: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  createAppointment: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  updateAppointment: async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },

  deleteAppointment: async (id) => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  },
};
