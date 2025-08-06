
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // assuming you have auth middleware
const { addFavorite, removeFavorite, getFavorites } = require('../controllers/favoriteController');

router.post('/favorites', auth, addFavorite);
router.delete('/favorites/:cryptoId', auth, removeFavorite);
router.get('/favorites', auth, getFavorites);

module.exports = router;