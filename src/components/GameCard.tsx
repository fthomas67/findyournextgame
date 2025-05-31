import React from 'react';
import { Game } from '../data/games';
import { ExternalLink, Star } from 'lucide-react';
import { trackPurchaseClick } from '../utils/analytics';

interface GameCardProps {
  game: Game;
  similarityScore: number;
  matchReason: string;
  purchaseLinks: {
    name: string;
    url: string;
  }[];
  isBestMatch?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, similarityScore, matchReason, purchaseLinks, isBestMatch }) => {
  // Find the Instant Gaming link
  const instantGamingLink = purchaseLinks.find(link => 
    link.name.toLowerCase().includes('instant gaming')
  );

  const handlePurchaseClick = (storeName: string) => {
    trackPurchaseClick(game.name, storeName);
  };

  return (
    <div className={`relative bg-gray-800/50 rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-[0_0_20px_rgba(67,97,238,0.2)]
      ${isBestMatch 
        ? 'border-blue-500/50 hover:border-purple-500/50 shadow-[0_0_20px_rgba(67,97,238,0.2)]' 
        : 'border-gray-700/50 hover:border-blue-500/50'}`}>
      
      {isBestMatch ? (
        <div className="flex flex-col md:flex-row">
          {/* Image en haut sur mobile, à gauche sur desktop */}
          <div className="w-full md:w-1/3 relative">
            <div className="aspect-[3/4] w-full overflow-hidden">
              <img
                src={game.coverImage}
                alt={game.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {similarityScore}% match
            </div>
          </div>

          {/* Contenu en bas sur mobile, à droite sur desktop */}
          <div className="w-full md:w-2/3 p-6 flex flex-col">
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-white">{game.name}</h3>
              {/* Badges plateformes et genres */}
              <div className="mt-2 flex flex-wrap gap-2">
                {game.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                  >
                    {platform}
                  </span>
                ))}
                {game.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {matchReason}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end">
              {instantGamingLink && (
                <a
                  href={instantGamingLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handlePurchaseClick(instantGamingLink.name)}
                  className="inline-flex items-center gap-2 px-4 py-2 w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow hover:brightness-110 hover:shadow-[0_0_16px_rgba(67,97,238,0.25)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Buy
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div className="relative">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={game.coverImage}
                alt={game.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute top-4 right-4 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium bg-blue-600/90 text-white">
              {similarityScore}% match
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="space-y-4 flex-grow">
              <h3 className="text-xl font-bold text-white">{game.name}</h3>
              {/* Badges plateformes et genres */}
              <div className="mt-2 flex flex-wrap gap-2">
                {game.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full"
                  >
                    {platform}
                  </span>
                ))}
                {game.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-none">
                  {matchReason}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end">
              {instantGamingLink && (
                <a
                  href={instantGamingLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handlePurchaseClick(instantGamingLink.name)}
                  className="inline-flex items-center gap-2 px-4 py-2 w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow hover:brightness-110 hover:shadow-[0_0_16px_rgba(67,97,238,0.25)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Buy
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCard;