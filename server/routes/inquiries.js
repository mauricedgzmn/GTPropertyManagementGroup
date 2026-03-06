import express from 'express'
import Inquiry from '../models/Inquiry.js'
import protect from '../middleware/auth.js'

const router = express.Router()

// POST /api/inquiries — public, called from InquiryPage
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, offers, propertyId, property, checkIn, checkOut, guests } = req.body
    if (!firstName || !email) return res.status(400).json({ message: 'First name and email are required' })

    const inquiry = await Inquiry.create({
      firstName, lastName, email, phone, message, offers,
      propertyId: propertyId || null,
      property:   property  || '',
      checkIn:    checkIn   || '',
      checkOut:   checkOut  || '',
      guests:     guests    || 1,
    })
    res.status(201).json(inquiry)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/inquiries — admin only
router.get('/', protect, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })
    res.json(inquiries)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// PATCH /api/inquiries/:id/status — admin only
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body
    const valid = ['new', 'in_progress', 'confirmed', 'declined']
    if (!valid.includes(status)) return res.status(400).json({ message: 'Invalid status' })

    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' })
    res.json(inquiry)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/inquiries/:id — admin only, declined inquiries
router.delete('/:id', protect, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' })
    if (inquiry.status !== 'declined') return res.status(403).json({ message: 'Only declined inquiries can be deleted' })

    await Inquiry.findByIdAndDelete(req.params.id)
    res.json({ message: 'Inquiry removed' })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router