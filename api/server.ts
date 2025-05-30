import express from 'express';
import cors from 'cors';
import geminiProxy from './gemini-proxy';
import rawgProxy from './rawg-proxy';

const app = express();

// CORS complet avec réponse OPTIONS
app.use(cors());
app.options('*', cors()); // <-- gère les préflight requests

app.use(express.json());

// Montre clairement les chemins
app.use('/api/gemini', geminiProxy);
app.use('/api/rawg', rawgProxy);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur le port ${PORT}`);
});