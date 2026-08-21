const materielRepository = require('../repositories/MaterielRepository');

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class MaterielService {
  async getAll() {
    return materielRepository.findAll();
  }

  async getById(id) {
    const materiel = await materielRepository.findById(id);
    if (!materiel) throw new ApiError(404, 'Équipement introuvable');
    return materiel;
  }

  async create(data) {
    const { name, category, dailyPrice, availableQuantity } = data;
    if (!name || !category || dailyPrice === undefined || availableQuantity === undefined) {
      throw new ApiError(400, 'Les champs name, category, dailyPrice et availableQuantity sont requis');
    }
    if (dailyPrice < 0 || availableQuantity < 0) {
      throw new ApiError(400, 'dailyPrice et availableQuantity doivent être positifs');
    }
    return materielRepository.create({ name, category, dailyPrice, availableQuantity });
  }

  async update(id, data) {
    const { name, category, dailyPrice, availableQuantity } = data;
    const updated = await materielRepository.update(id, { name, category, dailyPrice, availableQuantity });
    if (!updated) throw new ApiError(404, 'Équipement introuvable');
    return updated;
  }

  async delete(id) {
    const deleted = await materielRepository.delete(id);
    if (!deleted) throw new ApiError(404, 'Équipement introuvable');
  }

  async reserve(id, quantity) {
    if (!quantity || quantity < 1) {
      throw new ApiError(400, 'La quantité doit être supérieure ou égale à 1');
    }

    const materiel = await materielRepository.findById(id);
    if (!materiel) throw new ApiError(404, 'Équipement introuvable');

    if (materiel.availableQuantity < quantity) {
      throw new ApiError(400, 'Quantité disponible insuffisante');
    }

    return materielRepository.adjustQuantity(id, -quantity);
  }

  async release(id, quantity) {
    if (!quantity || quantity < 1) {
      throw new ApiError(400, 'La quantité doit être supérieure ou égale à 1');
    }

    const materiel = await materielRepository.findById(id);
    if (!materiel) throw new ApiError(404, 'Équipement introuvable');

    return materielRepository.adjustQuantity(id, quantity);
  }
}

module.exports = { MaterielService: new MaterielService(), ApiError };
