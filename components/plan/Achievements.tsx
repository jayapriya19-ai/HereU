import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import type { Achievement } from '../../data/wellnessPlan';

const Badge: React.FC<{ achievement: Achievement, isUnlocked: boolean }> = ({ achievement, isUnlocked }) => {
    const { t } = useAppContext();

    return (
        <div className={`flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 ${isUnlocked ? 'bg-amber-100/50 dark:bg-amber-900/30' : 'bg-gray-100 dark:bg-gray-700/50'}`}>
            <div className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${isUnlocked ? 'bg-gradient-to-br from-amber-300 to-orange-400' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`text-3xl transition-transform ${isUnlocked ? 'animate-badge-unlock' : 'grayscale'}`}>{achievement.icon}</span>
            </div>
            <p className={`mt-2 font-bold font-headings text-sm ${isUnlocked ? 'text-amber-800 dark:text-amber-200' : 'text-gray-600 dark:text-gray-400'}`}>{t(achievement.titleKey)}</p>
            <p className={`text-xs mt-1 ${isUnlocked ? 'text-amber-700 dark:text-amber-300' : 'text-gray-500 dark:text-gray-500'}`}>{t(achievement.descriptionKey)}</p>
        </div>
    );
};


interface AchievementsProps {
    allAchievements: Achievement[];
    unlockedAchievementIds: string[];
}

const Achievements: React.FC<AchievementsProps> = ({ allAchievements, unlockedAchievementIds }) => {
    const { t } = useAppContext();

    return (
        <div className="p-5 rounded-2xl bg-white/80 dark:bg-dark-bg-card/80 shadow-md">
            <h3 className="font-headings font-bold text-gray-800 dark:text-gray-100 mb-4">{t('plan_achievements_title')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {allAchievements.map(ach => (
                    <Badge key={ach.id} achievement={ach} isUnlocked={unlockedAchievementIds.includes(ach.id)} />
                ))}
            </div>
        </div>
    );
};

export default Achievements;
