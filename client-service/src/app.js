const express = require('express');
const cors = require('cors');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/clients', clientRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok', service: 'client-service' }));

module.exports = app;
