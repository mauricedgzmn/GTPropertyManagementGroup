import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'

function FeaturedProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/properties?featured=true').then(({ data }) => setProperties(data)).catch(console.error).finally(() => setLoading(false))
  }, [])

  if (loading || properties.length === 0) return null

  const getImage = (p) => {
    if (!p.images?.[0]) return 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80'
    if (p.images[0].startsWith('/')) return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${p.images[0]}`
    return p.images[0]
  }

  return (
    <>
      <style>{`
        .fp-section { padding: 100px 48px; }
        .fp-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 56px; }
        .fp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .fp-grid > a:first-child { grid-row: span 2; aspect-ratio: unset; }
        .fp-grid > a { aspect-ratio: 3/4; }
        @media (max-width: 768px) {
          .fp-section { padding: 64px 20px !important; }
          .fp-header { flex-direction: column; align-items: flex-start; gap: 16px; margin-bottom: 32px !important; }
          .fp-grid { grid-template-columns: 1fr !important; }
          .fp-grid > a:first-child { grid-row: span 1 !important; aspect-ratio: 4/3 !important; }
          .fp-grid > a { aspect-ratio: 4/3 !important; }
        }
      `}</style>
      <section className="fp-section" id="properties" style={{ background: '#fff', fontFamily: "'Jost', sans-serif" }}>
        <div className="fp-header">
          <div>
            <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px', display: 'block' }}>Featured Listings</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 400, lineHeight: 1.1, color: '#1a1a1a', margin: 0 }}>
              Exceptional Properties<br />Handpicked For You
            </h2>
          </div>
          <Link to="/properties" style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5a5550', textDecoration: 'none', borderBottom: '1px solid #c8c4bc', paddingBottom: '2px', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.target.style.color = '#c9a96e'; e.target.style.borderColor = '#c9a96e' }}
            onMouseLeave={e => { e.target.style.color = '#5a5550'; e.target.style.borderColor = '#c8c4bc' }}
          >View All Properties</Link>
        </div>

        <div className="fp-grid">
          {properties.slice(0, 4).map((p) => (
            <Link key={p._id} to={`/properties/${p._id}`} style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', background: '#f0eeeb', display: 'block', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
            >
              <img src={getImage(p)} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)', filter: 'brightness(0.82) saturate(0.8)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 28px 28px', background: 'linear-gradient(to top, rgba(0,0,0,0.72), transparent)' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e8d5b0', marginBottom: '8px' }}>{p.type}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 400, color: '#fff', marginBottom: '6px' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>📍 {p.location}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#e8d5b0', marginTop: '12px' }}>
                  ${p.price} <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>/ night</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {properties.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/properties" style={{ display: 'inline-block', background: '#111', color: '#fff', border: '1px solid #111', padding: '14px 40px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none' }}
              onMouseEnter={e => { e.target.style.background = '#c9a96e'; e.target.style.borderColor = '#c9a96e' }}
              onMouseLeave={e => { e.target.style.background = '#111'; e.target.style.borderColor = '#111' }}
            >View All Properties</Link>
          </div>
        )}
      </section>
    </>
  )
}

export default FeaturedProperties