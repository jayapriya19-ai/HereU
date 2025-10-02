import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import Settings from '../common/Settings';

const getGreetingKey = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'dashboard_header_greeting_morning';
    if (hour >= 12 && hour < 17) return 'dashboard_header_greeting_afternoon';
    if (hour >= 17 && hour < 21) return 'dashboard_header_greeting_evening';
    return 'dashboard_header_greeting_night';
};

const ProfileAura: React.FC = () => {
    const [glowColor, setGlowColor] = useState('#6DD5FA'); // calm-blue default

    useEffect(() => {
        const mood = localStorage.getItem('userMood');
        switch (mood) {
            case 'Happy': setGlowColor('#FFD93D'); break;
            case 'Anxious': setGlowColor('#CBD5E0'); break;
            case 'Sad': setGlowColor('#4A5568'); break;
            case 'Energetic': setGlowColor('#FF6B35'); break;
            default: setGlowColor('#6DD5FA'); break;
        }
    }, []);

    return (
        <div className="relative w-16 h-16">
            <div 
                className="absolute inset-0 rounded-full animate-glow"
                style={{ '--glow-color': glowColor } as React.CSSProperties}
            ></div>
            <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent-cream to-primary-pink flex items-center justify-center">
                 <span className="text-3xl">🧘</span>
            </div>
            <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-secondary-peach text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg z-20">
                <span>{localStorage.getItem('streak') || 1}🔥</span>
            </div>
        </div>
    );
};


const Header: React.FC = () => {
    const { t } = useAppContext();

    useEffect(() => {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('lastVisitDate');

        if (lastVisit !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const currentStreak = parseInt(localStorage.getItem('streak') || '0', 10);

            if (lastVisit === yesterday.toDateString()) {
                localStorage.setItem('streak', (currentStreak + 1).toString());
            } else {
                localStorage.setItem('streak', '1');
            }
            localStorage.setItem('lastVisitDate', today);
        }
    }, []);

    return (
        <header className="p-4 flex items-center justify-between sticky top-0 bg-white/50 dark:bg-dark-bg-card/50 backdrop-blur-sm z-10 rounded-t-2xl">
            <div className="flex-1">
                <h1 className="text-2xl font-headings font-bold text-gray-800 dark:text-gray-100">{t(getGreetingKey())},</h1>
                <p className="text-gray-600 dark:text-gray-300">{t('dashboard_header_subtitle')}</p>
            </div>
            <div className="flex items-center space-x-2">
                <Settings />
                <ProfileAura />
            </div>
        </header>
    );
};

export default Header;