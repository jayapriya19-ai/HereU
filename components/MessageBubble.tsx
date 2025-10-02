

import React from 'react';
import type { Message } from '../types';
import { Role } from '../types';

interface MessageBubbleProps {
  message: Message;
  emoji?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, emoji }) => {
  const isUser = message.role === Role.USER;

  const bubbleClasses = isUser
    ? 'bg-primary-pink text-white rounded-br-none'
    : 'bg-white dark:bg-dark-bg-card text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700';
  
  const containerClasses = isUser 
    ? 'justify-end' 
    : 'justify-start';

  return (
    <div className={`flex w-full items-end gap-2 ${containerClasses} animate-slide-in`}>
      {!isUser && emoji && <div className="text-2xl pb-1">{emoji}</div>}
      <div className={`p-4 rounded-2xl max-w-md md:max-w-lg shadow-sm ${bubbleClasses}`}>
        {/* Render content only if it's not empty, prevents empty bubble on stream start */}
        {message.content && <p className="whitespace-pre-wrap">{message.content}</p>}
      </div>
    </div>
  );
};

export default MessageBubble;