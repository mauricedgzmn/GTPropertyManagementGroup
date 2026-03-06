import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, CalendarCheck, FileText, Settings, Smartphone, Shield, Search, Users, TrendingUp, ChevronDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import investStats from '../assets/investstats.png'
import api from '../utils/api'

const COUNTRIES = [
  { code: 'US', name: 'United States',         dial: '+1',   pattern: /^\d{10}$/,    hint: '10 digits' },
  { code: 'PH', name: 'Philippines',           dial: '+63',  pattern: /^\d{10}$/,    hint: '10 digits' },
  { code: 'GB', name: 'United Kingdom',        dial: '+44',  pattern: /^\d{10}$/,    hint: '10 digits' },
  { code: 'AU', name: 'Australia',             dial: '+61',  pattern: /^\d{9}$/,     hint: '9 digits' },
  { code: 'CA', name: 'Canada',                dial: '+1',   pattern: /^\d{10}$/,    hint: '10 digits' },
  { code: 'IN', name: 'India',                 dial: '+91',  pattern: /^\d{10}$/,    hint: '10 digits' },
  { code: 'DE', name: 'Germany',               dial: '+49',  pattern: /^\d{10,11}$/, hint: '10–11 digits' },
  { code: 'FR', name: 'France',                dial: '+33',  pattern: /^\d{9}$/,     hint: '9 digits' },
  { code: 'JP', name: 'Japan',                 dial: '+81',  pattern: /^\d{10,11}$/, hint: '10–11 digits' },
  { code: 'CN', name: 'China',                 dial: '+86',  pattern: /^\d{11}$/,    hint: '11 digits' },
  { code: 'SG', name: 'Singapore',             dial: '+65',  pattern: /^\d{8}$/,     hint: '8 digits' },
  { code: 'MY', name: 'Malaysia',              dial: '+60',  pattern: /^\d{9,10}$/,  hint: '9–10 digits' },
  { code: 'AE', name: 'United Arab Emirates',  dial: '+971', pattern: /^\d{9}$/,     hint: '9 digits' },
  { code: 'SA', name: 'Saudi Arabia',          dial: '+966', pattern: /^\d{9}$/,     hint: '9 digits' },
  { code: 'BR', name: 'Brazil',                dial: '+55',  pattern: /^\d{10,11}$/, hint: '10–11 digits' },
  { code: 'MX', name: 'Mexico',                dial: '+52',  pattern: /^\d{10}$/,    hint: '10 digits' },
  { code: 'NZ', name: 'New Zealand',           dial: '+64',  pattern: /^\d{8,9}$/,   hint: '8–9 digits' },
  { code: 'KR', name: 'South Korea',           dial: '+82',  pattern: /^\d{9,10}$/,  hint: '9–10 digits' },
  { code: 'IT', name: 'Italy',                 dial: '+39',  pattern: /^\d{9,10}$/,  hint: '9–10 digits' },
  { code: 'ES', name: 'Spain',                 dial: '+34',  pattern: /^\d{9}$/,     hint: '9 digits' },
  { code: 'NL', name: 'Netherlands',           dial: '+31',  pattern: /^\d{9}$/,     hint: '9 digits' },
  { code: 'CH', name: 'Switzerland',           dial: '+41',  pattern: /^\d{9}$/,     hint: '9 digits' },
  { code: 'HK', name: 'Hong Kong',             dial: '+852', pattern: /^\d{8}$/,     hint: '8 digits' },
  { code: 'TW', name: 'Taiwan',                dial: '+886', pattern: /^\d{9,10}$/,  hint: '9–10 digits' },
  { code: 'TH', name: 'Thailand',              dial: '+66',  pattern: /^\d{9}$/,     hint: '9 digits' },
  { code: 'ID', name: 'Indonesia',             dial: '+62',  pattern: /^\d{9,12}$/,  hint: '9–12 digits' },
  { code: 'VN', name: 'Vietnam',               dial: '+84',  pattern: /^\d{9,10}$/,  hint: '9–10 digits' },
  { code: 'ZA', name: 'South Africa',          dial: '+27',  pattern: /^\d{9}$/,     hint: '9 digits' },
  { code: 'NG', name: 'Nigeria',               dial: '+234', pattern: /^\d{10}$/,    hint: '10 digits' },
  { code: 'EG', name: 'Egypt',                 dial: '+20',  pattern: /^\d{10}$/,    hint: '10 digits' },
]

function PhoneInput({ value, countryCode, onPhoneChange, onCountryChange }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef(null)
  const selectedCountry = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0]
  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.dial.includes(search)
  )
  const digits = value.replace(/\D/g, '')
  const isValid = !value || selectedCountry.pattern.test(digits)

  useEffect(() => {
    const handler = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <div style={{ display: 'flex', border: `1.5px solid ${(!isValid && value) ? '#dc2626' : '#e8e4de'}`, borderRadius: '4px', overflow: 'visible', transition: 'border 0.2s', background: '#fff' }}>
        <button type="button" onClick={() => { setOpen(!open); setSearch('') }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '11px 10px 11px 14px', background: '#f8f7f5', border: 'none', borderRight: '1px solid #e8e4de', cursor: 'pointer', flexShrink: 0, minWidth: '96px' }}>
          <img src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
            alt={selectedCountry.name} style={{ width: '20px', height: '14px', objectFit: 'cover', borderRadius: '2px' }} />
          <span style={{ fontSize: '13px', color: '#444', fontFamily: "'Jost', sans-serif" }}>{selectedCountry.dial}</span>
          <ChevronDown size={12} color="#aaa" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
        <input type="tel" placeholder={selectedCountry.hint} value={value}
          onChange={e => onPhoneChange(e.target.value.replace(/[^\d\s\-()]/g, ''))}
          style={{ flex: 1, padding: '11px 14px', fontSize: '13px', fontFamily: "'Jost', sans-serif", border: 'none', outline: 'none', color: '#1a1a1a', background: '#fff', minWidth: 0 }} />
      </div>
      {value && !isValid && <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px' }}>Enter {selectedCountry.hint} for {selectedCountry.name}</div>}
      {value && isValid && <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '4px' }}>✓ Valid number</div>}
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#fff', border: '1px solid #e8e4de', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 999, maxHeight: '260px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px 12px', borderBottom: '1px solid #f0eeeb', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={13} color="#aaa" />
            <input autoFocus placeholder="Search country..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '13px', fontFamily: "'Jost', sans-serif", color: '#1a1a1a', background: 'transparent' }} />
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0
              ? <div style={{ padding: '16px', textAlign: 'center', fontSize: '13px', color: '#aaa' }}>No results</div>
              : filtered.map(c => (
                <div key={c.code} onClick={() => { onCountryChange(c.code); setOpen(false); setSearch('') }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', cursor: 'pointer', background: c.code === countryCode ? '#faf9f7' : '#fff', borderLeft: c.code === countryCode ? '3px solid #c9a96e' : '3px solid transparent' }}
                  onMouseEnter={e => { if (c.code !== countryCode) e.currentTarget.style.background = '#fdfcfb' }}
                  onMouseLeave={e => { if (c.code !== countryCode) e.currentTarget.style.background = c.code === countryCode ? '#faf9f7' : '#fff' }}>
                  <img src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                    alt={c.name} style={{ width: '20px', height: '14px', objectFit: 'cover', borderRadius: '2px' }} />
                  <span style={{ fontSize: '13px', color: '#1a1a1a', flex: 1, fontFamily: "'Jost', sans-serif" }}>{c.name}</span>
                  <span style={{ fontSize: '12px', color: '#aaa' }}>{c.dial}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

const steps = [
  { Icon: Search, title: "Let's Get Started", text: "Book an appointment and get expert guidance on the best properties and investment strategies." },
  { Icon: Users, title: 'Expertise', text: 'Manage your property with excellence. Our team will handle every detail to maximize your returns.' },
  { Icon: TrendingUp, title: 'Supervision', text: 'Monitor all your properties and get part of all the action with comprehensive reporting.' },
]

const contactInfo = [
  { Icon: Mail, label: 'Email', value: 'info@gtpropertymanagement.com', sub: "We'll respond within 24 hours", href: 'mailto:info@gtpropertymanagement.com' },
  { Icon: Phone, label: 'Phone', value: '+1 (239) 322 4140', sub: 'Monday - Friday, 9AM - 6PM EST', href: 'tel:+12393224140' },
  { Icon: MapPin, label: 'Office', value: 'Miami, Florida', sub: 'Serving South Florida', href: null },
  { Icon: CalendarCheck, label: 'Schedule Consultation', value: 'Free 30-minute strategy call', sub: 'Book your appointment online', href: null },
]

const alreadyHaveFeatures = [
  { Icon: FileText, num: '1', title: 'Reports', text: 'Comprehensive and fully auditable reports of your property performance, including financial analytics and guest feedback.' },
  { Icon: Settings, num: '2', title: 'Control', text: 'Control your income directly from the platform. Monitor bookings, pricing, and revenue in real-time with our advanced dashboard.' },
  { Icon: Smartphone, num: '3', title: 'Access', text: 'Real-time property and guest customer service from your mobile device, anytime, anywhere.' },
  { Icon: Shield, num: '4', title: 'Insurance', text: 'We protect your property with $3,000,000 in coverage for incidents and $500,000 for hospitalization.' },
]

const inputStyle = {
  width: '100%', fontSize: '13px', fontWeight: 300, color: '#1a1a1a',
  background: '#fff', border: '1.5px solid #e8e4de', borderRadius: '4px',
  padding: '12px 16px', outline: 'none', fontFamily: "'Jost', sans-serif",
  boxSizing: 'border-box', transition: 'border 0.2s',
}

function Invest() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', countryCode: 'US', message: '', interest: 'rent' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.message) {
      setError('Please fill in your name, email and message.'); return
    }
    setLoading(true); setError('')
    try {
      const selectedCountry = COUNTRIES.find(c => c.code === form.countryCode) || COUNTRIES[0]
      const fullPhone = form.phone ? `${selectedCountry.dial} ${form.phone}` : ''
      await api.post('/invest-leads', { ...form, phone: fullPhone })
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <main style={{ fontFamily: "'Jost', sans-serif" }}>
      <style>{`
        .inv-section { padding: 100px 48px; }
        .inv-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        .inv-property-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1100px; margin: 0 auto; }
        .inv-form-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 64px; align-items: start; }
        .inv-form-names { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .inv-form-emails { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        @media (max-width: 900px) {
          .inv-section { padding: 64px 20px !important; }
          .inv-steps-grid { grid-template-columns: 1fr !important; gap: 32px !important; text-align: left !important; }
          .inv-step-icon { margin: 0 0 16px !important; }
          .inv-property-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .inv-form-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .inv-hero-cta { display: block !important; text-align: center; }
        }
        @media (max-width: 480px) {
          .inv-form-names { grid-template-columns: 1fr !important; }
          .inv-form-emails { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80') center/cover no-repeat", filter: 'brightness(0.25) saturate(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px', maxWidth: '760px', width: '100%', boxSizing: 'border-box' }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px', display: 'block' }}>Investment Opportunities</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 400, lineHeight: 1.05, color: '#fff', marginBottom: '24px' }}>
            Maximize Your <em style={{ fontStyle: 'italic', color: '#e8d5b0' }}>Property</em><br />Returns With Us
          </h1>
          <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto 36px', letterSpacing: '0.04em' }}>
            Your partner for maximizing rental income. Our experts specialize in short-term rental management with personalized services to help you achieve exceptional returns.
          </p>
          <a href="#invest-form" className="inv-hero-cta" style={{ display: 'inline-block', background: '#c9a96e', color: '#fff', padding: '15px 40px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => e.target.style.background = '#b8935a'}
            onMouseLeave={e => e.target.style.background = '#c9a96e'}
          >Schedule a Strategy Call Today</a>
        </div>
      </section>

      {/* Steps */}
      <section className="inv-section" style={{ background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px', display: 'block' }}>How It Works</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '16px' }}>Getting Started is Simple</h2>
          <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 72px' }}>We make the investment process straightforward with our proven three-step approach.</p>
          <div className="inv-steps-grid">
            {steps.map((step) => (
              <div key={step.title} style={{ textAlign: 'center', padding: '0 16px' }}>
                <div className="inv-step-icon" style={{ width: '64px', height: '64px', background: '#f8f7f5', border: '1px solid #f0eeeb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <step.Icon size={24} color="#c9a96e" />
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#1a1a1a', marginBottom: '12px' }}>{step.title}</div>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.8, margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Already Have a Property */}
      <section className="inv-section" style={{ background: '#f8f7f5' }}>
        <div className="inv-property-grid">
          <div>
            <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px', display: 'block' }}>Property Owners</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '20px', lineHeight: 1.1 }}>Already Have<br />a Property?</h2>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.9, marginBottom: '40px' }}>If you already have a property and want to optimize your rental income, our management services can help you achieve maximum returns with minimal effort.</p>
            <div style={{ marginBottom: '40px' }}>
              <img src={investStats} alt="Property Dashboard" style={{ width: '100%', maxWidth: '380px', height: 'auto', display: 'block', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.12))' }} />
            </div>
            <a href="#invest-form" style={{ display: 'inline-block', background: '#111', color: '#fff', border: '1px solid #111', padding: '14px 36px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.target.style.background = '#c9a96e'; e.target.style.borderColor = '#c9a96e' }}
              onMouseLeave={e => { e.target.style.background = '#111'; e.target.style.borderColor = '#111' }}
            >Contact Us</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '8px' }}>I Already Have a Property</div>
            {alreadyHaveFeatures.map((f) => (
              <div key={f.title} style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '28px 32px', display: 'flex', gap: '20px', alignItems: 'flex-start', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ width: '36px', height: '36px', flexShrink: 0, background: '#111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', fontWeight: 500, color: '#c9a96e' }}>{f.num}</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#1a1a1a', marginBottom: '8px' }}>{f.title}</div>
                  <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.8, margin: 0 }}>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invest Form */}
      <section id="invest-form" className="inv-section" style={{ background: '#f8f7f5' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px', display: 'block' }}>Let's Talk</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, color: '#1a1a1a', margin: 0 }}>Start Your Investment Journey</h2>
          </div>
          <div className="inv-form-grid">
            {/* Form */}
            <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '40px', boxShadow: '0 8px 40px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 400, color: '#1a1a1a', marginBottom: '8px' }}>Receive better advice in this search for the right property for you!</h3>
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.9, marginBottom: '32px' }}>Contact our expert team today and discover how we can help you maximize your property investment returns.</p>
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '13px', color: '#5a5550', marginBottom: '12px' }}>I'm interested in:</div>
                <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                  {['rent', 'buy'].map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#1a1a1a' }}>
                      <input type="radio" name="interest" value={opt} checked={form.interest === opt} onChange={handleChange} style={{ accentColor: '#c9a96e', cursor: 'pointer' }} />
                      I want to {opt}
                    </label>
                  ))}
                </div>
              </div>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: '#1a1a1a', marginBottom: '10px' }}>Message Received</div>
                  <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.8 }}>Thank you for reaching out. A member of our team will be in touch shortly.</p>
                </div>
              ) : (
                <>
                  <div className="inv-form-names">
                    <div>
                      <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>First Name</label>
                      <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" style={inputStyle} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Last Name</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" style={inputStyle} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                    </div>
                  </div>
                  <div className="inv-form-emails">
                    <div>
                      <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Your Email</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" style={inputStyle} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Phone Number</label>
                      <PhoneInput
                        value={form.phone}
                        countryCode={form.countryCode}
                        onPhoneChange={v => setForm({ ...form, phone: v })}
                        onCountryChange={c => setForm({ ...form, countryCode: c, phone: '' })}
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Your Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message..." rows={5} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                  </div>
                  <p style={{ fontSize: '11px', color: '#aaa', lineHeight: 1.7, marginBottom: '24px' }}>All the information provided in this form will be used exclusively for investment consultation purposes. We respect your privacy.</p>
                  {error && <div style={{ background: '#fff5f5', border: '1px solid #fecaca', padding: '10px 14px', borderRadius: '4px', fontSize: '12px', color: '#dc2626', marginBottom: '16px' }}>{error}</div>}
                  <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', background: loading ? '#999' : '#111', color: '#fff', border: '1px solid #111', padding: '16px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'all 0.2s' }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.borderColor = '#c9a96e' } }}
                    onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#111' } }}
                  >{loading ? 'Sending...' : 'Send Message'}</button>
                </>
              )}
            </div>
            {/* Contact Info */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '32px' }}>Get in Touch</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {contactInfo.map(({ Icon, label, value, sub, href }) => (
                  <div key={label} style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: '16px', transition: 'box-shadow 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ width: '40px', height: '40px', flexShrink: 0, background: '#f8f7f5', border: '1px solid #f0eeeb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={17} color="#c9a96e" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a', marginBottom: '3px' }}>{label}</div>
                      {href ? <a href={href} style={{ fontSize: '13px', color: '#5a5550', textDecoration: 'none' }} onMouseEnter={e => e.target.style.color = '#c9a96e'} onMouseLeave={e => e.target.style.color = '#5a5550'}>{value}</a>
                        : <div style={{ fontSize: '13px', color: '#5a5550' }}>{value}</div>}
                      <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Invest