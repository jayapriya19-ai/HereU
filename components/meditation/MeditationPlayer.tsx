import React, { useState, useEffect, useRef } from 'react';
import type { Meditation } from '../../data/meditations';
import { useAppContext } from '../../contexts/AppContext';

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
);

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

interface MeditationPlayerProps {
    meditation: Meditation;
    onEndSession: () => void;
}

const MeditationPlayer: React.FC<MeditationPlayerProps> = ({ meditation, onEndSession }) => {
    const { t } = useAppContext();
    const [isPlaying, setIsPlaying] = useState(false);
    const totalDurationSeconds = meditation.durationMinutes * 60;
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isPlaying && secondsElapsed < totalDurationSeconds) {
            interval = setInterval(() => {
                setSecondsElapsed(prev => prev + 1);
            }, 1000);
        } else if (secondsElapsed >= totalDurationSeconds) {
            setIsPlaying(false);
        }
        
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying, secondsElapsed, totalDurationSeconds]);
    
    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            if (isPlaying) {
                const playPromise = audioElement.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // This error is expected if the user pauses or navigates away
                        // before the media has fully started. We can safely ignore it.
                    });
                }
            } else {
                audioElement.pause();
            }
        }
        
        return () => {
            if (audioElement) {
                audioElement.pause();
            }
        };
    }, [isPlaying]);

    const progressPercentage = (secondsElapsed / totalDurationSeconds) * 100;

    return (
        <div className="relative h-full w-full flex flex-col justify-between animate-fade-in">
            <audio ref={audioRef} loop>
                <source src={meditation.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <img src={meditation.imageUrl} alt={t(meditation.titleKey)} className="absolute inset-0 w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-black/50"></div>
            
            <header className="relative z-10 p-4 flex justify-end">
                 <button onClick={onEndSession} className="px-4 py-2 text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors">
                    {t('meditation_player_end_session')}
                </button>
            </header>

            <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-white text-center p-4">
                 <h1 className="text-3xl font-headings font-bold">{t(meditation.titleKey)}</h1>
                 <p className="mt-2 text-lg">{t(meditation.descriptionKey)}</p>
            </div>
            
            <footer className="relative z-10 p-6 space-y-4">
                 <div className="flex items-center justify-center">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`w-20 h-20 rounded-full flex items-center justify-center bg-white/30 text-white backdrop-blur-md transition-transform hover:scale-105 ${isPlaying ? 'animate-player-pulse' : ''}`}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? <PauseIcon className="w-10 h-10" /> : <PlayIcon className="w-10 h-10 pl-1" />}
                    </button>
                 </div>
                 <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="flex justify-between text-xs font-mono">
                    <span>{formatTime(secondsElapsed)}</span>
                    <span>{formatTime(totalDurationSeconds)}</span>
                </div>
            </footer>
        </div>
    );
};

export default MeditationPlayer;