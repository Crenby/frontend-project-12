import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Chat = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userToken')) {
      navigate('/login', { replace: false })
    }
  });

  return (
    <>
      <div className="text-center">
        <h1 className="h4 text-muted">Сдесь сам чат</h1>
      </div>
    </>
  )
};

export default Chat;