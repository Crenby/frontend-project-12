import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Container, Row, Button,
} from 'react-bootstrap';
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
        <Container className="container">
          <a className="navbar-brand" href="/"> Hexlet Chat</a>
          <Button variant="primary" onClick={getOut} type="button">{t('exitButton')}</Button>
        </Container>
      </nav>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
    </>
  );
};

export default Chat;
