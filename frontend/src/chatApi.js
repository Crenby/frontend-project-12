import axios from 'axios';
import store from './slices/index.js';

const apiPath = '/api/v1';

const apiClient = axios.create({
  baseURL: apiPath,
});

apiClient.interceptors.request.use((config) => {
  const token = store.getState().authorization.userToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  getChannels: () => apiClient.get('/channels'),
  addChannel: (newChannel) => apiClient.post('/channels', newChannel),
  editChannel: (editedChannel, id) => apiClient.patch(`/channels/${id}`, editedChannel),
  removeChannel: (id) => apiClient.delete(`/channels/${id}`),
  getMessages: () => apiClient.get('/messages'),
  addMessage: (newMessage) => apiClient.post('/messages', newMessage),
  signup: (username, password) => apiClient.post('/signup', { username, password }),
  login: (username, password) => apiClient.post('/login', { username, password }),
};
