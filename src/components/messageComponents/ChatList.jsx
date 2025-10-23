import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const ChatList = ({ conversations, selectedConversation, onSelectConversation, currentUserId, onlineUsers }) => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {conversations.map((conversation) => {
        // Get the other user's details
        const otherUser = conversation.participantDetails.find(
          (p) => p.id !== currentUserId
        );

        if (!otherUser) return null;

        const isOnline = onlineUsers.has(otherUser.id);
        const isSelected = selectedConversation?._id === conversation._id;
        const lastMessage = conversation.lastMessage;
        const isUnread = lastMessage && lastMessage.senderId !== currentUserId;

        return (
          <button
            key={conversation._id}
            onClick={() => onSelectConversation(conversation)}
            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
              isSelected ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={otherUser.photo || 'https://via.placeholder.com/40'}
                alt={otherUser.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {/* Online indicator */}
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {otherUser.name}
                </h3>
                {lastMessage && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: true })}
                  </span>
                )}
              </div>

              {/* Role Badge */}
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-1 ${
                otherUser.role === 'tutor' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {otherUser.role === 'tutor' ? '👨‍🏫 Tutor' : '👨‍🎓 Student'}
              </span>

              {/* Last Message */}
              {lastMessage ? (
                <p className={`text-sm truncate ${
                  isUnread 
                    ? 'font-semibold text-gray-900 dark:text-white' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {lastMessage.senderId === currentUserId && 'You: '}
                  {lastMessage.text}
                </p>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500 italic">
                  No messages yet
                </p>
              )}
            </div>

            {/* Unread indicator */}
            {isUnread && (
              <div className="flex-shrink-0">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ChatList;