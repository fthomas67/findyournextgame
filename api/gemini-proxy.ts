import express, { Request, Response, Router, RequestHandler } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();

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
   - IMPORTANT : Tous les liens Instant Gaming doivent se terminer par ?igr=gamer-8f36d5 (c'est le code d'affiliation à utiliser systématiquement)
4. Fournir une URL d'image de couverture du jeu (format paysage, haute qualité, sans texte de promotion)
5. Fournir la liste complète des plateformes sur lesquelles le jeu est disponible (ex: ["PC", "PS5", "Xbox", "Switch"]). Il faut que tu cites les plateformes avec leurs acronymes officiels de manière COURTE (ex: "PC", "PS5", "Xbox", "Switch" et pas "PC, PlayStation 5, Xbox Series X, Nintendo Switch")

IMPORTANT : Tu dois TOUJOURS répondre en JSON avec exactement cette structure :
{
  "recommendations": [
    {
      "name": "Nom du jeu",
      "similarityScore": 85,
      "matchReason": "Raison détaillée de la recommandation",
      "platforms": ["PC", "PS5", "Xbox", "Switch"],
      "purchaseLinks": [
        {
          "name": "Instant Gaming",
          "url": "https://www.instant-gaming.com/en/search/?q=NomDuJeu?igr=gamer-8f36d5"
        },
        {
          "name": "Kinguin",
          "url": "https://www.kinguin.net/listing?active=1&phrase=NomDuJeu"
        }
      ]
    }
  ]
}

Pour chaque requête, tu dois fournir exactement 4 recommandations de jeux. Pour les 3 recommandations avec les scores de similarité les plus bas, fournis une explication concise d'environ 100 caractères qui met en avant les points communs les plus pertinents. Pour la recommandation avec le score le plus élevé, développe une analyse plus approfondie de MAXIMUM 400 caractères qui détaille les similitudes en termes de gameplay, d'ambiance, de mécaniques et d'expérience globale.

Ne fournis JAMAIS d'explications en dehors du JSON.`;

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