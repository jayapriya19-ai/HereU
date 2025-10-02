import React, { useState, useMemo } from 'react';
import { inspirationalQuotes } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const InspirationCard: React.FC = () => {
    const { t } = useAppContext();
    const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * inspirationalQuotes.length));

    const currentQuote = useMemo(() => inspirationalQuotes[quoteIndex], [quoteIndex]);

    const handleNextQuote = () => {
        setQuoteIndex((prevIndex) => (prevIndex + 1) % inspirationalQuotes.length);
    };

    return (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-accent-lavender/80 to-secondary-coral/80 text-white shadow-lg relative overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="relative z-10">
                <p className="font-body text-lg italic">"{currentQuote.quote}"</p>
                <p className="text-right font-headings font-bold mt-2">- {currentQuote.author}</p>
            </div>
            <button onClick={handleNextQuote} className="absolute bottom-2 right-2 p-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors z-10" aria-label={t('dashboard_inspiration_new_quote_label')}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5" />
                </svg>
            </button>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-16 -right-5 w-40 h-40 bg-white/10 rounded-full"></div>
        </div>
    );
};

export default InspirationCard;