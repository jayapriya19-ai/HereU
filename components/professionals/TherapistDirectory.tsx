import React, { useState } from 'react';
import { THERAPISTS_DATA } from '../../data/therapists';
import type { Therapist } from '../../data/therapists';
import TherapistProfile from './TherapistProfile';
import { useAppContext } from '../../contexts/AppContext';

const TherapistCard: React.FC<{ therapist: Therapist; onSelect: () => void }> = ({ therapist, onSelect }) => {
    return (
        <div
            className="flex items-center p-4 bg-white/80 dark:bg-dark-bg-card/80 rounded-2xl shadow-md cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-primary-pink/50 transition-all animate-slide-up"
            onClick={onSelect}
        >
            <img src={therapist.imageUrl} alt={therapist.name} className="w-20 h-20 rounded-full object-cover" />
            <div className="ml-4">
                <h3 className="font-headings font-bold text-lg text-gray-800 dark:text-gray-100">{therapist.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{therapist.specializations.join(', ')}</p>
            </div>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </div>
    );
};

const TherapistDirectory: React.FC = () => {
    const { t } = useAppContext();
    const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);

    if (selectedTherapist) {
        return <TherapistProfile therapist={selectedTherapist} onBack={() => setSelectedTherapist(null)} />;
    }

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-lg font-headings font-bold text-gray-800 dark:text-gray-100 px-2">{t('therapist_directory_title')}</h2>
            {THERAPISTS_DATA.map((therapist, index) => (
                <div key={therapist.id} style={{ animationDelay: `${index * 100}ms` }}>
                    <TherapistCard therapist={therapist} onSelect={() => setSelectedTherapist(therapist)} />
                </div>
            ))}
        </div>
    );
};

export default TherapistDirectory;