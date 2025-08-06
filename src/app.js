const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes.js');
const simulacoesRoutes = require('./routes/simulacoes.js');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/users/simulacoes', simulacoesRoutes);

app.get('/teste', (req, res) => {
  res
    .status(200)
    .send({ mensagem: 'boas-vindas à API' });
});

module.exports = app;
