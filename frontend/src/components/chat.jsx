import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Messages from './messages.jsx';
import Channels from './channels.jsx';
import { authorization } from '../slices/authorizationSlice.js';

const Chat = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getOut = () => {
    localStorage.clear();
    dispatch(authorization({ name: '', token: '' }));
    navigate('/login', { replace: false });
  };

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/"> Hexlet Chat</a>
          <button onClick={getOut} type="button" className="btn btn-primary">{t('exitButton')}</button>
        </div>
      </nav>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </div>
      </div>
    </>
  );
};

export default Chat;
