import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from './models/Car.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');
        const cars = await Car.find().limit(5);
        console.log(JSON.stringify(cars, null, 2));
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
