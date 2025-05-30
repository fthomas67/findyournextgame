import { Game } from '../data/games';
import { GameRecommendation } from '../data/games';

// Configuration de l'URL de l'API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://findyournextgame-production-4b56.up.railway.app'
  : 'http://localhost:8080';

interface RAWGGame {
  id: number;
  name: string;
  background_image: string;
  genres: Array<{ id: number; name: string }>;
  platforms: Array<{ platform: { id: number; name: string } }>;
}

interface RAWGResponse {
  count: number;
  results: RAWGGame[];
}

export const searchGames = async (query: string): Promise<Game[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rawg?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Error searching for games');
    }
    const data = await response.json();
    return data.results.map((game: any) => ({
      id: game.id.toString(),
      name: game.name,
      coverImage: game.background_image,
      genres: game.genres.map((g: any) => g.name),
      rating: game.rating,
      released: game.released
    }));
  } catch (error) {
    console.error('Error searching for games:', error);
    return [];
  }
};

export const getGameCoverImage = async (gameName: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rawg?query=${encodeURIComponent(gameName)}&page_size=1`);
    if (!response.ok) {
      throw new Error('Error querying RAWG');
    }

    const data: RAWGResponse = await response.json();
    
    if (data.results.length > 0 && data.results[0].background_image) {
      return data.results[0].background_image;
    }

    // If no image is found, return the placeholder image
    return 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Image+non+disponible';
  } catch (error) {
    console.error('Error retrieving image:', error);
    return 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Image+non+disponible';
  }
};

export const enrichRecommendationsWithCoverImages = async (
  recommendations: GameRecommendation[]
): Promise<GameRecommendation[]> => {
  const enrichedRecommendations = await Promise.all(
    recommendations.map(async (rec) => {
      const coverImage = await getGameCoverImage(rec.game.name);
      return {
        ...rec,
        game: {
          ...rec.game,
          coverImage
        }
      };
    })
  );

  return enrichedRecommendations;
}; 