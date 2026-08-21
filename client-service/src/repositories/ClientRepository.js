const Client = require('../models/Client');

class ClientRepository {
  async findAll() {
    return Client.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return Client.findById(id).catch(() => null);
  }

  async findByEmail(email) {
    return Client.findOne({ email: email.toLowerCase() });
  }

  async create(data) {
    return Client.create(data);
  }

  async update(id, data) {
    return Client.findByIdAndUpdate(id, data, { new: true, runValidators: true }).catch(() => null);
  }

  async delete(id) {
    const result = await Client.findByIdAndDelete(id).catch(() => null);
    return !!result;
  }
}

module.exports = new ClientRepository();
