import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';
import axios from 'axios';
import FormData from 'form-data';

const execPromise = util.promisify(exec);

// FFmpeg conversion: Ensures consistent 16kHz WAV format
const convertToPcmWav = async (inputPath) => {
    const outputPath = inputPath + '.converted.wav';

    // 16kHz, mono, PCM s16le
    const command = `ffmpeg -y -i "${inputPath}" -ar 16000 -ac 1 -c:a pcm_s16le "${outputPath}"`;
    // console.log(`[FFmpeg] Converting: ${command}`);

    try {
        await execPromise(command);
        if (!fs.existsSync(outputPath)) {
            throw new Error('FFmpeg executed but output file not found');
        }
        return outputPath;
    } catch (error) {
        console.error('FFmpeg Conversion Error:', error);
        throw new Error('Failed to convert audio to WAV. Ensure FFmpeg is installed.');
    }
};

export const transcribeAudio = async (inputAudioPath) => {
    let convertedWavPath = null;

    try {
        if (!fs.existsSync(inputAudioPath)) {
            throw new Error(`Audio file not found: ${inputAudioPath}`);
        }

        // 1. Convert to WAV (Standardize audio)
        convertedWavPath = await convertToPcmWav(inputAudioPath);

        // 2. Send to Python Flask Server
        const formData = new FormData();
        formData.append('file', fs.createReadStream(convertedWavPath));

        try {
            console.log('[Whisper-Flask] Sending to Python Server (Port 5001)...');
            const response = await axios.post('http://localhost:5001/transcribe', formData, {
                headers: {
                    ...formData.getHeaders()
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity
            });

            const transcription = response.data.text;
            console.log(`[Whisper-Flask] Response: ${transcription}`);
            return transcription;

        } catch (apiError) {
            console.error('Flask API Error:', apiError.message);
            if (apiError.code === 'ECONNREFUSED') {
                throw new Error("Voice Server is not running. Please run 'python services/flask_transcribe.py' in the server folder.");
            }
            throw apiError;
        }

    } catch (error) {
        console.error('Transcription Error:', error.message);
        throw new Error('Transcription failed: ' + error.message);
    } finally {
        // Cleanup temp file
        if (convertedWavPath && fs.existsSync(convertedWavPath)) {
            try {
                fs.unlinkSync(convertedWavPath);
            } catch (e) { /* ignore */ }
        }
    }
};
