import React, { useState } from 'react';
import { Game, GameRecommendation } from './data/games';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import GameResults from './components/GameResults';
import { ArrowLeft } from 'lucide-react';

function App() {
  const [recommendations, setRecommendations] = useState<GameRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (description: string) => {
    setIsLoading(true);
    setShowResults(true);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
    setRecommendations([]);
  };

  const onRecommendationsReceived = (recs: GameRecommendation[]) => {
    setRecommendations(recs);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Background grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(67,97,238,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(67,97,238,0.07)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Gradient orb decorations */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-700/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-700/20 rounded-full blur-[100px] -z-10"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        <Header />
        
        <main className="space-y-12">
          <div className={`transition-all duration-500 ${showResults ? 'opacity-0 -translate-y-8 hidden' : 'opacity-100 translate-y-0'}`}>
            <section className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl">
              <SearchForm 
                onSubmit={handleSearch} 
                isLoading={isLoading}
                onRecommendationsReceived={onRecommendationsReceived}
              />
            </section>
          </div>
          
          <div className={`transition-all duration-500 ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 hidden'}`}>
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={handleBackToSearch}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors text-gray-300 hover:text-white"
              >
                <ArrowLeft size={20} />
                <span>Nouvelle recherche</span>
              </button>
            </div>
            
            <section className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-xl">
              <GameResults recommendations={recommendations} isLoading={isLoading} />
            </section>
          </div>
        </main>
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2025 FindYourNextGame - All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}

export default App;