import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('AutoMarket API is running');
});

// Routes
import carRoutes from './routes/cars.js';
app.use('/api/cars', carRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
