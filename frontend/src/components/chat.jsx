import 'bootstrap/dist/css/bootstrap.min.css';
import Messages from './messages.jsx';
import Channels from './channels.jsx';

const Chat = () => {
  return (
    <>
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