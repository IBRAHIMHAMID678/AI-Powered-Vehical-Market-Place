import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';
import { searchCarsForAI, getCarStatsForAI } from './carQueryService.js';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define tools for function calling
const tools = [
    {
        functionDeclarations: [
            {
                name: "search_cars",
                description: "Search for cars in the database based on user criteria like make, model, price range, year, etc.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        make: { type: "STRING", description: "The brand of the car (e.g., Toyota, Honda)" },
                        model: { type: "STRING", description: "The specific model (e.g., Civic, Corolla)" },
                        minPrice: { type: "NUMBER", description: "Minimum price in PKR" },
                        maxPrice: { type: "NUMBER", description: "Maximum price in PKR" },
                        minYear: { type: "NUMBER", description: "Minimum model year" },
                        maxYear: { type: "NUMBER", description: "Maximum model year" },
                        bodyType: { type: "STRING", description: "Body style (e.g., Sedan, SUV, Hatchback)" },
                        transmission: { type: "STRING", description: "Automatic or Manual" },
                        location: { type: "STRING", description: "City or area" }
                    }
                }
            },
            {
                name: "get_market_stats",
                description: "Get general statistics about the car market like popular brands and total listings.",
                parameters: { type: "OBJECT", properties: {} }
            }
        ]
    }
];

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    tools: tools,
});

// Helper to get fallback model if flash fails
const getAiModel = (modelName = "gemini-1.5-flash-latest") => {
    return genAI.getGenerativeModel({
        model: modelName,
        tools: tools,
    });
};

export const transcribeAudioWithGemini = async (filePath) => {
    try {
        const audioData = fs.readFileSync(filePath);
        const base64Audio = audioData.toString('base64');

        const tempModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const parts = [
            {
                inlineData: {
                    mimeType: "audio/webm",
                    data: base64Audio
                }
            },
            { text: "Transcribe this audio exactly. If it is Urdu, write in Urdu script. If it is Roman Urdu, keep it as is." }
        ];

        const result = await tempModel.generateContent({
            contents: [{ role: "user", parts }]
        });

        return result.response.text();
    } catch (error) {
        console.error("Gemini Transcription Error:", error);
        throw new Error("Failed to transcribe audio with AI.");
    }
};

export const analyzeWithGemini = async (messages, preferredLanguage = 'en') => {
    const modelsToTry = [
        "gemini-3-flash-preview",
        "gemini-1.5-flash",
        "gemini-1.5-flash-001",
        "gemini-1.5-flash-002",
        "gemini-1.5-pro",
        "gemini-1.5-pro-001",
        "gemini-1.5-pro-002",
        "gemini-2.0-flash-exp"
    ];

    for (const modelName of modelsToTry) {
        try {
            console.log(`Attempting analysis with model: ${modelName}`);
            const aiModel = getAiModel(modelName);
            const chat = aiModel.startChat({
                history: messages.slice(0, -1).map(m => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.content }]
                })),
                generationConfig: {
                    maxOutputTokens: 1000,
                },
                systemInstruction: {
                    role: "system",
                    parts: [{
                        text: `
            You are 'AutoMarket Expert', a professional Pakistani automobile consultant.
            Your goal is to help users find their ideal car efficiently.
            
            CRITICAL OPERATING RULES:
            1. DIRECT SEARCH: If the user mentions a specific car, year, or budget (e.g., "under 30 Lakhs"), use the 'search_cars' tool IMMEDIATELY.
            2. STRICT DATA FIDELITY: You must ONLY describe cars that are strictly returned by the 'search_cars' tool. Do NOT mention or list any cars that are not in the tool output.
            3. ACCURATE DESCRIPTIONS: When describing a car, use EXACTLY the details (Price, Location, Mileage, Features) provided in the tool output. Do not hallucinate features (e.g., do not say "Sunroof" if it's not in the features list).
            4. PROFESSIONALISM: Stay polite, expert-level, and helpful.
            5. NO FAKE ADS: If the tool returns a generic list or no cars, say so. Do not invent "Sample Listings".
            6. LANGUAGE ADAPTATION: 
               - If the user writes/speaks in English -> Reply in English.
               - If the user writes/speaks in Roman Urdu -> Reply in Roman Urdu.
               - If the user writes/speaks in Urdu Script -> Reply in Urdu Script.
               - If uncertain, default to the 'preferredLanguage' provided: ${preferredLanguage === 'ur' ? "Urdu (Script)" : "English/Roman Urdu"}.
            7. DO NOT REPEAT YOURSELF: If you have already listed cars, ask if the user wants details on any specific one.
            
            If no cars match after a tool call, tell the user politely and suggest broadening the search (e.g., different year or price range).
            ` }]
                }
            });

            const lastMessage = messages[messages.length - 1].content;

            // Send the user message and handle potential function calls
            let result = await chat.sendMessage(lastMessage);

            let response = result.response;
            let functionCalls = response.candidates[0].content && response.candidates[0].content.parts
                ? response.candidates[0].content.parts.filter(p => p.functionCall)
                : [];
            let foundCars = [];

            if (functionCalls.length > 0) {
                const toolResults = [];

                for (const call of functionCalls) {
                    if (call.functionCall.name === "search_cars") {
                        const cars = await searchCarsForAI(call.functionCall.args);
                        foundCars = [...foundCars, ...cars];

                        // Simplify car data for the AI to reduce hallucinations and token usage
                        const aiContextCars = cars.map(car => ({
                            id: car._id,
                            title: car.title,
                            make: car.make,
                            model: car.model,
                            year: car.year,
                            price: car.price,
                            location: car.location,
                            mileage: car.mileage,
                            transmission: car.transmission,
                            fuelType: car.fuelType,
                            features: car.features || [],
                            description: car.description ? car.description.substring(0, 200) : "No description available"
                        }));

                        toolResults.push({
                            functionResponse: {
                                name: "search_cars",
                                response: { cars: aiContextCars }
                            }
                        });
                    } else if (call.functionCall.name === "get_market_stats") {
                        const stats = await getCarStatsForAI();
                        toolResults.push({
                            functionResponse: {
                                name: "get_market_stats",
                                response: stats
                            }
                        });
                    }
                }

                // Send tool results back to the model
                result = await chat.sendMessage(toolResults);
                response = result.response;
            }

            const text = response.text();

            // Format found cars for the UI
            const recommendations = foundCars.map(car => ({
                ...car,
                compatibility: {
                    score: 95,
                    reason: "Direct match from our database based on your requirements."
                }
            }));

            return {
                chat_response: text,
                recommendations: recommendations
            };

        } catch (error) {
            console.error(`Gemini Analysis Error with ${modelName}:`, error.message);
            // Continue to next model if this one fails
            if (modelName === modelsToTry[modelsToTry.length - 1]) {
                return {
                    chat_response: preferredLanguage === 'ur'
                        ? "معذرت، میں ابھی آپ کی مدد نہیں کر سکا۔ براہ کرم دوبارہ کوشش کریں۔"
                        : "I apologize, I'm having trouble processing your request right now. Please try again.",
                    recommendations: []
                };
            }
        }
    }
};

