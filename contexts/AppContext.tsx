import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { translations, TranslationKeys } from '../i18n/locales';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'ta' | 'hi';

interface AppContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: TranslationKeys) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        return (localStorage.getItem('theme') as Theme) || 'light';
    });

    const [language, setLanguageState] = useState<Language>(() => {
        return (localStorage.getItem('language') as Language) || 'en';
    });
    
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);
    
    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage);
    };

    const t = useMemo(() => (key: TranslationKeys): string => {
        return translations[language][key] || translations['en'][key] || key;
    }, [language]);

    const value = { theme, setTheme, language, setLanguage, t };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
