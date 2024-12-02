import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/notFound.jsx';
import Login from './components/login.jsx';
import Chat from './components/chat.jsx';
import SignUp from './components/signup.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Chat />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </div>
      <div className="Toastify">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App
