const express = require('express');
const controller = require('../controllers/MaterielController');

const router = express.Router();

router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.put('/:id/reserve', (req, res) => controller.reserve(req, res));
router.put('/:id/release', (req, res) => controller.release(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

module.exports = router;
