import React from 'react';
import { Gamepad2 as GameController } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full mb-8">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg shadow-purple-700/20">
          <GameController size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">WhichGameIsLike</h1>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-sm sm:text-base">Your ultime game finder</p>
        </div>
      </div>
    </header>
  );
};

export default Header;