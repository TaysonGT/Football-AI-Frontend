import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);


  useEffect(() => {
    const newSocket = io('http://localhost:3000/', {
      reconnectionAttempts: 5,
      transports: ['websocket'],
      withCredentials: true
    });

    newSocket.on('connect', () => {
      console.log('Connected with ID:', newSocket.id);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
}