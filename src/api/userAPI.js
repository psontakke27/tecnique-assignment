
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

const validateUser = (user) => {
  if (!user.name?.trim()) throw new Error('Name is required');
  if (!user.username || user.username.length < 3) throw new Error('Username must be at least 3 characters');
  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) throw new Error('Invalid email format');
};

export const userAPI = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  createUser: async (user) => {
    try {
      validateUser(user);
      const response = await api.post('/users', user);
      toast.success('User added successfully!');
      return response.data;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  },

  updateUser: async (id, user) => {
    try {
      validateUser(user);
      const response = await api.put(`/users/${id}`, user);
      toast.success('User updated successfully!');
      return response.data;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success('User deleted successfully!');
      return true;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  }
};

