export default function ProgressBar({ progress, message }: {
    progress: number;
    message: string;
  }) {
    return (
      <div className="mt-8 w-full max-w-md">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Processing...</span>
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-center text-gray-600 italic">
          {message || 'Ready for match analysis...'}
        </p>
      </div>
    );
  }