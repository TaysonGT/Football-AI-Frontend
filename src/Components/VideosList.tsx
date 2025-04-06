import React, { useState, useEffect, useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import axios from "axios";

const VideosList = () => {
    const [videos, setVideos] = useState([]);
    const canvasRef = useRef(null);
    
    const openVideo = (video)=>{
        axios.get(`http://localhost:5000/open_video/${video}`)
        .then(({data})=>{
            console.log(data)
        })
    }

    useEffect(() => {
        fetch("http://localhost:5000/videos")
            .then((response) => response.json())
            .then((data) => {
                if (data.videos) {
                    setVideos(data.videos);
                } else {
                    console.log("No videos found");
                }
            })
            .catch((error) => console.error("Error fetching videos:", error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
            <h2 className="text-3xl font-bold mb-6">Processed Videos</h2>
            
            {videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-lg shadow-lg p-4 cursor-pointer hover:bg-gray-700 transition"
                            onClick={() => openVideo(video)}
                        >
                            <h3 className="text-lg font-semibold text-center">{video}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No videos available.</p>
            )}

            
        </div>
    );
};

export default VideosList;
