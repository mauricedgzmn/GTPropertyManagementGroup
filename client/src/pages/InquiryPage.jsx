import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Star, CheckCircle, ChevronDown, Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../utils/api'

const COUNTRIES = [
  { code: 'US', name: 'United States',     dial: '+1',    flag: '🇺🇸', pattern: /^\d{10}$/,       hint: '10 digits' },
  { code: 'PH', name: 'Philippines',       dial: '+63',   flag: '🇵🇭', pattern: /^\d{10}$/,       hint: '10 digits' },
  { code: 'GB', name: 'United Kingdom',    dial: '+44',   flag: '🇬🇧', pattern: /^\d{10}$/,       hint: '10 digits' },
  { code: 'AU', name: 'Australia',         dial: '+61',   flag: '🇦🇺', pattern: /^\d{9}$/,        hint: '9 digits' },
  { code: 'CA', name: 'Canada',            dial: '+1',    flag: '🇨🇦', pattern: /^\d{10}$/,       hint: '10 digits' },
  { code: 'IN', name: 'India',             dial: '+91',   flag: '🇮🇳', pattern: /^\d{10}$/,       hint: '10 digits' },
  { code: 'DE', name: 'Germany',           dial: '+49',   flag: '🇩🇪', pattern: /^\d{10,11}$/,    hint: '10–11 digits' },
  { code: 'FR', name: 'France',            dial: '+33',   flag: '🇫🇷', pattern: /^\d{9}$/,        hint: '9 digits' },
  { code: 'JP', name: 'Japan',             dial: '+81',   flag: '🇯🇵', pattern: /^\d{10,11}$/,    hint: '10–11 digits' },
  { code: 'CN', name: 'China',             dial: '+86',   flag: '🇨🇳', pattern: /^\d{11}$/,       hint: '11 digits' },
  { code: 'SG', name: 'Singapore',         dial: '+65',   flag: '🇸🇬', pattern: /^\d{8}$/,        hint: '8 digits' },
  { code: 'MY', name: 'Malaysia',          dial: '+60',   flag: '🇲🇾', pattern: /^\d{9,10}$/,     hint: '9–10 digits' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', pattern: /^\d{9}$/,     hint: '9 digits' },
  { code: 'SA', name: 'Saudi Arabia',      dial: '+966',  flag: '🇸🇦', pattern: /^\d{9}$/,        hint: '9 digits' },
  { code: 'BR', name: 'Brazil',            dial: '+55',   flag: '🇧🇷', pattern: /^\d{10,11}$/,    hint: '10–11 digits' },
  { code: 'MX', name: 'Mexico',            dial: '+52',   flag: '🇲🇽', pattern: /^\d{10}$/,       hint: '10 digits' },
  { code: 'NZ', name: 'New Zealand',       dial: '+64',   flag: '🇳🇿', pattern: /^\d{8,9}$/,      hint: '8–9 digits' },
  { code: 'KR', name: 'South Korea',       dial: '+82',   flag: '🇰🇷', pattern: /^\d{9,10}$/,     hint: '9–10 digits' },
  { code: 'IT', name: 'Italy',             dial: '+39',   flag: '🇮🇹', pattern: /^\d{9,10}$/,     hint: '9–10 digits' },
  { code: 'ES', name: 'Spain',             dial: '+34',   flag: '🇪🇸', pattern: /^\d{9}$/,        hint: '9 digits' },
  { code: 'NL', name: 'Netherlands',       dial: '+31',   flag: '🇳🇱', pattern: /^\d{9}$/,        hint: '9 digits' },
  { code: 'CH', name: 'Switzerland',       dial: '+41',   flag: '🇨🇭', pattern: /^\d{9}$/,        hint: '9 digits' },
  { code: 'HK', name: 'Hong Kong',         dial: '+852',  flag: '🇭🇰', pattern: /^\d{8}$/,        hint: '8 digits' },
  { code: 'TW', name: 'Taiwan',            dial: '+886',  flag: '🇹🇼', pattern: /^\d{9,10}$/,     hint: '9–10 digits' },
  { code: 'TH', name: 'Thailand',          dial: '+66',   flag: '🇹🇭', pattern: /^\d{9}$/,        hint: '9 digits' },
  { code: 'ID', name: 'Indonesia',         dial: '+62',   flag: '🇮🇩', pattern: /^\d{9,12}$/,     hint: '9–12 digits' },
  { code: 'VN', name: 'Vietnam',           dial: '+84',   flag: '🇻🇳', pattern: /^\d{9,10}$/,     hint: '9–10 digits' },
  { code: 'ZA', name: 'South Africa',      dial: '+27',   flag: '🇿🇦', pattern: /^\d{9}$/,        hint: '9 digits' },
  { code: 'NG', name: 'Nigeria',           dial: '+234',  flag: '🇳🇬', pattern: /^\d{10}$/,       hint: '10 digits' },
  { code: 'EG', name: 'Egypt',             dial: '+20',   flag: '🇪🇬', pattern: /^\d{10}$/,       hint: '10 digits' },
]

function PhoneInput({ value, countryCode, onPhoneChange, onCountryChange, hasError }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef(null)
  const selectedCountry = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0]
  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dial.includes(search)
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
      <div style={{ display: 'flex', border: `1px solid ${hasError || (!isValid && value) ? '#dc2626' : '#ddd'}`, borderRadius: '8px', overflow: 'visible', transition: 'border 0.2s', background: '#fff' }}>
        {/* Country selector button */}
        <button type="button" onClick={() => { setOpen(!open); setSearch('') }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 10px 12px 14px', background: '#f8f7f5', border: 'none', borderRight: '1px solid #ddd', cursor: 'pointer', flexShrink: 0, borderRadius: '8px 0 0 8px', minWidth: '96px' }}>
          <img
            src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
            alt={selectedCountry.name}
            style={{ width: '20px', height: '14px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }}
          />
          <span style={{ fontSize: '13px', color: '#444', fontFamily: "'Jost', sans-serif" }}>{selectedCountry.dial}</span>
          <ChevronDown size={13} color="#aaa" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
        {/* Phone number input */}
        <input
          type="tel"
          placeholder={`${selectedCountry.hint}`}
          value={value}
          onChange={e => onPhoneChange(e.target.value.replace(/[^\d\s\-()]/g, ''))}
          style={{ flex: 1, padding: '12px 14px', fontSize: '14px', fontFamily: "'Jost', sans-serif", border: 'none', outline: 'none', color: '#1a1a1a', background: '#fff', borderRadius: '0 8px 8px 0', minWidth: 0 }}
        />
      </div>

      {/* Validation hint */}
      {value && !isValid && (
        <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px' }}>
          Enter {selectedCountry.hint} for {selectedCountry.name}
        </div>
      )}
      {value && isValid && (
        <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '4px' }}>✓ Valid number</div>
      )}

      {/* Dropdown */}
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#fff', border: '1px solid #e8e4de', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 999, maxHeight: '260px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Search */}
          <div style={{ padding: '10px 12px', borderBottom: '1px solid #f0eeeb', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={13} color="#aaa" />
            <input autoFocus placeholder="Search country..." value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '13px', fontFamily: "'Jost', sans-serif", color: '#1a1a1a', background: 'transparent' }} />
          </div>
          {/* List */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filtered.length === 0
              ? <div style={{ padding: '16px', textAlign: 'center', fontSize: '13px', color: '#aaa' }}>No results</div>
              : filtered.map(c => (
                <div key={c.code} onClick={() => { onCountryChange(c.code); setOpen(false); setSearch('') }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', cursor: 'pointer', background: c.code === countryCode ? '#faf9f7' : '#fff', borderLeft: c.code === countryCode ? '3px solid #c9a96e' : '3px solid transparent', transition: 'background 0.1s' }}
                  onMouseEnter={e => { if (c.code !== countryCode) e.currentTarget.style.background = '#fdfcfb' }}
                  onMouseLeave={e => { if (c.code !== countryCode) e.currentTarget.style.background = '#fff' }}
                >
                  <img
                    src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
                    alt={c.name}
                    style={{ width: '20px', height: '14px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }}
                  />
                  <span style={{ fontSize: '13px', color: '#1a1a1a', flex: 1, fontFamily: "'Jost', sans-serif" }}>{c.name}</span>
                  <span style={{ fontSize: '12px', color: '#aaa', fontFamily: "'Jost', sans-serif" }}>{c.dial}</span>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  )
}

function InquiryPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', countryCode: 'US', message: '', offers: false
  })

  const checkIn = searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')) : null
  const checkOut = searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')) : null
  const guests = parseInt(searchParams.get('guests')) || 1
  const nights = checkIn && checkOut ? Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24)) : 0

  useEffect(() => {
    api.get(`/properties/${id}`)
      .then(({ data }) => setProperty(data))
      .catch(() => navigate('/properties'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Jost', sans-serif" }}>
      Loading...
    </div>
  )
  if (!property) return null

  const getImage = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80'
    if (img.startsWith('/')) return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${img}`
    return img
  }

  const formatDate = (date) => date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || ''
  const subtotal = nights * property.price
  const total = subtotal + (property.cleaningFee || 0)

  const inputStyle = {
    width: '100%', padding: '12px 14px', fontSize: '14px',
    fontFamily: "'Jost', sans-serif", border: '1px solid #ddd',
    borderRadius: '8px', outline: 'none', boxSizing: 'border-box',
    color: '#1a1a1a', background: '#fff', transition: 'border 0.2s'
  }

  const handleSubmit = async () => {
    const selectedCountry = COUNTRIES.find(c => c.code === form.countryCode) || COUNTRIES[0]
    const digits = form.phone.replace(/\D/g, '')
    const phoneValid = !form.phone || selectedCountry.pattern.test(digits)

    if (!form.firstName || !form.email) {
      setSubmitError('Please fill in your first name and email.')
      return
    }
    if (form.phone && !phoneValid) {
      setSubmitError(`Please enter a valid phone number for ${selectedCountry.name} (${selectedCountry.hint}).`)
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      await api.post('/inquiries', {
        firstName:  form.firstName,
        lastName:   form.lastName,
        email:      form.email,
        phone:      form.phone ? `${selectedCountry.dial} ${form.phone}` : '',
        message:    form.message,
        offers:     form.offers,
        propertyId: id,
        property:   property?.name || '',
        checkIn:    checkIn  ? checkIn.toISOString().split('T')[0]  : '',
        checkOut:   checkOut ? checkOut.toISOString().split('T')[0] : '',
        guests,
      })
      setSent(true)
    } catch (err) {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) return (
    <main style={{ fontFamily: "'Jost', sans-serif", background: '#f8f7f5', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '560px', margin: '80px auto', padding: '48px 32px', background: '#fff', borderRadius: '16px', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
        <CheckCircle size={56} color="#c9a96e" style={{ margin: '0 auto 20px', display: 'block' }} />
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 500, color: '#1a1a1a', marginBottom: '12px' }}>Inquiry Sent!</h2>
        <div style={{ width: '40px', height: '2px', background: '#c9a96e', margin: '0 auto 20px' }} />
        <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.8, marginBottom: '32px' }}>
          Thank you, <strong>{form.firstName}</strong>! Our team will review your inquiry and contact you within 24 hours to confirm availability.
        </p>
        <button onClick={() => navigate('/')} style={{ background: '#111', color: '#fff', border: 'none', padding: '14px 40px', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '8px', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
          Back to Home
        </button>
      </div>
      <Footer />
    </main>
  )

  return (
    <main style={{ fontFamily: "'Jost', sans-serif", background: '#f8f7f5', minHeight: '100vh' }}>
      <style>{`
        .inq-layout { display: grid; grid-template-columns: 1fr 400px; gap: 48px; align-items: start; }
        .inq-form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 900px) {
          .inq-layout { grid-template-columns: 1fr !important; gap: 24px !important; }
          .inq-sticky { position: static !important; }
          .inq-form-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) 20px 80px', boxSizing: 'border-box' }}>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <button onClick={() => navigate(`/booking/${id}`)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#5a5550', fontFamily: "'Jost', sans-serif", padding: 0, marginBottom: '16px' }}
            onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
            onMouseLeave={e => e.currentTarget.style.color = '#5a5550'}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 500, color: '#1a1a1a', margin: 0 }}>Inquiry</h1>
        </div>

        <div className="inq-layout">

          {/* LEFT — Form */}
          <div>
            {/* Enter your details */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '32px', marginBottom: '20px', border: '1px solid #f0eeeb' }}>
              <h2 style={{ fontFamily: "'Jost', sans-serif", fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '24px' }}>Enter your details</h2>

              <div className="inq-form-grid-2" style={{ marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '6px', fontWeight: 500 }}>First name *</label>
                  <input placeholder="First name" value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                    style={{ ...inputStyle, borderColor: submitError && !form.firstName ? '#dc2626' : '#ddd' }}
                    onFocus={e => e.target.style.borderColor = '#1a1a1a'}
                    onBlur={e => e.target.style.borderColor = submitError && !form.firstName ? '#dc2626' : '#ddd'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '6px', fontWeight: 500 }}>Last name</label>
                  <input placeholder="Last name" value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                    style={inputStyle} onFocus={e => e.target.style.borderColor = '#1a1a1a'} onBlur={e => e.target.style.borderColor = '#ddd'} />
                </div>
              </div>

              <div className="inq-form-grid-2" style={{ marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '6px', fontWeight: 500 }}>Email *</label>
                  <input placeholder="Email" type="email" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{ ...inputStyle, borderColor: submitError && !form.email ? '#dc2626' : '#ddd' }}
                    onFocus={e => e.target.style.borderColor = '#1a1a1a'}
                    onBlur={e => e.target.style.borderColor = submitError && !form.email ? '#dc2626' : '#ddd'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '6px', fontWeight: 500 }}>Phone number</label>
                  <PhoneInput
                    value={form.phone}
                    countryCode={form.countryCode}
                    onPhoneChange={v => setForm({ ...form, phone: v })}
                    onCountryChange={c => setForm({ ...form, countryCode: c, phone: '' })}
                    hasError={false}
                  />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#444' }}>
                <input type="checkbox" checked={form.offers} onChange={e => setForm({ ...form, offers: e.target.checked })}
                  style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#1a1a1a' }} />
                Yes, I'd like to receive exclusive offers & promotions
              </label>
            </div>

            {/* Special requests */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '32px', marginBottom: '28px', border: '1px solid #f0eeeb' }}>
              <h2 style={{ fontFamily: "'Jost', sans-serif", fontSize: '18px', fontWeight: 600, color: '#1a1a1a', marginBottom: '6px' }}>Special requests <span style={{ fontWeight: 400, color: '#9a9590' }}>(optional)</span></h2>
              <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px', marginTop: '4px' }}>Let us know if you have any additional requests or comments</p>
              <textarea placeholder="Your message" rows={6} value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                onFocus={e => e.target.style.borderColor = '#1a1a1a'} onBlur={e => e.target.style.borderColor = '#ddd'} />
            </div>

            {/* Error message */}
            {submitError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 16px', fontSize: '13px', color: '#dc2626', marginBottom: '16px' }}>
                {submitError}
              </div>
            )}

            {/* Submit */}
            <button onClick={handleSubmit} disabled={submitting} style={{
              width: '100%', background: submitting ? '#aaa' : '#111', color: '#fff', border: 'none',
              padding: '16px', fontSize: '13px', letterSpacing: '0.16em',
              textTransform: 'uppercase', cursor: submitting ? 'not-allowed' : 'pointer',
              borderRadius: '8px', fontFamily: "'Jost', sans-serif", fontWeight: 500,
              transition: 'background 0.2s', marginBottom: '12px'
            }}
              onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = '#c9a96e' }}
              onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = submitting ? '#aaa' : '#111' }}
            >
              {submitting ? 'Sending...' : 'Send Inquiry'}
            </button>
            <p style={{ fontSize: '12px', color: '#aaa', textAlign: 'center', lineHeight: 1.6 }}>
              By clicking on this button, I agree to the{' '}
              <span style={{ color: '#c9a96e', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>
              {' '}and{' '}
              <span style={{ color: '#c9a96e', cursor: 'pointer', textDecoration: 'underline' }}>Terms of Service</span>
            </p>
          </div>

          {/* RIGHT — Summary Card */}
          <div className="inq-sticky" style={{ position: 'sticky', top: '96px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f0eeeb', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>

              {/* Property Preview */}
              <div style={{ display: 'flex', gap: '14px', padding: '20px', borderBottom: '1px solid #f0eeeb' }}>
                <img src={getImage(property.images?.[0])} alt={property.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontWeight: 500, color: '#1a1a1a', lineHeight: 1.3, marginBottom: '6px', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                    {property.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#666' }}>
                    <Star size={13} color="#f5a623" fill="#f5a623" />
                    <span style={{ fontWeight: 500 }}>{property.rating || '5.0'}</span>
                    <span style={{ color: '#aaa' }}>· {property.reviews?.length || 0} reviews</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                {/* Cancellation Policy */}
                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f0eeeb' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Cancellation policy</div>
                  <div style={{ fontSize: '13px', color: '#555', lineHeight: 1.8 }}>
                    <div>100% refund up to 14 days before arrival</div>
                    <div>50% refund up to 7 days before arrival</div>
                  </div>
                </div>

                {/* Trip Details */}
                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f0eeeb' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Trip details</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontSize: '13px', color: '#555' }}>
                      {checkIn && checkOut ? `${formatDate(checkIn)} – ${formatDate(checkOut)}` : 'No dates selected'}
                    </div>
                    <button onClick={() => navigate(`/booking/${id}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#c9a96e', fontFamily: "'Jost', sans-serif", textDecoration: 'underline', padding: 0 }}>Edit</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px', color: '#555' }}>{guests} guest{guests !== 1 ? 's' : ''}</div>
                    <button onClick={() => navigate(`/booking/${id}`)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#c9a96e', fontFamily: "'Jost', sans-serif", textDecoration: 'underline', padding: 0 }}>Edit</button>
                  </div>
                </div>

                {/* Price Details */}
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px' }}>Price details</div>
                  {nights > 0 ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '8px' }}>
                        <span>${property.price} × {nights} night{nights !== 1 ? 's' : ''}</span>
                        <span>${subtotal.toLocaleString()}</span>
                      </div>
                      {property.cleaningFee > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '12px' }}>
                          <span>Cleaning Fee</span>
                          <span>${property.cleaningFee}</span>
                        </div>
                      )}
                      <div style={{ borderTop: '1px solid #f0eeeb', paddingTop: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>
                          <span>Total</span>
                          <span>${total.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555' }}>
                          <span>Due today</span>
                          <span>${total.toLocaleString()}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: '13px', color: '#aaa', fontStyle: 'italic' }}>Select dates to see pricing</div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  )
}

export default InquiryPage