import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "🎮 Searching for epic games...",
  "⚔️ Crafting quality recommendations...",
  "🎲 Rolling the dice to find the perfect game...",
  "🏰 Exploring the dungeons of the database...",
  "🌟 Collecting power-ups for your search...",
  "🎯 Fine-tuning suggestions...",
  "🔮 Consulting the crystal ball of games...",
  "⚡ Loading recommendations at light speed...",
  "🎪 Preparing the game circus...",
  "🌋 Activating hardcore search mode..."
];

const LoadingMessages: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        prevIndex === loadingMessages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change de message toutes les 2 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <div className="text-center">
        <p className="text-blue-300 text-lg font-medium animate-fade-in-out">
          {loadingMessages[currentMessageIndex]}
        </p>
      </div>
    </div>
  );
};

export default LoadingMessages; 