import { GoogleGenAI, Chat } from "@google/genai";
import { getSystemPrompt } from '../constants';
import type { Message } from '../types';
import { Role } from '../types';
import type { Language } from '../contexts/AppContext';

const CRISIS_KEYWORDS = [
    'suicide', 'kill myself', 'self-harm', 'ending my life', 'want to die',
    'no reason to live', 'end it all', 'worthless', 'no point living',
    'can\'t go on', 'hopeless', 'no future', 'better off dead',
];

class GeminiService {
    private ai: GoogleGenAI;
    private chat: Chat | null = null;

    constructor() {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY is not set in environment variables.");
        }
        this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }

    private initializeChat(history: Message[]): void {
        const geminiHistory = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }));

        const personality = localStorage.getItem('userPersonality') || 'Gentle Friend';
        const language = (localStorage.getItem('language') as Language) || 'en';
        const systemPrompt = getSystemPrompt(personality, language);

        this.chat = this.ai.chats.create({
            model: 'gemini-2.5-flash',
            history: geminiHistory,
            config: {
                systemInstruction: systemPrompt,
            },
        });
    }

    public async sendMessageStream(
        history: Message[],
        message: string,
        onChunk: (chunk: string) => void,
        onCrisisDetected: () => void
    ): Promise<void> {
        const lowerCaseMessage = message.toLowerCase();
        const isCrisis = CRISIS_KEYWORDS.some(keyword => lowerCaseMessage.includes(keyword));

        if (isCrisis) {
            onCrisisDetected();
            return; 
        }

        if (!this.chat) {
            this.initializeChat(history);
        }

        if (!this.chat) {
            throw new Error("Chat not initialized");
        }
        
        try {
            const result = await this.chat.sendMessageStream({ message });
            for await (const chunk of result) {
                onChunk(chunk.text);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            onChunk("I'm sorry, I encountered an error. Please try again.");
        }
    }
}

export const geminiService = new GeminiService();