import React, { useState, useEffect } from 'react';
import { MOODS } from '../../constants';
import { getMoodForDate, saveMoodForDate, MoodEntry } from '../../utils/moods';
import MoodLoggingModal from '../mood/MoodLoggingModal';
import { useAppContext } from '../../contexts/AppContext';

const Checkmark: React.FC = () => (
    <svg className="w-12 h-12 text-primary-teal" viewBox="0 0 52 52">
        <circle className="stroke-current text-gray-200 dark:text-gray-600" cx="26" cy="26" r="25" fill="none" strokeWidth="2"/>
        <path 
            className="stroke-current animate-checkmark-draw" 
            fill="none" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            strokeDasharray="48"
            strokeDashoffset="48"
            d="M14 27l5.917 4.93L37.083 22"
        />
    </svg>
);


const MoodCheckinWidget: React.FC<{ onMoodLogged: () => void }> = ({ onMoodLogged }) => {
    const { t } = useAppContext();
    const [todayMood, setTodayMood] = useState<MoodEntry | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMood, setSelectedMood] = useState('');

    useEffect(() => {
        const today = new Date();
        const mood = getMoodForDate(today);
        setTodayMood(mood);
    }, []);

    const handleMoodSelect = (moodName: string) => {
        setSelectedMood(moodName);
        setIsModalOpen(true);
    };

    const handleSaveMood = (moodName: string, intensity: number) => {
        const today = new Date();
        const moodData = MOODS[moodName];
        const newMoodEntry: MoodEntry = { mood: moodName, intensity, color: moodData.color, emoji: moodData.emoji };
        saveMoodForDate(today, newMoodEntry);
        setTodayMood(newMoodEntry);
        setIsModalOpen(false);
        onMoodLogged(); // Notify parent to re-render dependent components
    };

    const quickMoods = ['Happy', 'Peaceful', 'Anxious', 'Sad', 'Energetic'];

    return (
        <div className="p-5 rounded-2xl bg-white/80 dark:bg-dark-bg-card/80 shadow-md animate-slide-up" style={{ animationDelay: '300ms' }}>
             {isModalOpen && (
                <MoodLoggingModal
                    moodName={selectedMood}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveMood}
                />
            )}
            <h3 className="font-headings font-bold text-gray-800 dark:text-gray-100">{t('dashboard_mood_widget_title')}</h3>
            {todayMood ? (
                 <div className="flex flex-col items-center justify-center text-center mt-4">
                    <Checkmark />
                    <p className="text-gray-700 dark:text-gray-200 font-semibold mt-2">{t('dashboard_mood_widget_logged_title')}</p>
                    <div className="flex items-center mt-1">
                        <span className="text-2xl mr-2">{todayMood.emoji}</span>
                        <span className="text-gray-600 dark:text-gray-300">{todayMood.mood} ({t('dashboard_mood_widget_logged_intensity')}: {todayMood.intensity}/10)</span>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{t('dashboard_mood_widget_prompt')}</p>
                    <div className="flex justify-center items-center space-x-2 sm:space-x-4">
                        {quickMoods.map(moodName => {
                            const mood = MOODS[moodName];
                            if (!mood) return null;
                            return (
                                <button 
                                    key={moodName} 
                                    aria-label={moodName} 
                                    onClick={() => handleMoodSelect(moodName)}
                                    className="text-4xl transform hover:scale-125 transition-transform p-1"
                                >
                                    {mood.emoji}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default MoodCheckinWidget;