const clientRepository = require('../repositories/ClientRepository');

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ClientService {
  async getAll() {
    return clientRepository.findAll();
  }

  async getById(id) {
    const client = await clientRepository.findById(id);
    if (!client) throw new ApiError(404, 'Client introuvable');
    return client;
  }

  async create(data) {
    const { name, email, phone } = data;
    if (!name || !email || !phone) {
      throw new ApiError(400, 'Les champs name, email et phone sont requis');
    }

    const existing = await clientRepository.findByEmail(email);
    if (existing) {
      throw new ApiError(409, 'Un client avec ce courriel existe déjà');
    }

    return clientRepository.create({ name, email, phone });
  }

  async update(id, data) {
    const { name, email, phone } = data;

    if (email) {
      const existing = await clientRepository.findByEmail(email);
      if (existing && existing._id.toString() !== id) {
        throw new ApiError(409, 'Un client avec ce courriel existe déjà');
      }
    }

    const updated = await clientRepository.update(id, { name, email, phone });
    if (!updated) throw new ApiError(404, 'Client introuvable');
    return updated;
  }

  async delete(id) {
    const deleted = await clientRepository.delete(id);
    if (!deleted) throw new ApiError(404, 'Client introuvable');
  }
}

module.exports = { ClientService: new ClientService(), ApiError };
