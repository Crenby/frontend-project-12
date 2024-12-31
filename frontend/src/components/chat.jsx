import { Container, Row } from 'react-bootstrap';
import Messages from './messages.jsx';
import Channels from './channels.jsx';
import Header from './header.jsx';

const Chat = () => (
  <>
    <Header />
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  </>
);

export default Chat;
