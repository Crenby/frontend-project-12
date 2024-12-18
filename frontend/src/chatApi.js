import axios from 'axios';
import { io } from 'socket.io-client';

const apiPath = '/api/v1';
const socket = io();

function settingApi(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
}; 

export default {
  getChannels: (token) => axios.get(`${apiPath}/channels`, settingApi(token)),
  addChannel: (newChannel, token) => axios.post(`${apiPath}/channels`, newChannel, settingApi(token)),
  editChannel: (editedChannel, token, id) => axios.patch(`${apiPath}/channels/${id}`, editedChannel, settingApi(token)),
  removeChannel: (token, id) => axios.delete(`${apiPath}/channels/${id}`, settingApi(token)),
  getMessages: (token) => axios.get(`${apiPath}/messages`, settingApi(token)),
  addMessage: (newMessage, token) => axios.post(`${apiPath}/messages`, newMessage, settingApi(token)),
  signup: (name, pass) => axios.post(`${apiPath}/signup`, { username: name, password: pass }),
  login: (name, pass) => axios.post(`${apiPath}/login`, { username: name, password: pass }),
  socketNewMessage: (callback) => socket.on('newMessage', () => callback()),
  socketNewChannel: (callback) => socket.on('newChannel', () => callback()),
  socketRemoveChannel: (callback) => socket.on('removeChannel', () => callback()),
  socketRenameChannel: (callback) => socket.on('renameChannel', () => callback()),
};
