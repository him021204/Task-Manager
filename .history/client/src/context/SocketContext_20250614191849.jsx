import { createContext, useContext, useEffect } from 'react';
import { socket } from '../utils/socket';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
