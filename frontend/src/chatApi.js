import axios from 'axios';
import store from './slices/index.js';

const apiPath = '/api/v1';

function getToken() {
  return store.getState().authorization.userToken;
}

function settingApi() {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
}

export default {
  getChannels: () => axios.get(`${apiPath}/channels`, settingApi()),
  addChannel: (newChannel) => axios.post(`${apiPath}/channels`, newChannel, settingApi()),
  editChannel: (editedChannel, id) => axios.patch(`${apiPath}/channels/${id}`, editedChannel, settingApi()),
  removeChannel: (id) => axios.delete(`${apiPath}/channels/${id}`, settingApi()),
  getMessages: () => axios.get(`${apiPath}/messages`, settingApi()),
  addMessage: (newMessage) => axios.post(`${apiPath}/messages`, newMessage, settingApi()),
  signup: (name, pass) => axios.post(`${apiPath}/signup`, { username: name, password: pass }),
  login: (name, pass) => axios.post(`${apiPath}/login`, { username: name, password: pass }),
};
