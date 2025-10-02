import type { TranslationKeys } from "./i18n/locales";
import { MoodEntry } from "./utils/moods";

export interface Goal {
    id: string;
    titleKey: TranslationKeys;
    descriptionKey: TranslationKeys;
    icon: string;
}

export interface Challenge {
    id: string;
    titleKey: TranslationKeys;
    descriptionKey: TranslationKeys;
}

export interface Achievement {
    id: string;
    titleKey: TranslationKeys;
    descriptionKey: TranslationKeys;
    icon: string;
    type: 'streak' | 'goal_completion' | 'first_action';
    goalId?: string; // for goal_completion
    count?: number; // for goal_completion
    value?: number; // for streak
}

export interface WellnessPlan {
    mood: string;
    dailyGoals: Goal[];
    weeklyChallenge: Challenge;
}

const goals: { [key: string]: Goal } = {
    meditate5: { id: 'meditate5', titleKey: 'goal_meditate_5_min_title', descriptionKey: 'goal_meditate_5_min_desc', icon: '🧘' },
    walk10: { id: 'walk10', titleKey: 'goal_walk_10_min_title', descriptionKey: 'goal_walk_10_min_desc', icon: '🚶' },
    journal1: { id: 'journal1', titleKey: 'goal_journal_1_entry_title', descriptionKey: 'goal_journal_1_entry_desc', icon: '📝' },
    hydrate: { id: 'hydrate', titleKey: 'goal_hydrate_title', descriptionKey: 'goal_hydrate_desc', icon: '💧' },
    stretch5: { id: 'stretch5', titleKey: 'goal_stretch_5_min_title', descriptionKey: 'goal_stretch_5_min_desc', icon: '🤸' },
    gratitude3: { id: 'gratitude3', titleKey: 'goal_gratitude_3_things_title', descriptionKey: 'goal_gratitude_3_things_desc', icon: '🙏' },
};

const challenges: { [key: string]: Challenge } = {
    connect3: { id: 'connect3', titleKey: 'challenge_connect_3_friends_title', descriptionKey: 'challenge_connect_3_friends_desc' },
    screenFree: { id: 'screenFree', titleKey: 'challenge_screen_free_hour_title', descriptionKey: 'challenge_screen_free_hour_desc' },
};

export const WELLNESS_PLANS_DATA: WellnessPlan[] = [
    { mood: 'Anxious', dailyGoals: [goals.meditate5, goals.journal1, goals.hydrate], weeklyChallenge: challenges.screenFree },
    { mood: 'Sad', dailyGoals: [goals.gratitude3, goals.walk10, goals.journal1], weeklyChallenge: challenges.connect3 },
    { mood: 'Happy', dailyGoals: [goals.walk10, goals.hydrate, goals.journal1], weeklyChallenge: challenges.connect3 },
    { mood: 'Peaceful', dailyGoals: [goals.meditate5, goals.stretch5, goals.hydrate], weeklyChallenge: challenges.screenFree },
    { mood: 'Energetic', dailyGoals: [goals.walk10, goals.stretch5, goals.hydrate], weeklyChallenge: challenges.connect3 },
    // Default/fallback plan
    { mood: 'Default', dailyGoals: [goals.meditate5, goals.walk10, goals.journal1], weeklyChallenge: challenges.connect3 },
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
    { id: 'first_plan', titleKey: 'achievement_first_plan_title', descriptionKey: 'achievement_first_plan_desc', icon: '🛠️', type: 'first_action' },
    { id: 'streak_3_day', titleKey: 'achievement_streak_3_day_title', descriptionKey: 'achievement_streak_3_day_desc', icon: '🔥', type: 'streak', value: 3 },
    { id: 'all_goals_day', titleKey: 'achievement_all_goals_day_title', descriptionKey: 'achievement_all_goals_day_desc', icon: '🏆', type: 'goal_completion', goalId: 'all' },
    { id: 'meditate_5', titleKey: 'achievement_meditate_5_sessions_title', descriptionKey: 'achievement_meditate_5_sessions_desc', icon: '🧘‍♀️', type: 'goal_completion', goalId: 'meditate5', count: 5 },
];

export const getPlanForMood = (mood?: string | null): WellnessPlan => {
    if (!mood) return WELLNESS_PLANS_DATA.find(p => p.mood === 'Default')!;
    const plan = WELLNESS_PLANS_DATA.find(p => p.mood === mood);
    return plan || WELLNESS_PLANS_DATA.find(p => p.mood === 'Default')!;
};
