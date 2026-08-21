const axios = require('axios');

const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:4004/api/notifications';

// Implements INotificationAPI
class NotificationApiClient {
  async createNotification({ recipient, message, type }) {
    try {
      const response = await axios.post(NOTIFICATION_SERVICE_URL, { recipient, message, type });
      return response.data;
    } catch (err) {
      // La notification ne doit pas bloquer la réservation si elle échoue ; on journalise seulement.
      console.error('[reservation-service] Échec de la création de notification:', err.message);
      return null;
    }
  }
}

module.exports = new NotificationApiClient();
