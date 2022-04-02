import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css'
import { Navbar, RequireAuth } from './components';
import { Login, Register, Main, Scheduler } from './pages';

function App() {
  const { user } = useSelector(state => state.auth);
  return (
    <>
      <Router>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<RequireAuth> <Main/> </RequireAuth>} />
            <Route path="/scheduler" element={<RequireAuth> <Scheduler/> </RequireAuth>} />
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
