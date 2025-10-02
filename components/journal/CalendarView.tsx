import React, { useState } from 'react';
import { getMoodHistory } from '../../utils/moods';
import { useAppContext } from '../../contexts/AppContext';

const CalendarView: React.FC = () => {
    const { language } = useAppContext();
    const [currentDate, setCurrentDate] = useState(new Date());
    const moodHistory = getMoodHistory();

    const changeMonth = (amount: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + amount);
            return newDate;
        });
    };

    const renderHeader = () => {
        const dateFormat = new Intl.DateTimeFormat(language, { month: 'long', year: 'numeric' });
        return (
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                     <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 className="text-lg font-headings font-bold text-gray-700 dark:text-gray-200">
                    {dateFormat.format(currentDate)}
                </h2>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                     <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const dayFormat = new Intl.DateTimeFormat(language, { weekday: 'short' });
        const date = new Date(2024, 0, 7); // A Sunday
        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className="text-center text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">
                    {dayFormat.format(date)}
                </div>
            );
            date.setDate(date.getDate() + 1);
        }
        return <div className="grid grid-cols-7">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(startDate.getDate() - monthStart.getDay());
        const endDate = new Date(monthEnd);
        if (monthEnd.getDay() !== 6) {
           endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
        }

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = new Date(day);
                const dateKey = cloneDay.toISOString().split('T')[0];
                const moodEntry = moodHistory[dateKey];

                days.push(
                    <div
                        className="h-12 flex items-center justify-center"
                        key={day.toString()}
                        onClick={() => moodEntry && alert(`On ${cloneDay.toLocaleDateString()}, you felt ${moodEntry.mood} (Intensity: ${moodEntry.intensity})`)}
                    >
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                                !isSameMonth(day, monthStart)
                                    ? 'text-gray-300 dark:text-gray-600'
                                    : moodEntry
                                    ? `${moodEntry.color} text-white font-bold cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-primary-teal`
                                    : 'text-gray-700 dark:text-gray-300'
                            }`}
                        >
                            <span>{day.getDate()}</span>
                        </div>
                    </div>
                );
                day.setDate(day.getDate() + 1);
            }
            rows.push(<div className="grid grid-cols-7" key={day.toString()}>{days}</div>);
            days = [];
        }
        return <div>{rows}</div>;
    };
    
    const isSameMonth = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    };

    return (
        <div className="p-4 bg-white/80 dark:bg-dark-bg-card/80 rounded-2xl shadow-md">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
};

export default CalendarView;