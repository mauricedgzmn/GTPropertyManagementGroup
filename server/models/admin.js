import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  name:     { type: String, default: '' },
  email:    { type: String, default: '' },
  role:     { type: String, enum: ['owner', 'staff'], default: 'staff' },
  active:   { type: Boolean, default: true },
}, { timestamps: true })

adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

adminSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password)
}

export default mongoose.model('Admin', adminSchema)