import {  useState } from "react";

export default function FootballDashboard() {
  const [activeSection, setActiveSection] = useState("upload");
  const [uploadedFile, setUploadedFile] = useState<{name: string, size: number}|null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStatus, setProcessingStatus] = useState("Waiting for upload...");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setProcessingStatus("Ready to start processing");
    }
  };

  const handleUpload = () => {
    if (!uploadedFile) return;

    // Simulate upload and processing
    setProcessingStatus("Uploading...");
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setProcessingStatus("Detecting players...");
      }
    }, 300);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white flex flex-col p-4 space-y-6">
        <h1 className="text-2xl font-bold mb-8">Soccer Analyzer</h1>
        <button
          className={`text-left ${activeSection === "upload" ? "font-bold" : ""}`}
          onClick={() => setActiveSection("upload")}
        >
          Upload & Process
        </button>
        <button
          className={`text-left ${activeSection === "results" ? "font-bold" : ""}`}
          onClick={() => setActiveSection("results")}
        >
          Results
        </button>
        <button
          className={`text-left ${activeSection === "settings" ? "font-bold" : ""}`}
          onClick={() => setActiveSection("settings")}
        >
          Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        {activeSection === "upload" && (
          <div className="flex flex-col items-center justify-center h-full">
            {/* Upload Box */}
            <label
              htmlFor="file-upload"
              className="w-full max-w-md border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-indigo-500 transition"
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
              <p className="text-gray-500">Drag & drop your match video here</p>
              <p className="text-sm text-gray-400 mt-2">or click to select a file</p>
            </label>

            {/* File Details */}
            {uploadedFile && (
              <div className="mt-6 text-center">
                <p className="text-gray-600 font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-gray-400">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  className="mt-6 w-full max-w-md bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-2xl"
                >
                  Start Processing
                </button>
              </div>
            )}

            {/* Progress */}
            {uploadProgress > 0 && (
              <div className="mt-8 w-full max-w-md">
                <p className="text-gray-600 mb-2">Processing Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-indigo-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">{processingStatus}</p>

                {/* Step Timeline */}
                <div className="mt-6">
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${uploadProgress >= 10 ? "bg-indigo-500" : "bg-gray-300"} rounded-full`}></div>
                      <span>Upload Completed</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${uploadProgress >= 100 ? "bg-indigo-500" : "bg-gray-300"} rounded-full`}></div>
                      <span>Player Detection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${processingStatus === "Detecting players..." ? "bg-indigo-500" : "bg-gray-300"} rounded-full`}></div>
                      <span>Team Classification</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === "results" && (
          <div className="flex items-center justify-center h-full text-2xl text-gray-500">
            Results Section (Coming Soon)
          </div>
        )}

        {activeSection === "settings" && (
          <div className="flex items-center justify-center h-full text-2xl text-gray-500">
            Settings Section (Coming Soon)
          </div>
        )}
      </div>
    </div>
  );
}
