import express from 'express'
import InvestLead from '../models/InvestLead.js'
import protect from '../middleware/auth.js'

const router = express.Router()

// POST /api/invest-leads — public, submit investment inquiry
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, interest, message } = req.body
    if (!firstName || !email || !message)
      return res.status(400).json({ message: 'First name, email and message are required' })
    const lead = await InvestLead.create({ firstName, lastName, email, phone, interest, message })
    res.status(201).json({ message: 'Investment inquiry submitted successfully', lead })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/invest-leads — admin only
router.get('/', protect, async (req, res) => {
  try {
    const leads = await InvestLead.find().sort({ createdAt: -1 })
    res.json(leads)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// PATCH /api/invest-leads/:id — update status
router.patch('/:id', protect, async (req, res) => {
  try {
    const lead = await InvestLead.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json(lead)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/invest-leads/:id — admin only
router.delete('/:id', protect, async (req, res) => {
  try {
    await InvestLead.findByIdAndDelete(req.params.id)
    res.json({ message: 'Lead removed' })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router