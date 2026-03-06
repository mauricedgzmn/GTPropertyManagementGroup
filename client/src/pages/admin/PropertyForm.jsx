import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, X, Plus } from 'lucide-react'
import api from '../../utils/api'

const propertyTypes = ['villa', 'apartment', 'luxury house', 'chalet', 'mansion', 'estate', 'cabin', 'condo', 'house', 'hacienda', 'Studio Type']

const amenityOptions = {
  internetAndOffice: ['Internet', 'Wireless', 'Dedicated Workspace', 'Laptop Friendly workspace'],
  heatingAndCooling: ['Air Conditioning', 'Heating', 'Suitable For Infants'],
  kitchenAndDining: ['Kitchen', 'Toaster', 'Dishwasher', 'Microwave', 'Oven', 'Stove', 'Refrigerator', 'Kitchen Utensils', 'Dining Table', 'Coffee/Tea Maker', 'Cooking Basics', 'Freezer', 'Wine Glasses'],
  bedroomAndLaundry: ['Washing Machine', 'Dryer', 'Hangers', 'Iron', 'Clothing Storage', 'Linens'],
  bathroom: ['Hair Dryer', 'Shampoo', 'Tub', 'Conditioner', 'Body Soap', 'Hot Water', 'Shower Gel'],
  homeSafety: ['Smoke Detector', 'Carbon Monoxide Detector', 'First Aid Kit', 'Fire Extinguisher'],
  entertainment: ['TV', 'Netflix', 'Pool', 'Gym'],
  parkingAndFacilities: ['Free Parking', 'Paid Parking', 'EV Charger', 'Private Entrance', 'Street Parking'],
  other: ['Essentials', 'Suitable For Children', 'Single Level Home', 'Room Darkening Shades', 'Long Term Stays Allowed', 'Cleaning Products', 'Pets Allowed', 'Pack n play travel crib', 'Luggage dropoff allowed', 'Baby Crib'],
}

const amenityLabels = {
  internetAndOffice: 'Internet & Office',
  heatingAndCooling: 'Heating & Cooling',
  kitchenAndDining: 'Kitchen & Dining',
  bedroomAndLaundry: 'Bedroom & Laundry',
  bathroom: 'Bathroom',
  homeSafety: 'Home Safety',
  entertainment: 'Entertainment',
  parkingAndFacilities: 'Parking & Facilities',
  other: 'Other',
}

const inputStyle = {
  width: '100%', fontSize: '13px', fontWeight: 300,
  color: '#1a1a1a', background: '#fff',
  border: '1.5px solid #e8e4de', borderRadius: '4px',
  padding: '11px 14px', outline: 'none',
  fontFamily: "'Jost', sans-serif",
  boxSizing: 'border-box', transition: 'border 0.2s',
}

const defaultAmenities = {
  internetAndOffice: [], heatingAndCooling: [], kitchenAndDining: [],
  bedroomAndLaundry: [], bathroom: [], homeSafety: [],
  entertainment: [], parkingAndFacilities: [], other: [],
}

function PropertyForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    name: '', type: 'villa', location: '', price: '', cleaningFee: '',
    description: '', houseRules: '', bedrooms: '1', bathrooms: '1',
    maxGuests: '2', beds: '1', minStay: '1', cancellationPolicy: 'flexible',
    featured: false, active: true,
  })
  const [amenities, setAmenities] = useState(defaultAmenities)
  const [imageFiles, setImageFiles] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [urlInput, setUrlInput] = useState('')
  const [keepImages, setKeepImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(isEdit)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('basic')

  useEffect(() => {
    // ✅ FIXED: was 'adminToken', now correctly uses 'gtmg_token'
    if (!localStorage.getItem('gtmg_token')) { navigate('/admin'); return }
    if (isEdit) loadProperty()
  }, [id])

  const loadProperty = async () => {
    try {
      const { data } = await api.get(`/properties/${id}`)
      setForm({
        name: data.name || '',
        type: data.type || 'villa',
        location: data.location || '',
        price: data.price || '',
        cleaningFee: data.cleaningFee || '',
        description: data.description || '',
        houseRules: data.houseRules || '',
        bedrooms: String(data.bedrooms || 1),
        bathrooms: String(data.bathrooms || 1),
        maxGuests: String(data.maxGuests || 2),
        beds: String(data.beds || 1),
        minStay: String(data.minStay || 1),
        cancellationPolicy: data.cancellationPolicy || 'flexible',
        featured: data.featured || false,
        active: data.active !== false,
      })
      setAmenities({ ...defaultAmenities, ...data.amenities })
      setKeepImages(data.images || [])
    } catch {
      setError('Failed to load property.')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const toggleAmenity = (category, item) => {
    setAmenities(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(a => a !== item)
        : [...prev[category], item]
    }))
  }

  const handleFileChange = e => {
    setImageFiles(prev => [...prev, ...Array.from(e.target.files)])
  }

  const handleAddUrl = () => {
    if (urlInput.trim()) { setImageUrls(prev => [...prev, urlInput.trim()]); setUrlInput('') }
  }

  const handleSubmit = async () => {
    if (!form.name || !form.location || !form.price) {
      setError('Name, location, and price are required.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)))
      formData.append('amenities', JSON.stringify(amenities))
      imageFiles.forEach(f => formData.append('images', f))
      if (imageUrls.length > 0) formData.append('imageUrls', JSON.stringify(imageUrls))
      if (isEdit && keepImages.length > 0) formData.append('keepImages', JSON.stringify(keepImages))

      if (isEdit) {
        await api.put(`/properties/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await api.post('/properties', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save property.')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { key: 'basic', label: 'Basic Info' },
    { key: 'details', label: 'Details' },
    { key: 'amenities', label: 'Amenities' },
    { key: 'rules', label: 'House Rules' },
    { key: 'images', label: 'Images' },
  ]

  if (fetchLoading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Jost', sans-serif", color: '#9a9590' }}>
      Loading property...
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f5', fontFamily: "'Jost', sans-serif" }}>

      {/* Top Bar */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #f0eeeb',
        padding: '0 40px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/admin/dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', color: '#5a5550', fontFamily: "'Jost', sans-serif", padding: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
            onMouseLeave={e => e.currentTarget.style.color = '#5a5550'}
          >
            <ArrowLeft size={15} /> Back to Dashboard
          </button>
          <div style={{ width: '1px', height: '20px', background: '#e8e4de' }} />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#1a1a1a' }}>
            {isEdit ? 'Edit Property' : 'Add New Property'}
          </div>
        </div>
        <button onClick={handleSubmit} disabled={loading}
          style={{ background: loading ? '#888' : '#111', color: '#fff', border: '1px solid #111', padding: '10px 28px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'all 0.2s' }}
          onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.borderColor = '#c9a96e' } }}
          onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#111' } }}
        >
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Property'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f0eeeb', padding: '0 40px', display: 'flex', gap: '0' }}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '16px 24px', fontSize: '11px', letterSpacing: '0.12em',
              textTransform: 'uppercase', fontFamily: "'Jost', sans-serif",
              color: activeTab === tab.key ? '#1a1a1a' : '#9a9590',
              borderBottom: activeTab === tab.key ? '2px solid #c9a96e' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', padding: '12px 16px', fontSize: '13px', color: '#dc2626', marginBottom: '24px' }}>
            {error}
          </div>
        )}

        {/* BASIC INFO TAB */}
        {activeTab === 'basic' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '28px', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>Property Info</div>

              {[
                { name: 'name', label: 'Property Name *', placeholder: 'e.g. Villa Serenità' },
                { name: 'location', label: 'Location *', placeholder: 'e.g. Miami, Florida, USA' },
              ].map(f => (
                <div key={f.name} style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                  <input name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} style={inputStyle}
                    onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
                    onBlur={e => e.target.style.border = '1.5px solid #e8e4de'}
                  />
                </div>
              ))}

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Type *</label>
                <select name="type" value={form.type} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}>
                  {propertyTypes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#1a1a1a' }}>
                  <input type="checkbox" name="active" checked={form.active} onChange={handleChange} style={{ accentColor: '#c9a96e', width: '16px', height: '16px' }} />
                  Active
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#1a1a1a' }}>
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} style={{ accentColor: '#c9a96e', width: '16px', height: '16px' }} />
                  Featured
                </label>
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '28px', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>Pricing</div>

              {[
                { name: 'price', label: 'Price Per Night (USD) *', placeholder: '350' },
                { name: 'cleaningFee', label: 'Cleaning Fee (USD)', placeholder: '120' },
              ].map(f => (
                <div key={f.name} style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                  <input name={f.name} type="number" value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} style={inputStyle}
                    onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
                    onBlur={e => e.target.style.border = '1.5px solid #e8e4de'}
                  />
                </div>
              ))}

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Cancellation Policy</label>
                <select name="cancellationPolicy" value={form.cancellationPolicy} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}>
                  {['flexible', 'moderate', 'strict', 'non-refundable', 'firm'].map(p => (
                    <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Minimum Stay (nights)</label>
                <input name="minStay" type="number" min="1" value={form.minStay} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
                  onBlur={e => e.target.style.border = '1.5px solid #e8e4de'}
                />
              </div>
            </div>
          </div>
        )}

        {/* DETAILS TAB */}
        {activeTab === 'details' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '28px', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>Property Details</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { name: 'bedrooms', label: 'Bedrooms' },
                  { name: 'bathrooms', label: 'Bathrooms' },
                  { name: 'beds', label: 'Beds' },
                  { name: 'maxGuests', label: 'Max Guests' },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                    <input name={f.name} type="number" min="1" value={form[f.name]} onChange={handleChange} style={inputStyle}
                      onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
                      onBlur={e => e.target.style.border = '1.5px solid #e8e4de'}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '28px', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>Description</div>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe this property in detail..." rows={10}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
                onBlur={e => e.target.style.border = '1.5px solid #e8e4de'}
              />
            </div>
          </div>
        )}

        {/* AMENITIES TAB */}
        {activeTab === 'amenities' && (
          <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '32px', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '24px' }}>Amenities</div>
            {Object.entries(amenityOptions).map(([category, items]) => (
              <div key={category} style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #f0eeeb' }}>
                  {amenityLabels[category]}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {items.map(item => {
                    const selected = amenities[category]?.includes(item)
                    return (
                      <label key={item} onClick={() => toggleAmenity(category, item)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '10px 14px', cursor: 'pointer',
                          border: `1px solid ${selected ? '#c9a96e' : '#e8e4de'}`,
                          background: selected ? '#fef9ee' : '#fff',
                          borderRadius: '4px', transition: 'all 0.15s',
                          fontSize: '12px', color: selected ? '#c9a96e' : '#5a5550',
                        }}
                      >
                        <div style={{
                          width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                          border: `2px solid ${selected ? '#c9a96e' : '#e8e4de'}`,
                          background: selected ? '#c9a96e' : '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {selected && <span style={{ color: '#fff', fontSize: '10px', lineHeight: 1 }}>✓</span>}
                        </div>
                        {item}
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* HOUSE RULES TAB */}
        {activeTab === 'rules' && (
          <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '32px', borderRadius: '4px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '8px' }}>House Rules</div>
            <p style={{ fontSize: '12px', color: '#9a9590', marginBottom: '20px', lineHeight: 1.7 }}>
              Describe your house rules, check-in/check-out times, pet policy, smoking policy, and any other important guidelines for guests.
            </p>
            <textarea name="houseRules" value={form.houseRules} onChange={handleChange}
              placeholder="e.g. No smoking inside the property. Check-in after 3PM, checkout before 11AM. No parties or events. No pets allowed..."
              rows={14}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.8 }}
              onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
              onBlur={e => e.target.style.border = '1.5px solid #e8e4de'}
            />
          </div>
        )}

        {/* IMAGES TAB */}
        {activeTab === 'images' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '28px', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>Upload Images</div>
              <label style={{ display: 'block', border: '2px dashed #e8e4de', borderRadius: '4px', padding: '40px', textAlign: 'center', cursor: 'pointer', transition: 'border 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a96e'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e8e4de'}
              >
                <input type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>📁</div>
                <div style={{ fontSize: '13px', color: '#5a5550', marginBottom: '4px' }}>Click to upload images</div>
                <div style={{ fontSize: '11px', color: '#aaa' }}>JPEG, PNG, WebP — max 10MB each</div>
              </label>
              {imageFiles.length > 0 && (
                <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {imageFiles.map((f, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img src={URL.createObjectURL(f)} alt="" style={{ width: '80px', height: '64px', objectFit: 'cover', borderRadius: '2px' }} />
                      <button onClick={() => setImageFiles(prev => prev.filter((_, idx) => idx !== i))}
                        style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#dc2626', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={10} color="#fff" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '28px', borderRadius: '4px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>Paste Image URLs</div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="https://example.com/image.jpg"
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'}
                  onBlur={e => e.target.style.border = '1.5px solid #e8e4de'}
                  onKeyDown={e => e.key === 'Enter' && handleAddUrl()}
                />
                <button onClick={handleAddUrl}
                  style={{ background: '#111', color: '#fff', border: 'none', padding: '0 16px', cursor: 'pointer', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontFamily: "'Jost', sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
                  onMouseLeave={e => e.currentTarget.style.background = '#111'}
                >
                  <Plus size={14} /> Add
                </button>
              </div>
              {imageUrls.map((url, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', background: '#f8f7f5', padding: '8px 12px', borderRadius: '4px' }}>
                  <img src={url} alt="" style={{ width: '40px', height: '32px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }} onError={e => e.target.style.display = 'none'} />
                  <span style={{ fontSize: '11px', color: '#5a5550', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
                  <button onClick={() => setImageUrls(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                    <X size={13} color="#dc2626" />
                  </button>
                </div>
              ))}
            </div>

            {isEdit && keepImages.length > 0 && (
              <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '28px', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>Current Images</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {keepImages.map((img, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      {/* ✅ FIXED: was hardcoded localhost:5000, now uses env variable */}
                      <img src={img.startsWith('/') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${img}` : img} alt=""
                        style={{ width: '96px', height: '72px', objectFit: 'cover', borderRadius: '2px' }} />
                      <button onClick={() => setKeepImages(prev => prev.filter((_, idx) => idx !== i))}
                        style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#dc2626', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={10} color="#fff" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => navigate('/admin/dashboard')}
            style={{ background: '#fff', border: '1px solid #e8e4de', color: '#5a5550', padding: '12px 28px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#1a1a1a'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#e8e4de'}
          >Cancel</button>
          <button onClick={handleSubmit} disabled={loading}
            style={{ background: loading ? '#888' : '#111', color: '#fff', border: '1px solid #111', padding: '12px 36px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'all 0.2s' }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.borderColor = '#c9a96e' } }}
            onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#111' } }}
          >
            {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Property'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyForm