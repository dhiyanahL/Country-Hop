import cors from 'cors';
import { connectDB } from "./config/db.js";
import express from 'express';
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import favoriteRoutes from './routes/favouritesRoutes.js';

dotenv.config();

const app = express();

// Middleware
// Allow all origins (adjust based on your security requirements)
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes);



app.listen(5000, () => {
    connectDB();
    console.log("Listening on port 5000");
  });
  