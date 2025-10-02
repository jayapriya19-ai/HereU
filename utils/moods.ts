export interface MoodEntry {
    mood: string;
    intensity: number;
    color: string;
    emoji: string;
}

type MoodHistory = {
    [date: string]: MoodEntry;
};

const MOOD_HISTORY_KEY = 'moodHistory';

const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export const getMoodHistory = (): MoodHistory => {
    try {
        const historyJson = localStorage.getItem(MOOD_HISTORY_KEY);
        return historyJson ? JSON.parse(historyJson) : {};
    } catch (error) {
        console.error("Failed to parse mood history from localStorage", error);
        return {};
    }
};

export const saveMoodForDate = (date: Date, moodEntry: MoodEntry): void => {
    const history = getMoodHistory();
    const dateString = formatDate(date);
    history[dateString] = moodEntry;
    localStorage.setItem(MOOD_HISTORY_KEY, JSON.stringify(history));
};

export const getMoodForDate = (date: Date): MoodEntry | null => {
    const history = getMoodHistory();
    const dateString = formatDate(date);
    return history[dateString] || null;
};
