import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { getPlanForMood, WellnessPlan, ACHIEVEMENTS_DATA, Achievement } from '../data/wellnessPlan';
import { hasActivePlan, generateNewPlan, getCompletedGoalsForToday, toggleGoalCompletion, getUnlockedAchievements, unlockAchievement } from '../utils/plan';
import DailyPlan from './plan/DailyPlan';
import Achievements from './plan/Achievements';

const PlanGenerator: React.FC<{ onGenerate: () => void }> = ({ onGenerate }) => {
    const { t } = useAppContext();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            generateNewPlan();
            onGenerate();
        }, 3000); // Simulate AI thinking
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
            <span className="text-5xl mb-4">✨</span>
            <h2 className="text-2xl font-headings font-bold text-gray-800 dark:text-gray-100">{t('plan_generate_title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md">{t('plan_generate_desc')}</p>
            {isGenerating ? (
                <div className="mt-8">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary-teal"></div>
                    <p className="mt-4 text-primary-teal font-semibold overflow-hidden whitespace-nowrap border-r-4 border-r-primary-teal animate-typewriter">
                        {t('plan_generating_text')}
                    </p>
                </div>
            ) : (
                <button
                    onClick={handleGenerate}
                    className="w-full max-w-xs px-6 py-3 mt-8 font-bold text-white rounded-full bg-primary-teal hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-teal transition-all transform hover:scale-105"
                >
                    {t('plan_generate_button')}
                </button>
            )}
        </div>
    );
};

interface WellnessPlanViewProps {
    onNavigateBack: () => void;
}

const WellnessPlanView: React.FC<WellnessPlanViewProps> = ({ onNavigateBack }) => {
    const { t } = useAppContext();
    const [plan, setPlan] = useState<WellnessPlan | null>(null);
    const [completedGoals, setCompletedGoals] = useState<string[]>([]);
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

    useEffect(() => {
        if (hasActivePlan()) {
            loadPlan();
        }
    }, []);

    const loadPlan = () => {
        const lastMood = localStorage.getItem('userMood');
        const generatedPlan = getPlanForMood(lastMood);
        setPlan(generatedPlan);
        setCompletedGoals(getCompletedGoalsForToday());
        setUnlockedAchievements(getUnlockedAchievements());
        
        // Unlock "first plan" achievement if it's not already
        if (!getUnlockedAchievements().includes('first_plan')) {
            unlockAchievement('first_plan');
            setUnlockedAchievements(getUnlockedAchievements());
        }
    };

    const handleGoalToggle = (goalId: string) => {
        toggleGoalCompletion(goalId);
        setCompletedGoals(getCompletedGoalsForToday());
        // Check for achievements after goal completion
        checkAndUnlockAchievements();
    };
    
    const checkAndUnlockAchievements = () => {
        // Simple check for "all goals for a day"
        if (plan && getCompletedGoalsForToday().length === plan.dailyGoals.length) {
            if (!unlockedAchievements.includes('all_goals_day')) {
                unlockAchievement('all_goals_day');
                setUnlockedAchievements(getUnlockedAchievements());
            }
        }
    };

    return (
        <div className="flex flex-col h-full bg-light-bg/30 dark:bg-dark-bg/30">
            <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-dark-bg-card/50 rounded-t-2xl sticky top-0 z-10">
                <button onClick={onNavigateBack} className="mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label={t('chat_back_button_label')}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-headings font-bold text-gray-800 dark:text-gray-100">{t('plan_generate_title')}</h1>
            </header>
            <div className="flex-grow overflow-y-auto">
                {!plan ? (
                    <PlanGenerator onGenerate={loadPlan} />
                ) : (
                    <div className="p-4 space-y-6">
                        <DailyPlan 
                            goals={plan.dailyGoals}
                            completedGoalIds={completedGoals}
                            onToggleGoal={handleGoalToggle}
                        />
                        <div className="p-5 rounded-2xl bg-white/80 dark:bg-dark-bg-card/80 shadow-md">
                            <h3 className="font-headings font-bold text-gray-800 dark:text-gray-100">{t('plan_weekly_challenge_title')}</h3>
                            <p className="text-primary-teal font-semibold mt-2">{t(plan.weeklyChallenge.titleKey)}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{t(plan.weeklyChallenge.descriptionKey)}</p>
                        </div>
                        <Achievements 
                            allAchievements={ACHIEVEMENTS_DATA}
                            unlockedAchievementIds={unlockedAchievements}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WellnessPlanView;
