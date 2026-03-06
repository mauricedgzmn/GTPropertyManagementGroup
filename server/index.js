import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import propertyRoutes from './routes/properties.js'
import bookingRoutes from './routes/bookings.js'
import inquiryRoutes from './routes/inquiries.js'
import teamRoutes from './routes/team.js'
import investLeadRoutes from './routes/investLeads.js'
import Admin from './models/admin.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/invest-leads', investLeadRoutes)

// One-time setup: force admin account to owner role
app.get('/api/setup-owner', async (req, res) => {
  try {
    const result = await Admin.updateMany(
      { username: 'admin' },
      { $set: { role: 'owner', active: true } }
    )
    res.json({ message: `Done. ${result.modifiedCount} account(s) updated to owner.` })
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message })
  }
})

// One-time setup: create admin account if it doesn't exist
// Visit: https://gtpropertymanagementgroup.onrender.com/api/create-admin
app.get('/api/create-admin', async (req, res) => {
  try {
    const existing = await Admin.findOne({ username: 'admin' })
    if (existing) {
      existing.role = 'owner'
      existing.active = true
      await existing.save()
      return res.json({ message: 'Admin already exists, updated to owner.' })
    }
    await Admin.create({
      username: 'admin',
      password: 'gtpmg2026',
      name: 'Admin',
      role: 'owner',
      active: true
    })
    res.json({ message: 'Admin created successfully!' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'GT Management Group API is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})