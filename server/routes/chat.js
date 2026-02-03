import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { transcribeAudio } from '../services/whisperService.js';
import { analyzeWithGemini } from '../services/geminiService.js';
import Car from '../models/Car.js';

const router = express.Router();

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

// Multer Config: Save with .webm for Chrome compatibility
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Unique name to prevent conflicts
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'voice-' + uniqueSuffix + '.webm');
    }
});

const upload = multer({ storage: storage });

/* ---------------- RULE-BASED QUERY PARSER (FAST) ---------------- */
const parseUserIntent = (text) => {
    if (!text) return {};
    const q = text.toLowerCase();
    const filters = {};

    // 1. Make Extraction
    const makes = ['toyota', 'honda', 'suzuki', 'kia', 'hyundai', 'mg', 'changan', 'audi', 'bmw', 'mercedes'];
    for (const make of makes) {
        if (q.includes(make)) {
            filters.make = new RegExp(make, 'i');
            break;
        }
    }

    // 2. Model Extraction
    const models = ['civic', 'corolla', 'city', 'cultus', 'alto', 'mehran', 'sportage', 'tucson', 'swift', 'vitz', 'yaris', 'fortuner', 'prado', 'land cruiser'];
    for (const model of models) {
        if (q.includes(model)) {
            filters.title = new RegExp(model, 'i');
            break;
        }
    }

    // 3. Body Type Extraction
    if (q.includes('suv')) filters.bodyType = new RegExp('suv', 'i');
    else if (q.includes('sedan')) filters.bodyType = new RegExp('sedan', 'i');
    else if (q.includes('hatchback')) filters.bodyType = new RegExp('hatchback', 'i');

    // 4. Year Extraction
    const yearMatches = q.match(/\b(20\d{2})\b/g);
    if (yearMatches) {
        const years = yearMatches.map(Number);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);

        if (minYear === maxYear) {
            filters.year = { $gte: minYear - 1, $lte: maxYear + 1 };
        } else {
            filters.year = { $gte: minYear, $lte: maxYear };
        }
    }

    // 5. Price Extraction
    const priceMatch = q.match(/(\d+(?:\.\d+)?)\s*(lakh|lac|million|m)/i);
    if (priceMatch) {
        const value = parseFloat(priceMatch[1]);
        const unit = priceMatch[2].toLowerCase();
        let amount = 0;

        if (unit.startsWith('l')) amount = value * 100000;
        else if (unit.startsWith('m')) amount = value * 1000000;

        if (q.includes('under') || q.includes('below') || q.includes('less')) {
            filters.price = { $lte: amount };
        } else if (q.includes('above') || q.includes('more') || q.includes('over')) {
            filters.price = { $gte: amount };
        } else {
            filters.price = { $gte: amount * 0.8, $lte: amount * 1.2 };
        }
    }

    filters.status = 'active';
    return filters;
};

/* ---------------- CHAT ENDPOINT ---------------- */
router.post('/message', async (req, res) => {
    try {
        const { messages, preferredLanguage } = req.body;

        // Use the enhanced Gemini service with function calling
        const result = await analyzeWithGemini(messages, preferredLanguage);

        res.json({
            message: result.chat_response,
            recommendations: result.recommendations || []
        });

    } catch (error) {
        console.error('Chat Logic Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


/* ---------------- VOICE ENDPOINT ---------------- */
router.post('/voice', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No audio file' });

        const audioPath = req.file.path;
        console.log(`Processing voice input: ${audioPath}`);

        // Use Whisper (local) instead of Gemini (remote)
        const transcriptionResult = await transcribeAudio(audioPath);

        // Handle Whisper output which might be a string or object depending on library version
        let text = "";
        if (typeof transcriptionResult === 'string') {
            text = transcriptionResult;
        } else if (transcriptionResult && transcriptionResult.toString) {
            text = transcriptionResult.toString();
        }

        console.log("Whisper Output:", text);

        if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);

        res.json({ text: text ? text.trim() : "" });
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

        console.error('Voice Error:', error);
        res.status(500).json({ error: 'Transcription failed' });
    }
});

export default router;
