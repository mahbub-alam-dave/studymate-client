import React, { useState, useEffect, useRef } from 'react';
import { Send, MoreVertical, Phone, Video } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';
import MessageInput from './MessageInput';

const ChatWindow = ({ conversation, currentUserId, currentUserName, socket, onlineUsers }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typingUser, setTypingUser] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const apiURL = import.meta.env.VITE_api_url;

  // Get other user details
  const otherUser = conversation.participantDetails.find(
    (p) => p.id !== currentUserId
  );
  const isOnline = onlineUsers.has(otherUser?.id);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (conversation._id) {
      fetchMessages();
      joinConversation();
    }
  }, [conversation._id,]);

  // Listen for new messages
  useEffect(() => {
    if (socket) {
      socket.on('message:receive', (message) => {
        if (message.conversationId === conversation._id || 
            message.conversationId.toString() === conversation._id) {
          setMessages((prev) => [...prev, message]);
          scrollToBottom();
        }
      });

      socket.on('typing:user', (data) => {
        if (data.userId !== currentUserId) {
          setTypingUser(data.userName);
          // Clear typing indicator after 3 seconds
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
          typingTimeoutRef.current = setTimeout(() => {
            setTypingUser(null);
          }, 3000);
        }
      });

      socket.on('typing:stop', (userId) => {
        if (userId !== currentUserId) {
          setTypingUser(null);
        }
      });

      return () => {
        socket.off('message:receive');
        socket.off('typing:user');
        socket.off('typing:stop');
      };
    }
  }, [socket, conversation._id, currentUserId]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiURL}/messages/conversation/${conversation._id}`
      );
      if (response.data.success) {
        setMessages(response.data.messages);
        setTimeout(scrollToBottom, 100);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinConversation = () => {
    if (socket) {
      socket.emit('conversation:join', conversation._id);
      socket.emit('message:read', conversation._id);
    }
  };

  const handleSendMessage = (text) => {
    if (!text.trim() || !socket) return;

    const messageData = {
      conversationId: conversation._id,
      senderId: currentUserId,
      senderName: currentUserName,
      text: text.trim(),
      receiverId: otherUser.id,
    };

    socket.emit('message:send', messageData);
  };

  const handleTyping = (isTyping) => {
    if (!socket) return;

    if (isTyping) {
      socket.emit('typing:start', {
        conversationId: conversation._id,
        userId: currentUserId,
        userName: currentUserName,
      });
    } else {
      socket.emit('typing:stop', {
        conversationId: conversation._id,
        userId: currentUserId,
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      const date = format(new Date(message.createdAt), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const formatDateLabel = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
      return 'Today';
    } else if (format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
      return 'Yesterday';
    } else {
      return format(date, 'MMMM dd, yyyy');
    }
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={otherUser?.photo || 'https://via.placeholder.com/40'}
                alt={otherUser?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {otherUser?.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
              <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
              <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
              <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">No messages yet</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Start the conversation by sending a message
              </p>
            </div>
          </div>
        ) : (
          <>
            {Object.entries(groupedMessages).map(([dateStr, msgs]) => (
              <div key={dateStr}>
                {/* Date Separator */}
                <div className="flex items-center justify-center my-4">
                  <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                    {formatDateLabel(dateStr)}
                  </span>
                </div>

                {/* Messages */}
                {msgs.map((message) => {
                  const isOwn = message.senderId === currentUserId;
                  return (
                    <div
                      key={message._id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          isOwn
                            ? 'bg-blue-500 text-white rounded-t-2xl rounded-bl-2xl'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-t-2xl rounded-br-2xl'
                        } px-4 py-2 shadow-sm`}
                      >
                        {!isOwn && (
                          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                            {message.senderName}
                          </p>
                        )}
                        <p className="text-sm break-words">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {format(new Date(message.createdAt), 'HH:mm')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Typing Indicator */}
            {typingUser && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl px-4 py-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
};

export default ChatWindow;