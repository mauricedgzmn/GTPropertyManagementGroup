import dotenv from 'dotenv'
import Admin from '../models/admin.js'
import connectDB from '../config/db.js'

dotenv.config()

const seed = async () => {
  await connectDB()
  const existing = await Admin.findOne({ username: 'admin' })
  if (existing) {
    if (existing.role !== 'owner') {
      existing.role = 'owner'
      await existing.save()
      console.log('✅ Existing admin upgraded to owner.')
    } else {
      console.log('Owner already exists. Skipping.')
    }
    process.exit(0)
  }
  await Admin.create({ username: 'admin', password: 'gtpmg2026', name: 'Admin', role: 'owner', active: true })
  console.log('✅ Owner account created.  username: admin  password: gtpmg2026')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })