import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import HistoricoUsuario from "../components/HistoricoUsuario";
import api from "../services/api";
import "./css/Simulador.css";
import './css/historico.css'

function Simulador() {
  const [criptoSelecionada, setCriptoSelecionada] = useState("bitcoin");
  const [quantidade, setQuantidade] = useState("");
  const [resultadoBRL, setResultadoBRL] = useState(null);
  const [resultadoUSD, setResultadoUSD] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await api.get("/users/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data);
      }
    } catch (err) {
      console.error("Erro ao buscar favoritos:", err);
    }
  };

  // Carrega os favoritos quando o componente é montado
  useEffect(() => {
    fetchFavorites();
  }, []);


  const handleConverter = async () => {
    if (!quantidade || isNaN(quantidade)) {
      alert("Digite uma quantidade válida");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price`,
        {
          params: {
            ids: criptoSelecionada,
            vs_currencies: "brl,usd",
          },
        }
      );

      const cotacao = response.data[criptoSelecionada];
      const valorBRL = quantidade * cotacao.brl;
      const valorUSD = quantidade * cotacao.usd;

      setResultadoBRL(valorBRL.toFixed(2));
      setResultadoUSD(valorUSD.toFixed(2));

      const token = localStorage.getItem("token");
      console.log(localStorage.getItem("token"));
      if (token) {
        // Objeto com os dados da acao
        const acao = {
          cripto: criptoSelecionada,
          quantidade: parseFloat(quantidade),
          valorBRL: valorBRL,
          valorUSD: valorUSD,
        };

        await api.post(
          "/users/simulacoes/historico",
          { acao },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Simulação salva com sucesso!");
      } else {
        console.warn(
          "Usuário não autenticado. Não foi possível salvar a simulação."
        );
      }
    } catch (erro) {
      console.error("Erro ao buscar cotação:", erro);
      alert("Erro ao buscar cotação da criptomoeda");
    }
  };

  // função para adicionar/remover dos favoritos
  const handleToggleFavorite = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const isFavorited = favorites.includes(criptoSelecionada);

      if (isFavorited) {
        // Remover dos favoritos (requisição DELETE)
        await api.delete(`/users/favorites/${criptoSelecionada}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Adicionar aos favoritos (requisição POST)
        await api.post(
          "/users/favorites",
          { cryptoId: criptoSelecionada },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Atualiza a lista de favoritos após a requisição
      fetchFavorites();
    } catch (err) {
      console.error("Erro ao favoritar/desfavoritar:", err);
    }
  };

  return (
    <div>
      <Header />

      <div className=".main-content-wrapper">
        <div className="Simulador-container">
          <h2 className="Titulo">Simulador de Conversão de Criptomoedas</h2>
          <div className="form-group">
            <div className="form-item">
              <label htmlFor="quantidade">Quantidade:</label>
              <input
                id="quantidade"
                type="number"
                placeholder="Digite a quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>
            <div className="form-item-cript">
              <label htmlFor="cripto">Criptomoeda:</label>
              <select
                id="cripto"
                value={criptoSelecionada}
                onChange={(e) => setCriptoSelecionada(e.target.value)}
              >
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="dogecoin">Dogecoin</option>
              </select>
              <button
                  onClick={handleToggleFavorite}
                  className="favorite-button"
                >
                  {favorites.includes(criptoSelecionada) ? "★" : "☆"}
                </button>
            </div>

          </div>
          <button className="converter-button" onClick={handleConverter}>Converter</button>

          {resultadoBRL && (
            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>Valor em BRL:</strong> R$ {resultadoBRL}
              </p>
              <p>
                <strong>Valor em USD:</strong> $ {resultadoUSD}
              </p>
            </div>
          )}
          
          <HistoricoUsuario />
          
        </div>
        
      </div>
      
      
    </div>
  );
}

export default Simulador;
