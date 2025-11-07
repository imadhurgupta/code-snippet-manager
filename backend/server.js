// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import snippetRoutes from './routes/snippets.js'; // ensure this path is correct

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/snippets', snippetRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/snippetdb';



mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ DB connection error:', err));
