const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);