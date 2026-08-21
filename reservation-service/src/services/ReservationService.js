const reservationRepository = require('../repositories/ReservationRepository');
const clientApi = require('../clients/ClientApiClient');
const materielApi = require('../clients/MaterielApiClient');
const notificationApi = require('../clients/NotificationApiClient');

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

class ReservationService {
  async getAll() {
    return reservationRepository.findAll();
  }

  validateQuantity(quantity) {
    if (!quantity || quantity < 1) {
      throw new ApiError(400, 'La quantité doit être supérieure ou égale à 1');
    }
  }

  validateDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new ApiError(400, 'Les dates fournies sont invalides');
    }
    if (end < start) {
      throw new ApiError(400, 'La date de fin ne peut pas précéder la date de début');
    }
    return { start, end };
  }

  calculateTotalPrice(start, end, quantity, dailyPrice) {
    // Nombre de jours inclusif (premier ET dernier jour comptent)
    const days = Math.floor((end - start) / MS_PER_DAY) + 1;
    return days * quantity * dailyPrice;
  }

  async create(data) {
    const { clientId, equipmentId, quantity, startDate, endDate } = data;

    if (!clientId || !equipmentId) {
      throw new ApiError(400, 'clientId et equipmentId sont requis');
    }

    this.validateQuantity(quantity);
    const { start, end } = this.validateDates(startDate, endDate);

    // 1. Valider le client
    const client = await clientApi.getClientById(clientId);
    if (!client) throw new ApiError(404, 'Client introuvable');

    // 2. Valider le matériel
    const equipment = await materielApi.getEquipmentById(equipmentId);
    if (!equipment) throw new ApiError(404, 'Équipement introuvable');

    if (equipment.availableQuantity < quantity) {
      throw new ApiError(400, 'Quantité disponible insuffisante pour cet équipement');
    }

    // 3. Calculer le prix total
    const totalPrice = this.calculateTotalPrice(start, end, quantity, equipment.dailyPrice);

    // 4. Réserver le stock (diminue la quantité disponible)
    try {
      await materielApi.reserveEquipment(equipmentId, quantity);
    } catch (err) {
      throw new ApiError(err.statusCode || 400, err.message);
    }

    // 5. Créer la réservation
    const reservation = await reservationRepository.create({
      clientId,
      clientName: client.name,
      equipmentId,
      equipmentName: equipment.name,
      quantity,
      startDate: start,
      endDate: end,
      totalPrice,
      status: 'CONFIRMED'
    });

    // 6. Déclencher une notification (n'échoue jamais la réservation)
    await notificationApi.createNotification({
      recipient: client.email,
      message: `Réservation confirmée pour ${equipment.name} (x${quantity}) du ${start.toDateString()} au ${end.toDateString()}. Total: ${totalPrice}$`,
      type: 'RESERVATION_CONFIRMED'
    });

    return reservation;
  }

  async cancel(id) {
    const reservation = await reservationRepository.findById(id);
    if (!reservation) throw new ApiError(404, 'Réservation introuvable');

    if (reservation.status === 'CANCELLED') {
      throw new ApiError(400, 'Cette réservation est déjà annulée');
    }

    // 1. Libérer le stock
    await materielApi.releaseEquipment(reservation.equipmentId, reservation.quantity);

    // 2. Mettre à jour le statut
    const updated = await reservationRepository.update(id, { status: 'CANCELLED' });

    // 3. Déclencher une notification
    await notificationApi.createNotification({
      recipient: reservation.clientName,
      message: `Réservation annulée pour ${reservation.equipmentName} (x${reservation.quantity}).`,
      type: 'RESERVATION_CANCELLED'
    });

    return updated;
  }
}

module.exports = { ReservationService: new ReservationService(), ApiError };
