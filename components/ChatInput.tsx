

import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const { t } = useAppContext();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-bg-card rounded-b-2xl">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('chat_input_placeholder')}
          className="flex-1 w-full px-4 py-3 bg-white text-gray-800 dark:bg-gray-800 dark:text-white border-2 border-primary-pink rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink/50 transition-shadow"
          disabled={isLoading}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="p-3 bg-primary-pink text-white rounded-full disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;