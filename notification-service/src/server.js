require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 4004;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventia-notifications';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('[notification-service] Connecté à MongoDB');
    app.listen(PORT, () => console.log(`[notification-service] En écoute sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error('[notification-service] Erreur de connexion MongoDB:', err.message);
    process.exit(1);
  });
