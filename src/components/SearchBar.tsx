import React, { useState, useRef, useEffect } from 'react';
import { Game } from '../data/games';
import { X } from 'lucide-react';
import { searchGames } from '../api/rawg';

interface SearchBarProps {
  onSelectGame: (game: Game) => void;
  selectedGames: Game[];
  onRemoveGame: (gameId: string) => void;
  onGetSuggestions?: (suggestions: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSelectGame, 
  selectedGames, 
  onRemoveGame,
  onGetSuggestions 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search games using RAWG API
  useEffect(() => {
    const searchGamesFromAPI = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchGames(searchTerm);
        setSearchResults(results.filter(game => 
          !selectedGames.some(selectedGame => selectedGame.id === game.id)
        ).slice(0, 5));
      } catch (error) {
        console.error('Error searching games:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchGamesFromAPI, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedGames]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const handleSelectGame = (game: Game) => {
    onSelectGame(game);
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      {/* Selected Games */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedGames.map(game => (
          <div
            key={game.id}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-purple-900/60 border border-purple-500 text-white shadow-[0_0_10px_rgba(114,9,183,0.3)]"
          >
            <span>{game.name}</span>
            <button
              onClick={() => onRemoveGame(game.id)}
              className="ml-1 rounded-full h-5 w-5 flex items-center justify-center hover:bg-purple-700 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setShowResults(true)}
          placeholder="Search for a game..."
          className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-blue-500/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[0_0_15px_rgba(67,97,238,0.2)]"
        />
        
        {/* Search Results Dropdown */}
        {showResults && (searchResults.length > 0 || isLoading) && (
          <div className="absolute z-10 w-full mt-2 rounded-lg bg-gray-800 border border-blue-500/30 shadow-lg shadow-blue-500/20 backdrop-blur-sm overflow-hidden">
            {isLoading ? (
              <div className="px-4 py-3 text-white text-center">Searching...</div>
            ) : (
              <ul>
                {searchResults.map(game => (
                  <li
                    key={game.id}
                    onClick={() => handleSelectGame(game)}
                    className="px-4 py-3 hover:bg-blue-900/40 cursor-pointer transition-colors flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={game.coverImage} 
                        alt={game.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-white text-sm">{game.name}</div>
                      <div className="text-gray-400 text-xs">
                        {game.genres.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;