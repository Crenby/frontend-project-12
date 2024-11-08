import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './components/notFound.jsx'
import Login from './components/login.jsx'
import Chat from './components/chat.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container"> 
            <a className="navbar-brand" href="/"> Hexlet Chat</a>
          </div>
        </nav>
       
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Chat />} />
          </Routes>

      </div>
      <div className="Toastify"></div>
    </BrowserRouter>
  );

}

export default App
