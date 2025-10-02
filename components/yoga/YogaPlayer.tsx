import React, { useState, useEffect, useRef } from 'react';
import type { YogaProgram } from '../../data/yoga';
import { useAppContext } from '../../contexts/AppContext';

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
);

const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
);

interface YogaPlayerProps {
    program: YogaProgram;
    onEndSession: () => void;
}

const YogaPlayer: React.FC<YogaPlayerProps> = ({ program, onEndSession }) => {
    const { t } = useAppContext();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
    const [secondsInPose, setSecondsInPose] = useState(program.poses[0].durationSeconds);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isPlaying) {
            timer = setInterval(() => {
                setSecondsInPose(prev => {
                    if (prev > 1) {
                        return prev - 1;
                    } else {
                        // Move to next pose
                        if (currentPoseIndex < program.poses.length - 1) {
                            setCurrentPoseIndex(currentPoseIndex + 1);
                            return program.poses[currentPoseIndex + 1].durationSeconds;
                        } else {
                            // End of session
                            setIsPlaying(false);
                            return 0;
                        }
                    }
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isPlaying, currentPoseIndex, program.poses]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (videoElement) {
            if (isPlaying) {
                const playPromise = videoElement.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // This error is expected if the user pauses or navigates away
                        // before the media has fully started. We can safely ignore it.
                    });
                }
            } else {
                videoElement.pause();
            }
        }

        return () => {
            if (videoElement) {
                videoElement.pause();
            }
        };
    }, [isPlaying]);

    const currentPose = program.poses[currentPoseIndex];
    const nextPose = program.poses[currentPoseIndex + 1];

    return (
        <div className="relative h-full w-full flex flex-col justify-between animate-fade-in bg-black">
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                loop
                muted
                playsInline
            >
                <source src={program.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 flex items-center justify-center p-12 pointer-events-none">
                 <img 
                    key={currentPoseIndex}
                    src={currentPose.animatedImageUrl} 
                    alt={t(currentPose.nameKey)} 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fade-in"
                 />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <header className="relative z-10 p-4 flex justify-end">
                 <button onClick={onEndSession} className="px-4 py-2 text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors">
                    {t('yoga_player_end_session')}
                </button>
            </header>

            <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-white text-center p-4">
                 <h1 className="text-4xl font-headings font-bold drop-shadow-lg">{t(currentPose.nameKey)}</h1>
                 <p className="mt-2 text-8xl font-mono font-thin drop-shadow-lg">{secondsInPose}</p>
                 {nextPose && <p className="mt-4 text-gray-300 drop-shadow-lg">{t('yoga_player_next_pose')} {t(nextPose.nameKey)}</p>}
            </div>
            
            <footer className="relative z-10 p-6 space-y-4">
                 <div className="flex items-center justify-center">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 rounded-full flex items-center justify-center bg-white/30 text-white backdrop-blur-md transition-transform hover:scale-105"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? <PauseIcon className="w-10 h-10" /> : <PlayIcon className="w-10 h-10 pl-1" />}
                    </button>
                 </div>
                 {/* Pose Sequence Bar */}
                 <div className="flex w-full justify-center items-center space-x-2">
                    {program.poses.map((pose, index) => (
                        <div key={index} className="flex-1 h-1.5 rounded-full bg-white/30">
                            <div className={`h-full rounded-full ${index < currentPoseIndex ? 'bg-white' : ''} ${index === currentPoseIndex ? 'bg-white' : ''} transition-all duration-1000`}
                                 style={{ width: index === currentPoseIndex ? `${100 - (secondsInPose / pose.durationSeconds) * 100}%` : '100%' }}
                            ></div>
                        </div>
                    ))}
                 </div>
            </footer>
        </div>
    );
};

export default YogaPlayer;