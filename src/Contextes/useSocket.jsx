import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ContextValue } from './AllContexts';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const { user } = useContext(ContextValue);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [connected, setConnected] = useState(false);

  const socketURL = import.meta.env.VITE_socket_url || 'http://localhost:5000';

  useEffect(() => {
    if (user?.email) {
      // Initialize socket connection
      const newSocket = io(socketURL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      newSocket.on('connect', () => {
        console.log('✅ Socket connected:', newSocket.id);
        setConnected(true);
        // Register user with their ID
        newSocket.emit('user:join', user.email);
      });

      newSocket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
        setConnected(false);
      });

      // Listen for online/offline users
      newSocket.on('user:online', (userId) => {
        setOnlineUsers((prev) => new Set([...prev, userId]));
      });

      newSocket.on('user:offline', (userId) => {
        setOnlineUsers((prev) => {
          const updated = new Set(prev);
          updated.delete(userId);
          return updated;
        });
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setConnected(false);
      });

      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        newSocket.close();
      };
    }
  }, [user, socketURL]);

  const value = {
    socket,
    connected,
    onlineUsers,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;