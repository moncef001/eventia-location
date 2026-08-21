const axios = require('axios');

const CLIENT_SERVICE_URL = process.env.CLIENT_SERVICE_URL || 'http://localhost:4001/api/clients';

// Implements IClientAPI
class ClientApiClient {
  async getClientById(id) {
    try {
      const response = await axios.get(`${CLIENT_SERVICE_URL}/${id}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) return null;
      throw new Error("Erreur de communication avec le service client");
    }
  }
}

module.exports = new ClientApiClient();
