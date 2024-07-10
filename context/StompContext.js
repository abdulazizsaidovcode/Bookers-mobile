// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Stomp } from '@stomp/stompjs';
// import { sockjs_url } from '@/helpers/api'; // Ensure this URL is compatible with WebSocket

// // Create a context
// const StompContext = createContext();

// // Create a provider component
// export const StompProvider = ({ children }) => {
//   const [stompClient, setStompClient] = useState(null);
//   const [adminId, setAdminId] = useState("defaultAdminId"); // Set a default adminId for testing

//   useEffect(() => {
//     const socketUrl =`${sockjs_url}`; // Use secure WebSocket
//     console.log(`Connecting to WebSocket at ${socketUrl}`);
//     const socket = new WebSocket(socketUrl); // Use the built-in WebSocket
    
//     socket.onopen = () => {
//       console.log('WebSocket connection opened');
//       const stomp = Stomp.over(socket);
//       stomp.connect({}, (frame) => {
//         console.log('Connected: ' + frame);
//         setStompClient(stomp);
//       }, (error) => {
//         console.error('STOMP error connecting: ', error);
//       });
//     };

//     socket.onerror = (error) => {
//       console.error('WebSocket error: ', error);
//     };

//     socket.onclose = (event) => {
//       console.log('WebSocket connection closed: ', event);
//     };

//     return () => {
//       if (stompClient) {
//         console.log('Disconnecting STOMP client');
//         stompClient.disconnect();
//       }
//       if (socket) {
//         console.log('Closing WebSocket connection');
//         socket.close();
//       }
//     };
//   }, []);

//   return (
//     <StompContext.Provider value={{ stompClient, adminId }}>
//       {children}
//     </StompContext.Provider>
//   );
// };

// // Custom hook to use the Stomp context
// export const useStomp = () => {
//   return useContext(StompContext);
// };

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
// export const useStomp = () => {
//   return useContext(StompContext);
// };


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Stomp } from '@stomp/stompjs';
// import { sockjs_url } from '@/helpers/api'; // Ensure this URL is compatible with WebSocket

// // Create a context
// const StompContext = createContext();

// // Create a provider component
// export const StompProvider = ({ children }) => {
//   const [stompClient, setStompClient] = useState(null);
//   const [adminId, setAdminId] = useState("defaultAdminId"); // Set a default adminId for testing

//   useEffect(() => {
//     const socketUrl = "ws://45.67.35.86:8080/ws"; // Use non-secure WebSocket
//     console.log(`Connecting to WebSocket at ${socketUrl}`);
//     const socket = new WebSocket(socketUrl); // Use the built-in WebSocket

//     socket.onopen = () => {
//       console.log('WebSocket connection opened');
//       const stomp = Stomp.over(socket);
//       stomp.connect({}, (frame) => {
//         console.log('Connected: ' + frame);
//         setStompClient(stomp);
//       }, (error) => {
//         console.error('STOMP error connecting: ', error);
//       });
//     };

//     socket.onerror = (error) => {
//       console.error('WebSocket error: ', error);
//     };

//     socket.onclose = (event) => {
//       console.log('WebSocket connection closed: ', event);
//     };

//     return () => {
//       if (stompClient) {
//         console.log('Disconnecting STOMP client');
//         stompClient.disconnect();
//       }
//       if (socket) {
//         console.log('Closing WebSocket connection');
//         socket.close();
//       }
//     };
//   }, []);

//   return (
//     <StompContext.Provider value={{ stompClient, adminId }}>
//       {children}
//     </StompContext.Provider>
//   );
// };

// // Custom hook to use the Stomp context
// export const useStomp = () => {
//   return useContext(StompContext);
// };

