import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send, Mic, Volume2, Languages, Bot, Star, Sparkles, MessageSquareHeart, Maximize2, ArrowDownLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import axios from 'axios';

interface CarRecommendation {
    _id: string;
    title: string;
    image: string;
    price: number;
    compatibility: {
        score: number;
        pros: string[];
        cons: string[];
    };
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
    recommendations?: CarRecommendation[];
}

const ChatBot: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState<'en' | 'ur'>('en');
    const [isRecording, setIsRecording] = useState(false);
    const [showBadge, setShowBadge] = useState(true);
    const [isMaximized, setIsMaximized] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [messages, isLoading, isMaximized]); // Auto scroll when maximized too

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: 'user', content: input };

        // Use functional update to ensure no messages are lost
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // Capture the history including the new message
            const historyToSend = [...messages, userMsg];

            const response = await axios.post('http://localhost:5000/api/chat/message', {
                messages: historyToSend,
                preferredLanguage: language,
                userPreferences: {
                    maxPrice: 10000000,
                    familySize: 4,
                    usage: 'city'
                }
            });

            const assistantMsg: Message = {
                role: 'assistant',
                content: response.data.message,
                recommendations: response.data.recommendations
            };

            setMessages(prev => [...prev, assistantMsg]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg: Message = { role: 'assistant', content: language === 'ur' ? 'معذرت، میں رابطہ نہیں کر پا رہا ہوں۔' : 'Sorry, I am having trouble connecting. Please try again later.' };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const speak = (text: string) => {
        // Chrome requires a user gesture or voices to be loaded
        const voices = window.speechSynthesis.getVoices();
        const utterance = new SpeechSynthesisUtterance(text);

        if (language === 'ur') {
            utterance.lang = 'ur-PK';
            // Find Pakistani Urdu voice or any Urdu voice
            const urduVoice = voices.find(v => v.lang.startsWith('ur')) ||
                voices.find(v => v.name.toLowerCase().includes('urdu'));
            if (urduVoice) utterance.voice = urduVoice;
            utterance.pitch = 1.0;
            utterance.rate = 0.9;
        } else {
            utterance.lang = 'en-US';
        }

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    };

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const handleVoiceInput = async () => {
        if (isRecording) {
            // Stop Recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                mediaRecorderRef.current.stop();
                setIsRecording(false);
            }
        } else {
            // Start Recording
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                chunksRef.current = [];

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        chunksRef.current.push(event.data);
                    }
                };

                mediaRecorder.onstop = async () => {
                    const blob = new Blob(chunksRef.current, { type: 'audio/webm' }); /* Chrome records in webm */
                    const formData = new FormData();
                    formData.append('audio', blob, 'voice.webm');

                    // Show temporary loading state for voice
                    setInput(language === 'ur' ? 'آواز پروسیس ہو رہی ہے...' : 'Processing voice...');

                    try {
                        const response = await axios.post('http://localhost:5000/api/chat/voice', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });

                        if (response.data.text) {
                            setInput(response.data.text);
                            // Auto-send after a brief pause or let user confirm? 
                            // Let's keep it in input for user to review first.
                        }
                    } catch (error) {
                        console.error('Voice Service Error:', error);
                        setInput(language === 'ur' ? 'معذرت، آواز سمجھ نہیں آئی۔' : 'Sorry, could not understand voice.');
                    }
                };

                mediaRecorder.start();
                setIsRecording(true);
            } catch (err) {
                console.error("Error accessing microphone:", err);
                alert("Could not access microphone.");
            }
        }
    };

    return (
        <div className={`fixed z-[100] flex flex-col items-end gap-3 transition-all duration-500 ease-in-out ${isMaximized
            ? 'inset-0 w-full h-full bg-background/95 backdrop-blur-sm p-4 sm:p-6'
            : 'bottom-6 right-6'
            }`}>
            {isOpen && (
                <Card className={`flex flex-col shadow-2xl border-primary/20 bg-background/98 backdrop-blur-2xl animate-in slide-in-from-bottom-5 duration-500 overflow-hidden ring-1 ring-black/10 transition-all ${isMaximized
                    ? 'w-full h-full max-h-full rounded-2xl'
                    : 'mb-4 w-[95vw] sm:w-[550px] h-[85vh] max-h-[850px]'
                    }`}>
                    {/* Header */}
                    <div className="p-5 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white flex justify-between items-center shadow-lg relative overflow-hidden shrink-0">
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl ring-1 ring-white/30">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-base tracking-tight flex items-center gap-2">
                                    AutoMarket Advisor
                                    <Badge variant="secondary" className="bg-white/20 text-white border-none py-0 px-2 text-[8px] font-black uppercase tracking-widest">LOCAL AI</Badge>
                                </h3>
                                <p className="text-[10px] font-bold opacity-90 uppercase tracking-[0.1em] flex items-center gap-1.5 mt-0.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                                    ONLINE • {language === 'en' ? 'ENGLISH' : 'اردو'}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 relative z-10">
                            <Button variant="ghost" size="icon" onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')} className="h-9 w-9 text-white hover:bg-white/20 rounded-xl transition-all" title="Switch Language">
                                <Languages className="w-5 h-5" />
                            </Button>

                            {/* Maximize/Minimize Button */}
                            <Button variant="ghost" size="icon" onClick={() => setIsMaximized(!isMaximized)} className="h-9 w-9 text-white hover:bg-white/20 rounded-xl transition-all" title={isMaximized ? "Minimize" : "Full Screen"}>
                                {isMaximized ? <ArrowDownLeft className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                            </Button>

                            <Button variant="ghost" size="icon" onClick={() => { setIsOpen(false); setIsMaximized(false); }} className="h-9 w-9 text-white hover:bg-white/20 rounded-xl transition-all" title="Close">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <ScrollArea className="flex-1 px-5 py-6" ref={scrollRef}>
                        <div className="space-y-10 pb-4">
                            {messages.length === 0 && (
                                <div className="text-center py-32 opacity-50">
                                    <Bot className="w-16 h-16 mx-auto mb-4 text-primary" />
                                    <p className="text-sm font-bold">{language === 'en' ? 'Ask anything about cars!' : 'گاڑیوں کے بارے میں کچھ بھی پوچھیں!'}</p>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    {/* Message Bubble */}
                                    <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm text-[15px] leading-relaxed relative ${msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                                        : 'bg-muted/50 backdrop-blur-sm text-foreground rounded-tl-none border border-border/50'
                                        }`}>
                                        <p className={`whitespace-pre-wrap ${language === 'ur' || /[\u0600-\u06FF]/.test(msg.content) ? 'urdu-text' : ''}`}>{msg.content}</p>
                                        {msg.role === 'assistant' && (
                                            <button onClick={() => speak(msg.content)} className="mt-3 text-primary/60 hover:text-primary transition-colors">
                                                <Volume2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Vertical Car Recommendations */}
                                    {msg.recommendations && msg.recommendations.length > 0 && (
                                        <div className="mt-6 w-full space-y-4 max-w-[90%]">
                                            <div className="flex items-center gap-3">
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{language === 'en' ? 'Top Matches' : 'بہترین انتخاب'}</p>
                                                <hr className="flex-1 border-border/30" />
                                            </div>
                                            {msg.recommendations.map((car) => (
                                                <Card key={car._id} className="overflow-hidden border border-border/40 hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/5 group cursor-pointer" onClick={() => navigate(`/vehicles/${car._id}`)}>
                                                    <div className="flex flex-col sm:flex-row h-auto">
                                                        <div className="w-full sm:w-48 h-32 shrink-0 overflow-hidden relative">
                                                            <img src={car.image || '/placeholder-car.jpg'} alt={car.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                            <Badge className="absolute top-2 right-2 bg-primary/90 text-white border-none">{car.compatibility.score}% Match</Badge>
                                                        </div>
                                                        <div className="p-4 flex-1 flex flex-col justify-between">
                                                            <div>
                                                                <h4 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">{car.title}</h4>
                                                                <p className="text-xl font-black text-primary mt-1">Rs {car.price.toLocaleString()}</p>
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/20">
                                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                                <span className="text-[10px] font-bold text-muted-foreground uppercase">{language === 'en' ? 'Verified Ad' : 'تصدیق شدہ'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex gap-2 p-4 bg-muted/20 w-max rounded-2xl animate-pulse">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.2s]" />
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.4s]" />
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-5 bg-background border-t border-border/50 shrink-0">
                        <div className="flex gap-3 items-center bg-muted/30 p-2 rounded-2xl border border-border/40 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                            <Button variant={isRecording ? 'destructive' : 'ghost'} size="icon" onClick={handleVoiceInput} className="h-10 w-10">
                                <Mic className={`w-5 h-5 ${isRecording ? 'animate-ping' : ''}`} />
                            </Button>
                            <Input
                                placeholder={language === 'en' ? "Ask about any car..." : "گاڑی کے بارے میں پوچھیں..."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent h-10"
                                dir={language === 'ur' ? 'rtl' : 'ltr'}
                            />
                            <Button size="icon" onClick={handleSend} disabled={isLoading || !input.trim()} className="h-10 w-10 shadow-lg">
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Prominent Button */}
            {!isMaximized && (
                <div className="relative group">
                    {!isOpen && showBadge && (
                        <div className="absolute -top-14 right-0 bg-primary text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-xl animate-bounce flex items-center gap-2">
                            AI AUTO ADVISOR <Sparkles className="w-3 h-3" />
                            <div className="absolute -bottom-1 right-8 w-2 h-2 bg-primary rotate-45" />
                        </div>
                    )}
                    <Button
                        size="lg"
                        className={`rounded-full w-[70px] h-[70px] shadow-2xl transition-all duration-500 border-4 border-background ${isOpen ? 'rotate-90 bg-destructive' : 'bg-primary hover:scale-110'
                            }`}
                        onClick={() => { setIsOpen(!isOpen); setShowBadge(false); }}
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <MessageSquareHeart className="w-8 h-8" />}
                    </Button>
                    {!isOpen && <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl animate-pulse -z-10" />}
                </div>
            )}
        </div>
    );
};

export default ChatBot;
