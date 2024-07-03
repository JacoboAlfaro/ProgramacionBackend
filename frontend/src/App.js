import './App.css';
import { Login } from './components/Auth/Login';
import { RecoveryPassword } from './components/Auth/RecoveryPassword';
import { Register } from './components/Auth/Register';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { ResetPassword } from './components/Auth/ResetPassword';

function App() {
  return (
    <Router> 
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/send-email' element={<RecoveryPassword />} />
      <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
