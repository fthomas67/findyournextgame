import React from 'react';

interface DisplayAdProps {
  children?: React.ReactNode;
}

const DisplayAd: React.FC<DisplayAdProps> = ({ children }) => (
  <div className="w-full flex justify-center my-8">
    <div className="w-full max-w-2xl min-h-[120px] bg-gray-900/80 border border-blue-700/30 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
      <span className="absolute top-2 left-4 text-xs text-blue-400 uppercase tracking-widest">Advertisement</span>
      <div className="w-full flex items-center justify-center py-8">
        {children || <span className="text-gray-400">Your advertisement here</span>}
      </div>
    </div>
  </div>
);

export default DisplayAd; 