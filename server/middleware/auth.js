import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js'

const protect = async (req, res, next) => {
  let token
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.admin = await Admin.findById(decoded.id).select('-password')
      if (!req.admin || !req.admin.active)
        return res.status(401).json({ message: 'Account not authorized' })
      next()
    } catch {
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' })
}

export const ownerOnly = (req, res, next) => {
  if (req.admin?.role !== 'owner')
    return res.status(403).json({ message: 'Owner access required' })
  next()
}

export default protect