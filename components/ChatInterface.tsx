import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Message } from '../types';
import { Role } from '../types';
import { geminiService } from '../services/geminiService';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { useAppContext } from '../contexts/AppContext';
import { MOODS } from '../constants';

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1.5 p-2">
    <div className="w-2 h-2 bg-primary-pink rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-primary-pink rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-primary-pink rounded-full animate-bounce"></div>
  </div>
);

const CompanionAvatar: React.FC<{ isThinking: boolean }> = ({ isThinking }) => {
    const [mood, setMood] = useState('Peaceful');

    useEffect(() => {
        setMood(localStorage.getItem('userMood') || 'Peaceful');
    }, []);

    const getAvatarIcon = () => {
        switch (mood) {
            case 'Happy':
            case 'Energetic':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 14.5C9.5 15.5 11 16 12 16C13 16 14.5 15.5 15.5 14.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10H9.01" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10H15.01" />
                    </svg>
                );
            case 'Sad':
            case 'Anxious':
                return (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 15.5C9.5 14.5 11 14 12 14C13 14 14.5 14.5 15.5 15.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10H9.01" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10H15.01" />
                    </svg>
                );
            case 'Peaceful':
            default:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 15H15.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10H9.01" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10H15.01" />
                    </svg>
                );
        }
    };
    return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-accent-cream to-primary-pink transition-all duration-500 ${isThinking ? 'animate-pulse-breathing' : ''}`}>
            {getAvatarIcon()}
        </div>
    );
};


const getInitialMessage = (): string => {
    const mood = localStorage.getItem('userMood');
    switch (mood) {
        case 'Happy':
            return "Hello, I'm HereU. It's wonderful to see you're feeling happy! I'm here to share in your joy. What's on your mind?";
        case 'Peaceful':
            return "Hello, I'm HereU. It seems you're in a calm space right now, which is lovely. I'm here to sit with you in this peace. What would you like to talk about?";
        case 'Anxious':
            return "Hello, I'm HereU. I can sense that you might be feeling anxious, and I want you to know I'm right here with you. Take a gentle breath. We can go through this together.";
        case 'Sad':
            return "Hello, I'm HereU. I'm so sorry you're feeling sad right now. Please know that it's okay to not be okay, and I'm here to listen with an open heart whenever you're ready.";
        case 'Energetic':
            return "Hello, I'm HereU. It's great that you're feeling energetic! Let's channel that amazing energy. What's sparking your excitement today?";
        default:
            return "Hello, I'm HereU, your mental health companion. I'm here for you. How are you feeling today?";
    }
};

interface ChatInterfaceProps {
    onNavigateBack: () => void;
    onCrisisDetected: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onNavigateBack, onCrisisDetected }) => {
  const { t } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: Role.MODEL,
      content: getInitialMessage(),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moodEmoji, setMoodEmoji] = useState('😊');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const mood = localStorage.getItem('userMood') || 'Peaceful';
    const emoji = MOODS[mood]?.emoji || '😌';
    setMoodEmoji(emoji);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    const userMessage: Message = { role: Role.USER, content: userInput };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    let modelResponse = '';
    const modelMessage: Message = { role: Role.MODEL, content: '' };
    setMessages(prev => [...prev, modelMessage]);

    await geminiService.sendMessageStream(
      newMessages,
      userInput,
      (chunk) => {
        modelResponse += chunk;
        setMessages(prev => {
            const updatedMessages = [...prev];
            updatedMessages[updatedMessages.length - 1] = { ...updatedMessages[updatedMessages.length - 1], content: modelResponse };
            return updatedMessages;
        });
        scrollToBottom();
      },
      onCrisisDetected
    );

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
        <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-card rounded-t-2xl">
            <button onClick={onNavigateBack} className="mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label={t('chat_back_button_label')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <CompanionAvatar isThinking={isLoading}/>
            <div className="ml-4">
                <h1 className="text-xl font-headings font-bold text-gray-800 dark:text-gray-100">{t('chat_header_title')}</h1>
                <p className="text-sm text-primary-pink">{t('chat_header_status')}</p>
            </div>
        </header>
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-chat-bg-start to-chat-bg-end">
            {messages.map((msg, index) => (
              <MessageBubble key={index} message={msg} emoji={moodEmoji} />
            ))}
            {isLoading && (
                <div className="flex w-full items-end gap-2 justify-start animate-slide-in">
                    <div className="text-2xl pb-1">{moodEmoji}</div>
                    <div className="bg-white dark:bg-dark-bg-card border border-gray-200 dark:border-gray-600 rounded-lg rounded-bl-none p-3 max-w-sm shadow-sm">
                        <TypingIndicator />
                    </div>
                </div>
            )}
        </div>
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;