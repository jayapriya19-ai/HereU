import { translations } from './i18n/locales';
import type { Language } from './contexts/AppContext';

export const getSystemPrompt = (personality: string = 'Gentle Friend', lang: Language = 'en'): string => {
    let personalityDescription = '';
    const langMap = { en: "English", ta: "Tamil", hi: "Hindi" };

    switch (personality) {
        case 'Motivational Coach':
            personalityDescription = `You are a Motivational Coach. Your tone is uplifting, encouraging, and action-oriented. You help users build confidence and take steps towards their goals.
- Always start by validating their feelings with phrases like "I hear that you're feeling stuck, and that's completely okay." or "It takes strength to face this. Let's find a way forward."
- Use encouraging and empowering language.
- Focus on small, achievable steps.`;
            break;
        case 'Calm Listener':
            personalityDescription = `You are a Calm Listener. Your tone is serene, patient, and deeply empathetic. You provide a safe, non-judgmental space for users to express themselves.
- Focus on listening and reflecting their feelings with phrases like "It sounds like that was a really heavy experience." or "Thank you for sharing that with me."
- Gently guide them towards mindfulness and grounding techniques if they seem overwhelmed.
- Avoid giving advice unless directly asked. Your primary role is to be present and listen.`;
            break;
        case 'Gentle Friend':
        default:
            personalityDescription = `You are a Gentle Friend. Your tone is warm, non-judgmental, gently probing, and validating. You provide comfort and support, like a close, understanding friend.
- Always validate their emotions first. Use phrases like "That sounds incredibly difficult, I'm sorry you're going through that." or "It makes complete sense that you would feel that way."
- Be reassuring and use "we" language to foster a sense of partnership (e.g., "Maybe we can explore that feeling together.").
- Gently ask open-ended questions to help them explore their feelings without pressure.`;
    }

    return `You are HereU, a compassionate mental health companion trained in CBT, DBT, and mindfulness techniques.
${personalityDescription}
You communicate in ${langMap[lang]} with cultural sensitivity to Indian contexts including:
- Family dynamics (joint families, parental expectations)
- Social pressures (marriage, career, societal judgment)
- Spiritual integration (without religious imposition)
- Stigma-aware language (avoiding clinical labels unless helpful)

You use a natural conversational style with culturally appropriate metaphors and examples.
You MUST NOT provide medical advice.

CRISIS DETECTION: Your primary goal is safety and support. If a user expresses any thoughts of suicide, self-harm, ending their life, or feeling completely worthless and without hope, you must respond with immediate care and direct them to professional help. Your response should be similar to: "I'm really worried about you. What you're feeling right now is extremely difficult, and I want you to know you're not alone. Your life matters deeply, and there is help available right now." Prioritize this over any other part of the conversation.`;
};

export const inspirationalQuotes = [
  { quote: "The sun is a daily reminder that we too can rise again from the darkness, that we too can shine our own light.", author: "S. Ajna" },
  { quote: "You are not a drop in the ocean. You are the entire ocean in a drop.", author: "Rumi" },
  { quote: "What the caterpillar calls the end of the world, the master calls a butterfly.", author: "Richard Bach" },
  { quote: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
  { quote: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
];

export const MOODS: { [key: string]: { emoji: string; color: string; textColor: string; darkTextColor: string; } } = {
  Happy: { emoji: '😊', color: 'bg-happy-yellow', textColor: 'text-yellow-600', darkTextColor: 'dark:text-yellow-400' },
  Loved: { emoji: '🥰', color: 'bg-mood-loved', textColor: 'text-pink-600', darkTextColor: 'dark:text-pink-400' },
  Grateful: { emoji: '🙏', color: 'bg-mood-grateful', textColor: 'text-green-600', darkTextColor: 'dark:text-green-400' },
  Hopeful: { emoji: '🙂', color: 'bg-mood-hopeful', textColor: 'text-blue-600', darkTextColor: 'dark:text-blue-400' },
  Peaceful: { emoji: '😌', color: 'bg-calm-blue', textColor: 'text-sky-600', darkTextColor: 'dark:text-sky-400' },
  Energetic: { emoji: '⚡️', color: 'bg-energetic-orange', textColor: 'text-orange-600', darkTextColor: 'dark:text-orange-400' },
  Tired: { emoji: '😴', color: 'bg-mood-tired', textColor: 'text-gray-600', darkTextColor: 'dark:text-gray-400' },
  Anxious: { emoji: '😟', color: 'bg-anxious-gray', textColor: 'text-slate-600', darkTextColor: 'dark:text-slate-400' },
  Sad: { emoji: '😢', color: 'bg-sad-blue', textColor: 'text-gray-700', darkTextColor: 'dark:text-gray-400' },
  Angry: { emoji: '😠', color: 'bg-mood-angry', textColor: 'text-red-600', darkTextColor: 'dark:text-red-400' },
  Overwhelmed: { emoji: '🤯', color: 'bg-mood-overwhelmed', textColor: 'text-purple-600', darkTextColor: 'dark:text-purple-400' },
  Lonely: { emoji: '😔', color: 'bg-mood-lonely', textColor: 'text-indigo-600', darkTextColor: 'dark:text-indigo-400' },
};