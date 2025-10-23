import React, { useState, useEffect, useContext } from 'react';
import { MessageCircle, Search, X } from 'lucide-react';
import axios from 'axios';
import { useSocket } from '../../Contextes/useSocket';
import ChatWindow from '../../components/messageComponents/ChatWindow';
import ChatList from '../../components/messageComponents/ChatList';
import { ContextValue } from '../../Contextes/AllContexts';

const MessagesPage = () => {
  const { user } = useContext(ContextValue);
  const { socket, connected, onlineUsers } = useSocket();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const apiURL = import.meta.env.VITE_api_url;

  // Fetch conversations on mount
  useEffect(() => {
    if (user?.email) {
      fetchConversations();
      fetchUnreadCount();
    }
  }, [user]);

  // Listen for new messages
  useEffect(() => {
    if (socket) {
      socket.on('message:receive', (message) => {
        // Update last message in conversation list
        setConversations((prev) =>
          prev.map((conv) =>
            conv._id === message.conversationId.toString()
              ? {
                  ...conv,
                  lastMessage: {
                    text: message.text,
                    senderId: message.senderId,
                    timestamp: message.createdAt,
                  },
                  updatedAt: new Date(),
                }
              : conv
          ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        );

        // Update unread count if message is not from current user
        if (message.senderId !== user.email) {
          setUnreadCount((prev) => prev + 1);
        }
      });

      socket.on('notification:new_message', (data) => {
        // Show browser notification if supported
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`New message from ${data.senderName}`, {
            body: data.text,
            icon: '/logo.png',
          });
        }
      });

      return () => {
        socket.off('message:receive');
        socket.off('notification:new_message');
      };
    }
  }, [socket, user]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiURL}/api/conversations/user/${user.email}`);
      if (response.data.success) {
        setConversations(response.data.conversations);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/conversations/unread/${user.email}`);
      if (response.data.success) {
        setUnreadCount(response.data.unreadCount);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // Mark as read when opening
    if (socket) {
      socket.emit('message:read', conversation._id);
    }
  };

  const filteredConversations = conversations.filter((conv) => {
    const otherUser = conv.participantDetails.find((p) => p.id !== user.email);
    return otherUser?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-t-2xl p-6 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {connected ? (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Connected
                    </span>
                  ) : (
                    'Connecting...'
                  )}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full font-semibold">
                {unreadCount} unread
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Interface */}
        <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-250px)]">
            {/* Left Sidebar - Conversation List */}
            <div className="border-r border-gray-200 dark:border-gray-700 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Conversation List */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-4">
                    <MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchQuery ? 'No conversations found' : 'No messages yet'}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                      Start a conversation with a tutor
                    </p>
                  </div>
                ) : (
                  <ChatList
                    conversations={filteredConversations}
                    selectedConversation={selectedConversation}
                    onSelectConversation={handleSelectConversation}
                    currentUserId={user.email}
                    onlineUsers={onlineUsers}
                  />
                )}
              </div>
            </div>

            {/* Right Side - Chat Window */}
            <div className="md:col-span-2">
              {selectedConversation ? (
                <ChatWindow
                  conversation={selectedConversation}
                  currentUserId={user.email}
                  currentUserName={user.displayName || user.name}
                  socket={socket}
                  onlineUsers={onlineUsers}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <MessageCircle className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a conversation from the left to start messaging
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;