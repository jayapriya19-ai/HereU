import React, { useState } from 'react';
import MeditationLibrary from './meditation/MeditationLibrary';
import MeditationPlayer from './meditation/MeditationPlayer';
import type { Meditation } from '../data/meditations';

interface MeditationViewProps {
    onNavigateBack: () => void;
}

const MeditationView: React.FC<MeditationViewProps> = ({ onNavigateBack }) => {
    const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);

    if (selectedMeditation) {
        return <MeditationPlayer meditation={selectedMeditation} onEndSession={() => setSelectedMeditation(null)} />;
    }

    return <MeditationLibrary onSelectMeditation={setSelectedMeditation} onNavigateBack={onNavigateBack} />;
};

export default MeditationView;
