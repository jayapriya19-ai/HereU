import React, { useState, useEffect } from 'react';
import { getMoodForDate } from '../../utils/moods';
import { useAppContext } from '../../contexts/AppContext';

const Ring: React.FC<{ progress: number; color: string; label: string }> = ({ progress, color, label }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <svg className="w-24 h-24 transform -rotate-90">
                <circle
                    className="text-gray-200 dark:text-gray-600"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="48"
                    cy="48"
                />
                <circle
                    className={`${color} animate-ring-draw`}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="48"
                    cy="48"
                    style={{ '--ring-offset': offset } as React.CSSProperties}
                />
            </svg>
            <span className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">{label}</span>
        </div>
    );
};


const WellnessScore: React.FC = () => {
    const { t } = useAppContext();
    const [moodProgress, setMoodProgress] = useState(50); // Default to 50%

    useEffect(() => {
        const todayMood = getMoodForDate(new Date());
        if (todayMood) {
            // Intensity is 1-10, progress is 0-100
            setMoodProgress(todayMood.intensity * 10);
        }
    }, []);
    
    // Static data for other rings
    return (
        <div className="p-5 rounded-2xl bg-white/80 dark:bg-dark-bg-card/80 shadow-md animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="font-headings font-bold text-gray-800 dark:text-gray-100 mb-4">{t('dashboard_wellness_title')}</h3>
            <div className="flex justify-around">
                <Ring progress={75} color="text-ring-sleep" label={t('dashboard_wellness_sleep')} />
                <Ring progress={moodProgress} color="text-ring-mood" label={t('dashboard_wellness_mood')} />
                <Ring progress={50} color="text-ring-activity" label={t('dashboard_wellness_activity')} />
            </div>
        </div>
    );
};

export default WellnessScore;