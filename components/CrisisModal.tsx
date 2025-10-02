import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

const BREATHING_CYCLE_SECONDS = {
    in: 4,
    hold: 7,
    out: 8,
};

const CrisisModal: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
    const { t } = useAppContext();
    const [breathState, setBreathState] = useState<'in' | 'hold' | 'out'>('in');
    const [countdown, setCountdown] = useState(BREATHING_CYCLE_SECONDS.in);
    const [trustedContactNumber, setTrustedContactNumber] = useState<string | null>(null);

    useEffect(() => {
        // Fetch trusted contact from localStorage when component mounts
        setTrustedContactNumber(localStorage.getItem('trustedContact'));
        
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev > 1) {
                    return prev - 1;
                }
                
                if (breathState === 'in') {
                    setBreathState('hold');
                    return BREATHING_CYCLE_SECONDS.hold;
                } else if (breathState === 'hold') {
                    setBreathState('out');
                    return BREATHING_CYCLE_SECONDS.out;
                } else { // out
                    setBreathState('in');
                    return BREATHING_CYCLE_SECONDS.in;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [breathState]);

    const getBreathText = () => {
        switch (breathState) {
            case 'in': return 'Breathe In...';
            case 'hold': return 'Hold...';
            case 'out': return 'Breathe Out...';
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-red-500 to-orange-400 z-50 flex flex-col items-center justify-center p-6 text-white text-center animate-fade-in">
            <div className="flex-grow flex flex-col items-center justify-center">
                <div 
                    className="w-48 h-48 rounded-full bg-white/20 flex items-center justify-center animate-crisis-pulse"
                >
                    <div className="w-40 h-40 rounded-full bg-white/20 flex flex-col items-center justify-center">
                         <span className="text-xl font-semibold">{getBreathText()}</span>
                         <span className="text-6xl font-thin font-mono">{countdown}</span>
                    </div>
                </div>

                <h1 className="text-3xl font-headings font-bold mt-8">{t('crisis_modal_title')}</h1>
                <p className="max-w-md mt-4 text-lg">
                    {t('crisis_modal_message')}
                </p>
            </div>

            <div className="w-full max-w-md space-y-4">
                <a href="tel:18005990019" className="block w-full px-6 py-4 font-bold text-lg text-red-600 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-transform transform hover:scale-105">
                    {t('crisis_modal_helpline_button')} (1800-599-0019)
                </a>
                 {trustedContactNumber && (
                    <a href={`tel:${trustedContactNumber}`} className="block w-full px-6 py-4 font-bold text-lg text-orange-600 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-transform transform hover:scale-105">
                        {t('crisis_modal_contact_button')}
                    </a>
                )}
                <button
                    onClick={onDismiss}
                    className="w-full px-6 py-3 mt-4 text-sm text-white/80 bg-transparent border-2 border-white/50 rounded-full hover:bg-white/10 transition-colors"
                >
                    {t('crisis_modal_dismiss_button')}
                </button>
            </div>
        </div>
    );
};

export default CrisisModal;