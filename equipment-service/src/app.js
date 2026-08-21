const express = require('express');
const cors = require('cors');
const materielRoutes = require('./routes/materielRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/equipments', materielRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok', service: 'equipment-service' }));

module.exports = app;
