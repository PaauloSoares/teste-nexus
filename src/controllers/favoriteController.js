

const { Favorite } = require('../models');

exports.addFavorite = async (req, res) => {
  try {
    const { cryptoId } = req.body;
    const userId = req.user.id;
    
    const existingFavorite = await Favorite.findOne({ where: { userId, cryptoId } });

    if (existingFavorite) {
      return res.status(409).json({ message: 'Cryptocurrency already favorited.' });
    }

    const newFavorite = await Favorite.create({ userId, cryptoId });
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { cryptoId } = req.params;
    const userId = req.user.id;

    await Favorite.destroy({ where: { userId, cryptoId } });
    res.status(200).json({ message: 'Cryptocurrency unfavorited.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await Favorite.findAll({ where: { userId } });
    res.status(200).json(favorites.map(fav => fav.cryptoId));
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};