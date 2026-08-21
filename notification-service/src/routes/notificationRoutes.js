const express = require('express');
const controller = require('../controllers/NotificationController');

const router = express.Router();

router.get('/', (req, res) => controller.getAll(req, res));
router.post('/', (req, res) => controller.create(req, res));

module.exports = router;
