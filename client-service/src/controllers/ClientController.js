const { ClientService, ApiError } = require('../services/ClientService');

class ClientController {
  async getAll(req, res) {
    const clients = await ClientService.getAll();
    res.status(200).json(clients);
  }

  async getById(req, res) {
    try {
      const client = await ClientService.getById(req.params.id);
      res.status(200).json(client);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  async create(req, res) {
    try {
      const client = await ClientService.create(req.body);
      res.status(201).json(client);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  async update(req, res) {
    try {
      const client = await ClientService.update(req.params.id, req.body);
      res.status(200).json(client);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  async delete(req, res) {
    try {
      await ClientService.delete(req.params.id);
      res.status(204).send();
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

module.exports = new ClientController();
