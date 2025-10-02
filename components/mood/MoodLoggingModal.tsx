import React, { useState } from 'react';
import { MOODS } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

interface MoodLoggingModalProps {
    moodName: string;
    onClose: () => void;
    onSave: (moodName: string, intensity: number) => void;
}

const MoodLoggingModal: React.FC<MoodLoggingModalProps> = ({ moodName, onClose, onSave }) => {
    const { t, theme } = useAppContext();
    const [intensity, setIntensity] = useState(5);
    const moodData = MOODS[moodName];

    if (!moodData) return null;

    const handleSave = () => {
        onSave(moodName, intensity);
    };

    const textColorClass = theme === 'dark' ? moodData.darkTextColor : moodData.textColor;

    return (
        <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-dark-bg-card rounded-2xl shadow-xl w-full max-w-sm m-4 p-6 text-center animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <span className="text-7xl">{moodData.emoji}</span>
                <h2 className={`text-3xl font-headings font-bold mt-2 ${textColorClass}`}>{moodName}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2 mb-6">{t('mood_modal_prompt')}</p>
                
                <div className="my-4">
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={intensity}
                        onChange={(e) => setIntensity(parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-pink"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 px-1">
                        <span>{t('mood_modal_intensity_low')}</span>
                        <span className="font-bold text-lg text-primary-pink -mt-1">{intensity}</span>
                        <span>{t('mood_modal_intensity_high')}</span>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full px-6 py-3 mt-4 font-bold text-white rounded-full bg-primary-pink hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all transform hover:scale-105"
                >
                    {t('mood_modal_save_button')}
                </button>
            </div>
        </div>
    );
};

export default MoodLoggingModal;