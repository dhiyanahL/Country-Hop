// routes/favorites.js
import express from 'express';
import { addFavorite, getAllFavorites } from '../controllers/favouritesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

//Add a favourite
router.post('/add', verifyToken, addFavorite);

//Get all favourites
router.get('/', verifyToken, getAllFavorites);


// Add a favorite
/*router.post('/add', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { countryCode } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user.favorites.includes(countryCode)) {
      user.favorites.push(countryCode);
      await user.save();
    }
    res.json({ message: 'Country added to favorites', favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: 'Error adding favorite' });
  }
});

// Get all favorites
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching favorites' });
  }
});*/

export default router;
