import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from './components/notFound.jsx';
import Login from './components/login.jsx';
import SignUp from './components/signup.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Chat from './components/chat.jsx';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<Login />} />
        <Route path="/" element={<PrivateRoute component={Chat} />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
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
  </BrowserRouter>
);

export default App;
