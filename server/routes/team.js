import express from 'express'
import Admin from '../models/admin.js'
import protect, { ownerOnly } from '../middleware/auth.js'

const router = express.Router()

// GET /api/team — owner only
router.get('/', protect, ownerOnly, async (req, res) => {
  try {
    const members = await Admin.find().select('-password').sort({ createdAt: 1 })
    res.json(members)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/team — owner only, create staff
router.post('/', protect, ownerOnly, async (req, res) => {
  try {
    const { username, password, name, email } = req.body
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required' })
    if (await Admin.findOne({ username }))
      return res.status(400).json({ message: 'Username already taken' })
    const member = await Admin.create({ username, password, name: name || '', email: email || '', role: 'staff', active: true })
    const obj = member.toObject(); delete obj.password
    res.status(201).json(obj)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// PATCH /api/team/:id — owner only, update name/email/password/active
router.patch('/:id', protect, ownerOnly, async (req, res) => {
  try {
    const member = await Admin.findById(req.params.id)
    if (!member) return res.status(404).json({ message: 'Member not found' })
    if (member.role === 'owner' && member._id.toString() !== req.admin._id.toString())
      return res.status(400).json({ message: 'Cannot edit another owner' })
    const { name, email, password, active } = req.body
    if (name     !== undefined) member.name   = name
    if (email    !== undefined) member.email  = email
    if (password)               member.password = password
    if (active   !== undefined) member.active = active
    await member.save()
    const obj = member.toObject(); delete obj.password
    res.json(obj)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/team/:id — owner only, cannot delete self
router.delete('/:id', protect, ownerOnly, async (req, res) => {
  try {
    if (req.params.id === req.admin._id.toString())
      return res.status(400).json({ message: 'Cannot delete your own account' })
    await Admin.findByIdAndDelete(req.params.id)
    res.json({ message: 'Member removed' })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router