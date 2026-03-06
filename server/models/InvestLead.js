import mongoose from 'mongoose'

const investLeadSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, default: '' },
  email:     { type: String, required: true },
  phone:     { type: String, default: '' },
  interest:  { type: String, enum: ['rent', 'buy'], default: 'rent' },
  message:   { type: String, required: true },
  status:    { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true })

export default mongoose.model('InvestLead', investLeadSchema)