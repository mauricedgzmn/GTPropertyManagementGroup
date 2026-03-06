import { useState, useEffect } from 'react'
import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'

function BookingWidget() {
  const [selected, setSelected] = useState('')
  const [open, setOpen] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('1')
  const [destinations, setDestinations] = useState(['Any Location'])
  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    api.get('/properties').then(res => {
      const unique = [...new Set(res.data.map(p => p.location).filter(Boolean))]
      setDestinations(['Any Location', ...unique.sort()])
    }).catch(() => {})
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selected && selected !== 'Any Location') params.set('location', selected)
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    if (guests) params.set('guests', guests)
    navigate(`/properties?${params.toString()}`)
  }

  const inputStyle = {
    width: '100%', fontSize: '13px', fontWeight: 300, color: '#1a1a1a',
    background: '#fff', border: '1.5px solid #ddd', borderRadius: '8px',
    padding: '10px 14px', outline: 'none', fontFamily: "'Jost', sans-serif",
    cursor: 'pointer', boxSizing: 'border-box'
  }

  return (
    <>
      <style>{`
        .bw-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr auto; gap: 12px; align-items: end; }
        .bw-spacer { display: block; }
        @media (max-width: 900px) {
          .bw-wrap { padding: 24px 20px !important; border-radius: 12px !important; }
          .bw-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .bw-dest { grid-column: span 2 !important; }
          .bw-btn-wrap { grid-column: span 2 !important; }
          .bw-spacer { display: none !important; }
        }
        @media (max-width: 480px) {
          .bw-grid { grid-template-columns: 1fr !important; }
          .bw-dest { grid-column: span 1 !important; }
          .bw-btn-wrap { grid-column: span 1 !important; }
        }
      `}</style>

      <div className="bw-wrap" id="booking" style={{
        position: 'relative', zIndex: 10, background: '#fff', borderRadius: '16px',
        padding: '32px 36px', boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)',
        width: '100%', maxWidth: '960px', margin: '0 auto',
        fontFamily: "'Jost', sans-serif", boxSizing: 'border-box'
      }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: '#1a1a1a', marginBottom: '20px' }}>
          Search Properties
        </h3>

        <div className="bw-grid">
          <div className="bw-dest" style={{ position: 'relative' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#5a5550', marginBottom: '8px' }}>
              <MapPin size={13} color="#5a5550" /> Search destinations
            </label>
            <div onClick={() => setOpen(!open)} style={{
              ...inputStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              border: open ? '2px solid #1a1a1a' : '1.5px solid #ddd', color: selected ? '#1a1a1a' : '#aaa',
            }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selected || 'Where to?'}</span>
              <ChevronDown size={14} color="#aaa" style={{ flexShrink: 0, marginLeft: '6px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            {open && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, background: '#fff', borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.14)', zIndex: 9999, width: '100%', maxHeight: '280px', overflowY: 'auto', border: '1px solid #f0eeeb' }}>
                {destinations.map(dest => (
                  <div key={dest} onClick={() => { setSelected(dest); setOpen(false) }}
                    style={{ padding: '13px 18px', fontSize: '14px', color: selected === dest ? '#c9a96e' : '#1a1a1a', cursor: 'pointer', background: selected === dest ? '#fdf9f4' : '#fff', fontFamily: "'Cormorant Garamond', serif", borderBottom: '1px solid #f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    onMouseEnter={e => { if (selected !== dest) e.currentTarget.style.background = '#f8f7f5' }}
                    onMouseLeave={e => { e.currentTarget.style.background = selected === dest ? '#fdf9f4' : '#fff' }}
                  >
                    {dest}{selected === dest && <span style={{ color: '#c9a96e', fontSize: '12px' }}>✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#5a5550', marginBottom: '8px' }}>
              <Calendar size={13} color="#5a5550" /> Check in
            </label>
            <input type="date" min={today} value={checkIn}
              onChange={e => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut('') }}
              style={inputStyle} onFocus={e => e.target.style.border = '2px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #ddd'} />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#5a5550', marginBottom: '8px' }}>
              <Calendar size={13} color="#5a5550" /> Check out
            </label>
            <input type="date" min={checkIn || today} value={checkOut} onChange={e => setCheckOut(e.target.value)}
              style={inputStyle} onFocus={e => e.target.style.border = '2px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #ddd'} />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#5a5550', marginBottom: '8px' }}>
              <Users size={13} color="#5a5550" /> Add guests
            </label>
            <select value={guests} onChange={e => setGuests(e.target.value)} style={{ ...inputStyle, appearance: 'auto' }}
              onFocus={e => e.target.style.border = '2px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #ddd'}>
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <option key={n} value={n}>{n} Guest{n !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div className="bw-btn-wrap">
            <div className="bw-spacer" style={{ marginBottom: '8px', visibility: 'hidden', fontSize: '12px' }}>_</div>
            <button onClick={handleSearch} style={{
              background: '#c9a96e', color: '#fff', border: 'none', borderRadius: '8px',
              padding: '11px 28px', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em',
              cursor: 'pointer', fontFamily: "'Jost', sans-serif", width: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'background 0.2s, transform 0.15s'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#b8935a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <Search size={15} /> Search
            </button>
          </div>
        </div>

        {open && <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 9998 }} />}
      </div>
    </>
  )
}

export default BookingWidget