const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const favoriteController = require('../controllers/favoriteController');

router.post('/register', userController.register);
router.post('/login', userController.loginUser);

router.post('/favorites', authenticateToken, favoriteController.addFavorite);
router.delete('/favorites/:cryptoId', authenticateToken, favoriteController.removeFavorite);
router.get('/favorites', authenticateToken, favoriteController.getFavorites);


router.get('/perfil', authenticateToken, (req, res) => {
  res.json({
    message: 'Acesso autorizado',
    user: req.user, // Payload do token
  });
});

module.exports = router;
