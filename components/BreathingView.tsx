import React, { useState } from 'react';
import BreathingExerciseSelection from './breathing/BreathingExerciseSelection';
import BreathingSession from './breathing/BreathingSession';
import type { BreathingExercise } from '../data/breathing';

interface BreathingViewProps {
    onNavigateBack: () => void;
}

const BreathingView: React.FC<BreathingViewProps> = ({ onNavigateBack }) => {
    const [selectedExercise, setSelectedExercise] = useState<BreathingExercise | null>(null);

    if (selectedExercise) {
        return <BreathingSession exercise={selectedExercise} onEndSession={() => setSelectedExercise(null)} />;
    }

    return <BreathingExerciseSelection onSelectExercise={setSelectedExercise} onNavigateBack={onNavigateBack} />;
};

export default BreathingView;
