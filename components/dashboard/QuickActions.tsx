

import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

// FIX: Changed JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const ActionButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; isMain?: boolean; }> = ({ icon, label, onClick, isMain }) => {
    const mainClasses = "bg-primary-pink text-white transform -translate-y-6 scale-110 shadow-lg";
    const regularClasses = "bg-white/80 dark:bg-dark-bg-card/80 text-primary-pink";

    return (
        <button onClick={onClick} className="flex flex-col items-center space-y-1 group" aria-label={label}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isMain ? mainClasses : regularClasses}`}>
                {icon}
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</span>
        </button>
    );
};

const PlanIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.5 3H8.5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
      <path d="M12 3v18" />
      <path d="M12 18h3.5" />
      <path d="M12 14h3.5" />
      <path d="M12 10h3.5" />
      <path d="M12 6h3.5" />
    </svg>
);


const QuickActions: React.FC<{ 
    onNavigateToChat: () => void; 
    onNavigateToJournal: () => void; 
    onNavigateToMeditation: () => void; 
    onNavigateToBreathe: () => void;
    onNavigateToHelp: () => void;
    onNavigateToPlan: () => void;
    onCrisisDetected: () => void;
}> = ({ onNavigateToChat, onNavigateToJournal, onNavigateToMeditation, onNavigateToBreathe, onNavigateToHelp, onNavigateToPlan, onCrisisDetected }) => {
    const { t } = useAppContext();
    return (
        <div className="px-4 py-2 bg-white/50 dark:bg-dark-bg-card/50 backdrop-blur-sm rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex justify-around items-center">
                <ActionButton label={t('dashboard_actions_breathe')} onClick={onNavigateToBreathe} icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m.929-7.071l2.121 2.121M18.95 18.95l-2.122-2.121" />
                    </svg>
                } />
                <ActionButton label={t('dashboard_actions_journal')} onClick={onNavigateToJournal} icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                } />
                 <ActionButton label={t('dashboard_actions_talk')} onClick={onNavigateToChat} isMain icon={
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                } />
                <ActionButton label={t('dashboard_actions_plan')} onClick={onNavigateToPlan} icon={
                    <PlanIcon className="w-8 h-8" />
                } />
                <ActionButton label={t('dashboard_actions_help')} onClick={onNavigateToHelp} icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                } />
            </div>
        </div>
    );
};

export default QuickActions;