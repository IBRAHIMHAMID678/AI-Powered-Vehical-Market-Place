
import Car from '../models/Car.js';

/**
 * Service to handle complex car queries for the AI
 */
export const searchCarsForAI = async (filters) => {
    try {
        const query = { status: 'active' };

        if (filters.make) query.make = new RegExp(filters.make, 'i');
        if (filters.model) query.model = new RegExp(filters.model, 'i');
        if (filters.bodyType) query.bodyType = new RegExp(filters.bodyType, 'i');
        if (filters.transmission) query.transmission = new RegExp(filters.transmission, 'i');
        if (filters.fuelType) query.fuelType = new RegExp(filters.fuelType, 'i');
        if (filters.location) query.location = new RegExp(filters.location, 'i');

        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = filters.minPrice;
            if (filters.maxPrice) query.price.$lte = filters.maxPrice;
        }

        if (filters.minYear || filters.maxYear) {
            query.year = {};
            if (filters.minYear) query.year.$gte = filters.minYear;
            if (filters.maxYear) query.year.$lte = filters.maxYear;
        }

        const cars = await Car.find(query).limit(10).lean();
        return cars;
    } catch (error) {
        console.error("AI Search Error:", error);
        return [];
    }
};

export const getCarStatsForAI = async () => {
    try {
        const totalCars = await Car.countDocuments({ status: 'active' });
        const makes = await Car.distinct('make');
        const bodyTypes = await Car.distinct('bodyType');

        return {
            totalCars,
            popularMakes: makes.slice(0, 10),
            availableBodyTypes: bodyTypes
        };
    } catch (error) {
        console.error("AI Stats Error:", error);
        return {};
    }
};

export const getCarDetailsById = async (id) => {
    try {
        return await Car.findById(id).lean();
    } catch (error) {
        return null;
    }
};
