import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function VideoUploader() {
  const [video, setVideo] = useState(null);
  const [outputVideo, setOutputVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!video) return;
    
    const formData = new FormData();
    formData.append("video", video);

    setLoading(true);
    setStep(2);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
          setProgress(percent);
        },
      });

      if (response.data.output) {
        setOutputVideo(response.data.output);
        setStep(3);
      }
    } catch (error) {
      console.error("Upload failed", error);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };
  const handleOpenInMediaPlayer = () => {
      if (outputVideo) {
          axios.get(`http://localhost:5000/open_video/${outputVideo}`)
          .then(({data})=>{
            console.log(data)
          })
      }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-xl text-center text-white">
      <motion.h2
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ⚽ AI Soccer Match Analyzer
      </motion.h2>

      {/* Step Indicators */}
      <div className="flex justify-center space-x-4 mb-6">
        {[1, 2, 3].map((num) => (
          <motion.div
            key={num}
            className={`w-8 h-8 rounded-full transition-all duration-300 ${
              step >= num ? "bg-green-500 scale-125" : "bg-gray-600"
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: step >= num ? 1.2 : 1 }}
          />
        ))}
      </div>

      {/* Upload Step */}
      {step === 1 && (
        <>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="mb-4 w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-500 cursor-pointer hover:bg-gray-600 transition"
          />
          <motion.button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Upload & Analyze
          </motion.button>
        </>
      )}

      {/* Processing Step */}
      {step === 2 && (
        <div>
          <p className="text-gray-300">Processing video... Please wait.</p>
          <div className="relative w-full bg-gray-700 rounded-full h-3 mt-2">
            <motion.div
              className="absolute left-0 h-3 bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      {/* Results Step */}
      {step === 3 && outputVideo && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h3 className="text-lg font-semibold mb-3">✅ Analysis Complete!</h3>
          <button
            onClick={handleOpenInMediaPlayer}
            
            className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
          >Open in Media Player</button>
        </motion.div>
      )}
    </div>
  );
}

export default VideoUploader;
