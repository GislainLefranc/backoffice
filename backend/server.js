import 'dotenv/config';
import { createServer } from 'node:http';
import app from './app/app.js';

const PORT = process.env.PORT ?? 3000;

// Création et démarrage du serveur
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`🚀 to infinity and beyond at http://localhost:${PORT}`);
});

export default server;
