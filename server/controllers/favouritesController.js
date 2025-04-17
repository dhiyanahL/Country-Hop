import User from '../models/User.js';

export const addFavorite = async (req, res) => {
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
  };

  export const getAllFavorites = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const user = await User.findById(userId);
      res.json({ favorites: user.favorites });
    } catch (err) {
      res.status(500).json({ error: 'Error fetching favorites' });
    }
  };