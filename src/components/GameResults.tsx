import React, { useEffect } from 'react';
import { GameRecommendation } from '../data/games';
import GameCard from './GameCard';
import LoadingMessages from './LoadingMessages';
import DisplayAd from './DisplayAd';
import { trackResultsDisplay } from '../utils/analytics';

interface GameResultsProps {
  recommendations: GameRecommendation[];
  isLoading: boolean;
}

const GradientTitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <h2 className="text-2xl font-bold text-white inline-block relative mb-2">
    <span className="relative z-10">{children}</span>
    <span className="absolute left-0 -bottom-1 h-1 w-28 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></span>
  </h2>
);

const GameResults: React.FC<GameResultsProps> = ({ recommendations, isLoading }) => {
  useEffect(() => {
    if (!isLoading && recommendations.length > 0) {
      trackResultsDisplay(recommendations.length);
    }
  }, [isLoading, recommendations]);

  if (isLoading) {
    return <LoadingMessages />;
  }

  if (!recommendations.length) {
    return (
      <div className="text-center text-gray-400">
        No recommendations found. Try modifying your description.
      </div>
    );
  }

  // Trier les recommandations par score
  const sortedRecommendations = [...recommendations].sort((a, b) => b.similarityScore - a.similarityScore);
  const bestMatch = sortedRecommendations[0];
  const honorableMentions = sortedRecommendations.slice(1, 4); // Prendre les 3 suivants

  return (
    <div className="space-y-8">
      {/* Meilleur choix */}
      <div className="space-y-4">
        <GradientTitle>The best choice</GradientTitle>
        <div className="grid grid-cols-1 gap-6">
          <GameCard
            key={bestMatch.game.id}
            game={bestMatch.game}
            similarityScore={bestMatch.similarityScore}
            matchReason={bestMatch.matchReason}
            purchaseLinks={bestMatch.purchaseLinks}
            isBestMatch={true}
          />
        </div>
      </div>

      {/* Mentions honorables */}
      {honorableMentions.length > 0 && (
        <div className="space-y-4">
          <GradientTitle>Honorable mentions</GradientTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {honorableMentions.map((recommendation) => (
              <GameCard
                key={recommendation.game.id}
                game={recommendation.game}
                similarityScore={recommendation.similarityScore}
                matchReason={recommendation.matchReason}
                purchaseLinks={recommendation.purchaseLinks}
                isBestMatch={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameResults;