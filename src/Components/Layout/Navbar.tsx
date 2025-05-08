export default function Navbar({ activeSection, setActiveSection }: {
  activeSection: 'upload' | 'processed';
  setActiveSection: (section: 'upload' | 'processed') => void;
}) {
  return (
    <nav className="flex items-center justify-between bg-green-700 text-white p-4 shadow-lg">
      <div className="flex items-center space-x-2">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <h1 className="text-2xl">Football<span className="font-bold">Vision</span></h1>
      </div>
      <div className="flex space-x-6">
        <button 
          onClick={() => setActiveSection('upload')}
          className={`px-3 py-1 rounded-lg transition-all ${activeSection === 'upload' ? 'bg-white text-green-700 font-bold' : 'hover:bg-green-600'}`}
        >
          Match Analysis
        </button>
        <button 
          onClick={() => setActiveSection('processed')}
          className={`px-3 py-1 rounded-lg transition-all ${activeSection === 'processed' ? 'bg-white text-green-700 font-bold' : 'hover:bg-green-600'}`}
        >
          Processed
        </button>
      </div>
    </nav>
  );
}