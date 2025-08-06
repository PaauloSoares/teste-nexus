// src/pages/Register.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './css/Register.css'
import Logo from '../assets/Nexus-preto-png.png';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', { name, email, password });
      setMensagem('Cadastro realizado com sucesso! Redirecionando para o login...');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMensagem('Erro no cadastro: ' + (error.response?.data?.message || 'Erro desconhecido'));
      console.error('Erro:', error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <img src={Logo} alt="Nexus Logo" className="login-logo" />
        <h2>Cadastre-se</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
        {mensagem && <p className="register-message">{mensagem}</p>}
      </form>
    </div>
  );
}

export default Register;
