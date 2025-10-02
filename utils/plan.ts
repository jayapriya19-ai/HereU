export interface PlanState {
    planGeneratedDate: string | null; // ISO Date string for the start of the week
    completedGoals: { [date: string]: string[] }; // date -> goal IDs
    unlockedAchievements: string[];
}

const PLAN_STATE_KEY = 'wellnessPlanState';

const getStartDateOfWeek = (date: Date): string => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff)).toISOString().split('T')[0];
};

const getTodayDateString = (): string => {
    return new Date().toISOString().split('T')[0];
}

export const getPlanState = (): PlanState => {
    try {
        const stateJson = localStorage.getItem(PLAN_STATE_KEY);
        const defaultState: PlanState = {
            planGeneratedDate: null,
            completedGoals: {},
            unlockedAchievements: [],
        };
        return stateJson ? { ...defaultState, ...JSON.parse(stateJson) } : defaultState;
    } catch (error) {
        console.error("Failed to parse plan state from localStorage", error);
        return { planGeneratedDate: null, completedGoals: {}, unlockedAchievements: [] };
    }
};

export const savePlanState = (state: PlanState): void => {
    localStorage.setItem(PLAN_STATE_KEY, JSON.stringify(state));
};

export const hasActivePlan = (): boolean => {
    const state = getPlanState();
    if (!state.planGeneratedDate) return false;
    const planWeekStart = getStartDateOfWeek(new Date(state.planGeneratedDate));
    const currentWeekStart = getStartDateOfWeek(new Date());
    return planWeekStart === currentWeekStart;
};

export const generateNewPlan = (): void => {
    const state = getPlanState();
    state.planGeneratedDate = new Date().toISOString();
    savePlanState(state);
};

export const getCompletedGoalsForToday = (): string[] => {
    const state = getPlanState();
    const today = getTodayDateString();
    return state.completedGoals[today] || [];
};

export const toggleGoalCompletion = (goalId: string): void => {
    const state = getPlanState();
    const today = getTodayDateString();
    
    if (!state.completedGoals[today]) {
        state.completedGoals[today] = [];
    }

    const goalIndex = state.completedGoals[today].indexOf(goalId);
    if (goalIndex > -1) {
        state.completedGoals[today].splice(goalIndex, 1);
    } else {
        state.completedGoals[today].push(goalId);
    }
    
    savePlanState(state);
};

export const getUnlockedAchievements = (): string[] => {
    const state = getPlanState();
    return state.unlockedAchievements;
};

export const unlockAchievement = (achievementId: string): void => {
    const state = getPlanState();
    if (!state.unlockedAchievements.includes(achievementId)) {
        state.unlockedAchievements.push(achievementId);
        savePlanState(state);
    }
};
