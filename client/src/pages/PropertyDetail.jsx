import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Users, BedDouble, Bath, Star, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../utils/api'

const amenityLabels = {
  internetAndOffice: 'Internet & Office', heatingAndCooling: 'Heating & Cooling',
  kitchenAndDining: 'Kitchen & Dining', bedroomAndLaundry: 'Bedroom & Laundry',
  bathroom: 'Bathroom', homeSafety: 'Home Safety', entertainment: 'Entertainment',
  parkingAndFacilities: 'Parking & Facilities', other: 'Other',
}

const amenityIcons = {
  'Internet': '📶', 'Wireless': '📶', 'Air Conditioning': '❄️', 'Heating': '🔥',
  'Kitchen': '🍳', 'Dishwasher': '🍽️', 'Microwave': '📦', 'Oven': '🔲',
  'Refrigerator': '🧊', 'Washing Machine': '🫧', 'Dryer': '💨', 'TV': '📺',
  'Hair Dryer': '💨', 'Smoke Detector': '🚨', 'Free Parking': '🅿️',
  'Paid Parking': '🅿️', 'Pool': '🏊', 'Gym': '🏋️', 'Iron': '👔',
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isDateBooked(date, bookedDates) {
  return bookedDates?.some(b => {
    const ci = new Date(b.checkIn), co = new Date(b.checkOut)
    return date >= ci && date <= co
  })
}

function Calendar({ bookedDates, onRangeSelect }) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)

  const handleDayClick = (date) => {
    if (date < today || isDateBooked(date, bookedDates)) return
    if (!checkIn || (checkIn && checkOut)) { setCheckIn(date); setCheckOut(null) }
    else { if (date < checkIn) { setCheckIn(date); setCheckOut(null) } else { setCheckOut(date); onRangeSelect?.(checkIn, date) } }
  }

  const year = viewDate.getFullYear(), month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })
  const nights = checkIn && checkOut ? Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24)) : 0

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))} style={{ background: 'none', border: '1px solid #e8e4de', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>‹</button>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontWeight: 400, color: '#1a1a1a' }}>{monthName}</div>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))} style={{ background: 'none', border: '1px solid #e8e4de', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '4px' }}>
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '10px', color: '#9a9590', fontWeight: 500, padding: '3px 0' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {Array(firstDay).fill(null).map((_, i) => <div key={`e-${i}`} />)}
        {Array(daysInMonth).fill(null).map((_, i) => {
          const date = new Date(year, month, i + 1)
          const isPast = date < today, booked = isDateBooked(date, bookedDates)
          const start = checkIn && isSameDay(date, checkIn), end = checkOut && isSameDay(date, checkOut)
          const inRange = checkIn && checkOut && date > checkIn && date < checkOut
          const disabled = isPast || booked
          return (
            <div key={i} onClick={() => !disabled && handleDayClick(date)} style={{
              textAlign: 'center', padding: '6px 2px', fontSize: '12px', borderRadius: '3px',
              cursor: disabled ? 'default' : 'pointer',
              color: disabled ? '#ccc' : (start || end) ? '#fff' : '#1a1a1a',
              background: (start || end) ? '#c9a96e' : inRange ? '#fef3e0' : 'transparent',
              textDecoration: booked ? 'line-through' : 'none',
              fontWeight: (start || end) ? 600 : 400,
            }}
              onMouseEnter={e => { if (!disabled && !start && !end && !inRange) e.currentTarget.style.background = '#f8f7f5' }}
              onMouseLeave={e => { if (!disabled && !start && !end && !inRange) e.currentTarget.style.background = 'transparent' }}
            >{i + 1}</div>
          )
        })}
      </div>
      <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '11px', color: '#9a9590' }}>
        {!checkIn && 'Select check-in date'}
        {checkIn && !checkOut && 'Now select check-out date'}
        {checkIn && checkOut && `${nights} night${nights !== 1 ? 's' : ''} selected`}
      </div>
      {(checkIn || checkOut) && (
        <button onClick={() => { setCheckIn(null); setCheckOut(null); onRangeSelect?.(null, null) }}
          style={{ width: '100%', marginTop: '10px', background: 'none', border: '1px solid #e8e4de', padding: '8px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", color: '#5a5550' }}
        >Clear dates</button>
      )}
    </div>
  )
}

function BookingCard({ property, onRangeSelect, checkIn, checkOut, nights, total, isMobile, onClose, onBook }) {
  return (
    <div style={{ background: '#fff', border: isMobile ? 'none' : '1px solid #f0eeeb', borderRadius: '4px', padding: '20px', boxShadow: isMobile ? 'none' : '0 8px 40px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: '#1a1a1a' }}>${property.price}</span>
          <span style={{ fontSize: '12px', color: '#9a9590' }}> / night</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {property.featured && <Star size={16} color="#c9a96e" fill="#c9a96e" />}
          {isMobile && onClose && (
            <button onClick={onClose} style={{ background: 'none', border: '1px solid #e8e4de', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={14} color="#1a1a1a" />
            </button>
          )}
        </div>
      </div>
      <Calendar bookedDates={property.bookedDates} onRangeSelect={onRangeSelect} />

      {/* Check-in / Check-out summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '14px' }}>
        <div style={{ border: '1px solid #e8e4de', borderRadius: '4px', padding: '10px 12px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9a9590', marginBottom: '4px' }}>Check-in</div>
          <div style={{ fontSize: '13px', color: checkIn ? '#1a1a1a' : '#ccc', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            {checkIn ? checkIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '— / — / —'}
          </div>
        </div>
        <div style={{ border: '1px solid #e8e4de', borderRadius: '4px', padding: '10px 12px' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9a9590', marginBottom: '4px' }}>Check-out</div>
          <div style={{ fontSize: '13px', color: checkOut ? '#1a1a1a' : '#ccc', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            {checkOut ? checkOut.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '— / — / —'}
          </div>
        </div>
      </div>
      <button
        onClick={onBook}
        style={{ width: '100%', marginTop: '16px', background: '#111', color: '#fff', border: '1px solid #111', padding: '14px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'all 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.borderColor = '#c9a96e' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#111' }}
      >{nights > 0 ? 'Book Now' : 'Check Availability'}</button>
      <p style={{ fontSize: '11px', color: '#aaa', textAlign: 'center', marginTop: '10px', lineHeight: 1.7 }}>You won't be charged yet. Our team will contact you to confirm.</p>
    </div>
  )
}

function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const [showMoreDesc, setShowMoreDesc] = useState(false)
  const [showMoreRules, setShowMoreRules] = useState(false)
  const [showMobileBooking, setShowMobileBooking] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    api.get(`/properties/${id}`).then(({ data }) => setProperty(data)).catch(() => navigate('/properties')).finally(() => setLoading(false))
  }, [id])

  const handleBook = () => {
    const params = new URLSearchParams()
    if (checkIn) params.set('checkIn', checkIn.toISOString())
    if (checkOut) params.set('checkOut', checkOut.toISOString())
    navigate(`/booking/${id}?${params.toString()}`)
  }

  useEffect(() => {
    document.body.style.overflow = (lightbox || showMobileBooking) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox, showMobileBooking])

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Jost', sans-serif", color: '#9a9590' }}>Loading...</div>
  if (!property) return null

  const getImage = (img) => {
    if (!img) return null
    if (img.startsWith('/')) return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${img}`
    return img
  }
  const images = property.images || []
  const nights = checkIn && checkOut ? Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24)) : 0
  const total = nights > 0 ? (property.price * nights) + (property.cleaningFee || 0) : 0
  const allAmenities = property.amenities ? Object.entries(property.amenities).filter(([, items]) => items?.length > 0) : []
  const visibleAmenities = showAllAmenities ? allAmenities : allAmenities.slice(0, 4)

  return (
    <main style={{ fontFamily: "'Jost', sans-serif", background: '#fff', overflowX: 'hidden', width: '100%' }}>
      <style>{`
        .pd-layout { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 24px; align-items: start; }
        .pd-amenity-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
        .pd-details-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
        .pd-sticky { position: sticky; top: 90px; }
        .pd-mobile-bar { display: none; }
        @media (max-width: 768px) {
          .pd-layout { grid-template-columns: 1fr !important; }
          .pd-desktop-booking { display: none !important; }
          .pd-mobile-bar { display: flex !important; }
          .pd-amenity-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pd-details-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 400px) {
          .pd-amenity-grid { grid-template-columns: 1fr !important; }
          .pd-details-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i - 1 + images.length) % images.length) }}
            style={{ position: 'absolute', left: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
          <img src={getImage(images[lightboxIndex])} alt="" onClick={e => e.stopPropagation()} style={{ maxHeight: '85vh', maxWidth: '88vw', objectFit: 'contain', borderRadius: '4px' }} />
          <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => (i + 1) % images.length) }}
            style={{ position: 'absolute', right: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '48px', height: '48px', borderRadius: '50%', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
          <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <div style={{ position: 'absolute', bottom: '16px', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>{lightboxIndex + 1} of {images.length}</div>
        </div>
      )}

      {/* Mobile Booking Drawer */}
      {isMobile && showMobileBooking && (
        <>
          <div onClick={() => setShowMobileBooking(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9997 }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9998, background: '#fff', borderRadius: '16px 16px 0 0', padding: '24px 20px', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 -8px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '40px', height: '4px', background: '#e0e0e0', borderRadius: '2px', margin: '0 auto 20px' }} />
            <BookingCard property={property} onRangeSelect={(ci, co) => { setCheckIn(ci); setCheckOut(co) }} checkIn={checkIn} checkOut={checkOut} nights={nights} total={total} isMobile={true} onClose={() => setShowMobileBooking(false)} onBook={handleBook} />
          </div>
        </>
      )}

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 20px 100px', boxSizing: 'border-box', width: '100%' }}>

        {/* Back */}
        <button onClick={() => navigate('/properties')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid #e8e4de', padding: '8px 16px', cursor: 'pointer', fontSize: '12px', color: '#5a5550', fontFamily: "'Jost', sans-serif", marginBottom: '24px', transition: 'all 0.2s', borderRadius: '2px' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.color = '#1a1a1a' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e4de'; e.currentTarget.style.color = '#5a5550' }}
        ><ArrowLeft size={14} /> Back to Properties</button>

        {/* Title */}
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '8px', lineHeight: 1.2 }}>{property.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#5a5550', flexWrap: 'wrap' }}>
            <span style={{ textTransform: 'capitalize' }}>{property.type}</span>
            <span>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} color="#c9a96e" />{property.location}</span>
            {property.featured && <><span>·</span><span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#c9a96e' }}><Star size={12} fill="#c9a96e" /> Featured</span></>}
          </div>
        </div>

        <div className="pd-layout">
          {/* LEFT */}
          <div style={{ minWidth: 0 }}>
            {/* Main Image */}
            <div style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px', cursor: 'pointer', height: isMobile ? '260px' : '380px' }}
              onClick={() => { setLightboxIndex(activeImage); setLightbox(true) }}>
              {images.length > 0 ? (
                <img src={getImage(images[activeImage])} alt={property.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#f0eeeb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🏠</div>
              )}
              {images.length > 1 && (
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 12px', fontSize: '12px', borderRadius: '20px' }}>{activeImage + 1} / {images.length}</div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                {images.map((img, i) => (
                  <img key={i} src={getImage(img)} alt="" onClick={() => setActiveImage(i)} style={{ width: '64px', height: '50px', objectFit: 'cover', borderRadius: '2px', cursor: 'pointer', flexShrink: 0, border: `2px solid ${activeImage === i ? '#c9a96e' : 'transparent'}`, opacity: activeImage === i ? 1 : 0.7, transition: 'all 0.15s' }} />
                ))}
              </div>
            )}

            {/* Property Details */}
            <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '24px', marginTop: '24px', borderRadius: '4px' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#1a1a1a', marginBottom: '16px' }}>Property Details</h3>
              <div className="pd-details-grid">
                {[{ Icon: Users, label: `${property.maxGuests} guests` }, { Icon: BedDouble, label: `${property.bedrooms} bedrooms` }, { Icon: Bath, label: `${property.bathrooms} bathrooms` }].map(({ Icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#5a5550' }}>
                    <Icon size={15} color="#c9a96e" />{label}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '16px', paddingTop: '14px', borderTop: '1px solid #f0eeeb', fontSize: '12px', color: '#5a5550', flexWrap: 'wrap' }}>
                {property.beds && <span>Beds: <strong style={{ color: '#1a1a1a' }}>{property.beds}</strong></span>}
                {property.minStay && <span>Min. stay: <strong style={{ color: '#1a1a1a' }}>{property.minStay} night{property.minStay !== 1 ? 's' : ''}</strong></span>}
                {property.cancellationPolicy && <span>Cancellation: <strong style={{ color: '#1a1a1a', textTransform: 'capitalize' }}>{property.cancellationPolicy}</strong></span>}
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div style={{ border: '1px solid #f0eeeb', padding: '24px', marginTop: '16px', borderRadius: '4px' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#1a1a1a', marginBottom: '14px' }}>About this place</h3>
                <p style={{ fontSize: '13px', color: '#5a5550', lineHeight: 1.9, whiteSpace: 'pre-wrap', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: showMoreDesc ? 'unset' : 6, overflow: showMoreDesc ? 'visible' : 'hidden' }}>
                  {property.description}
                </p>
                {property.description.length > 400 && (
                  <button onClick={() => setShowMoreDesc(!showMoreDesc)} style={{ marginTop: '12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#c9a96e', fontFamily: "'Jost', sans-serif", padding: 0, textDecoration: 'underline' }}>
                    {showMoreDesc ? 'Show less ↑' : 'See more ↓'}
                  </button>
                )}
              </div>
            )}

            {/* Amenities */}
            {allAmenities.length > 0 && (
              <div style={{ border: '1px solid #f0eeeb', padding: '24px', marginTop: '16px', borderRadius: '4px' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#1a1a1a', marginBottom: '16px' }}>Amenities</h3>
                {visibleAmenities.map(([category, items]) => (
                  <div key={category} style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9590', marginBottom: '8px' }}>{amenityLabels[category]}</div>
                    <div className="pd-amenity-grid">
                      {items.map(item => (
                        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 10px', background: '#f8f7f5', borderRadius: '4px', fontSize: '12px', color: '#5a5550' }}>
                          <span>{amenityIcons[item] || '✓'}</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {allAmenities.length > 4 && (
                  <button onClick={() => setShowAllAmenities(!showAllAmenities)} style={{ width: '100%', marginTop: '8px', background: '#f8f7f5', border: '1px solid #e8e4de', padding: '10px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", color: '#1a1a1a' }}>
                    {showAllAmenities ? '↑ Show Less' : '↓ Show All Amenities'}
                  </button>
                )}
              </div>
            )}

            {/* House Rules */}
            {property.houseRules && (
              <div style={{ border: '1px solid #f0eeeb', padding: '24px', marginTop: '16px', borderRadius: '4px' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#1a1a1a', marginBottom: '14px' }}>House Rules</h3>
                <p style={{ fontSize: '13px', color: '#5a5550', lineHeight: 1.9, whiteSpace: 'pre-wrap', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: showMoreRules ? 'unset' : 6, overflow: showMoreRules ? 'visible' : 'hidden' }}>
                  {property.houseRules}
                </p>
                {property.houseRules.length > 400 && (
                  <button onClick={() => setShowMoreRules(!showMoreRules)} style={{ marginTop: '12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#c9a96e', fontFamily: "'Jost', sans-serif", padding: 0, textDecoration: 'underline' }}>
                    {showMoreRules ? 'Show less ↑' : 'See more ↓'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT — Desktop Booking Card */}
          <div className="pd-desktop-booking pd-sticky">
            <BookingCard property={property} onRangeSelect={(ci, co) => { setCheckIn(ci); setCheckOut(co) }} checkIn={checkIn} checkOut={checkOut} nights={nights} total={total} isMobile={false} onBook={handleBook} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="pd-mobile-bar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, background: '#fff', borderTop: '1px solid #f0eeeb', padding: '12px 20px', display: 'none', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 -4px 20px rgba(0,0,0,0.08)', gap: '12px' }}>
        <div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#1a1a1a' }}>${property.price}</span>
          <span style={{ fontSize: '12px', color: '#9a9590' }}> / night</span>
          {nights > 0 && <div style={{ fontSize: '11px', color: '#c9a96e' }}>{nights} nights · ${total} total</div>}
        </div>
        <button onClick={handleBook} style={{ background: '#111', color: '#fff', border: 'none', padding: '14px 28px', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", whiteSpace: 'nowrap', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
          onMouseLeave={e => e.currentTarget.style.background = '#111'}
        >Check Availability</button>
      </div>

      <Footer />
    </main>
  )
}

export default PropertyDetail