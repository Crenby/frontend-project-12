import 'bootstrap/dist/css/bootstrap.min.css';
import Messages from './messages.jsx';
import Channels from './channels.jsx';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Chat = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getOut = () => {
    localStorage.clear();
    navigate('/login', { replace: false });
  }

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/"> Hexlet Chat</a>
          {localStorage.getItem("userName") ? <button onClick={getOut} type="button" className="btn btn-primary">{t('exitButton')}</button> : null}
        </div>
      </nav>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </div>
      </div>
    </>
  )
};

export default Chat;