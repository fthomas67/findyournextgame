import express, { Request, Response, Router, RequestHandler } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();

const rawgHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { query, page_size } = req.query;
  const RAWG_API_KEY = process.env.RAWG_API_KEY;

  if (!RAWG_API_KEY) {
    res.status(500).json({ error: 'Clé API RAWG manquante' });
    return;
  }

  try {
    const url = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${query}&page_size=${page_size || 10}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur RAWG: ${response.status}`);
    }

    const data = await response.json();
    
    // Ne retourner que les informations essentielles
    const filteredResults = data.results.map((game: any) => ({
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres.map((g: any) => g.name),
      platforms: game.platforms.map((p: any) => p.platform.name),
      rating: game.rating,
      released: game.released
    }));

    res.json({
      count: data.count,
      results: filteredResults
    });
  } catch (error) {
    console.error('Erreur lors du fetch RAWG:', error);
    res.status(500).json({ error: 'Erreur lors de la requête RAWG', details: error instanceof Error ? error.message : error });
  }
};

router.get('/rawg', rawgHandler);

export default router;