import React, { useState, useRef, useEffect } from 'react';
import { useAppContext, Language } from '../../contexts/AppContext';

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const languages: { code: Language; name: string; native: string; }[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
];

const Settings: React.FC = () => {
    const { t, theme, setTheme, language, setLanguage } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [trustedContact, setTrustedContact] = useState(localStorage.getItem('trustedContact') || '');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleSaveContact = () => {
        localStorage.setItem('trustedContact', trustedContact);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Open settings"
            >
                <SettingsIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-bg-card rounded-lg shadow-xl z-20 animate-fade-in" style={{ animationDuration: '0.15s'}}>
                    <div className="p-2 space-y-2">
                        {/* Theme Toggle */}
                        <div className="flex items-center justify-between px-2 py-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                            <button
                                onClick={handleThemeToggle}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                {theme === 'light' ? <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <SunIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
                            </button>
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-600"></div>
                        
                        {/* Language Selector */}
                         <div className="px-2 pt-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Language</span>
                         </div>
                        {languages.map(lang => (
                             <button
                                key={lang.code}
                                onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${language === lang.code ? 'bg-primary-pink/20 text-primary-pink font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                             >
                                 {lang.native}
                             </button>
                        ))}

                        <div className="border-t border-gray-200 dark:border-gray-600"></div>

                        {/* Trusted Contact */}
                        <div className="px-2 pt-1 space-y-2">
                             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('settings_trusted_contact')}</span>
                             <input 
                                type="tel"
                                value={trustedContact}
                                onChange={(e) => setTrustedContact(e.target.value)}
                                placeholder={t('settings_trusted_contact_placeholder')}
                                className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-pink/50"
                             />
                             <button onClick={handleSaveContact} className="w-full px-3 py-2 text-sm font-bold text-white bg-primary-pink rounded-md hover:opacity-90 transition-colors">
                                {t('settings_trusted_contact_save')}
                             </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;