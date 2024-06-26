// StompContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import { WebSocket as RNWebSocket } from 'react-native-websocket';
import { sockjs_url } from '@/helpers/api'; // Ensure this URL is compatible with WebSocket

const StompContext = createContext();

export const StompProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    const socket = new RNWebSocket(sockjs_url);
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

export const useStomp = () => {
  return useContext(StompContext);
};
