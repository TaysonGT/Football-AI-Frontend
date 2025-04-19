'use client';
import { useRef, useState } from 'react';
import axios from 'axios';
import Navbar from './Components/Layout/Navbar';
import UploadSection from './Components/Sections/UploadSection';
import AboutSection from './Components/Sections/AboutSection';
// import {io, Socket} from 'socket.io-client'

export default function App() {
  const [activeSection, setActiveSection] = useState<'upload' | 'about'>('upload');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadMessage, setUploadMessage] = useState<string>('Ready to analyze match footage');
  const [logLines, setLogLines] = useState<string[]>(['-----------']);
  
  const wsRef = useRef<WebSocket>(null)


  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('video', file);

    try {
      setUploadMessage('Uploading match footage...');
      setUploadProgress(10);
      
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const { video_path } = response.data;
      console.log('Upload response:', response.data);
      setLogLines([])
      startWebSocket(video_path)
      // connectSocket(video_path)

      

    } catch (error) {
      console.error('Upload failed:', error);
      setUploadMessage('Upload failed. Please try again.');
      setUploadProgress(0);
    }
  };

  const startWebSocket = (video_path:string) =>{
    const ws = new WebSocket("ws://localhost:3000/ws/process");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 WebSocket connected");
      ws.send(JSON.stringify({ video_path }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      if (data.progress !== undefined) {
        setUploadProgress(data.progress);
        setUploadMessage(data.message);
      } else if (data.log) {
        console.log("Log:", data.log);
        setLogLines((prev)=> [...prev, data.log])
      } else if (data.done) {
        setUploadMessage("✅ Processing complete!");
      } else if (data.error) {
        console.error("Server error:", data.error);
      }
    };

    ws.onclose = () => console.log("🔌 WebSocket disconnected");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
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

      <div className='h-[400px] w-[400px] absolute top-[50%] left-0 overflow-y-scroll bg-slate-300 text-center text-xl'>
        {logLines.map((line, key)=>(

          <div key={key}>{line}</div>
      
        ))
        }
      </div>

      <footer className="bg-green-800 text-white p-4 text-center text-sm">
        © {new Date().getFullYear()} FootballVision AI - Advanced Match Analysis
      </footer>
    </div>
  );
}