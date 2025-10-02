import React, { useState } from 'react';
import YogaLibrary from './yoga/YogaLibrary';
import YogaPlayer from './yoga/YogaPlayer';
import type { YogaProgram } from '../data/yoga';

interface YogaViewProps {
    onNavigateBack: () => void;
}

const YogaView: React.FC<YogaViewProps> = ({ onNavigateBack }) => {
    const [selectedProgram, setSelectedProgram] = useState<YogaProgram | null>(null);

    if (selectedProgram) {
        return <YogaPlayer program={selectedProgram} onEndSession={() => setSelectedProgram(null)} />;
    }

    return <YogaLibrary onSelectProgram={setSelectedProgram} onNavigateBack={onNavigateBack} />;
};

export default YogaView;