import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/css/Header.css'
import logo from '../assets/Nexus-preto-png.png';

const Header = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <header className="header-container">
      <img src={logo} alt="Logo da Empresa" className="header-logo" />
      <div>
        {userName && <span>Olá, {userName} | </span>}
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
