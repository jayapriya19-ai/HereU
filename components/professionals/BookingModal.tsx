import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface BookingModalProps {
    therapistName: string;
    onClose: () => void;
}

const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];

const BookingModal: React.FC<BookingModalProps> = ({ therapistName, onClose }) => {
    const { t } = useAppContext();
    const [selectedSlot, setSelectedSlot] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirm = () => {
        if (!selectedSlot) return;
        setIsConfirmed(true);
        setTimeout(() => {
            onClose();
        }, 2000); // Close modal after 2 seconds
    };
    
    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-dark-bg-card rounded-2xl shadow-xl w-full max-w-sm m-4 overflow-hidden animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {isConfirmed ? (
                    <div className="p-8 text-center">
                        <svg className="w-16 h-16 text-primary-pink mx-auto" viewBox="0 0 52 52">
                            <circle className="stroke-current text-gray-200 dark:text-gray-600" cx="26" cy="26" r="25" fill="none" strokeWidth="2"/>
                            <path className="stroke-current animate-checkmark-draw" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="48" strokeDashoffset="48" d="M14 27l5.917 4.93L37.083 22"/>
                        </svg>
                        <h2 className="text-2xl font-headings font-bold mt-4 text-gray-800 dark:text-gray-100">{t('booking_modal_success')}</h2>
                    </div>
                ) : (
                    <div className="p-6">
                        <h2 className="text-xl font-headings font-bold text-gray-800 dark:text-gray-100">{t('booking_modal_title')}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">with {therapistName}</p>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 mb-2">{t('booking_modal_desc')}</p>
                        <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map(slot => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`p-2 border-2 rounded-lg text-center font-semibold transition-colors ${
                                        selectedSlot === slot
                                            ? 'bg-primary-pink border-primary-pink text-white'
                                            : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-pink'
                                    }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleConfirm}
                            disabled={!selectedSlot}
                            className="w-full px-6 py-3 mt-6 font-bold text-white rounded-full bg-primary-pink hover:opacity-90 disabled:bg-gray-300 dark:disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all"
                        >
                            {t('booking_modal_confirm')}
                        </button>
                    </div>
                )}
                 <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full bg-black/10 text-gray-600 dark:bg-white/10 dark:text-gray-300 hover:bg-black/20 dark:hover:bg-white/20 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default BookingModal;