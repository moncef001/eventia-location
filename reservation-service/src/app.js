const express = require('express');
const cors = require('cors');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/reservations', reservationRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok', service: 'reservation-service' }));

module.exports = app;
