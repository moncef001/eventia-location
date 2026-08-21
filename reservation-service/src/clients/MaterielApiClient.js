const axios = require('axios');

const EQUIPMENT_SERVICE_URL = process.env.EQUIPMENT_SERVICE_URL || 'http://localhost:4002/api/equipements';

// Implements IMaterielAPI
class MaterielApiClient {
  async getEquipmentById(id) {
    try {
      const response = await axios.get(`${EQUIPMENT_SERVICE_URL}/${id}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) return null;
      throw new Error('Erreur de communication avec le service matériel');
    }
  }

  async reserveEquipment(id, quantity) {
    try {
      const response = await axios.put(`${EQUIPMENT_SERVICE_URL}/${id}/reserve`, { quantity });
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Impossible de réserver le matériel';
      const error = new Error(message);
      error.statusCode = err.response?.status || 500;
      throw error;
    }
  }

  async releaseEquipment(id, quantity) {
    try {
      const response = await axios.put(`${EQUIPMENT_SERVICE_URL}/${id}/release`, { quantity });
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Impossible de libérer le matériel';
      const error = new Error(message);
      error.statusCode = err.response?.status || 500;
      throw error;
    }
  }
}

module.exports = new MaterielApiClient();
