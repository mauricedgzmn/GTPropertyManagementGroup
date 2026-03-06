import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import api from '../../utils/api'

function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', form)
      localStorage.setItem('gtmg_token', data.token)
      localStorage.setItem('gtmg_user', data.username)
      localStorage.setItem('gtmg_role', data.role)
      localStorage.setItem('gtmg_id', data.id)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', fontSize: '13px', fontWeight: 300, color: '#1a1a1a',
    background: '#fff', border: '1.5px solid #e8e4de',
    padding: '12px 16px 12px 44px', outline: 'none',
    fontFamily: "'Jost', sans-serif", boxSizing: 'border-box', transition: 'border 0.2s',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Jost', sans-serif", padding: '24px' }}>
      <div style={{ position: 'fixed', inset: 0, background: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80') center/cover no-repeat", filter: 'brightness(0.12) saturate(0.4)', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', marginBottom: '4px', display: 'inline-block' }}>
            GT Property Management
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '9px', letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Group</div>
          <div style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#c9a96e', marginTop: '20px' }}>Owner Dashboard</div>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', padding: '40px', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 400, color: '#1a1a1a', marginBottom: '8px' }}>Welcome back</h2>
          <p style={{ fontSize: '12px', color: '#999', marginBottom: '32px', letterSpacing: '0.04em' }}>Sign in to manage your properties</p>

          {error && (
            <div style={{ background: '#fff5f5', border: '1px solid #fecaca', padding: '12px 16px', marginBottom: '20px', fontSize: '12px', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Username</label>
              <div style={{ position: 'relative' }}>
                <User size={14} color="#aaa" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="text" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
                  placeholder="Enter your username" style={inputStyle} required
                  onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
                  onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color="#aaa" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••" style={{ ...inputStyle, paddingRight: '44px' }} required
                  onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
                  onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {showPassword ? <EyeOff size={14} color="#aaa" /> : <Eye size={14} color="#aaa" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#999' : '#111', color: '#fff', border: '1px solid #111', padding: '14px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'all 0.2s' }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.borderColor = '#c9a96e' } }}
              onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#111' } }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '24px', letterSpacing: '0.06em' }}>
          © 2026 GT Property Management Group
        </p>
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button onClick={() => navigate('/')}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', padding: '10px 24px', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '4px', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a96e'; e.currentTarget.style.color = '#c9a96e' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
          >← Back to Website</button>
        </div>
      </div>
    </div>
  )
}

export default Login