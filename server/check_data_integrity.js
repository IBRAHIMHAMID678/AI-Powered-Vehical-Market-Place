
import mongoose from 'mongoose';
import Car from './models/Car.js';
import dotenv from 'dotenv';

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const cars = await Car.find({}).limit(10);
        console.log("Total Cars checked: ", cars.length);

        cars.forEach(car => {
            console.log("--- Car ---");
            console.log("ID:", car._id);
            console.log("Title:", car.title);
            console.log("Make:", `"${car.make}"`); // quote to see whitespace
            console.log("BodyType:", `"${car.bodyType}"`);
            console.log("FuelType:", `"${car.fuelType}"`);
            console.log("Transmission:", `"${car.transmission}"`);
            console.log("Color:", `"${car.color}"`);
            console.log("Ext Color:", `"${car.exteriorColor}"`);
            console.log("Engine:", `"${car.engineDisplacement}"`);
            console.log("Location:", `"${car.location}"`);
            console.log("Reg City:", `"${car.registrationCity}"`);
        });

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkData();
