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

  export const removeFavorite = async (req, res) => {
    const userId = req.user.id;
    const { countryCode } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Check if country exists in favorites
      const index = user.favorites.indexOf(countryCode);
      if (index === -1) {
        return res.status(404).json({ error: "Country not found in favorites" });
      }
  
      // Remove it
      user.favorites.splice(index, 1);
      await user.save();
  
      res.json({ message: "Country removed from favorites", favorites: user.favorites });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error removing favorite" });
    }
  };