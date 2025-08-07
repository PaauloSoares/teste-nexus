const express = require('express');
const router = express.Router();
const { History } = require('../models');
const authenticateToken = require('../middlewares/authMiddleware'); // Importa o middleware

// Rota para salvar uma nova simulação.
router.post('/historico', authenticateToken, async (req, res) => {
  try {
    // Agora, dentro desta função, você tem acesso ao usuário autenticado
    // através de req.user, que contém o payload do token.
    const userId = req.user.id;
    const { acao } = req.body;

    // ... (lógica para salvar a simulação no banco de dados)
    const actionMessage = `Simulação de ${acao.quantidade} de ${acao.cripto} -> R$ ${acao.valorBRL} / $ ${acao.valorUSD}`;

    const newHistory = await History.create({
      userId: userId,
      action: actionMessage,
    });

    return res.status(201).json({ message: 'Simulação salva com sucesso!', history: newHistory });

  } catch (error) {
    console.error('Erro ao salvar simulação:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota para buscar o histórico de um usuário
router.get('/historico', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const historico = await History.findAll({
      where: { userId: userId },
      // Opcional: ordenar pelo mais recente
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json(historico || []);
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

module.exports = router;