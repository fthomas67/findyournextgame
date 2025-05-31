import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { GameRecommendation } from '../data/games';
import { getGameSuggestions, GeminiResponse } from '../api/gemini';
import { enrichRecommendationsWithCoverImages } from '../api/rawg';
import { trackFormSubmit } from '../utils/analytics';

interface SearchFormProps {
  onSubmit: (description: string) => void;
  isLoading: boolean;
  onRecommendationsReceived: (recommendations: GameRecommendation[]) => void;
}

interface GeminiRecommendation {
  name: string;
  similarityScore: number;
  matchReason: string;
  coverImage: string;
  purchaseLinks: {
    name: string;
    url: string;
  }[];
  platforms?: string[];
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, isLoading, onRecommendationsReceived }) => {
  const [description, setDescription] = useState('');
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);

  const transformGeminiResponse = (response: GeminiResponse): GameRecommendation[] => {
    try {
      const text = response.candidates[0].content.parts[0].text;
      const jsonStr = text.replace(/```json\n|\n```/g, '');
      const data = JSON.parse(jsonStr);
      
      return data.recommendations.map((rec: GeminiRecommendation) => ({
        game: {
          id: rec.name.toLowerCase().replace(/\s+/g, '-'),
          name: rec.name,
          coverImage: '', // L'image sera ajoutée par RAWG
          genres: [], // Nous pourrions extraire les genres du matchReason si nécessaire
          platforms: rec.platforms || ['PC'], // Utilise platforms de Gemini, fallback PC si absent
          description: rec.matchReason
        },
        similarityScore: rec.similarityScore,
        matchReason: rec.matchReason,
        purchaseLinks: rec.purchaseLinks.map(link => {
          if (link.name.toLowerCase().includes('instant gaming')) {
            let url = link.url;
            // Supprime tout ?igr=... ou &igr=... déjà présent
            url = url.replace(/[&?]igr=gamer-8f36d5/, '');
            // Si la query existe déjà, ajoute &igr=...
            if (url.includes('?')) {
              url += url.endsWith('?') ? '' : '';
              url += '&igr=gamer-8f36d5';
            } else {
              url += '?igr=gamer-8f36d5';
            }
            return { ...link, url };
          }
          return link;
        })
      }));
    } catch (error) {
      console.error('Error transforming Gemini response:', error);
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
      setIsGeminiLoading(true);
      try {
        const userPrompt = `I'm looking for games with these criteria: ${description}`;
        const geminiSuggestions = await getGameSuggestions(userPrompt);
        const transformedSuggestions = transformGeminiResponse(geminiSuggestions);
        
        // Enrichir les recommandations avec les images de RAWG
        const enrichedSuggestions = await enrichRecommendationsWithCoverImages(transformedSuggestions);
        
        onRecommendationsReceived(enrichedSuggestions);
        console.log('Suggestions enrichies:', enrichedSuggestions);
        
        // Track form submission
        trackFormSubmit(description);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsGeminiLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label className="block text-blue-300 text-sm font-medium mb-1">
          Describe the type of game you're looking for
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Example: I'm looking for an action RPG on Nintendo Switch with an engaging story and an open world to explore..."
          className="w-full h-32 px-4 py-3 rounded-lg bg-gray-900/60 border border-blue-500/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-[0_0_15px_rgba(67,97,238,0.2)]"
        />
      </div>
      <button
        type="submit"
        disabled={!description.trim() || isLoading || isGeminiLoading}
        className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300
          ${!description.trim() || isLoading || isGeminiLoading
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(114,9,183,0.4)] hover:opacity-90'
          }`}
      >
        {(isLoading || isGeminiLoading) ? (
          <>
            <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
            <span>Searching...</span>
          </>
        ) : (
          <>
            <Search size={20} />
            <span>Find games</span>
          </>
        )}
      </button>
    </form>
  );
};

export default SearchForm;