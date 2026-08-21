require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 4002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventia-equipements';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('[equipment-service] Connecté à MongoDB');
    app.listen(PORT, () => console.log(`[equipment-service] En écoute sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error('[equipment-service] Erreur de connexion MongoDB:', err.message);
    process.exit(1);
  });
