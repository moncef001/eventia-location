const Materiel = require('../models/Materiel');

class MaterielRepository {
  async findAll() {
    return Materiel.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return Materiel.findById(id).catch(() => null);
  }

  async create(data) {
    return Materiel.create(data);
  }

  async update(id, data) {
    return Materiel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).catch(() => null);
  }

  async delete(id) {
    const result = await Materiel.findByIdAndDelete(id).catch(() => null);
    return !!result;
  }

  // Atomically adjust availableQuantity by delta (positive or negative)
  async adjustQuantity(id, delta) {
    return Materiel.findByIdAndUpdate(
      id,
      { $inc: { availableQuantity: delta } },
      { new: true, runValidators: true }
    ).catch(() => null);
  }
}

module.exports = new MaterielRepository();
