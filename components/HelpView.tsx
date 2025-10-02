import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import TherapistDirectory from './professionals/TherapistDirectory';
import ResourceLibrary from './resources/ResourceLibrary';
import CommunityForum from './community/CommunityForum';

type ActiveTab = 'therapists' | 'community' | 'resources';

interface HelpViewProps {
    onNavigateBack: () => void;
    onCrisisDetected: () => void;
}

const HelpView: React.FC<HelpViewProps> = ({ onNavigateBack, onCrisisDetected }) => {
    const { t } = useAppContext();
    const [activeTab, setActiveTab] = useState<ActiveTab>('therapists');

    const TabButton: React.FC<{ tabName: ActiveTab; label: string }> = ({ tabName, label }) => (
        <button
            onClick={() => setActiveTab(tabName)}
            className={`flex-1 py-3 text-center font-bold font-headings transition-all duration-300 border-b-4 ${
                activeTab === tabName
                    ? 'text-primary-teal border-primary-teal'
                    : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-primary-teal/80'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="flex flex-col h-full bg-light-bg/30 dark:bg-dark-bg/30">
            <header className="flex items-center p-4 bg-white/50 dark:bg-dark-bg-card/50 rounded-t-2xl sticky top-0 z-10">
                <button onClick={onNavigateBack} className="mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label={t('chat_back_button_label')}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-headings font-bold text-gray-800 dark:text-gray-100">{t('help_center_title')}</h1>
            </header>
            
            <div className="p-4 bg-red-100/50 dark:bg-red-900/20 flex items-center justify-between gap-4">
                <p className="text-sm text-red-800 dark:text-red-200">{t('help_center_crisis_banner_text')}</p>
                <button onClick={onCrisisDetected} className="px-3 py-1.5 text-sm font-bold text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors flex-shrink-0">
                    {t('help_center_crisis_banner_button')}
                </button>
            </div>
            
            <div className="flex border-b border-gray-200 dark:border-gray-700">
                <TabButton tabName="therapists" label={t('help_center_tab_therapists')} />
                <TabButton tabName="community" label={t('help_center_tab_community')} />
                <TabButton tabName="resources" label={t('help_center_tab_resources')} />
            </div>

            <div className="flex-grow overflow-y-auto">
                {activeTab === 'therapists' && <TherapistDirectory />}
                {activeTab === 'community' && <CommunityForum />}
                {activeTab === 'resources' && <ResourceLibrary />}
            </div>
        </div>
    );
};

export default HelpView;