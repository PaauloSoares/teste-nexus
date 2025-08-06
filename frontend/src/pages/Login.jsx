import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './css/Login.css'
import Logo from '../assets/Nexus-preto-png.png';


function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const resposta = await api.post('/users/login', {
            email: email,
            password: senha,
        });

      const { token, user } = resposta.data;

      
      localStorage.setItem('token', token);
      localStorage.setItem('userName', user.name);

      setMensagem('Login realizado com sucesso!');
      console.log('Token:', token);

      // Redireciona para a página do simulador
      navigate('/simulador');
    } catch (erro) {
      setMensagem('Erro ao fazer login: ' + (erro.response?.data?.error || 'Erro desconhecido'));
      console.error('Erro:', erro);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={Logo} alt="Nexus Logo" className="login-logo" />
        <h2 className="login-title">Login</h2>
        <form className='form-container' onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">Entrar</button>
        </form>
        {mensagem && <p className="login-message">{mensagem}</p>}
        <p className="login-register-text">
          Você ainda não está cadastrado? <Link to="/register" className="login-link">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
