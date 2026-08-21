const { MaterielService, ApiError } = require('../services/MaterielService');

class MaterielController {
  async getAll(req, res) {
    const materiels = await MaterielService.getAll();
    res.status(200).json(materiels);
  }

  async getById(req, res) {
    try {
      const materiel = await MaterielService.getById(req.params.id);
      res.status(200).json(materiel);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  async create(req, res) {
    try {
      const materiel = await MaterielService.create(req.body);
      res.status(201).json(materiel);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  async update(req, res) {
    try {
      const materiel = await MaterielService.update(req.params.id, req.body);
      res.status(200).json(materiel);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  async delete(req, res) {
    try {
      await MaterielService.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      this.handleError(err, res);
    }
  }

  async reserve(req, res) {
    try {
      const materiel = await MaterielService.reserve(req.params.id, req.body.quantity);
      res.status(200).json(materiel);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  async release(req, res) {
    try {
      const materiel = await MaterielService.release(req.params.id, req.body.quantity);
      res.status(200).json(materiel);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  handleError(err, res) {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

module.exports = new MaterielController();
