import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Simulador from './pages/Simulador';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/simulador"
          element={
            <PrivateRoute>
              <Simulador />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
