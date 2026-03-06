import mongoose from 'mongoose'

const inquirySchema = new mongoose.Schema({
  firstName:  { type: String, required: true },
  lastName:   { type: String, default: '' },
  email:      { type: String, required: true },
  phone:      { type: String, default: '' },
  message:    { type: String, default: '' },
  offers:     { type: Boolean, default: false },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', default: null },
  property:   { type: String, default: '' },
  checkIn:    { type: String, default: '' },
  checkOut:   { type: String, default: '' },
  guests:     { type: Number, default: 1 },
  status:     { type: String, enum: ['new', 'in_progress', 'confirmed', 'declined'], default: 'new' },
}, { timestamps: true })

export default mongoose.model('Inquiry', inquirySchema)