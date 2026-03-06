import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js'

const router = express.Router()

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password)
    return res.status(400).json({ message: 'Please provide username and password' })
  try {
    const admin = await Admin.findOne({ username })
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' })
    if (!admin.active)
      return res.status(403).json({ message: 'Your account has been deactivated. Contact the owner.' })
    res.json({
      token:    generateToken(admin._id),
      id:       admin._id,
      username: admin.username,
      name:     admin.name,
      role:     admin.role,
    })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router