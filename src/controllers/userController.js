const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models');

const userController = {
  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
      const existingUser = await user.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'Email já cadastrado.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await user.create({
        name,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: 'Usuário cadastrado com sucesso!',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await user.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const senhaCorreta = await bcrypt.compare(password, user.password);

      if (!senhaCorreta) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        '12345',
        { expiresIn: '1h' }
      );

      return res.status(200).json({ token, user: {
        name: user.name,
        email: user.email
        }, message: 'Login realizado com sucesso' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao realizar login' });
    }
  }
};

module.exports = userController;
