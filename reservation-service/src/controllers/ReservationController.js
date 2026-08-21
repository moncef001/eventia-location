const { ReservationService, ApiError } = require('../services/ReservationService');

class ReservationController {
  async getAll(req, res) {
    const reservations = await ReservationService.getAll();
    res.status(200).json(reservations);
  }

  async create(req, res) {
    try {
      const reservation = await ReservationService.create(req.body);
      res.status(201).json(reservation);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  async cancel(req, res) {
    try {
      const reservation = await ReservationService.cancel(req.params.id);
      res.status(200).json(reservation);
    } catch (err) {
      this.handleError(err, res);
    }
  }

  handleError(err, res) {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

module.exports = new ReservationController();
