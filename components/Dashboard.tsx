import React from 'react';
import Header from './dashboard/Header';
import InspirationCard from './dashboard/InspirationCard';
import MoodCheckinWidget from './dashboard/MoodCheckinWidget';
import QuickActions from './dashboard/QuickActions';
import WellnessScore from './dashboard/WellnessScore';

interface DashboardProps {
    onNavigateToChat: () => void;
    onNavigateToJournal: () => void;
    onNavigateToMeditation: () => void;
    onNavigateToBreathe: () => void;
    onNavigateToHelp: () => void;
    onNavigateToPlan: () => void;
    onCrisisDetected: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToChat, onNavigateToJournal, onNavigateToMeditation, onNavigateToBreathe, onNavigateToHelp, onNavigateToPlan, onCrisisDetected }) => {
    // A simple key to force re-render of children when mood is logged
    const [moodLogKey, setMoodLogKey] = React.useState(0);
    const handleMoodLogged = () => setMoodLogKey(prev => prev + 1);

    return (
        <div className="flex flex-col h-full bg-light-bg/30 dark:bg-dark-bg/30">
            <div className="flex-grow overflow-y-auto">
              <Header key={`header-${moodLogKey}`} />
              <div className="p-4 space-y-6">
                  <InspirationCard />
                  <WellnessScore key={`wellness-${moodLogKey}`} />
                  <MoodCheckinWidget onMoodLogged={handleMoodLogged} />
              </div>
            </div>
            <QuickActions 
                onNavigateToChat={onNavigateToChat} 
                onNavigateToJournal={onNavigateToJournal}
                onNavigateToMeditation={onNavigateToMeditation}
                onNavigateToBreathe={onNavigateToBreathe}
                onNavigateToHelp={onNavigateToHelp}
                onNavigateToPlan={onNavigateToPlan}
                onCrisisDetected={onCrisisDetected}
            />
        </div>
    );
};

export default Dashboard;
