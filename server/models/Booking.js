import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  guestName: { type: String, required: true, trim: true },
  guestEmail: { type: String, required: true, trim: true },
  guestPhone: { type: String, trim: true },
  guests: { type: Number, required: true, default: 1 },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  nights: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
  cleaningFee: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  message: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('Booking', bookingSchema)