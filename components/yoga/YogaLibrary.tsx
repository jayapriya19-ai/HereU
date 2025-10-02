import React from 'react';
import { YOGA_PROGRAMS_DATA, YogaProgram } from '../../data/yoga';
import { useAppContext } from '../../contexts/AppContext';

interface YogaCardProps {
    program: YogaProgram;
    onSelect: () => void;
}

const YogaCard: React.FC<YogaCardProps> = ({ program, onSelect }) => {
    const { t } = useAppContext();
    return (
        <div 
            className="relative rounded-2xl overflow-hidden shadow-lg h-48 group cursor-pointer animate-slide-up"
            onClick={onSelect}
        >
            <img src={program.imageUrl} alt={t(program.titleKey)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-lg font-headings font-bold mt-2">{t(program.titleKey)}</h3>
                <p className="text-sm font-body">{program.durationMinutes} MIN</p>
            </div>
        </div>
    );
};

interface YogaLibraryProps {
    onNavigateBack: () => void;
    onSelectProgram: (program: YogaProgram) => void;
}

const YogaLibrary: React.FC<YogaLibraryProps> = ({ onNavigateBack, onSelectProgram }) => {
    const { t } = useAppContext();
    return (
        <div className="flex flex-col h-full bg-light-bg/30 dark:bg-dark-bg/30">
            <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-dark-bg-card/50 rounded-t-2xl sticky top-0 z-10">
                <button onClick={onNavigateBack} className="mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label={t('chat_back_button_label')}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="text-xl font-headings font-bold text-gray-800 dark:text-gray-100">{t('yoga_library_title')}</h1>
            </header>
            <div className="flex-grow overflow-y-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {YOGA_PROGRAMS_DATA.map((program, index) => (
                        <div key={program.id} style={{ animationDelay: `${index * 100}ms`}}>
                            <YogaCard program={program} onSelect={() => onSelectProgram(program)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YogaLibrary;