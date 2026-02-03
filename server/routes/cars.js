
import express from 'express';
import Car from '../models/Car.js';

const router = express.Router();

// Get all cars with pagination and filtering
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const query = {};

        // Status filter
        if (req.query.status) query.status = req.query.status;

        const filters = [];

        // Search filter (general keyword)
        if (req.query.search) {
            filters.push({
                $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { description: { $regex: req.query.search, $options: 'i' } },
                    { make: { $regex: req.query.search, $options: 'i' } },
                    { model: { $regex: req.query.search, $options: 'i' } }
                ]
            });
        }

        // Make filter
        if (req.query.make) {
            const makes = req.query.make.split(',');
            filters.push({ make: { $in: makes.map(m => new RegExp(m, 'i')) } });
        }

        // Body Type filter
        if (req.query.bodyType) {
            const types = req.query.bodyType.split(',');
            filters.push({ bodyType: { $in: types.map(t => new RegExp(t, 'i')) } });
        }

        // Fuel Type filter
        if (req.query.fuelType) {
            const fuels = req.query.fuelType.split(',');
            filters.push({ fuelType: { $in: fuels.map(f => new RegExp(f, 'i')) } });
        }

        // Transmission filter
        if (req.query.transmission) {
            const transmissions = req.query.transmission.split(',');
            filters.push({ transmission: { $in: transmissions.map(t => new RegExp(t, 'i')) } });
        }

        // Color filter
        if (req.query.color) {
            const colors = req.query.color.split(',');
            const colorRegex = colors.map(c => new RegExp(c, 'i'));
            filters.push({
                $or: [
                    { color: { $in: colorRegex } },
                    { exteriorColor: { $in: colorRegex } }
                ]
            });
        }

        // Registration City
        if (req.query.registrationCity) {
            const cities = req.query.registrationCity.split(',');
            filters.push({ registrationCity: { $in: cities.map(c => new RegExp(c, 'i')) } });
        }

        // Location
        if (req.query.location) {
            const locations = req.query.location.split(',');
            filters.push({ location: { $in: locations.map(l => new RegExp(l, 'i')) } });
        }

        // Price Range filter
        if (req.query.minPrice || req.query.maxPrice) {
            const priceQuery = {};
            if (req.query.minPrice) priceQuery.$gte = parseInt(req.query.minPrice);
            if (req.query.maxPrice) priceQuery.$lte = parseInt(req.query.maxPrice);
            filters.push({ price: priceQuery });
        }

        // Year Range filter
        if (req.query.minYear || req.query.maxYear) {
            const yearQuery = {};
            if (req.query.minYear) yearQuery.$gte = parseInt(req.query.minYear);
            if (req.query.maxYear) yearQuery.$lte = parseInt(req.query.maxYear);
            filters.push({ year: yearQuery });
        }

        // User filter
        if (req.query.user) {
            filters.push({ user: req.query.user });
        }

        // Type filter
        if (req.query.type) {
            filters.push({ type: req.query.type });
        }

        // Engine CC Range
        if (req.query.minEngineCC || req.query.maxEngineCC) {
            const extractCC = {
                $toInt: {
                    $getField: {
                        field: "match",
                        input: { $regexFind: { input: "$engineDisplacement", regex: "\\d+" } }
                    }
                }
            };

            const ccFilters = [];
            if (req.query.minEngineCC) {
                ccFilters.push({ $gte: [extractCC, parseInt(req.query.minEngineCC)] });
            }
            if (req.query.maxEngineCC) {
                ccFilters.push({ $lte: [extractCC, parseInt(req.query.maxEngineCC)] });
            }

            if (ccFilters.length > 0) {
                filters.push({ $expr: { $and: ccFilters } });
            }
        }

        // Combine all filters using $and for maximum reliability
        if (filters.length > 0) {
            if (query.$or) {
                // If there's an existing top-level $or (from search maybe), combine it
                filters.push({ $or: query.$or });
                delete query.$or;
            }
            query.$and = filters;
        }

        // Randomization
        if (req.query.random === 'true' && !req.query.search && !req.query.make && !req.query.model) {
            const randomCars = await Car.aggregate([
                { $match: query },
                { $sample: { size: limit } }
            ]);
            return res.json({
                cars: randomCars,
                currentPage: page,
                totalPages: 1, // Aggregation sample doesn't easily support total count for pagination
                totalCars: limit
            });
        }

        const cars = await Car.find(query).skip(skip).limit(limit);
        const total = await Car.countDocuments(query);

        res.json({
            cars,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalCars: total
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single car
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new car
router.post('/', async (req, res) => {
    try {
        const car = new Car(req.body);
        const newCar = await car.save();
        res.status(201).json(newCar);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
