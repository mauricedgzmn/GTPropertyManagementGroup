import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, X, MapPin, SlidersHorizontal } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../utils/api'

function Properties() {
  const [allProperties, setAllProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Filter state
  const [locationInput, setLocationInput] = useState(searchParams.get('location') || '')
  const [activeLocation, setActiveLocation] = useState(searchParams.get('location') || '')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 9999])
  const [activeType, setActiveType] = useState('')

  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const guests = searchParams.get('guests')

  useEffect(() => {
    api.get('/properties')
      .then(({ data }) => setAllProperties(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  // Unique locations from data
  const uniqueLocations = useMemo(() => {
    const locs = allProperties.map(p => p.location).filter(Boolean)
    return [...new Set(locs)].sort()
  }, [allProperties])

  // Unique types
  const uniqueTypes = useMemo(() => {
    const types = allProperties.map(p => p.type).filter(Boolean)
    return [...new Set(types)].sort()
  }, [allProperties])

  // Max price for range slider
  const maxPrice = useMemo(() => {
    const prices = allProperties.map(p => p.price || 0)
    return Math.max(...prices, 500)
  }, [allProperties])

  // Filtered results
  const filtered = useMemo(() => {
    let data = [...allProperties]
    if (activeLocation) data = data.filter(p => p.location?.toLowerCase().includes(activeLocation.toLowerCase()))
    if (guests) data = data.filter(p => p.maxGuests >= parseInt(guests))
    if (activeType) data = data.filter(p => p.type?.toLowerCase() === activeType.toLowerCase())
    data = data.filter(p => (p.price || 0) <= priceRange[1])
    return data
  }, [allProperties, activeLocation, guests, activeType, priceRange])

  // Suggestions while typing
  const suggestions = useMemo(() => {
    if (!locationInput.trim()) return uniqueLocations
    return uniqueLocations.filter(l => l.toLowerCase().includes(locationInput.toLowerCase()))
  }, [locationInput, uniqueLocations])

  const getImage = (p) => {
    if (!p.images?.[0]) return 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80'
    if (p.images[0].startsWith('/')) return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${p.images[0]}`
    return p.images[0]
  }

  const handleLocationSelect = (loc) => {
    setLocationInput(loc)
    setActiveLocation(loc)
    setShowSuggestions(false)
    const p = new URLSearchParams(searchParams)
    if (loc) p.set('location', loc); else p.delete('location')
    setSearchParams(p)
  }

  const handleClearAll = () => {
    setLocationInput(''); setActiveLocation(''); setActiveType(''); setPriceRange([0, 9999])
    setSearchParams({})
  }

  const hasFilters = activeLocation || activeType || priceRange[1] < maxPrice || guests

  return (
    <main style={{ fontFamily: "'Jost', sans-serif" }}>
      <style>{`
        .props-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .props-body { display: flex; gap: 32px; align-items: flex-start; max-width: 1280px; margin: 0 auto; padding: 40px 32px 80px; box-sizing: border-box; }
        .props-sidebar { width: 260px; flex-shrink: 0; position: sticky; top: 88px; }
        .props-main { flex: 1; min-width: 0; }
        .props-card-img { height: 220px; }
        @media (max-width: 1024px) {
          .props-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .props-sidebar { display: none !important; }
          .props-body { padding: 24px 16px 60px !important; }
          .props-mobile-filter { display: flex !important; }
          .props-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .props-card-img { height: 180px !important; }
        }
        @media (max-width: 520px) {
          .props-grid { grid-template-columns: 1fr !important; }
        }
        .props-mobile-filter { display: none; }
        .props-mobile-drawer { display: none; }
        @media (max-width: 900px) {
          .props-mobile-drawer.open { display: flex !important; }
        }
        .loc-suggestion:hover { background: #f5f3f0 !important; }
        .prop-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.1) !important; transform: translateY(-3px) !important; }
      `}</style>

      <Navbar />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '38vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=80') center/cover no-repeat", filter: 'brightness(0.2) saturate(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.65))' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', width: '100%', maxWidth: '700px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '12px' }}>Our Collection</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 400, lineHeight: 1.05, color: '#fff', marginBottom: '28px' }}>
            All <em style={{ fontStyle: 'italic', color: '#e8d5b0' }}>Properties</em>
          </h1>

          {/* Search bar in hero */}
          <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '4px', overflow: 'visible', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              <Search size={16} color="#9a9590" style={{ marginLeft: '16px', flexShrink: 0 }} />
              <input
                value={locationInput}
                onChange={e => { setLocationInput(e.target.value); setShowSuggestions(true) }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
                placeholder="Search by location..."
                style={{ flex: 1, border: 'none', outline: 'none', padding: '14px 12px', fontSize: '14px', fontFamily: "'Jost', sans-serif", background: 'transparent', color: '#1a1a1a' }}
              />
              {locationInput && (
                <button onClick={() => handleLocationSelect('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px', color: '#aaa' }}><X size={14} /></button>
              )}
              <button onClick={() => handleLocationSelect(locationInput)} style={{ background: '#111', color: '#fff', border: 'none', padding: '14px 20px', cursor: 'pointer', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'Jost', sans-serif', flexShrink: 0", transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
                onMouseLeave={e => e.currentTarget.style.background = '#111'}
              >Search</button>
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', borderRadius: '0 0 8px 8px', boxShadow: '0 12px 32px rgba(0,0,0,0.12)', zIndex: 100, maxHeight: '220px', overflowY: 'auto', marginTop: '2px' }}>
                {suggestions.map(loc => (
                  <div key={loc} className="loc-suggestion"
                    onMouseDown={() => handleLocationSelect(loc)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', cursor: 'pointer', fontSize: '13px', color: '#1a1a1a', background: '#fff', transition: 'background 0.15s' }}>
                    <MapPin size={13} color="#c9a96e" />
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="props-body">

        {/* SIDEBAR — Desktop Filter */}
        <aside className="props-sidebar">
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f0eeeb', overflow: 'hidden' }}>
            <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #f0eeeb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1a1a1a' }}>Filters</span>
              {hasFilters && (
                <button onClick={handleClearAll} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: '#c9a96e', fontFamily: "'Jost', sans-serif", textDecoration: 'underline', padding: 0 }}>Clear all</button>
              )}
            </div>

            {/* Location filter */}
            <div style={{ padding: '20px', borderBottom: '1px solid #f0eeeb' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9a9590', marginBottom: '12px' }}>Location</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button onClick={() => handleLocationSelect('')}
                  style={{ textAlign: 'left', background: !activeLocation ? '#f8f7f5' : 'none', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: !activeLocation ? '#1a1a1a' : '#5a5550', fontFamily: "'Jost', sans-serif", fontWeight: !activeLocation ? 600 : 400, transition: 'all 0.15s' }}>
                  All Locations
                </button>
                {uniqueLocations.map(loc => (
                  <button key={loc} onClick={() => handleLocationSelect(loc)}
                    style={{ textAlign: 'left', background: activeLocation === loc ? '#f8f7f5' : 'none', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: activeLocation === loc ? '#c9a96e' : '#5a5550', fontFamily: "'Jost', sans-serif", fontWeight: activeLocation === loc ? 600 : 400, display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s' }}>
                    <MapPin size={12} color={activeLocation === loc ? '#c9a96e' : '#ccc'} />
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Property type filter */}
            {uniqueTypes.length > 0 && (
              <div style={{ padding: '20px', borderBottom: '1px solid #f0eeeb' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9a9590', marginBottom: '12px' }}>Property Type</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button onClick={() => setActiveType('')}
                    style={{ textAlign: 'left', background: !activeType ? '#f8f7f5' : 'none', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: !activeType ? '#1a1a1a' : '#5a5550', fontFamily: "'Jost', sans-serif", fontWeight: !activeType ? 600 : 400 }}>
                    All Types
                  </button>
                  {uniqueTypes.map(type => (
                    <button key={type} onClick={() => setActiveType(type)}
                      style={{ textAlign: 'left', background: activeType === type ? '#f8f7f5' : 'none', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', color: activeType === type ? '#c9a96e' : '#5a5550', fontFamily: "'Jost', sans-serif", fontWeight: activeType === type ? 600 : 400, textTransform: 'capitalize' }}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price range */}
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9a9590', marginBottom: '12px' }}>Max Price / Night</div>
              <div style={{ marginBottom: '10px' }}>
                <input type="range" min={0} max={maxPrice} step={10}
                  value={priceRange[1] > maxPrice ? maxPrice : priceRange[1]}
                  onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                  style={{ width: '100%', accentColor: '#c9a96e', cursor: 'pointer' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#5a5550' }}>
                <span>$0</span>
                <span style={{ color: '#c9a96e', fontWeight: 600 }}>${priceRange[1] >= maxPrice ? maxPrice + '+' : priceRange[1]}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN content */}
        <div className="props-main">

          {/* Mobile filter bar */}
          <div className="props-mobile-filter" style={{ gap: '10px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, position: 'relative', minWidth: '160px' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #e8e4de', borderRadius: '8px', padding: '0 12px' }}>
                <Search size={14} color="#9a9590" />
                <input value={locationInput} onChange={e => { setLocationInput(e.target.value); setShowSuggestions(true) }}
                  onFocus={() => setShowSuggestions(true)} onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
                  placeholder="Location..." style={{ border: 'none', outline: 'none', padding: '10px 8px', fontSize: '13px', fontFamily: "'Jost', sans-serif", background: 'transparent', width: '100%' }} />
                {locationInput && <button onClick={() => handleLocationSelect('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}><X size={13} /></button>}
              </div>
              {showSuggestions && suggestions.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 100, marginTop: '4px', overflow: 'hidden' }}>
                  {suggestions.map(loc => (
                    <div key={loc} className="loc-suggestion" onMouseDown={() => handleLocationSelect(loc)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', cursor: 'pointer', fontSize: '13px', color: '#1a1a1a' }}>
                      <MapPin size={12} color="#c9a96e" />{loc}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <select value={activeType} onChange={e => setActiveType(e.target.value)}
              style={{ border: '1px solid #e8e4de', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', fontFamily: "'Jost', sans-serif", color: activeType ? '#1a1a1a' : '#9a9590', background: '#fff', outline: 'none', cursor: 'pointer' }}>
              <option value="">All Types</option>
              {uniqueTypes.map(t => <option key={t} value={t} style={{ textTransform: 'capitalize' }}>{t}</option>)}
            </select>
            {hasFilters && (
              <button onClick={handleClearAll} style={{ background: 'none', border: '1px solid #e8e4de', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', cursor: 'pointer', color: '#5a5550', fontFamily: "'Jost', sans-serif", whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <X size={13} /> Clear
              </button>
            )}
          </div>

          {/* Results count + active filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontSize: '13px', color: '#5a5550' }}>
              {loading ? 'Loading...' : <><span style={{ fontWeight: 600, color: '#1a1a1a' }}>{filtered.length}</span> propert{filtered.length !== 1 ? 'ies' : 'y'} found</>}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {activeLocation && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f0eeeb', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: '#5a5550' }}>
                  <MapPin size={10} color="#c9a96e" />{activeLocation}
                  <button onClick={() => handleLocationSelect('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: '2px', color: '#aaa', display: 'flex', alignItems: 'center' }}><X size={10} /></button>
                </span>
              )}
              {activeType && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f0eeeb', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: '#5a5550', textTransform: 'capitalize' }}>
                  {activeType}
                  <button onClick={() => setActiveType('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: '2px', color: '#aaa', display: 'flex', alignItems: 'center' }}><X size={10} /></button>
                </span>
              )}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#9a9590', fontSize: '14px' }}>Loading properties...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🏠</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: '#1a1a1a', marginBottom: '10px' }}>No properties found</div>
              <p style={{ fontSize: '13px', color: '#9a9590', marginBottom: '20px' }}>Try adjusting your filters or searching a different location.</p>
              <button onClick={handleClearAll} style={{ background: '#111', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif" }}>Clear Filters</button>
            </div>
          ) : (
            <div className="props-grid">
              {filtered.map(p => (
                <div key={p._id} className="prop-card" onClick={() => navigate(`/properties/${p._id}`)}
                  style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.2s, transform 0.2s' }}>
                  <div className="props-card-img" style={{ overflow: 'hidden', position: 'relative' }}>
                    <img src={getImage(p)} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                    {p.featured && <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#c9a96e', color: '#fff', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', padding: '4px 10px' }}>Featured</div>}
                  </div>
                  <div style={{ padding: '18px' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '6px' }}>{p.type}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '19px', fontWeight: 400, color: '#1a1a1a', marginBottom: '6px', lineHeight: 1.25 }}>{p.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#9a9590', marginBottom: '12px' }}>
                      <MapPin size={11} color="#c9a96e" />{p.location}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      {[`${p.bedrooms} bd`, `${p.bathrooms} ba`, `${p.maxGuests} guests`].map(d => (
                        <span key={d} style={{ fontSize: '11px', color: '#5a5550', background: '#f8f7f5', padding: '3px 8px', borderRadius: '2px' }}>{d}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0eeeb', paddingTop: '14px' }}>
                      <div>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: '#1a1a1a' }}>${p.price}</span>
                        <span style={{ fontSize: '11px', color: '#9a9590' }}> / night</span>
                      </div>
                      <span style={{ background: '#111', color: '#fff', padding: '8px 16px', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>View</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default Properties