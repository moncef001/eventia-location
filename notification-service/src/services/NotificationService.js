const notificationRepository = require('../repositories/NotificationRepository');

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class NotificationService {
  async getAll() {
    return notificationRepository.findAll();
  }

  async create(data) {
    const { recipient, message, type } = data;
    if (!recipient || !message || !type) {
      throw new ApiError(400, 'Les champs recipient, message et type sont requis');
    }
    return notificationRepository.create({ recipient, message, type });
  }
}

module.exports = { NotificationService: new NotificationService(), ApiError };
