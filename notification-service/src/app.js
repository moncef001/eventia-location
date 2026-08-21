const express = require('express');
const cors = require('cors');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/notifications', notificationRoutes);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok', service: 'notification-service' }));

module.exports = app;
