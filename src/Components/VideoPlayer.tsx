import React, { useEffect, useRef } from "react";

// @ts-ignore (Ignore TypeScript errors for missing JSMpeg types)
declare global {
    interface Window {
        JSMpeg: any;
    }
}


const VideoPlayer = ({ videoFile }) => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        if (!videoFile || !canvasRef.current) return;

        // Connect WebSocket to Flask
        const socket = new WebSocket("ws://localhost:5000/stream/" + videoFile);

        // Wait for socket connection before starting JSMpeg player
        socket.onopen = () => {
            new window.JSMpeg.Player(socket, { canvas: canvasRef.current });
        };

        return () => socket.close();
    }, [videoFile]);

    return (
        <div className="mt-8 w-full max-w-3xl bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">{videoFile}</h3>
            <canvas ref={canvasRef} className="w-full rounded-lg"></canvas>
        </div>
    );
};

export default VideoPlayer;
