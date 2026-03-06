import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import Property from '../models/Property.js'
import protect from '../middleware/auth.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/'
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // ✅ increased to 20MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/
    const ext = allowed.test(path.extname(file.originalname).toLowerCase())
    const mime = allowed.test(file.mimetype)
    if (ext && mime) cb(null, true)
    else cb(new Error('Only image files are allowed'))
  },
})

// GET /api/properties — public, all active properties
router.get('/', async (req, res) => {
  try {
    const { featured } = req.query
    const filter = { active: true }
    if (featured === 'true') filter.featured = true
    const properties = await Property.find(filter).sort({ createdAt: -1 })
    res.json(properties)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/properties/all — admin only, includes inactive
router.get('/all', protect, async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 })
    res.json(properties)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/properties/:id — public
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
    if (!property) return res.status(404).json({ message: 'Property not found' })
    res.json(property)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/properties — admin only
router.post('/', protect, upload.array('images', 50), async (req, res) => { // ✅ increased to 50
  try {
    const {
      name, type, location, price, cleaningFee, description, houseRules,
      featured, active, bedrooms, bathrooms, maxGuests, beds, minStay,
      cancellationPolicy, imageUrls
    } = req.body

    const amenitiesData = req.body.amenities ? JSON.parse(req.body.amenities) : {}

    const uploadedPaths = req.files?.map(f => `/uploads/${f.filename}`) || []
    const pastedUrls = imageUrls ? JSON.parse(imageUrls) : []
    const images = [...uploadedPaths, ...pastedUrls].filter(Boolean)

    const property = await Property.create({
      name, type, location,
      price: Number(price),
      cleaningFee: Number(cleaningFee) || 0,
      description,
      houseRules,
      featured: featured === 'true',
      active: active !== 'false',
      bedrooms: Number(bedrooms) || 1,
      bathrooms: Number(bathrooms) || 1,
      maxGuests: Number(maxGuests) || 2,
      beds: Number(beds) || 1,
      minStay: Number(minStay) || 1,
      cancellationPolicy: cancellationPolicy || 'flexible',
      amenities: amenitiesData,
      images,
    })

    res.status(201).json(property)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT /api/properties/:id — admin only
router.put('/:id', protect, upload.array('images', 50), async (req, res) => { // ✅ increased to 50
  try {
    const {
      name, type, location, price, cleaningFee, description, houseRules,
      featured, active, bedrooms, bathrooms, maxGuests, beds, minStay,
      cancellationPolicy, imageUrls, keepImages
    } = req.body

    const amenitiesData = req.body.amenities ? JSON.parse(req.body.amenities) : null

    const property = await Property.findById(req.params.id)
    if (!property) return res.status(404).json({ message: 'Property not found' })

    const uploadedPaths = req.files?.map(f => `/uploads/${f.filename}`) || []
    const pastedUrls = imageUrls ? JSON.parse(imageUrls) : []
    const existingImages = keepImages ? JSON.parse(keepImages) : []
    const images = [...existingImages, ...uploadedPaths, ...pastedUrls].filter(Boolean)

    property.name = name ?? property.name
    property.type = type ?? property.type
    property.location = location ?? property.location
    property.price = price ? Number(price) : property.price
    property.cleaningFee = cleaningFee !== undefined ? Number(cleaningFee) : property.cleaningFee
    property.description = description ?? property.description
    property.houseRules = houseRules ?? property.houseRules
    property.featured = featured !== undefined ? featured === 'true' : property.featured
    property.active = active !== undefined ? active !== 'false' : property.active
    property.bedrooms = Number(bedrooms) || property.bedrooms
    property.bathrooms = Number(bathrooms) || property.bathrooms
    property.maxGuests = Number(maxGuests) || property.maxGuests
    property.beds = Number(beds) || property.beds
    property.minStay = Number(minStay) || property.minStay
    property.cancellationPolicy = cancellationPolicy ?? property.cancellationPolicy
    if (amenitiesData) property.amenities = amenitiesData
    if (images.length > 0) property.images = images

    await property.save()
    res.json(property)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE /api/properties/:id — admin only
router.delete('/:id', protect, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id)
    if (!property) return res.status(404).json({ message: 'Property not found' })
    res.json({ message: 'Property deleted' })
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router