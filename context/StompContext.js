// StompContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { sockjs_url } from '@/helpers/api';

// Create a context
const StompContext = createContext();

// Create a provider component
export const StompProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    const socket = new SockJS(sockjs_url);
    const stomp = Stomp.over(socket);

    stomp.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      setStompClient(stomp);
    }, (error) => {
      console.error('Error connecting: ', error);
    });

    return () => {
      if (stomp) {
        stomp.disconnect();
      }
    };
  }, []);

  return (
    <StompContext.Provider value={{ stompClient, adminId }}>
      {children}
    </StompContext.Provider>
  );
};

// Custom hook to use the Stomp context
export const useStomp = () => {
  return useContext(StompContext);
};
