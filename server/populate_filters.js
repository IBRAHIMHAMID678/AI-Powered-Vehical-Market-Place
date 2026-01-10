
import mongoose from 'mongoose';
import Car from './models/Car.js';
import dotenv from 'dotenv';

dotenv.config();

// Pakistani Cities
const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar", "Faisalabad", "Multan", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur", "Abbottabad"];

const updateData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const cars = await Car.find({});
        console.log(`Updating ${cars.length} cars...`);

        for (let car of cars) {
            let userUpdates = {};

            // 1. Populate Registration City if missing
            if (!car.registrationCity || car.registrationCity === 'undefined') {
                const randomCity = cities[Math.floor(Math.random() * cities.length)];
                userUpdates.registrationCity = randomCity;
            }

            // 2. Ensure Location contains a valid city (for filter matching)
            // If location is complex, we might leave it but ensure our filter 'contains' matches.
            // Let's just create a cleaner location string for demo purposes if it looks 'unstructured'
            // or just rely on the 'contains' update in backend code. 
            // Actually, let's assign a primary "City" to location for better testing if it's currently messy.
            // The current data shows " Lahore Punjab". It has the city.
            // I'll leave location as is, but rely on backend fix.

            // 3. Engine validation (optional, looked ok)

            if (Object.keys(userUpdates).length > 0) {
                await Car.updateOne({ _id: car._id }, { $set: userUpdates });
            }
        }

        console.log("Data update complete.");
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

updateData();
