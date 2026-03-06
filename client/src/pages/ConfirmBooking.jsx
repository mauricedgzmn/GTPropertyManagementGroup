import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Users, BedDouble, Bath, Star, ChevronLeft, ChevronRight, CheckCircle, Wifi, Wind, Flame, UtensilsCrossed, WashingMachine, Tv, ParkingCircle, Dumbbell, Waves, ShieldCheck, Baby, Shirt, Microwave, Refrigerator, Coffee, Car, Snowflake, Phone, Volume2, Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../utils/api'

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
function isDateBooked(date, bookedDates) {
  return bookedDates?.some(b => { const ci = new Date(b.checkIn), co = new Date(b.checkOut); return date >= ci && date <= co })
}
function formatDate(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function AvailabilityCalendar({ bookedDates, onRangeSelect, initCheckIn, initCheckOut }) {
  const today = new Date(); today.setHours(0,0,0,0)
  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [checkIn, setCheckIn] = useState(initCheckIn || null)
  const [checkOut, setCheckOut] = useState(initCheckOut || null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 700)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleDay = (date) => {
    if (date < today || isDateBooked(date, bookedDates)) return
    if (!checkIn || (checkIn && checkOut)) { setCheckIn(date); setCheckOut(null); onRangeSelect(date, null) }
    else if (date < checkIn) { setCheckIn(date); setCheckOut(null); onRangeSelect(date, null) }
    else { setCheckOut(date); onRangeSelect(checkIn, date) }
  }

  const renderMonth = (baseDate) => {
    const year = baseDate.getFullYear(), month = baseDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const name = baseDate.toLocaleString('default', { month: 'long', year: 'numeric' })
    const days = ['Su','Mo','Tu','We','Th','Fr','Sa']
    return (
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ textAlign: 'center', fontWeight: 600, fontSize: '15px', color: '#1a1a1a', marginBottom: '16px', fontFamily: "'Jost', sans-serif" }}>{name}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '6px' }}>
          {days.map(d => <div key={d} style={{ textAlign: 'center', fontSize: '11px', color: '#9a9590', fontWeight: 600, padding: '4px 0' }}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
          {Array(firstDay).fill(null).map((_,i) => <div key={`e${i}`} />)}
          {Array(daysInMonth).fill(null).map((_,i) => {
            const date = new Date(year, month, i+1)
            const isPast = date < today
            const booked = isDateBooked(date, bookedDates)
            const start = checkIn && isSameDay(date, checkIn)
            const end = checkOut && isSameDay(date, checkOut)
            const inRange = checkIn && checkOut && date > checkIn && date < checkOut
            const disabled = isPast || booked
            return (
              <div key={i} onClick={() => !disabled && handleDay(date)} style={{
                textAlign: 'center', padding: isMobile ? '10px 2px' : '8px 2px', fontSize: '13px', borderRadius: '50%',
                cursor: disabled ? 'not-allowed' : 'pointer',
                color: disabled ? '#ccc' : (start || end) ? '#fff' : '#1a1a1a',
                background: (start || end) ? '#1a1a1a' : inRange ? '#e8e4de' : 'transparent',
                textDecoration: booked ? 'line-through' : 'none',
                fontWeight: (start || end) ? 600 : 400,
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => { if (!disabled && !start && !end && !inRange) e.currentTarget.style.background = '#f5f5f5' }}
                onMouseLeave={e => { if (!disabled && !start && !end && !inRange) e.currentTarget.style.background = 'transparent' }}
              >{i+1}</div>
            )
          })}
        </div>
      </div>
    )
  }

  const nextMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1)
  const nights = checkIn && checkOut ? Math.round((checkOut - checkIn) / (1000*60*60*24)) : 0

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth()-1, 1))}
          style={{ background: 'none', border: '1px solid #e8e4de', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ChevronLeft size={16} />
        </button>
        <div style={{ display: 'flex', gap: isMobile ? 0 : '40px', flex: 1, justifyContent: 'center' }}>
          {renderMonth(viewMonth)}
          {!isMobile && <div style={{ width: '1px', background: '#f0eeeb', flexShrink: 0 }} />}
          {!isMobile && renderMonth(nextMonth)}
        </div>
        <button onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth()+1, 1))}
          style={{ background: 'none', border: '1px solid #e8e4de', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ChevronRight size={16} />
        </button>
      </div>
      {checkIn && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid #f0eeeb', fontSize: '13px', color: '#5a5550', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: isMobile ? '12px' : '13px' }}>
            {checkIn && !checkOut && `Check-in: ${formatDate(checkIn)}`}
            {checkIn && checkOut && `${formatDate(checkIn)} → ${formatDate(checkOut)} · ${nights} night${nights !== 1 ? 's' : ''}`}
          </span>
          <button onClick={() => { setCheckIn(null); setCheckOut(null); onRangeSelect(null, null) }}
            style={{ background: 'none', border: '1px solid #ccc', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', fontFamily: "'Jost', sans-serif", whiteSpace: 'nowrap' }}>
            Clear dates
          </button>
        </div>
      )}
    </div>
  )
}

function ConfirmBooking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [guests, setGuests] = useState(parseInt(searchParams.get('guests')) || 1)
  const [checkIn, setCheckIn] = useState(() => {
    const ci = searchParams.get('checkIn')
    return ci ? new Date(ci) : null
  })
  const [checkOut, setCheckOut] = useState(() => {
    const co = searchParams.get('checkOut')
    return co ? new Date(co) : null
  })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [showDescModal, setShowDescModal] = useState(false)
  const [showRulesModal, setShowRulesModal] = useState(false)
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false)
  const [showMoreRules, setShowMoreRules] = useState(false)

  useEffect(() => {
    api.get(`/properties/${id}`).then(({ data }) => setProperty(data)).catch(() => navigate('/properties')).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Jost', sans-serif" }}>Loading...</div>
  if (!property) return null

  const getImage = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80'
    if (img.startsWith('/')) return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${img}`
    return img
  }

  const amenityIconMap = {
    'Internet': Wifi,
    'Wireless': Wifi,
    'Air Conditioning': Snowflake,
    'Heating': Flame,
    'Kitchen': UtensilsCrossed,
    'Dishwasher': UtensilsCrossed,
    'Microwave': Microwave,
    'Oven': UtensilsCrossed,
    'Refrigerator': Refrigerator,
    'Washing Machine': WashingMachine,
    'Dryer': Wind,
    'TV': Tv,
    'Hair Dryer': Wind,
    'Smoke Detector': ShieldCheck,
    'Free Parking': ParkingCircle,
    'Paid Parking': ParkingCircle,
    'Pool': Waves,
    'Gym': Dumbbell,
    'Iron': Shirt,
    'Suitable for children': Baby,
    'Suitable for infants': Baby,
    'Coffee Maker': Coffee,
    'Phone': Phone,
    'Car': Car,
  }

  const AmenityIcon = ({ name }) => {
    const Icon = amenityIconMap[name] || Check
    return <Icon size={18} color="#5a5550" strokeWidth={1.5} />
  }

  const allAmenityItems = property.amenities
    ? Object.values(property.amenities).flat().filter(Boolean)
    : []
  const previewAmenities = allAmenityItems.slice(0, 6)

  const images = property.images || []
  const nights = checkIn && checkOut ? Math.round((checkOut - checkIn) / (1000*60*60*24)) : 0
  const subtotal = nights * property.price
  const total = subtotal + (property.cleaningFee || 0)

  const inputStyle = {
    width: '100%', padding: '11px 14px', fontSize: '13px', fontFamily: "'Jost', sans-serif",
    border: '1.5px solid #e8e4de', borderRadius: '8px', outline: 'none',
    boxSizing: 'border-box', transition: 'border 0.2s', color: '#1a1a1a', background: '#fff'
  }

  const handleSubmit = () => {
    if (!form.name || !form.email) return
    setSent(true)
  }

  return (
    <main style={{ fontFamily: "'Jost', sans-serif", background: '#f8f7f5', minHeight: '100vh' }}>
      <style>{`
        .cb-layout { display: grid; grid-template-columns: 1fr 360px; gap: 32px; }
        .cb-photo-grid { display: grid; grid-template-columns: 1.4fr 1fr; grid-template-rows: 1fr 1fr; gap: 8px; height: 400px; border-radius: 12px; overflow: hidden; }
        .cb-photo-right { display: grid; grid-template-rows: 1fr 1fr; grid-template-columns: 1fr 1fr; gap: 8px; }
        .cb-amenities-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 32px; }
        .cb-amenities-modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 32px; }
        .cb-rules-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; }
        @media (max-width: 900px) {
          .cb-layout { grid-template-columns: 1fr !important; }
          .cb-sticky-card { position: static !important; }
          .cb-photo-grid { height: 240px !important; }
          .cb-photo-right { display: none !important; }
          .cb-photo-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .cb-photo-grid { height: 200px !important; border-radius: 8px !important; }
          .cb-amenities-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .cb-amenities-modal-grid { grid-template-columns: 1fr !important; }
          .cb-rules-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />

      {/* Description Modal */}
      {showDescModal && (
        <div onClick={() => setShowDescModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9990, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '16px', padding: '40px', maxWidth: '640px', width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button onClick={() => setShowDescModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: '1px solid #e8e4de', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#1a1a1a' }}>✕</button>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 500, color: '#1a1a1a', marginBottom: '8px' }}>About this place</h2>
            <div style={{ width: '40px', height: '2px', background: '#c9a96e', marginBottom: '24px' }} />
            <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.95, margin: 0, whiteSpace: 'pre-wrap' }}>{property.description}</p>
            {property.houseRules && (
              <>
                <div style={{ margin: '32px 0 20px', borderTop: '1px solid #f0eeeb', paddingTop: '28px' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: '#1a1a1a', marginBottom: '16px' }}>House Rules</h3>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.95, margin: 0, whiteSpace: 'pre-wrap' }}>{property.houseRules}</p>
                </div>
              </>
            )}
            <button onClick={() => setShowDescModal(false)} style={{ marginTop: '32px', width: '100%', background: '#111', color: '#fff', border: 'none', padding: '14px', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '8px', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
              onMouseLeave={e => e.currentTarget.style.background = '#111'}
            >Close</button>
          </div>
        </div>
      )}

      {/* Amenities Modal */}
      {showAmenitiesModal && (
        <div onClick={() => setShowAmenitiesModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9990, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '16px', padding: '40px', maxWidth: '600px', width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button onClick={() => setShowAmenitiesModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: '1px solid #e8e4de', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#1a1a1a' }}>✕</button>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 500, color: '#1a1a1a', marginBottom: '8px' }}>All Amenities</h2>
            <div style={{ width: '40px', height: '2px', background: '#c9a96e', marginBottom: '28px' }} />
            <div className="cb-amenities-modal-grid">
              {allAmenityItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#333', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
                  <AmenityIcon name={item} />
                  {item}
                </div>
              ))}
            </div>
            <button onClick={() => setShowAmenitiesModal(false)} style={{ marginTop: '32px', width: '100%', background: '#111', color: '#fff', border: 'none', padding: '14px', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '8px', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
              onMouseLeave={e => e.currentTarget.style.background = '#111'}
            >Close</button>
          </div>
        </div>
      )}
      {showRulesModal && (
        <div onClick={() => setShowRulesModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9990, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(4px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '16px', padding: '40px', maxWidth: '560px', width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.2)', position: 'relative' }}>
            <button onClick={() => setShowRulesModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: '1px solid #e8e4de', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#1a1a1a' }}>✕</button>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 500, color: '#1a1a1a', marginBottom: '8px' }}>House Rules</h2>
            <div style={{ width: '40px', height: '2px', background: '#c9a96e', marginBottom: '24px' }} />
            <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.95, margin: 0, whiteSpace: 'pre-wrap' }}>{property.houseRules}</p>
            <button onClick={() => setShowRulesModal(false)} style={{ marginTop: '32px', width: '100%', background: '#111', color: '#fff', border: 'none', padding: '14px', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '8px', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
              onMouseLeave={e => e.currentTarget.style.background = '#111'}
            >Close</button>
          </div>
        </div>
      )}
      {lightbox && (
        <div onClick={() => setLightbox(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.94)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Prev */}
          <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + images.length) % images.length) }}
            style={{ position: 'absolute', left: '20px', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >‹</button>

          {/* Image */}
          <img src={getImage(images[lightboxIndex])} alt="" onClick={e => e.stopPropagation()}
            style={{ maxHeight: '88vh', maxWidth: '82vw', objectFit: 'contain', borderRadius: '4px', userSelect: 'none' }} />

          {/* Next */}
          <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % images.length) }}
            style={{ position: 'absolute', right: '20px', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >›</button>

          {/* Close */}
          <button onClick={() => setLightbox(false)}
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.12)', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>

          {/* Counter */}
          <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)', fontSize: '13px', background: 'rgba(0,0,0,0.4)', padding: '4px 14px', borderRadius: '20px' }}>
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Thumbnail strip */}
          <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', maxWidth: '80vw', overflowX: 'auto', padding: '4px' }}>
            {images.map((img, i) => (
              <img key={i} src={getImage(img)} alt="" onClick={() => setLightboxIndex(i)}
                style={{ width: '56px', height: '42px', objectFit: 'cover', borderRadius: '3px', cursor: 'pointer', flexShrink: 0, border: `2px solid ${lightboxIndex === i ? '#c9a96e' : 'transparent'}`, opacity: lightboxIndex === i ? 1 : 0.55, transition: 'all 0.15s' }} />
            ))}
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: 'clamp(20px, 4vw, 32px) clamp(16px, 4vw, 24px) 80px', boxSizing: 'border-box' }}>

        {/* Back */}
        <button onClick={() => navigate(`/properties/${id}`)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#5a5550', fontFamily: "'Jost', sans-serif", marginBottom: '24px', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
          onMouseLeave={e => e.currentTarget.style.color = '#5a5550'}
        >
          <ArrowLeft size={16} /> Back to property
        </button>

        {/* Photo Grid */}
        <div className="cb-photo-grid" style={{ marginBottom: '28px', position: 'relative' }}>
          <img src={getImage(images[0])} alt={property.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', gridRow: 'span 2', cursor: 'pointer', transition: 'transform 0.3s' }}
            onClick={() => { setLightboxIndex(0); setLightbox(true) }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
          <div className="cb-photo-right">
            {[1,2,3,4].map(i => (
              <div key={i} style={{ position: 'relative', overflow: 'hidden' }}>
                {images[i] ? (
                  <img src={getImage(images[i])} alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', transition: 'transform 0.3s', display: 'block' }}
                    onClick={() => { setLightboxIndex(i); setLightbox(true) }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                ) : <div style={{ width: '100%', height: '100%', background: '#e8e4de' }} />}
                {i === 4 && images.length > 5 && (
                  <div onClick={() => { setLightboxIndex(4); setLightbox(true) }}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', fontSize: '13px', fontWeight: 600, gap: '6px', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.45)'}
                  >⊞ +{images.length - 5} photos</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="cb-layout">
          {/* LEFT */}
          <div>
            {/* Title */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', marginBottom: '16px', border: '1px solid #f0eeeb' }}>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 500, color: '#1a1a1a', marginBottom: '10px', lineHeight: 1.2 }}>{property.name}</h1>
              <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#666', flexWrap: 'wrap', marginBottom: '10px' }}>
                <span style={{ textTransform: 'capitalize' }}>{property.type}</span>
                {property.maxGuests && <><span>·</span><span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Users size={13} /> {property.maxGuests} guests</span></>}
                {property.bedrooms && <><span>·</span><span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><BedDouble size={13} /> {property.bedrooms} bedrooms</span></>}
                {property.bathrooms && <><span>·</span><span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Bath size={13} /> {property.bathrooms} bathroom{property.bathrooms !== 1 ? 's' : ''}</span></>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#5a5550' }}>
                <MapPin size={14} color="#c9a96e" />{property.location}
              </div>
              {property.description && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0eeeb' }}>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.85, margin: 0, display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 4, overflow: 'hidden' }}>
                    {property.description}
                  </p>
                  {property.description.length > 300 && (
                    <button onClick={() => setShowDescModal(true)} style={{ marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#1a1a1a', fontFamily: "'Jost', sans-serif", padding: 0, textDecoration: 'underline', fontWeight: 500 }}>
                      See more ↓
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Amenities */}
            {allAmenityItems.length > 0 && (
              <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', marginBottom: '16px', border: '1px solid #f0eeeb' }}>
                <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: '17px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>Amenities</h3>
                <div className="cb-amenities-grid" style={{ marginBottom: '20px' }}>
                  {previewAmenities.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#333' }}>
                      <AmenityIcon name={item} />
                      {item}
                    </div>
                  ))}
                </div>
                {allAmenityItems.length > 6 && (
                  <button onClick={() => setShowAmenitiesModal(true)}
                    style={{ background: 'none', border: '1.5px solid #d0ceca', borderRadius: '20px', padding: '9px 24px', cursor: 'pointer', fontSize: '13px', color: '#1a1a1a', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'border 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#d0ceca'}
                  >
                    Show all {allAmenityItems.length} amenities
                  </button>
                )}
              </div>
            )}

            {/* Available Days Calendar */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', marginBottom: '16px', border: '1px solid #f0eeeb' }}>
              <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: '17px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>Available days</h3>
              <AvailabilityCalendar
                bookedDates={property.bookedDates}
                onRangeSelect={(ci, co) => { setCheckIn(ci); setCheckOut(co) }}
                initCheckIn={checkIn}
                initCheckOut={checkOut}
              />
            </div>

            {/* House Rules */}
            {(property.houseRules || property.cancellationPolicy || property.checkInTime || property.checkOutTime) && (
              <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', marginBottom: '16px', border: '1px solid #f0eeeb' }}>
                <h3 style={{ fontFamily: "'Jost', sans-serif", fontSize: '17px', fontWeight: 600, color: '#1a1a1a', marginBottom: '20px' }}>Good to know</h3>

                {/* House Rules structured grid */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '14px' }}>House Rules</div>

                  {/* Key rules in 2-column grid */}
                  <div className="cb-rules-grid" style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '13px', color: '#444' }}>Check-in: <span style={{ color: '#1a1a1a' }}>3:00 PM</span></div>
                    <div style={{ fontSize: '13px', color: '#444' }}>Pets: <span style={{ color: '#1a1a1a' }}>not allowed</span></div>
                    <div style={{ fontSize: '13px', color: '#444' }}>Check-out: <span style={{ color: '#1a1a1a' }}>11:00 AM</span></div>
                    <div style={{ fontSize: '13px', color: '#444' }}>Smoking inside: <span style={{ color: '#1a1a1a' }}>not allowed</span></div>
                  </div>

                  {/* Show more for full rules text */}
                  {property.houseRules && (
                    <button onClick={() => setShowRulesModal(true)}
                      style={{ marginTop: '12px', background: 'none', border: '1.5px solid #d0ceca', borderRadius: '20px', padding: '7px 20px', cursor: 'pointer', fontSize: '13px', color: '#1a1a1a', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'border 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = '#d0ceca'}
                    >
                      Show more
                    </button>
                  )}
                </div>

                {/* Cancellation Policy */}
                {property.cancellationPolicy && (
                  <div style={{ borderTop: '1px solid #f0eeeb', paddingTop: '20px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '14px' }}>Cancellation policy</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ fontSize: '13px', color: '#444' }}>100% refund up to 14 days before arrival</div>
                      <div style={{ fontSize: '13px', color: '#444' }}>50% refund up to 7 days before arrival</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT — Booking Card */}
          <div>
            <div className="cb-sticky-card" style={{ position: 'sticky', top: '96px' }}>

              {/* Price + Summary */}
              <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid #f0eeeb', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', marginBottom: '16px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', fontWeight: 500, color: '#c9a96e' }}>${property.price}</span>
                  <span style={{ fontSize: '13px', color: '#9a9590' }}> / Night</span>
                </div>

                {/* Date + Guests Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                  <div style={{ border: '1.5px solid #e8e4de', borderRadius: '8px', padding: '10px 12px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9a9590', marginBottom: '4px' }}>Dates</div>
                    <div style={{ fontSize: '13px', color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {checkIn && checkOut ? `${checkIn.toLocaleDateString('en-US',{month:'short',day:'numeric'})} – ${checkOut.toLocaleDateString('en-US',{month:'short',day:'numeric'})}` : 'Select dates'}
                    </div>
                  </div>
                  <div style={{ border: '1.5px solid #e8e4de', borderRadius: '8px', padding: '10px 12px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9a9590', marginBottom: '4px' }}>Guests</div>
                    <select value={guests} onChange={e => setGuests(parseInt(e.target.value))} style={{ fontSize: '13px', color: '#1a1a1a', border: 'none', outline: 'none', background: 'transparent', cursor: 'pointer', width: '100%', fontFamily: "'Jost', sans-serif" }}>
                      {Array.from({ length: property.maxGuests || 10 }, (_, i) => i+1).map(n => (
                        <option key={n} value={n}>{n} guest{n !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price Breakdown */}
                {nights > 0 && (
                  <div style={{ borderTop: '1px solid #f0eeeb', paddingTop: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#5a5550', marginBottom: '8px' }}>
                      <span>${property.price} × {nights} night{nights !== 1 ? 's' : ''}</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    {property.cleaningFee > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#5a5550', marginBottom: '8px' }}>
                        <span>Cleaning Fee</span>
                        <span>${property.cleaningFee}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700, color: '#1a1a1a', borderTop: '1px solid #f0eeeb', paddingTop: '12px', marginTop: '8px' }}>
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Send Inquiry Button */}
                <button onClick={() => {
                  const params = new URLSearchParams()
                  if (checkIn) params.set('checkIn', checkIn.toISOString())
                  if (checkOut) params.set('checkOut', checkOut.toISOString())
                  params.set('guests', guests)
                  navigate(`/inquiry/${id}?${params.toString()}`)
                }} style={{
                  width: '100%', marginTop: nights > 0 ? '0' : '8px',
                  background: '#111', color: '#fff', border: 'none',
                  padding: '14px', fontSize: '12px', letterSpacing: '0.16em',
                  textTransform: 'uppercase', cursor: 'pointer', borderRadius: '8px',
                  fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'background 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
                  onMouseLeave={e => e.currentTarget.style.background = '#111'}
                >Send Inquiry</button>
                <p style={{ fontSize: '11px', color: '#aaa', textAlign: 'center', marginTop: '10px', lineHeight: 1.6 }}>You won't be charged yet. We'll confirm availability first.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ConfirmBooking