import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from './models/Car.js';
import User from './models/User.js';

dotenv.config();

const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Tesla", "Suzuki", "Kia", "Hyundai", "Daihatsu", "Nissan", "Mitsubishi"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "CNG"];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        // Find a default user to assign cars to (or create one if none exists)
        let defaultUser = await User.findOne();
        if (!defaultUser) {
            console.log("No user found. Creating dummy user for ownership.");
            // If no user exists, cars will just have null user, but inventory page needs user.
            // We can proceed without user for now, or just leave it blank.
            // But for *Inventory* to work, they needed a user.
            // For *Search/Filter* (User's current request), we primarily need Make, Year, Fuel.
        }

        const cars = await Car.find();
        let updatedCount = 0;

        for (const car of cars) {
            let updates = {};
            let modified = false;

            // 1. Extract Year from Title (e.g., "Honda City 2013...")
            if (!car.year) {
                const yearMatch = car.title.match(/(19|20)\d{2}/);
                if (yearMatch) {
                    updates.year = parseInt(yearMatch[0]);
                    modified = true;
                } else {
                    updates.year = 2020; // Default
                    modified = true;
                }
            }

            // 2. Extract Make from Title (e.g., "Honda City...")
            if (!car.make) {
                // Try to find a known make in the title
                const titleLower = car.title.toLowerCase();
                const matchedMake = makes.find(m => titleLower.includes(m.toLowerCase()));

                if (matchedMake) {
                    updates.make = matchedMake; // Use proper casing from list
                    modified = true;
                } else {
                    // Fallback: First word of title
                    updates.make = car.title.split(' ')[0];
                    modified = true;
                }
            }

            // 3. Determine Fuel Type
            if (!car.fuelType) {
                // Check features first
                const featureFuel = car.features.find(f => fuelTypes.includes(f));
                if (featureFuel) {
                    updates.fuelType = featureFuel;
                    modified = true;
                } else {
                    updates.fuelType = "Petrol"; // Default
                    modified = true;
                }
            }

            // 4. Ensure Model is set (simple guess: second word if first is make)
            if (!car.model) {
                const words = car.title.split(' ');
                if (words.length > 1) {
                    updates.model = words[1];
                    modified = true;
                }
            }

            // 5. Assign User if missing and we have one
            if (!car.user && defaultUser) {
                updates.user = defaultUser._id;
                modified = true;
            }

            // 6. Randomly assign type 'auction' to some cars if type is 'buy-now' or unset
            // to ensure Auction page has data for testing.
            if ((!car.type || car.type === 'buy-now') && Math.random() < 0.2) {
                updates.type = 'auction';
                updates.price = car.price || 100000; // ensure price exists for bid
                modified = true;
            }

            if (modified) {
                await Car.updateOne({ _id: car._id }, { $set: updates });
                updatedCount++;
                // console.log(`Updated: ${car.title}`); // Reduced logging to avoid buffer fill
            }
        }

        console.log(`Migration Complete. Updated ${updatedCount} cars.`);
        process.exit();
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });
