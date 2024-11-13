import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMessages, addMessages } from '../slices/messagesSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, useFormik } from 'formik';
import { io } from 'socket.io-client';
import store from '../slices/index.js';

const socket = io();
const { dispatch } = store;

socket.on('newMessage', (payload) => {
  console.log(payload);
  dispatch(addMessages(payload));
});

const Messages = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  const formik = useFormik({
    initialValues: {
      messageText: "",
    },

    onSubmit: (values) => {
      const newMessage = { body: values.messageText, channelId: activeChannel.channelId, username: localStorage.getItem('userName') };
      axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }).then((response) => {

      });
    },
  });

  useEffect(() => {
    axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    }).then((response) => {
      //console.log(response.data);
      dispatch(getMessages(response.data));
    });
  }, []);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b># {activeChannel.name}</b></p>
        <span className="text-muted">
          {messages.filter((m) => m.channelId === activeChannel.channelId).length} сообщений
        </span>
      </div>

      <div className="chat-messages overflow-auto px-5 ">
        {messages.filter((message) => {
          return message.channelId === activeChannel.channelId
        })
          .map((message, i) => {
            return (
              <div key={i} className="text-break mb-2">
                <b>{message.username}</b>
                : {message.body}
              </div>
            )
          })
        }
      </div>

      <div className="mt-auto px-5 py-3">
        <form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
          <div className="input-group has-validation">
            <input id="messageText" name="messageText" type="messageText" onChange={formik.handleChange} value={formik.values.messageText} aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control"></input>
            <button type="submit" disabled="" className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
              </svg>
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Messages;