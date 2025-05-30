import express, { Request, Response, Router, RequestHandler } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();

const SYSTEM_PROMPT = `You are a video game expert specialized in recommending similar games.
Your task is to analyze the games that the user likes and recommend similar games based on:
- Game genres
- Gameplay style
- Atmosphere and theme
- Release period
- Available platforms

For each recommendation, you must:
1. Give a similarity score between 60 and 98 (never 100% to maintain objectivity)
2. Precisely explain why this game is recommended based on common elements
3. Provide purchase links to Instant Gaming and Kinguin
   - IMPORTANT: All Instant Gaming links must end with ?igr=gamer-8f36d5 (this is the affiliate code to use systematically)
4. Provide a game cover image URL (landscape format, high quality, no promotional text)
5. Provide the complete list of platforms where the game is available (ex: ["PC", "PS5", "Xbox", "Switch"]). You must cite platforms with their official SHORT acronyms (ex: "PC", "PS5", "Xbox", "Switch" and not "PC, PlayStation 5, Xbox Series X, Nintendo Switch")

IMPORTANT: You must ALWAYS respond in JSON with exactly this structure:
{
  "recommendations": [
    {
      "name": "Game Name",
      "similarityScore": 85,
      "matchReason": "Detailed reason for the recommendation",
      "platforms": ["PC", "PS5", "Xbox", "Switch"],
      "purchaseLinks": [
        {
          "name": "Instant Gaming",
          "url": "https://www.instant-gaming.com/en/search/?q=GameName?igr=gamer-8f36d5"
        },
        {
          "name": "Kinguin",
          "url": "https://www.kinguin.net/listing?active=1&phrase=GameName"
        }
      ]
    }
  ]
}

For each recommendation, you must provide an Instant Gaming link, this link must absolutely be a search link like this: https://www.instant-gaming.com/en/search/?q=GameName?igr=gamer-8f36d5

For each request, you must provide exactly 4 game recommendations. For the 3 recommendations with the lowest similarity scores, provide a concise explanation of about 100 characters highlighting the most relevant common points. For the recommendation with the highest score, develop a more in-depth analysis of MAXIMUM 400 characters that details the similarities in terms of gameplay, atmosphere, mechanics, and overall experience.

NEVER provide explanations outside of the JSON.
ALWAYS respond in english.`;

const geminiHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { prompt } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: 'Clé API Gemini manquante' });
    return;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'model', parts: [{ text: 'Je comprends. Je vais suivre ces instructions pour fournir des recommandations de jeux au format JSON, en utilisant uniquement des URLs d\'images provenant de sources officielles et fiables, avec une image de placeholder par défaut si nécessaire.' }] },
          { role: 'user', parts: [{ text: prompt }] }
        ],
        generationConfig: { 
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erreur Gemini:', error);
    res.status(500).json({ error: 'Erreur lors de la requête Gemini' });
  }
};

router.post('/gemini', geminiHandler);

export default router;