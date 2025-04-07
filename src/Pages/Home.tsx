'use client';
import { useState, useRef, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';

export default function App() {
  const [activeSection, setActiveSection] = useState<'upload' | 'about'>('upload');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadMessage, setUploadMessage] = useState<string>('Waiting to upload...');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [socket, setSocket] = useState<Socket|null>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:3000/', {
      reconnectionAttempts: 5,
      transports: ['websocket'],
      withCredentials: true
    });

    newSocket.on('connect', () => {
      console.log('Connected with ID:', newSocket.id);
      newSocket.emit('join', {room: newSocket.id},  (response) => {
        console.log('Join acknowledgement:', response);
      });
      
      // Store the socket ID in component state if needed
      // setSocketId(newSocket.id);
    });
    
    newSocket.on('updates', (data) => {
      console.log('Progress:', data);
      setUploadMessage(data.message);
      setUploadProgress(data.progress);
    });
    newSocket.on('error', (data) => {
      console.log('error:', data);
      
    });
  
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

const handleUpload = async () => {
  if (!fileInputRef.current?.files?.[0] || !socket) return;

  const formData = new FormData();
  formData.append('video', fileInputRef.current.files[0]);
  
  // Include the socket ID in the upload request
  formData.append('socket_id', socket.id!);

  try {
    const response = await axios.post('http://localhost:3000/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Upload response:', response.data);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Soccer Analysis AI</h1>
        <div className="space-x-4">
          <button onClick={() => setActiveSection('upload')} className="hover:underline">
            Upload
          </button>
          <button onClick={() => setActiveSection('about')} className="hover:underline">
            About
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        {activeSection === 'upload' && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>

            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              className="mb-4"
            />

            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Upload Video
            </button>

            {/* Progress Bar */}
            <div className="mt-6 w-80 bg-gray-300 rounded-full h-6 overflow-hidden">
              <div
                className="bg-blue-600 h-6 text-center text-white text-sm transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress}%
              </div>
            </div>

            <p className="mt-4 text-gray-700">{uploadMessage}</p>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">About Project</h2>
            <p className="text-gray-600 max-w-xl">
              This application uses AI, Deep Learning, and Computer Vision to analyze soccer matches. 
              Upload a video to get started!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
