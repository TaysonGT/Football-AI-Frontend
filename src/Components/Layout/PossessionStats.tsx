import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  finalPossession: {
    team1:{
      percent: Number, 
      color: string
    }, 
    team2: {
      percent: Number, 
      color: string
    }
  },
  displayMode: string,
  handleShowVideo: ()=>void
}

const PossessionStats:React.FC<Props> = ({ finalPossession, displayMode = 'fixed', handleShowVideo }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Auto-hide after 5 seconds if in popup mode
  useEffect(() => {
    if (displayMode === 'popup' && finalPossession) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [finalPossession, displayMode]);

  if (!finalPossession) return null;

  const containerClasses = [
    'text-xl font-bold p-6 bg-neutral-800/90 backdrop-blur-sm',
    'rounded-lg shadow-xl border border-neutral-700',
    displayMode === 'fixed' ? 'fixed top-[50%] left-[50%] translate-x-[calc(-50%-400px)] -translate-y-[50%] z-50 w-[320px]' : '',
    displayMode === 'inline' ? 'mx-auto my-4 w-full max-w-md' : ''
  ].join(' ');

  const content = (
    <motion.div
      initial={displayMode === 'popup' ? { y: 20, opacity: 0 } : {}}
      animate={displayMode === 'popup' ? { y: 0, opacity: 1 } : {}}
      exit={displayMode === 'popup' ? { y: -20, opacity: 0 } : {}}
      transition={{ duration: 0.3 }}
      className={containerClasses}
    >
      <div className="text-2xl bg-neutral-700 rounded-md p-3 text-center text-white mb-4">
        Match Possession
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <div 
          className="text-2xl font-mono font-bold px-3 py-1 rounded"
          style={{ 
            color: `rgb(${finalPossession.team1.color.split('(')[1].split(')')[0]})`,
            backgroundColor: `rgba(${finalPossession.team1.color.split('(')[1].split(')')[0]}, 0.1)`
          }}
        >
          {finalPossession.team1.percent.toString()}%
        </div>
        
        <div className="text-sm text-neutral-400">POSSESSION</div>
        
        <div 
          className="text-2xl font-mono font-bold px-3 py-1 rounded"
          style={{ 
            color: `rgb(${finalPossession.team2.color.split('(')[1].split(')')[0]})`,
            backgroundColor: `rgba(${finalPossession.team2.color.split('(')[1].split(')')[0]}, 0.1)`
          }}
        >
          {finalPossession.team2.percent.toString()}%
        </div>
      </div>
      
      <div className="flex rounded-full overflow-hidden h-3 bg-neutral-700">
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: `${finalPossession.team1.percent}%` }}
          transition={{ duration: 1, type: 'spring' }}
          style={{ background: `rgb(${finalPossession.team1.color.split('(')[1].split(')')[0]})` }}
        />
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: `${finalPossession.team2.percent}%` }}
          transition={{ duration: 1, type: 'spring' }}
          style={{ background: `rgb(${finalPossession.team2.color.split('(')[1].split(')')[0]})` }}
        />
      </div>
      <div 
      className="text-xl bg-green-600 hover:bg-green-200 hover:text-green-600 text-white rounded-md p-2 text-center mt-5 duration-200 cursor-pointer select-none"
      onClick={()=> handleShowVideo()}>
        Display Video
      </div>
    </motion.div>
  );

  if (displayMode === 'popup') {
    return (
      <AnimatePresence>
        {isVisible && (
          <div className="fixed bottom-4 right-4 z-50">
            {content}
          </div>
        )}
      </AnimatePresence>
    );
  }

  return content;
};

export default PossessionStats;