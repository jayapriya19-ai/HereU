import React, { useState } from 'react';
import type { Therapist } from '../../data/therapists';
import { useAppContext } from '../../contexts/AppContext';
import BookingModal from './BookingModal';

interface TherapistProfileProps {
    therapist: Therapist;
    onBack: () => void;
}

const TherapistProfile: React.FC<TherapistProfileProps> = ({ therapist, onBack }) => {
    const { t } = useAppContext();
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    
    return (
        <div className="flex flex-col h-full animate-slide-up">
            {isBookingModalOpen && <BookingModal therapistName={therapist.name} onClose={() => setIsBookingModalOpen(false)} />}
            
            <div className="p-4 flex-shrink-0">
                <button onClick={onBack} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-pink transition-colors mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>{t('help_center_tab_therapists')}</span>
                </button>
            </div>
            
            <div className="flex-grow overflow-y-auto px-4 pb-4">
                <div className="flex flex-col items-center text-center">
                    <img src={therapist.imageUrl} alt={therapist.name} className="w-32 h-32 rounded-full object-cover shadow-lg mb-4" />
                    <h1 className="text-2xl font-headings font-bold text-gray-800 dark:text-gray-100">{therapist.name}</h1>
                    <p className="text-primary-pink font-semibold">{therapist.specializations.join(' • ')}</p>
                </div>
                
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-headings font-bold text-gray-800 dark:text-gray-100 mb-2">About</h3>
                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{t(therapist.bioKey)}</p>
                    
                    <h3 className="font-headings font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">Languages</h3>
                    <p className="text-gray-600 dark:text-gray-300">{therapist.languages.join(', ')}</p>
                </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-dark-bg-card/50 backdrop-blur-sm space-y-3">
                 <button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full px-6 py-3 font-bold text-white rounded-full bg-primary-pink hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all transform hover:scale-105"
                >
                    {t('therapist_profile_book')}
                </button>
                <button 
                    onClick={() => alert('Data sharing feature coming soon!')}
                    className="w-full px-6 py-3 font-bold text-primary-pink bg-pink-100/50 dark:bg-pink-900/30 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all"
                >
                    {t('therapist_profile_share')}
                </button>
            </div>
        </div>
    );
};

export default TherapistProfile;