import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import type { Goal } from '../../data/wellnessPlan';

const Confetti: React.FC = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-24 h-24">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-confetti-burst" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-confetti-burst" style={{ animationDelay: '0.1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-confetti-burst" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full animate-confetti-burst" style={{ animationDelay: '0.3s' }}></div>
        </div>
    </div>
);


const GoalItem: React.FC<{ goal: Goal; isCompleted: boolean; onToggle: () => void; }> = ({ goal, isCompleted, onToggle }) => {
    const { t } = useAppContext();
    const [showConfetti, setShowConfetti] = React.useState(false);

    const handleToggle = () => {
        onToggle();
        if (!isCompleted) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 800);
        }
    };
    
    return (
        <div className={`flex items-center p-3 rounded-xl transition-colors ${isCompleted ? 'bg-green-100/50 dark:bg-green-900/30' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
            <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl ${isCompleted ? 'bg-green-200 dark:bg-green-800' : 'bg-gray-200 dark:bg-gray-600'}`}>
                {goal.icon}
            </div>
            <div className="ml-4 flex-grow">
                <p className={`font-bold font-headings ${isCompleted ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-800 dark:text-gray-100'}`}>{t(goal.titleKey)}</p>
                <p className={`text-sm ${isCompleted ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>{t(goal.descriptionKey)}</p>
            </div>
            <div className="relative ml-4">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleToggle}
                    className="appearance-none h-8 w-8 border-2 border-primary-pink rounded-lg checked:bg-primary-pink checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink/50 cursor-pointer"
                />
                 {isCompleted && (
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                )}
                {showConfetti && <Confetti />}
            </div>
        </div>
    );
};


interface DailyPlanProps {
    goals: Goal[];
    completedGoalIds: string[];
    onToggleGoal: (goalId: string) => void;
}

const DailyPlan: React.FC<DailyPlanProps> = ({ goals, completedGoalIds, onToggleGoal }) => {
    const { t } = useAppContext();
    const progress = (completedGoalIds.length / goals.length) * 100;
    
    return (
        <div className="p-5 rounded-2xl bg-white/80 dark:bg-dark-bg-card/80 shadow-md">
            <h3 className="font-headings font-bold text-gray-800 dark:text-gray-100 mb-1">{t('plan_daily_goals_title')}</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div className="bg-primary-pink h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="space-y-3">
                {goals.map(goal => (
                    <GoalItem 
                        key={goal.id} 
                        goal={goal} 
                        isCompleted={completedGoalIds.includes(goal.id)}
                        onToggle={() => onToggleGoal(goal.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DailyPlan;