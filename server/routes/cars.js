
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

        // Search filter (general keyword)
        if (req.query.search) {
            query.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } },
                { make: { $regex: req.query.search, $options: 'i' } },
                { model: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        // Make filter
        if (req.query.make) {
            const makes = req.query.make.split(',');
            query.make = { $in: makes.map(m => new RegExp(`^${m}$`, 'i')) };
        }

        // Body Type filter
        if (req.query.bodyType) {
            const types = req.query.bodyType.split(',');
            query.bodyType = { $in: types.map(t => new RegExp(`^${t}$`, 'i')) };
        }

        // Fuel Type filter
        if (req.query.fuelType) {
            const fuels = req.query.fuelType.split(',');
            query.fuelType = { $in: fuels.map(f => new RegExp(`^${f}$`, 'i')) };
        }

        // Transmission filter
        if (req.query.transmission) {
            const transmissions = req.query.transmission.split(',');
            query.transmission = { $in: transmissions.map(t => new RegExp(`^${t}$`, 'i')) };
        }

        // Color filter (checks color or exteriorColor)
        if (req.query.color) {
            const colors = req.query.color.split(',');
            const colorRegex = colors.map(c => new RegExp(c, 'i')); // looser match for color
            query.$or = [
                { color: { $in: colorRegex } },
                { exteriorColor: { $in: colorRegex } }
            ];
            // Merging with existing $or if search is present is tricky.
            // If search is present, we have an existing $or. We need to use $and to combine them.
            if (req.query.search) {
                // Keep the search $or
                const searchOr = query.$or;
                delete query.$or; // remove it to construct $and
                query.$and = [
                    { $or: searchOr },
                    {
                        $or: [
                            { color: { $in: colorRegex } },
                            { exteriorColor: { $in: colorRegex } }
                        ]
                    }
                ];
            } else {
                query.$or = [
                    { color: { $in: colorRegex } },
                    { exteriorColor: { $in: colorRegex } }
                ];
            }
        }

        // Registration City
        if (req.query.registrationCity) {
            const cities = req.query.registrationCity.split(',');
            query.registrationCity = { $in: cities.map(c => new RegExp(`^${c}$`, 'i')) };
        }

        // Location - Use 'contains' match instead of exact
        if (req.query.location) {
            const locations = req.query.location.split(',');
            query.location = { $in: locations.map(l => new RegExp(l, 'i')) };
        }

        // Engine CC Range
        if (req.query.minEngineCC || req.query.maxEngineCC) {
            let expr = { $and: [] };

            // Extract the first sequence of digits from engineDisplacement string "1300 cc" -> "1300"
            const extractCC = {
                $toInt: {
                    $getField: {
                        field: "match",
                        input: { $regexFind: { input: "$engineDisplacement", regex: "\\d+" } }
                    }
                }
            };

            if (req.query.minEngineCC) {
                expr.$and.push({ $gte: [extractCC, parseInt(req.query.minEngineCC)] });
            }
            if (req.query.maxEngineCC) {
                expr.$and.push({ $lte: [extractCC, parseInt(req.query.maxEngineCC)] });
            }

            if (expr.$and.length > 0) {
                query.$expr = expr;
            }
        }

        // Price Range filter
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = parseInt(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = parseInt(req.query.maxPrice);
        }

        // Year Range filter
        if (req.query.minYear || req.query.maxYear) {
            query.year = {};
            if (req.query.minYear) query.year.$gte = parseInt(req.query.minYear);
            if (req.query.maxYear) query.year.$lte = parseInt(req.query.maxYear);
        }

        // User filter (for Inventory)
        if (req.query.user) {
            query.user = req.query.user;
        }

        // Type filter (for Auctions vs Buy Now)
        if (req.query.type) {
            query.type = req.query.type;
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
