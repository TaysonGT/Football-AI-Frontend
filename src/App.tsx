'use client';
import { useState } from 'react';
import axios from 'axios';
import Navbar from './Components/Layout/Navbar';
import UploadSection from './Components/Sections/UploadSection';
import AboutSection from './Components/Sections/AboutSection';
import useSocket from './Components/socket/SocketManager';

export default function App() {
  const [activeSection, setActiveSection] = useState<'upload' | 'about'>('upload');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadMessage, setUploadMessage] = useState<string>('Ready to analyze match footage');
  const socket = useSocket();

  const handleUpload = async (file: File) => {
    if (!socket) return;

    const formData = new FormData();
    formData.append('video', file);
    formData.append('socket_id', socket.id!);

    try {
      setUploadMessage('Uploading match footage...');
      setUploadProgress(10);
      
      const response = await axios.post('http://localhost:3000/process', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Upload response:', response.data);
      
      socket.on('updates', (data) => {
        console.log('data:', data)
        setUploadMessage(data.message);
        setUploadProgress(data.progress);
      });

      socket.on('error', (error) => {
        console.error('Processing error:', error);
        setUploadMessage(`Error: ${error.message || 'Processing failed'}`);
      });

    } catch (error) {
      console.error('Upload failed:', error);
      setUploadMessage('Upload failed. Please try again.');
      setUploadProgress(0);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 flex items-center justify-center p-4">
        {activeSection === 'upload' ? (
          <UploadSection 
            handleUpload={handleUpload}
            uploadProgress={uploadProgress}
            uploadMessage={uploadMessage}
          />
        ) : (
          <AboutSection />
        )}
      </main>

      <footer className="bg-green-800 text-white p-4 text-center text-sm">
        © {new Date().getFullYear()} FootballVision AI - Advanced Match Analysis
      </footer>
    </div>
  );
}