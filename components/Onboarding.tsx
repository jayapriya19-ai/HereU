import React, { useState } from 'react';
import { MOODS } from '../constants';
import { useAppContext, Language } from '../contexts/AppContext';

const NewHereULogo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="w-40 h-40 p-2 bg-primary-pink rounded-lg flex flex-col items-center justify-center">
            <svg viewBox="0 0 100 80" className="w-full h-full text-white">
                 <circle cx="50" cy="40" r="35" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                 {/* Top hand */}
                 <path d="M25 42 C 40 22, 60 22, 75 32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                 <path d="M28 47 C 43 27, 63 27, 78 37" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                 <path d="M31 52 C 46 32, 66 32, 81 42" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                 {/* Bottom hand */}
                 <path d="M75 48 C 60 68, 40 68, 25 58" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                 <path d="M72 53 C 57 73, 37 73, 22 63" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                 <path d="M69 58 C 54 78, 34 78, 19 68" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
        </div>
        <p className="mt-3 text-2xl font-headings text-gray-700 dark:text-gray-200 tracking-[0.2em]">
            WE ARE HERE
        </p>
    </div>
);


interface StepProps {
    onNext: () => void;
    children: React.ReactNode;
    isNextDisabled?: boolean;
    nextText?: string;
}

const OnboardingStep: React.FC<StepProps> = ({ children, onNext, isNextDisabled, nextText }) => {
  const { t } = useAppContext();
  return (
    <div className="flex flex-col items-center justify-between h-full p-8 text-center animate-slide-up">
        <div className="flex-grow flex flex-col items-center justify-center w-full">
            {children}
        </div>
        <button
            onClick={onNext}
            disabled={isNextDisabled}
            className="w-full max-w-xs px-6 py-3 mt-8 font-bold text-white rounded-full bg-primary-pink hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all transform hover:scale-105"
        >
            {nextText || t('onboarding_next')}
        </button>
    </div>
  )
};

const ProgressDots: React.FC<{ total: number; current: number }> = ({ total, current }) => (
  <div className="flex justify-center items-center space-x-2 py-4">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          i + 1 === current ? 'bg-primary-pink scale-125' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      />
    ))}
  </div>
);


const Onboarding: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t, setLanguage } = useAppContext();
  const [step, setStep] = useState(1);
  const [personality, setPersonality] = useState('');
  const [mood, setMood] = useState('');
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<Language | null>(null);

  const handleFinish = () => {
    if (!personality || !mood) return;
    localStorage.setItem('userPersonality', personality);
    localStorage.setItem('userMood', mood);
    onComplete();
  };
  
  const personalities = [
    { id: 'Gentle Friend', name: t('onboarding_personality_friend_name'), description: t('onboarding_personality_friend_desc') },
    { id: 'Motivational Coach', name: t('onboarding_personality_coach_name'), description: t('onboarding_personality_coach_desc') },
    { id: 'Calm Listener', name: t('onboarding_personality_listener_name'), description: t('onboarding_personality_listener_desc') },
  ];

  const languages: { code: Language; native: string; english: string; flag: string; greeting: string; }[] = [
    { code: 'ta', native: 'தமிழ்', english: 'Tamil', flag: '🇮🇳', greeting: 'வரவேற்கிறோம்' },
    { code: 'hi', native: 'हिन्दी', english: 'Hindi', flag: '🇮🇳', greeting: 'स्वागत है' },
    { code: 'en', native: 'English', english: 'English', flag: '🇬🇧', greeting: 'Welcome' },
  ];

  const onboardingMoods = ['Happy', 'Peaceful', 'Anxious', 'Sad', 'Energetic'];
  
  const handleLanguageSelect = (lang: typeof languages[0]) => {
    setSelectedLanguageCode(lang.code);
    setLanguage(lang.code);
    
    try {
        const utterance = new SpeechSynthesisUtterance(lang.greeting);
        utterance.lang = lang.code === 'en' ? 'en-GB' : `${lang.code}-IN`;

        utterance.onend = () => {
            setTimeout(() => setStep(3), 500);
        };
        window.speechSynthesis.speak(utterance);
    } catch (error) {
        console.error("Speech synthesis failed:", error);
        setTimeout(() => setStep(3), 1000);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <OnboardingStep onNext={() => setStep(2)} nextText={t('onboarding_get_started')}>
            <div className="opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" style={{ animationDelay: '0.2s' }}>
              <NewHereULogo />
            </div>
            <h1 className="mt-6 text-4xl font-bold font-headings text-gray-800 dark:text-gray-100 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" style={{ animationDelay: '0.5s' }}>{t('onboarding_welcome_title')}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300 opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" style={{ animationDelay: '0.8s' }}>{t('onboarding_welcome_subtitle')}</p>
          </OnboardingStep>
        );
      case 2:
        return (
           <div className="flex flex-col h-full p-8 text-center animate-slide-up">
                <header className="flex items-center justify-between w-full max-w-sm mx-auto mb-8">
                    <button className="text-gray-500 dark:text-gray-400 opacity-0">← Skip</button>
                    <h2 className="text-xl font-bold font-headings text-gray-800 dark:text-gray-100">Welcome</h2>
                    <button className="text-gray-500 dark:text-gray-400 opacity-0">×</button>
                </header>
                <div className="flex-grow flex flex-col items-center justify-center w-full">
                    <h2 className="text-2xl font-bold font-headings text-gray-800 dark:text-gray-100 mb-2">{t('onboarding_language_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">உங்கள் மொழியைத் தேர்ந்தெடுக்கவும் / अपनी भाषा चुनें</p>
                    <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                        {languages.map(lang => (
                            <button 
                                key={lang.code} 
                                onClick={() => handleLanguageSelect(lang)}
                                className={`relative p-4 border-2 rounded-xl text-left transition-all transform hover:scale-105 hover:shadow-lg ${selectedLanguageCode === lang.code ? 'border-primary-pink ring-2 ring-primary-pink' : 'border-gray-200 dark:border-gray-600'}`}
                            >
                                <div className="flex items-center">
                                    <span className="text-3xl mr-4">{lang.flag}</span>
                                    <div>
                                        <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">{lang.native}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{lang.english}</p>
                                    </div>
                                </div>
                                {selectedLanguageCode === lang.code && (
                                   <div className="absolute top-1/2 right-4 -translate-y-1/2 w-6 h-6 bg-primary-pink rounded-full flex items-center justify-center text-white animate-fade-in">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
      case 3:
        return (
          <OnboardingStep onNext={() => setStep(4)} isNextDisabled={!personality}>
             <h2 className="text-2xl font-bold font-headings text-gray-800 dark:text-gray-100 mb-8">{t('onboarding_personality_title')}</h2>
             <div className="grid grid-cols-1 gap-4 w-full">
                {personalities.map(p => (
                    <button key={p.id} onClick={() => setPersonality(p.id)} className={`p-4 border-2 rounded-lg text-left transition-all ${personality === p.id ? 'border-primary-pink ring-2 ring-primary-pink' : 'border-gray-200 dark:border-gray-600 hover:border-primary-pink'}`}>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{p.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{p.description}</p>
                    </button>
                ))}
             </div>
          </OnboardingStep>
        );
      case 4:
        return (
            <OnboardingStep onNext={() => setStep(5)} isNextDisabled={!mood}>
                <h2 className="text-2xl font-bold font-headings text-gray-800 dark:text-gray-100 mb-8">{t('onboarding_mood_title')}</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {onboardingMoods.map(moodName => {
                        const moodData = MOODS[moodName];
                        if (!moodData) return null;
                        return (
                            <button key={moodName} onClick={() => setMood(moodName)} className={`flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 transition-transform transform hover:scale-110 ${mood === moodName ? 'border-primary-pink' : 'border-transparent'}`}>
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${moodData.color.replace('bg-', 'bg-')}/20`}>
                                    <span className="text-4xl">{moodData.emoji}</span>
                                </div>
                                <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{moodName}</span>
                            </button>
                        );
                    })}
                </div>
            </OnboardingStep>
        );
      case 5:
        return (
          <OnboardingStep onNext={handleFinish} nextText={t('onboarding_start_chatting')}>
            <h2 className="text-2xl font-bold font-headings text-gray-800 dark:text-gray-100">{t('onboarding_privacy_title')}</h2>
            <p className="mt-4 max-w-sm text-gray-600 dark:text-gray-300">
                {t('onboarding_privacy_desc')}
            </p>
          </OnboardingStep>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full bg-light-bg/50 dark:bg-dark-bg/50 flex flex-col">
        <div className="flex-grow">
            {renderStepContent()}
        </div>
        <ProgressDots total={5} current={step} />
    </div>
  );
};

export default Onboarding;