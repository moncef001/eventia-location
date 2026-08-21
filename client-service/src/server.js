require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventia-clients';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('[client-service] Connecté à MongoDB');
    app.listen(PORT, () => console.log(`[client-service] En écoute sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error('[client-service] Erreur de connexion MongoDB:', err.message);
    process.exit(1);
  });
