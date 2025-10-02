

import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import JournalView from './components/JournalView';
import { useAppContext } from './contexts/AppContext';
import MeditationView from './components/MeditationView';
import BreathingView from './components/BreathingView';
import CrisisModal from './components/CrisisModal';
import HelpView from './components/HelpView';
import SplashScreen from './components/SplashScreen';
import WellnessPlanView from './components/WellnessPlanView';

type View = 'onboarding' | 'dashboard' | 'chat' | 'journal' | 'meditation' | 'breathe' | 'help' | 'plan';

const App: React.FC = () => {
  const { t } = useAppContext();
  const [isLoading, setIsLoading] = useState(true); // For splash screen
  const [currentView, setCurrentView] = useState<View>(() => {
    const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';
    return onboardingComplete ? 'dashboard' : 'onboarding';
  });
  const [isCrisisMode, setIsCrisisMode] = useState(false);

  useEffect(() => {
    // Simulate app loading and show splash screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3-second splash screen
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setCurrentView('dashboard');
  };
  
  const handleCrisisDetected = () => {
      setIsCrisisMode(true);
  };

  const handleCrisisDismiss = () => {
      setIsCrisisMode(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        return <Dashboard 
                  onNavigateToChat={() => setCurrentView('chat')} 
                  onNavigateToJournal={() => setCurrentView('journal')} 
                  onNavigateToMeditation={() => setCurrentView('meditation')}
                  onNavigateToBreathe={() => setCurrentView('breathe')}
                  onNavigateToHelp={() => setCurrentView('help')}
                  onNavigateToPlan={() => setCurrentView('plan')}
                  onCrisisDetected={handleCrisisDetected}
               />;
      case 'chat':
        return <ChatInterface onNavigateBack={() => setCurrentView('dashboard')} onCrisisDetected={handleCrisisDetected} />;
      case 'journal':
        return <JournalView onNavigateBack={() => setCurrentView('dashboard')} />;
      case 'meditation':
        return <MeditationView onNavigateBack={() => setCurrentView('dashboard')} />;
      case 'breathe':
        return <BreathingView onNavigateBack={() => setCurrentView('dashboard')} />;
      case 'help':
        return <HelpView onNavigateBack={() => setCurrentView('dashboard')} onCrisisDetected={handleCrisisDetected} />;
      case 'plan':
        return <WellnessPlanView onNavigateBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard 
                  onNavigateToChat={() => setCurrentView('chat')} 
                  onNavigateToJournal={() => setCurrentView('journal')}
                  onNavigateToMeditation={() => setCurrentView('meditation')}
                  onNavigateToBreathe={() => setCurrentView('breathe')}
                  onNavigateToHelp={() => setCurrentView('help')}
                  onNavigateToPlan={() => setCurrentView('plan')}
                  onCrisisDetected={handleCrisisDetected}
                />;
    }
  };
  
  if (isLoading) {
      return <SplashScreen />;
  }

  return (
    <div className={`font-body w-full h-screen bg-gradient-to-br from-primary-pink to-secondary-peach flex flex-col items-center justify-center p-4 transition-colors duration-1000`}>
      {isCrisisMode && <CrisisModal onDismiss={handleCrisisDismiss} />}
      <main className="w-full max-w-2xl h-full flex flex-col bg-white dark:bg-dark-bg-card backdrop-blur-lg rounded-2xl shadow-2xl shadow-primary-pink/10 overflow-hidden">
        {renderView()}
      </main>
      <footer className="text-center text-xs text-gray-700 dark:text-gray-200 mt-2">
        <p>{t('footer_crisis_text')}</p>
      </footer>
    </div>
  );
};

export default App;