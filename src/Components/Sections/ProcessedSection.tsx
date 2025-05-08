import { useEffect, useState } from 'react';
import axios from 'axios';

interface VideoInfo {
  filename: string;
}

const RecentSection = () => {
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    // Fetch list of videos from the backend
    axios.get('http://localhost:3000/videos')
      .then(res => setVideos(res.data))
      .catch(err => console.error('Error fetching video list:', err));
  }, []);

  const playVideo = async (filename: string) => {
    try {
      setStatus(`Launching ${filename}...`);
      const response = await axios.get(`http://localhost:3000/play_video/${filename}`);
      if (response.data.status == filename) {
        setStatus(`Launched: ${filename}`);
      } else {
        setStatus("Unable to play video.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error playing video. Make sure the backend is running locally.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Processed Videos</h2>

      {status && (
        <p className="mb-4 text-sm text-blue-600 bg-blue-100 px-3 py-2 rounded-md">
          {status}
        </p>
      )}

      <ul className="space-y-3">
        {videos.map((video, index) => (
          <li
            key={index}
            className="flex items-center gap-5 justify-between bg-gray-100 hover:bg-gray-200 transition-all px-5 py-3 rounded-lg shadow-sm"
          >
            <span className="text-gray-700 font-medium truncate">
              {video.filename.split('.')[0].replace('processed_', '')}
            </span>
            <button
              onClick={() => playVideo(video.filename)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
            >
              Open in Player
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSection;
