import { useState, useEffect } from 'react';
import api from '../services/api';
import '../pages/css/historico.css'
import '../App.css'

function HistoricoUsuario() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.get('/users/simulacoes/historico', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setHistorico(response.data);
        } else {
          setErro('Usuário não autenticado.');
        }
      } catch (err) {
        console.error('Erro ao buscar o histórico:', err);
        setErro('Erro ao carregar o histórico.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, []);

  if (loading) {
    return <p>Carregando histórico...</p>;
  }

  if (erro) {
    return <p style={{ color: 'red' }}>{erro}</p>;
  }

  return (
    <div className='historico-conteiner'>
      <h3 className='historico-titulo'>Seu Histórico de Simulações</h3>
      {Array.isArray(historico) && historico.length > 0 ?  (
        <ul>
          {historico.map((item) => (
            <li key={item.id}>{item.action}</li>
          ))}
        </ul>
      ) : (
        <p>Você ainda não tem histórico de simulações.</p>
      )}
    </div>
  );
}

export default HistoricoUsuario;