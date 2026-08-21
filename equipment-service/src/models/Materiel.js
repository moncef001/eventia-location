const mongoose = require('mongoose');

const materielSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    dailyPrice: { type: Number, required: true, min: 0 },
    availableQuantity: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Materiel', materielSchema);