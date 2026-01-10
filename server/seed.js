
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Car from './models/Car.js';

dotenv.config();

const DATA_PATH = 'C:\\Users\\dell\\.cache\\kagglehub\\datasets\\asimzahid\\pakistans-largest-pakwheels-automobiles-listings\\versions\\1\\usedCars.json';

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

const seedData = async () => {
    try {
        console.log('Reading data file...');
        const rawData = fs.readFileSync(DATA_PATH, 'utf8');
        const data = JSON.parse(rawData);
        const carsData = data.usedCars;

        console.log(`Found ${carsData.length} cars. Clearing existing data...`);
        await Car.deleteMany({}); // Clear existing cars

        console.log('Inserting new data...');

        // Transform data to match schema
        const carsToInsert = carsData.map(car => ({
            url: car.url,
            title: car.name,
            description: car.description,
            image: car.image,
            transmission: car.vehicleTransmission,
            color: car.color,
            bodyType: car.bodyType,
            engineDisplacement: car.vehicleEngine?.engineDisplacement,
            mileage: car.mileageFromOdometer,
            location: car.sellerLocation,
            price: car.price,
            currency: car.priceCurrency,
            features: car.features
        }));

        // Insert in chunks to avoid memory issues if too large, but for 10MB it should be fine.
        // However, lets limit to 2000 for now to keep it fast if the user doesn't need ALL of them immediately
        // or just insert all. Let's insert all 

        await Car.insertMany(carsToInsert);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

seedData();
