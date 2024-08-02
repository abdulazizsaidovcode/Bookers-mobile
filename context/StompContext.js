import React, { createContext, useContext, useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { sockjs_url } from '@/helpers/api';

const StompContext = createContext();

export const StompProvider = ({ children }) => {
  const [stompClient, setStompClient] = useState(null);
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    const socket = new SockJS(sockjs_url);
    const stomp = Stomp.over(socket);

    stomp.connect({
      heartbeat_in: 100000, // Heartbeat interval (milliseconds)
      heartbeat_out: 100000,
      reconnect_delay: 5000,
      timeout: 20000 // Connect timeout
    }, (frame) => {
      console.log('Connected: ' + frame);
      setStompClient(stomp);
    }, (error) => {
      console.error('Error connecting: ', error);
    });

    socket.onopen = (res) => {
            console.log("WebSocket connection opened.", res);
          };
          
    socket.onclose = (event) => {
      console.log("WebSocket connection closed: ", event);
    };

    socket.onerror = (error) => {
            console.error("WebSocket error: ", error);
          };

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

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Stomp } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// // Create a context
// const StompContext = createContext();

// // Create a provider component
// export const StompProvider = ({ children }) => {
//   const [stompClient, setStompClient] = useState(null);
//   const [adminId, setAdminId] = useState("");

//   useEffect(() => {
//     // Check if WebSocket is supported by the browser
//     if (!("WebSocket" in window)) {
//       console.error("WebSocket is not supported by this browser.");
//       return;
//     }

//     // Socket URL - ensure this URL is correct and accessible
//     const socket = new SockJS('https://app.bookers.one/ws');
//     const stomp = Stomp.over(socket);

//     // Log WebSocket state changes
//     socket.onopen = (res) => {
//       console.log("WebSocket connection opened.", res);
//     };
    
//     socket.onerror = (error) => {
//       console.error("WebSocket error: ", error);
//     };
    
//     socket.onclose = (event) => {
//       console.log("WebSocket connection closed: ", event);
//     };

//     // Retry connection on error or close
//     const connect = () => {
//       stomp.connect({
//         heartbeat_in: 10000, // Heartbeat interval (milliseconds)
//         heartbeat_out: 10000,
//         reconnect_delay: 5000,
//         timeout: 20000 // Connect timeout
//       }, (frame) => {
//         console.log('Connected: ' + frame);
//         setStompClient(stomp);
//       }, (error) => {
//         console.error('Error connecting: ', error);
//         setTimeout(connect, 5000); // Retry after 5 seconds
//       });
//     };

//     // Connect STOMP client
//     connect();

//     // Cleanup function
//     return () => {
//       if (stomp) {
//         stomp.disconnect(() => {
//           console.log("Disconnected STOMP client.");
//         });
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

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Stomp } from '@stomp/stompjs';

// const StompContext = createContext();

// export const StompProvider = ({ children }) => {
//   const [stompClient, setStompClient] = useState(null);
//   const [adminId, setAdminId] = useState("");

//   useEffect(() => {
//     const socket = new WebSocket('wss://app.bookers.one/ws');
//     const stomp = Stomp.over(socket);

//     socket.onopen = () => {
//       console.log("WebSocket connection opened.");
//       stomp.connect({}, (frame) => {
//         console.log('Connected: ' + frame);
//         setStompClient(stomp);
//       }, (error) => {
//         console.error('Error connecting: ', error);
//       });
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket error: ", error);
//     };

//     socket.onclose = (event) => {
//       console.log("WebSocket connection closed: ", event);
//     };

//     return () => {
//       if (stomp) {
//         stomp.disconnect(() => {
//           console.log("Disconnected STOMP client.");
//         });
//       }
//     };
//   }, []);

//   return (
//     <StompContext.Provider value={{ stompClient, adminId }}>
//       {children}
//     </StompContext.Provider>
//   );
// };

// export const useStomp = () => {
//   return useContext(StompContext);
// };

// ------------------- important note: ----------------- //
// import React, { createContext,useContext,  useState, useEffect } from 'react';
// import { Stomp } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

// // Create a context
// const StompContext = createContext();

// // Create a provider component
// export const StompProvider = ({ children }) => {
//   const [stompClient, setStompClient] = useState(null);
//   const [adminId, setAdminId] = useState("");

//   useEffect(() => {
//     // Check if WebSocket is supported by the browser
//     if (!("WebSocket" in window)) {
//       console.error("WebSocket is not supported by this browser.");
//       return;
//     }

//     // Socket URL - ensure this URL is correct and accessible
//     const socket = new SockJS('https://app.bookers.one/ws');
//     const stomp = Stomp.over(socket);

//     // Log WebSocket state changes
//     socket.onopen = (res) => {
//       console.log("WebSocket connection opened.",res);
//     };
    
//     socket.onerror = (error) => {
//       console.error("WebSocket error: ", error);
//     };
    
//     socket.onclose = (event) => {
//       console.log("WebSocket connection closed: ", event);
//     };

//     // Connect STOMP client
//     stomp.connect({}, (frame) => {
//       console.log('Connected: ' + frame);
//       setStompClient(stomp);
//     }, (error) => {
//       console.error('Error connecting: ', error);
//     });

//     // Cleanup function
//     return () => {
//       if (stomp) {
//         stomp.disconnect(() => {
//           console.log("Disconnected STOMP client.");
//         });
//       }
//     };
//   }, []);

//   return (
//     <StompContext.Provider value={{ stompClient, adminId }}>
//       {children}
//     </StompContext.Provider>
//   );
// };

// // // Custom hook to use the Stomp context
// export const useStomp = () => {
//   return useContext(StompContext);
// };


// //StompContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Stomp } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { sockjs_url } from '@/helpers/api';

// // Create a context
// const StompContext = createContext();

// // Create a provider component
// export const StompProvider = ({ children }) => {
//   const [stompClient, setStompClient] = useState(null);
//   const [adminId, setAdminId] = useState("");

//   useEffect(() => {
//     const socket = new SockJS('https://app.bookers.one/ws');
//     const stomp = Stomp.over(socket);

//     stomp.connect({}, (frame) => {
//       console.log('Connected: ' + frame);
//       setStompClient(stomp);
//     }, (error) => {
//       console.error('Error connecting: ', error);
//     });

//     return () => {
//       if (stomp) {
//         stomp.disconnect();
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
//     const socketUrl = sockjs_url; // Use non-secure WebSocket
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

