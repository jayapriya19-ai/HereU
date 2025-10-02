import React, { useState, useEffect } from 'react';
import type { BreathingExercise } from '../../data/breathing';
import { useAppContext } from '../../contexts/AppContext';

interface BreathingSessionProps {
    exercise: BreathingExercise;
    onEndSession: () => void;
}

const BreathingSession: React.FC<BreathingSessionProps> = ({ exercise, onEndSession }) => {
    const { t } = useAppContext();
    const [patternIndex, setPatternIndex] = useState(0);
    const [countdown, setCountdown] = useState(exercise.pattern[0].duration);
    const [totalTime, setTotalTime] = useState(0);

    const currentPattern = exercise.pattern[patternIndex];
    const totalDurationSeconds = exercise.totalDurationMinutes * 60;

    useEffect(() => {
        const sessionInterval = setInterval(() => {
            setTotalTime(prev => {
                if (prev >= totalDurationSeconds) {
                    clearInterval(sessionInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(sessionInterval);
    }, [totalDurationSeconds]);
    
    useEffect(() => {
        if (totalTime >= totalDurationSeconds) {
            onEndSession();
            return;
        }

        const countdownInterval = setInterval(() => {
            setCountdown(prev => {
                if (prev > 1) {
                    return prev - 1;
                }
                
                // Move to next pattern
                const nextIndex = (patternIndex + 1) % exercise.pattern.length;
                setPatternIndex(nextIndex);
                return exercise.pattern[nextIndex].duration;
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [countdown, patternIndex, exercise.pattern, totalTime, totalDurationSeconds, onEndSession]);

    const progressPercentage = (totalTime / totalDurationSeconds) * 100;

    return (
        <div className="relative h-full w-full flex flex-col justify-between animate-fade-in">
            <img src={exercise.imageUrl} alt={t(exercise.titleKey)} className="absolute inset-0 w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            
            <header className="relative z-10 p-4 flex justify-end">
                 <button onClick={onEndSession} className="px-4 py-2 text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors">
                    {t('breathing_player_end_session')}
                </button>
            </header>

            <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-white text-center p-4">
                <div 
                    key={patternIndex}
                    className="w-48 h-48 rounded-full bg-white/20 flex items-center justify-center"
                    style={{
                        animation: `pulse-breathing ${currentPattern.duration}s ease-in-out infinite`,
                    }}
                >
                    <div className="w-40 h-40 rounded-full bg-white/20 flex flex-col items-center justify-center">
                         <span className="text-xl font-semibold">{t(currentPattern.nameKey)}</span>
                         <span className="text-6xl font-thin font-mono">{countdown}</span>
                    </div>
                </div>
                 <h1 className="text-3xl font-headings font-bold mt-8">{t(exercise.titleKey)}</h1>
            </div>
            
            <footer className="relative z-10 p-6 space-y-4">
                 <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </footer>
        </div>
    );
};

export default BreathingSession;
