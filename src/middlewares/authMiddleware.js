const jwt = require('jsonwebtoken');


const secret = '12345';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // Token enviado no formato: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.user = user; // o payload do token
    next();
  });
};

module.exports = authenticateToken;
