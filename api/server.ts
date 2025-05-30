import express from 'express';
import cors from 'cors';
import geminiProxy from './gemini-proxy';
import rawgProxy from './rawg-proxy';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', geminiProxy);
app.use('/api', rawgProxy);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur le port ${PORT}`);
}); 