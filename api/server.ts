import express from 'express';
import cors from 'cors';
import geminiProxy from './gemini-proxy';
import rawgProxy from './rawg-proxy';

const app = express();

// Configuration CORS détaillée
const corsOptions = {
  origin: '*', // En production, spécifiez les domaines autorisés
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

// Appliquer CORS à toutes les routes
app.use(cors(corsOptions));
app.use(express.json());

// Montre clairement les chemins
app.use('/api', geminiProxy);
app.use('/api', rawgProxy);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur le port ${PORT}`);
});