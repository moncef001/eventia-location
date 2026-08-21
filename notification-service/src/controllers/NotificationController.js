const { NotificationService, ApiError } = require('../services/NotificationService');

class NotificationController {
  async getAll(req, res) {
    const notifications = await NotificationService.getAll();
    res.status(200).json(notifications);
  }

  async create(req, res) {
    try {
      const notification = await NotificationService.create(req.body);
      res.status(201).json(notification);
    } catch (err) {
      if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }
}

module.exports = new NotificationController();
