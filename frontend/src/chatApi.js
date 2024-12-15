import axios from 'axios';
import { io } from 'socket.io-client';

const apiPath = '/api/v1';
const socket = io();

export default {
  getChannels: (token) => axios.get(`${apiPath}/channels`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  addChannel: (newChannel, token) => axios.post(`${apiPath}/channels`, newChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  editChannel: (editedChannel, token, id) => axios.patch(`${apiPath}/channels/${id}`, editedChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  removeChannel: (token, id) => axios.delete(`${apiPath}/channels/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  getMessages: (token) => axios.get(`${apiPath}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  addMessage: (newMessage, token) => axios.post(`${apiPath}/messages`, newMessage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  signup: (name, pass) => axios.post(`${apiPath}/signup`, { username: name, password: pass }),
  login: (name, pass) => axios.post(`${apiPath}/login`, { username: name, password: pass }),
  socketNewMessage: (callback) => socket.on('newMessage', () => callback()),
  socketNewChannel: (callback) => socket.on('newChannel', () => callback()),
  socketRemoveChannel: (callback) => socket.on('removeChannel', () => callback()),
  socketRenameChannel: (callback) => socket.on('renameChannel', () => callback()),
};
