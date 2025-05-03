// routes/favorites.js
import express from 'express';
import { addFavorite, getAllFavorites, removeFavorite } from '../controllers/favouritesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

//Add a favourite
router.post('/add', verifyToken, addFavorite);

//Get all favourites
router.get('/', verifyToken, getAllFavorites);

//Remove a favourite
router.delete('/:countryCode', verifyToken, removeFavorite);



export default router;
