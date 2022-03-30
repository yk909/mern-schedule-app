import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Navbar } from './components';
import { Login, Main, Register } from './pages';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="bottom-right"
        theme="colored"
      />
    </>
  );
}

export default App;
