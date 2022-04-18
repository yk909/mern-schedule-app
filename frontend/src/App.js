import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Alerts, Navbar, RequireAuth, RequireCompany } from './components';
import { Login, Register, Dashboard, Scheduler, Company } from './pages';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <div className="container">
          <Alerts />
          <Routes>
            <Route path="/" element={<RequireAuth> <RequireCompany> <Dashboard/> </RequireCompany> </RequireAuth>} />
            <Route path="/scheduler" element={<RequireAuth> <RequireCompany> <Scheduler/> </RequireCompany> </RequireAuth>} />
            <Route path="/scheduler/:id" element={<RequireAuth> <RequireCompany> <Scheduler/> </RequireCompany> </RequireAuth>} />
            <Route path="/company" element={<RequireAuth> <RequireCompany> <Company/> </RequireCompany> </RequireAuth>} />
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
