const express = require('express');
const controller = require('../controllers/ReservationController');

const router = express.Router();

router.get('/', (req, res) => controller.getAll(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.patch('/:id/cancel', (req, res) => controller.cancel(req, res));

module.exports = router;
