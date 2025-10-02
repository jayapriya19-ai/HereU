import React from 'react';
import CalendarView from './journal/CalendarView';
import { useAppContext } from '../contexts/AppContext';

interface JournalViewProps {
    onNavigateBack: () => void;
}

const JournalView: React.FC<JournalViewProps> = ({ onNavigateBack }) => {
    const { t } = useAppContext();
    return (
        <div className="flex flex-col h-full bg-light-bg/30 dark:bg-dark-bg/30">
            <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-dark-bg-card/50 rounded-t-2xl sticky top-0 z-10">
                <button onClick={onNavigateBack} className="mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label={t('chat_back_button_label')}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-headings font-bold text-gray-800 dark:text-gray-100">{t('journal_header_title')}</h1>
            </header>
            <div className="flex-grow overflow-y-auto p-4">
                <CalendarView />
                 <div className="mt-6 p-4 rounded-2xl bg-white/80 dark:bg-dark-bg-card/80 shadow-md">
                    <h3 className="font-headings font-bold text-gray-800 dark:text-gray-100 mb-2">{t('journal_analytics_title')}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {t('journal_analytics_coming_soon')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JournalView;