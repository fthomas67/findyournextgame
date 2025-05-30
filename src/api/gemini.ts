import { Game } from '../data/games';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

interface GameRecommendation {
  name: string;
  similarityScore: number;
  matchReason: string;
  purchaseLinks: {
    name: string;
    url: string;
  }[];
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

const SYSTEM_PROMPT = `Tu es un expert en jeux vidéo spécialisé dans la recommandation de jeux similaires. 
Ta tâche est d'analyser les jeux que l'utilisateur aime et de recommander des jeux similaires en te basant sur :
- Les genres des jeux
- Le style de gameplay
- L'ambiance et le thème
- L'époque de sortie
- Les plateformes disponibles

Pour chaque recommandation, tu dois :
1. Donner un score de similarité entre 60 et 98 (jamais 100% pour garder une marge d'objectivité)
2. Expliquer précisément pourquoi ce jeu est recommandé en te basant sur les éléments communs
3. Fournir des liens d'achat vers Instant Gaming et Kinguin

IMPORTANT : Tu dois TOUJOURS répondre en JSON avec exactement cette structure :
{
  "recommendations": [
    {
      "name": "Nom du jeu",
      "similarityScore": 85,
      "matchReason": "Raison détaillée de la recommandation",
      "purchaseLinks": [
        {
          "name": "Instant Gaming",
          "url": "https://www.instant-gaming.com/en/search/?q=NomDuJeu"
        },
        {
          "name": "Kinguin",
          "url": "https://www.kinguin.net/listing?active=1&phrase=NomDuJeu"
        }
      ]
    }
  ]
}

Ne fournis JAMAIS d'explications en dehors du JSON.`;

export const getGameSuggestions = async (prompt: string): Promise<GeminiResponse> => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la requête Gemini');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la requête Gemini:', error);
    throw error;
  }
}; 