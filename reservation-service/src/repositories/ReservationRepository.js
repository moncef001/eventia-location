const Reservation = require('../models/Reservation');

class ReservationRepository {
  async findAll() {
    return Reservation.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return Reservation.findById(id).catch(() => null);
  }

  async create(data) {
    return Reservation.create(data);
  }

  async update(id, data) {
    return Reservation.findByIdAndUpdate(id, data, { new: true, runValidators: true }).catch(() => null);
  }
}

module.exports = new ReservationRepository();
