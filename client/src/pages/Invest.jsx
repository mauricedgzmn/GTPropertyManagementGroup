import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Users, TrendingUp, ArrowRight, Phone } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const steps = [
  {
    number: '01',
    icon: MapPin,
    label: 'STEP ONE',
    title: 'Property Assessment & Launch',
    description:
      'We start with a complimentary strategy call to analyze your property\'s revenue potential. Our team handles professional photography, compelling listing copy, and multi-platform setup on Airbnb, VRBO, and Booking.com — fully optimized from day one.',
  },
  {
    number: '02',
    icon: Users,
    label: 'STEP TWO',
    title: 'Full-Service Management',
    description:
      'Our team takes over completely. Dynamic pricing adjusts your rates daily based on market data. We handle every guest message, coordinate professional cleaning, manage maintenance, and ensure 5-star reviews every time.',
  },
  {
    number: '03',
    icon: TrendingUp,
    label: 'STEP THREE',
    title: 'Revenue & Reporting',
    description:
      'You receive detailed monthly performance reports showing occupancy, revenue, and ROI. Payouts are processed on schedule every month. No surprises — just consistent income and full visibility into how your asset is performing.',
  },
]

const stats = [
  { value: '94%', label: 'Average Occupancy' },
  { value: '5★', label: 'Guest Rating Average' },
  { value: '72h', label: 'Average Time to First Booking' },
  { value: '3×', label: 'Revenue vs. Long-Term Rental' },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function AnimatedSection({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

export default function Invest() {
  const navigate = useNavigate()

  const scrollToForm = () => {
    document.getElementById('invest-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: '#f8f7f5', color: '#1a1a1a' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(160deg, #1a1a1a 0%, #2c2620 55%, #1a1a1a 100%)',
        position: 'relative', overflow: 'hidden', padding: '120px 24px 80px',
      }}>
        {/* Decorative grain overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }} />
        {/* Gold accent line */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, #c9a96e)' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <AnimatedSection>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 500 }}>
                Short-Term Rental Management · South Florida
              </span>
              <div style={{ width: '40px', height: '1px', background: '#c9a96e' }} />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 300, lineHeight: 1.05, color: '#f8f7f5', margin: '0 0 8px' }}>
              Your Property
            </h1>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.05, color: '#c9a96e', margin: '0 0 16px' }}>
              Working For You.
            </h1>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 300, color: 'rgba(248,247,245,0.6)', margin: '0 0 48px' }}>
              While You Do Nothing.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(248,247,245,0.65)', maxWidth: '560px', margin: '0 auto 56px', fontWeight: 300 }}>
              We transform idle properties into high-performing Airbnb assets. From listing creation to 5-star guest experiences — our team handles every detail so you collect the income without the headaches.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={scrollToForm}
                style={{ background: '#c9a96e', color: '#1a1a1a', border: 'none', padding: '18px 40px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Jost', sans-serif", fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e0c080'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Schedule a Free Strategy Call
              </button>
              <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: 'transparent', color: '#f8f7f5', border: '1px solid rgba(248,247,245,0.3)', padding: '18px 40px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Jost', sans-serif", fontWeight: 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a96e'; e.currentTarget.style.color = '#c9a96e' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(248,247,245,0.3)'; e.currentTarget.style.color = '#f8f7f5' }}
              >
                See How It Works <ArrowRight size={14} />
              </button>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to bottom, transparent, #f8f7f5)' }} />
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: 'clamp(80px, 10vw, 140px) 24px', background: '#f8f7f5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <AnimatedSection>
            <div style={{ marginBottom: '72px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>How It Works</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 300, margin: '0 0 20px', lineHeight: 1.1 }}>
                Three Steps to <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Passive Income</em>
              </h2>
              <p style={{ fontSize: '14px', color: '#6b6560', lineHeight: 1.8, maxWidth: '500px', fontWeight: 300 }}>
                We've engineered a streamlined process that gets your property live, booked, and generating revenue — without you lifting a finger.
              </p>
            </div>
          </AnimatedSection>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <AnimatedSection key={i} delay={i * 120}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 3fr',
                    gap: '0', borderTop: '1px solid #e8e4de',
                    padding: 'clamp(40px, 6vw, 72px) 0',
                    position: 'relative',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Left — number + icon */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingRight: '40px' }}>
                      <div style={{
                        width: '56px', height: '56px', border: '1px solid #e8e4de',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#c9a96e', flexShrink: 0,
                      }}>
                        <Icon size={22} strokeWidth={1.5} />
                      </div>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 300, color: 'rgba(201,169,110,0.2)', lineHeight: 1 }}>
                        {step.number}
                      </span>
                    </div>

                    {/* Right — content */}
                    <div style={{ paddingTop: '8px' }}>
                      <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px' }}>{step.label}</div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, margin: '0 0 20px', lineHeight: 1.2 }}>{step.title}</h3>
                      <p style={{ fontSize: '14px', color: '#6b6560', lineHeight: 1.9, maxWidth: '580px', fontWeight: 300 }}>{step.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
            <div style={{ borderTop: '1px solid #e8e4de' }} />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#1a1a1a', padding: 'clamp(80px, 10vw, 120px) 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              border: '1px solid rgba(201,169,110,0.3)',
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{
                  padding: 'clamp(40px, 6vw, 64px) 32px',
                  textAlign: 'center',
                  borderRight: i % 2 === 0 ? '1px solid rgba(201,169,110,0.3)' : 'none',
                  borderBottom: i < 2 ? '1px solid rgba(201,169,110,0.3)' : 'none',
                  transition: 'background 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 300, color: '#c9a96e', lineHeight: 1, marginBottom: '12px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,247,245,0.5)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="invest-form" style={{ padding: 'clamp(80px, 10vw, 140px) 24px', background: '#f8f7f5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'start' }}>

          {/* Left — CTA copy */}
          <AnimatedSection>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>Limited Availability</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 300, lineHeight: 1.1, margin: '0 0 24px' }}>
                Ready to Make Your Property{' '}
                <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Work Harder?</em>
              </h2>
              <p style={{ fontSize: '14px', color: '#6b6560', lineHeight: 1.9, marginBottom: '40px', fontWeight: 300 }}>
                We onboard a limited number of new properties each quarter to ensure every owner receives the attention and results they deserve. Spots fill fast.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Free 30-minute call', 'No obligation', 'South Florida properties'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#5a5550' }}>
                    <div style={{ width: '5px', height: '5px', background: '#c9a96e', borderRadius: '50%', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Form */}
          <AnimatedSection delay={150}>
            <InvestForm />
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const countries = [
  { code: 'US', dial: '+1', name: 'United States' },
  { code: 'CO', dial: '+57', name: 'Colombia' },
  { code: 'SV', dial: '+503', name: 'El Salvador' },
  { code: 'MX', dial: '+52', name: 'Mexico' },
  { code: 'GB', dial: '+44', name: 'United Kingdom' },
  { code: 'CA', dial: '+1', name: 'Canada' },
  { code: 'ES', dial: '+34', name: 'Spain' },
  { code: 'AR', dial: '+54', name: 'Argentina' },
  { code: 'BR', dial: '+55', name: 'Brazil' },
  { code: 'DE', dial: '+49', name: 'Germany' },
  { code: 'FR', dial: '+33', name: 'France' },
  { code: 'IT', dial: '+39', name: 'Italy' },
  { code: 'AU', dial: '+61', name: 'Australia' },
  { code: 'JP', dial: '+81', name: 'Japan' },
  { code: 'CN', dial: '+86', name: 'China' },
  { code: 'IN', dial: '+91', name: 'India' },
  { code: 'AE', dial: '+971', name: 'UAE' },
]

function PhoneInput({ value, onChange, inputStyle }) {
  const [dialCode, setDialCode] = useState('+1')
  const [countryCode, setCountryCode] = useState('US')
  const [open, setOpen] = useState(false)
  const [phoneNum, setPhoneNum] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectCountry = (c) => {
    setDialCode(c.dial)
    setCountryCode(c.code)
    setOpen(false)
    onChange(c.dial + ' ' + phoneNum)
  }

  const handleNumChange = (e) => {
    setPhoneNum(e.target.value)
    onChange(dialCode + ' ' + e.target.value)
  }

  return (
    <div ref={ref} style={{ display: 'flex', border: '1.5px solid #e8e4de', background: '#fff', transition: 'border 0.2s', position: 'relative' }}
      onFocusCapture={e => e.currentTarget.style.border = '1.5px solid #1a1a1a'}
      onBlurCapture={e => e.currentTarget.style.border = '1.5px solid #e8e4de'}
    >
      {/* Country selector button */}
      <button type="button" onClick={() => setOpen(o => !o)} style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '0 12px', background: '#faf9f7', border: 'none',
        borderRight: '1.5px solid #e8e4de', cursor: 'pointer',
        flexShrink: 0, height: '46px',
      }}>
        <img src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`} alt={countryCode} style={{ width: '20px', height: 'auto', borderRadius: '2px' }} />
        <span style={{ fontSize: '12px', color: '#1a1a1a', fontFamily: "'Jost', sans-serif" }}>{dialCode}</span>
        <span style={{ fontSize: '10px', color: '#999' }}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 999,
          background: '#fff', border: '1px solid #e8e4de',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          maxHeight: '220px', overflowY: 'auto', width: '220px',
          scrollbarWidth: 'thin',
        }}>
          {countries.map(c => (
            <div key={c.code + c.dial} onClick={() => selectCountry(c)} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '9px 14px', cursor: 'pointer', fontSize: '12px',
              fontFamily: "'Jost', sans-serif", color: '#1a1a1a',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#faf9f7'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <img src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`} alt={c.code} style={{ width: '20px', height: 'auto', borderRadius: '2px', flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{c.name}</span>
              <span style={{ color: '#999' }}>{c.dial}</span>
            </div>
          ))}
        </div>
      )}

      {/* Phone number input */}
      <input
        type="tel"
        value={phoneNum}
        onChange={handleNumChange}
        placeholder="Phone Number"
        style={{
          flex: 1, fontSize: '13px', fontWeight: 300,
          color: '#1a1a1a', background: 'transparent',
          border: 'none', padding: '13px 16px',
          outline: 'none', fontFamily: "'Jost', sans-serif",
        }}
      />
    </div>
  )
}

function InvestForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', interest: 'rent', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const inputStyle = {
    width: '100%', fontSize: '13px', fontWeight: 300,
    color: '#1a1a1a', background: '#fff',
    border: '1.5px solid #e8e4de', padding: '13px 16px',
    outline: 'none', fontFamily: "'Jost', sans-serif",
    boxSizing: 'border-box', transition: 'border 0.2s', borderRadius: '0',
  }

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/invest-leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div style={{ border: '1px solid #e8e4de', padding: '56px 40px', textAlign: 'center', background: '#fff' }}>
      <div style={{ fontSize: '32px', marginBottom: '16px' }}>✦</div>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, marginBottom: '12px' }}>Thank You</h3>
      <p style={{ fontSize: '13px', color: '#6b6560', lineHeight: 1.8, fontWeight: 300 }}>
        We've received your inquiry and will be in touch within 24 hours to schedule your complimentary strategy call.
      </p>
    </div>
  )

  return (
    <div style={{ background: '#fff', border: '1px solid #e8e4de', padding: 'clamp(32px, 5vw, 48px)' }}>
      <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '28px' }}>
        Schedule Your Free Strategy Call
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', fontSize: '12px', color: '#dc2626', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        {[{ name: 'firstName', placeholder: 'First Name *' }, { name: 'lastName', placeholder: 'Last Name' }].map(f => (
          <div key={f.name}>
            <input name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder}
              style={inputStyle}
              onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
              onBlur={e => e.target.style.border = '1.5px solid #e8e4de'}
            />
          </div>
        ))}
      </div>

      {[
        { name: 'email', placeholder: 'Email Address *', type: 'email' },
      ].map(f => (
        <div key={f.name} style={{ marginBottom: '12px' }}>
          <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder}
            style={inputStyle}
            onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
            onBlur={e => e.target.style.border = '1.5px solid #e8e4de'}
          />
        </div>
      ))}

      <div style={{ marginBottom: '12px' }}>
        <PhoneInput
          value={form.phone}
          onChange={val => setForm(p => ({ ...p, phone: val }))}
          inputStyle={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <select name="interest" value={form.interest} onChange={handleChange}
          style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
          onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
          onBlur={e => e.target.style.border = '1.5px solid #e8e4de'}
        >
          <option value="rent">I want to rent my property</option>
          <option value="buy">I want to buy an investment property</option>
        </select>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <textarea name="message" value={form.message} onChange={handleChange}
          placeholder="Tell us about your property — location, type, and any questions you have... *"
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
          onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
          onBlur={e => e.target.style.border = '1.5px solid #e8e4de'}
        />
      </div>

      <button onClick={handleSubmit} disabled={loading}
        style={{
          width: '100%', background: loading ? '#aaa' : '#1a1a1a', color: '#f8f7f5',
          border: 'none', padding: '16px', fontSize: '11px', letterSpacing: '0.18em',
          textTransform: 'uppercase', fontFamily: "'Jost', sans-serif", fontWeight: 500,
          cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '10px', transition: 'all 0.3s',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#c9a96e' }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#1a1a1a' }}
      >
        {loading ? 'Submitting...' : <>Schedule Your Free Strategy Call <ArrowRight size={14} /></>}
      </button>
    </div>
  )
}