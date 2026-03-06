import mongoose from 'mongoose'

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  cleaningFee: { type: Number, default: 0 },
  description: { type: String, default: '' },
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  maxGuests: { type: Number, default: 2 },
  beds: { type: Number, default: 1 },
  minStay: { type: Number, default: 1 },
  cancellationPolicy: { type: String, default: 'flexible' },
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  images: [{ type: String }],
  amenities: {
    internetAndOffice: [{ type: String }],
    heatingAndCooling: [{ type: String }],
    kitchenAndDining: [{ type: String }],
    bedroomAndLaundry: [{ type: String }],
    bathroom: [{ type: String }],
    homeSafety: [{ type: String }],
    entertainment: [{ type: String }],
    parkingAndFacilities: [{ type: String }],
    other: [{ type: String }],
  },
  houseRules: { type: String, default: '' },
  bookedDates: [
    {
      checkIn: { type: Date },
      checkOut: { type: Date },
      guestName: { type: String },
      guestEmail: { type: String },
    }
  ],
}, { timestamps: true })

export default mongoose.model('Property', propertySchema)