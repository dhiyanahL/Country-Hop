import cors from 'cors';
import { connectDB } from "./config/db.js";
import express from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
// Allow all origins (adjust based on your security requirements)
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    connectDB();
    console.log("Listening on port 5000");
  });
  