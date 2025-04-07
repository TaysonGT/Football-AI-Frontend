export default function AboutSection() {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About FootballVision AI</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6"></div>
        </div>
  
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-3">⚽ Match Analysis</h3>
            <p className="text-gray-600">
              Our AI analyzes player movements, ball possession, team formations, and key match events 
              using advanced computer vision algorithms.
            </p>
          </div>
  
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-green-700 mb-3">📊 Performance Metrics</h3>
            <p className="text-gray-600">
              Get detailed statistics on player speed, distance covered, pass accuracy, and shot 
              analysis to improve team performance.
            </p>
          </div>
        </div>
  
        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
            Learn More About Our Technology
          </button>
        </div>
      </div>
    );
  }