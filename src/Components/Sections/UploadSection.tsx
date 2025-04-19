import { useRef, useState } from 'react';
import ProgressBar from '../Layout/ProgressBar';

export default function UploadSection({
  handleUpload,
  uploadProgress,
  uploadMessage,
}: {
  handleUpload: (file: File) => void;
  uploadProgress: number;
  uploadMessage: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md w-full max-w-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyze Match Footage</h2>
        <p className="text-gray-600">Upload your football match video for AI analysis</p>
      </div>

      <div className="relative w-full mb-6">
        <input
          type="file"
          ref={fileInputRef}
          accept="video/*"
          className="hidden"
          id="file-upload"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-400 rounded-lg cursor-pointer hover:bg-green-50 transition-colors"
        >
          {selectedFile ? (
            <>
              <svg className="w-12 h-12 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-gray-700 text-center max-w-full truncate px-2">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </>
          ) : (
            <>
              <svg className="w-12 h-12 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-green-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">MP4, MOV or AVI (max. 500MB)</p>
            </>
          )}
        </label>
      </div>

      <button
        onClick={() => selectedFile && handleUpload(selectedFile)}
        disabled={!selectedFile || (uploadProgress > 0 && uploadProgress < 100)}
        className={`px-6 py-3 rounded-full font-medium text-white transition-all ${
          !selectedFile || (uploadProgress > 0 && uploadProgress < 100)
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 shadow-md'
        }`}
      >
        {uploadProgress > 0 || uploadProgress < 100
          ? 'Processing...' 
          : selectedFile
            ? 'Analyze Match Video'
            : 'Select a File First'}
      </button>

      <ProgressBar progress={uploadProgress} message={uploadMessage} />
    </div>
  );
}