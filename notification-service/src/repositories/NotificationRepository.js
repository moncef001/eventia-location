const Notification = require('../models/Notification');

class NotificationRepository {
  async findAll() {
    return Notification.find().sort({ createdAt: -1 }); // plus récente -> plus ancienne
  }

  async create(data) {
    return Notification.create(data);
  }
}

module.exports = new NotificationRepository();
