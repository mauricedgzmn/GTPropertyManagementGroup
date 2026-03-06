import express from 'express'
import Booking from '../models/Booking.js'
import Property from '../models/Property.js'
import protect from '../middleware/auth.js'

const router = express.Router()

// Helper — check if two date ranges overlap
const datesOverlap = (checkIn1, checkOut1, checkIn2, checkOut2) => {
  return checkIn1 < checkOut2 && checkOut1 > checkIn2
}

// GET /api/properties/search?location=&checkIn=&checkOut=&guests=
// Public — search available properties
router.get('/search', async (req, res) => {
  try {
    const { location, checkIn, checkOut, guests } = req.query
    const filter = { active: true }

    if (location && location !== 'any') {
      filter.location = { $regex: location, $options: 'i' }
    }
    if (guests) {
      filter.maxGuests = { $gte: Number(guests) }
    }

    let properties = await Property.find(filter).sort({ createdAt: -1 })

    // Filter out properties with overlapping bookings
    if (checkIn && checkOut) {
      const ci = new Date(checkIn)
      const co = new Date(checkOut)
      properties = properties.filter(p => {
        if (!p.bookedDates || p.bookedDates.length === 0) return true
        return !p.bookedDates.some(b =>
          datesOverlap(ci, co, new Date(b.checkIn), new Date(b.checkOut))
        )
      })
    }

    res.json(properties)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/bookings — create a booking request
router.post('/', async (req, res) => {
  try {
    const { propertyId, guestName, guestEmail, guestPhone, guests, checkIn, checkOut, message } = req.body

    if (!propertyId || !guestName || !guestEmail || !checkIn || !checkOut) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const property = await Property.findById(propertyId)
    if (!property) return res.status(404).json({ message: 'Property not found' })

    const ci = new Date(checkIn)
    const co = new Date(checkOut)

    if (ci >= co) return res.status(400).json({ message: 'Check-out must be after check-in' })

    // Check availability
    const isBooked = property.bookedDates?.some(b =>
      datesOverlap(ci, co, new Date(b.checkIn), new Date(b.checkOut))
    )
    if (isBooked) return res.status(400).json({ message: 'Property is not available for these dates' })

    const nights = Math.round((co - ci) / (1000 * 60 * 60 * 24))
    const totalPrice = (property.price * nights) + (property.cleaningFee || 0)

    // Save booking
    const booking = await Booking.create({
      property: property._id,
      guestName, guestEmail, guestPhone,
      guests: Number(guests) || 1,
      checkIn: ci, checkOut: co,
      nights,
      pricePerNight: property.price,
      cleaningFee: property.cleaningFee || 0,
      totalPrice,
      message,
    })

    // Block dates on the property
    property.bookedDates.push({ checkIn: ci, checkOut: co, guestName, guestEmail })
    await property.save()

    res.status(201).json({ message: 'Booking request received', booking })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// GET /api/bookings — admin only, all bookings
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('property', 'name location images price')
      .sort({ createdAt: -1 })
    res.json(bookings)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT /api/bookings/:id/status — admin only, confirm or cancel
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body
    const booking = await Booking.findById(req.params.id)
    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    // If cancelling, free up the dates on the property
    if (status === 'cancelled' && booking.status !== 'cancelled') {
      await Property.findByIdAndUpdate(booking.property, {
        $pull: {
          bookedDates: {
            checkIn: booking.checkIn,
            guestEmail: booking.guestEmail
          }
        }
      })
    }

    booking.status = status
    await booking.save()
    res.json(booking)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE /api/bookings/:id — admin only
router.delete('/:id', protect, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    res.json({ message: 'Booking deleted' })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router