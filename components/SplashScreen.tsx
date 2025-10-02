import React from 'react';

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
        <p className="mt-3 text-2xl font-headings text-white tracking-[0.2em] opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" style={{ animationDelay: '1.5s'}}>
            WE ARE HERE
        </p>
    </div>
);


const SplashScreen: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary-pink to-secondary-peach text-white font-body animate-fade-in">
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="opacity-0 animate-[fade-in_0.5s_ease-out_forwards]" style={{ animationDelay: '0.5s' }}>
                    <NewHereULogo />
                </div>
                <h1 
                    className="text-5xl font-bold font-headings tracking-widest mt-4 opacity-0 animate-[fade-in_0.5s_ease-out_forwards] animate-text-glow"
                    style={{ animationDelay: '2.2s' }}
                >
                    HereU
                </h1>
                <p 
                    className="mt-2 text-lg opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
                    style={{ animationDelay: '2.5s' }}
                >
                    Your Mind Companion
                </p>
            </div>
            <div className="pb-12 text-sm text-white/50">
                Loading...
            </div>
        </div>
    );
};

export default SplashScreen;