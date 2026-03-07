import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus, Edit2, Trash2, Eye, EyeOff, Star, LogOut, Home,
  RefreshCw, Copy, MessageSquare, Calendar, BarChart2,
  MapPin, TrendingUp, Users, Mail,
  Phone, Check, Ban, X, CheckCircle, AlertTriangle, Clock, Bell,
  Menu, ChevronLeft
} from 'lucide-react'
import api from '../../utils/api'

const STATUS_CONFIG = {
  new:         { label: 'New',         bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' },
  in_progress: { label: 'In Progress', bg: '#fffbeb', color: '#d97706', border: '#fde68a' },
  confirmed:   { label: 'Confirmed',   bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
  declined:    { label: 'Declined',    bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
}

// ─── Toast ───────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [])
  return (
    <div style={{
      position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 99999, background: type === 'error' ? '#dc2626' : '#111', color: '#fff',
      padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.25)', fontFamily: "'Jost', sans-serif",
      fontSize: '13px', minWidth: '260px', maxWidth: '90vw', borderRadius: '8px',
      whiteSpace: 'nowrap'
    }}>
      {type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle size={16} color="#c9a96e" />}
      {message}
    </div>
  )
}

// ─── Mobile Header ────────────────────────────────────────────
function MobileHeader({ onMenuOpen, unreadCount, username, sectionLabel }) {
  return (
    <div style={{
      display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: '#111', padding: '0 16px', height: '56px',
      alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 12px rgba(0,0,0,0.3)'
    }} className="mobile-header">
      <button onClick={onMenuOpen} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: '#fff', padding: '8px', margin: '-8px', display: 'flex', alignItems: 'center'
      }}>
        <Menu size={20} />
      </button>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', color: '#c9a96e', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {sectionLabel}
      </div>
      <div style={{ position: 'relative' }}>
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            background: '#c9a96e', color: '#fff', borderRadius: '50%',
            width: '16px', height: '16px', fontSize: '9px', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#c9a96e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, color: '#fff' }}>
          {username.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  )
}

// ─── Mobile Drawer ────────────────────────────────────────────
function MobileDrawer({ open, onClose, navItems, activeSection, setActiveSection, username, role, unreadCount, showNotifs, setShowNotifs, notifications, markAllRead, clearAllNotifs, handleNotifClick, handleLogout }) {
  const ROLE_CONFIG = {
    owner: { label: 'Owner', color: '#c9a96e', bg: '#fdf8f0' },
    staff: { label: 'Staff', color: '#16a34a', bg: '#f0fdf4' },
  }
  if (!open) return null
  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 300, backdropFilter: 'blur(2px)'
      }} />
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', background: '#111',
        zIndex: 301, display: 'flex', flexDirection: 'column', overflowY: 'auto',
        transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.25s ease'
      }}>
        {/* Header */}
        <div style={{ padding: '20px 20px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff' }}>GT Property Management</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Group</div>
            <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>Owner Dashboard</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '8px', paddingLeft: '10px' }}>Navigation</div>
          {navItems.map(item => {
            const active = activeSection === item.key
            return (
              <button key={item.key} onClick={() => { setActiveSection(item.key); onClose() }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 10px',
                  background: active ? 'rgba(201,169,110,0.12)' : 'none', border: 'none', borderRadius: '6px',
                  cursor: 'pointer', color: active ? '#c9a96e' : 'rgba(255,255,255,0.6)',
                  fontSize: '13px', fontFamily: "'Jost', sans-serif", marginBottom: '2px',
                  textAlign: 'left', borderLeft: active ? '2px solid #c9a96e' : '2px solid transparent',
                  letterSpacing: '0.04em'
                }}>
                {item.icon}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge > 0 && (
                  <span style={{ fontSize: '10px', background: item.badgeColor || 'rgba(201,169,110,0.3)', color: item.badgeColor ? '#fff' : '#c9a96e', borderRadius: '10px', padding: '1px 7px' }}>{item.badge}</span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Notifications in drawer */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => setShowNotifs(!showNotifs)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '10px 14px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontFamily: "'Jost', sans-serif", fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bell size={13} />Notifications</div>
            {unreadCount > 0 && <span style={{ background: '#c9a96e', color: '#fff', borderRadius: '10px', padding: '1px 7px', fontSize: '10px', fontWeight: 700 }}>{unreadCount}</span>}
          </button>
          {showNotifs && (
            <div style={{ marginTop: '8px', background: '#1a1a1a', borderRadius: '6px', overflow: 'hidden' }}>
              {notifications.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>No new notifications</div>
              ) : notifications.slice(0, 5).map((n, i) => (
                <div key={n._id} onClick={() => { handleNotifClick(n); onClose() }}
                  style={{ padding: '10px 14px', borderBottom: i < Math.min(notifications.length, 5) - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', cursor: 'pointer', background: n.read ? 'transparent' : 'rgba(201,169,110,0.08)' }}>
                  <div style={{ fontSize: '11px', color: n.type === 'invest' ? '#4ade80' : '#c9a96e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                    {n.type === 'invest' ? 'Invest' : 'Inquiry'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#fff', fontWeight: n.read ? 400 : 600 }}>
                    {n.type === 'invest' ? `${n.firstName} ${n.lastName || ''}` : `${n.firstName} ${n.lastName || ''}`}
                  </div>
                </div>
              ))}
              {notifications.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {notifications.some(n => !n.read) && (
                    <button onClick={markAllRead} style={{ flex: 1, background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '4px', padding: '6px', cursor: 'pointer', fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Jost', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}>Mark all read</button>
                  )}
                  <button onClick={() => { clearAllNotifs(); setShowNotifs(false) }} style={{ flex: 1, background: 'none', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '4px', padding: '6px', cursor: 'pointer', fontSize: '10px', color: 'rgba(220,38,38,0.7)', fontFamily: "'Jost', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}>Clear all</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User + logout */}
        <div style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#c9a96e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '13px', color: '#fff', fontWeight: 500 }}>{username}</div>
              <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 7px', background: ROLE_CONFIG[role]?.bg || '#f8f7f5', color: ROLE_CONFIG[role]?.color || '#c9a96e', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {ROLE_CONFIG[role]?.label || role}
              </span>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)',
            padding: '10px', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '6px'
          }}>
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Inquiries Section ───────────────────────────────────────
function InquiriesSection({ showToast, properties = [] }) {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/inquiries')
      setInquiries(data)
    } catch {
      showToast('Failed to load inquiries', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchInquiries() }, [])

  const counts = {
    all:         inquiries.length,
    new:         inquiries.filter(i => i.status === 'new').length,
    in_progress: inquiries.filter(i => i.status === 'in_progress').length,
    confirmed:   inquiries.filter(i => i.status === 'confirmed').length,
  }
  const filtered = filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter)

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/inquiries/${id}/status`, { status })
      setInquiries(prev => prev.map(i => i._id === id ? data : i))
      if (selected?._id === id) setSelected(data)
      showToast(`Marked as ${STATUS_CONFIG[status].label}`)
    } catch {
      showToast('Failed to update status', 'error')
    }
  }

  const deleteInquiry = async (id) => {
    try {
      await api.delete(`/inquiries/${id}`)
      setInquiries(prev => prev.filter(i => i._id !== id))
      setSelected(null)
      showToast('Inquiry removed')
    } catch {
      showToast('Failed to remove inquiry', 'error')
    }
  }

  // Mobile detail view
  if (selected) {
    const prop = properties.find(p => p._id === selected.propertyId || p.name === selected.property)
    const price = prop?.price || 0
    const nights = selected.checkIn && selected.checkOut
      ? Math.round((new Date(selected.checkOut) - new Date(selected.checkIn)) / (1000 * 60 * 60 * 24))
      : 0
    const cleaning = prop?.cleaningFee || 0
    const subtotal = price * nights
    const total = subtotal + cleaning

    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '13px', fontFamily: "'Jost', sans-serif", padding: '0 0 20px', marginBottom: '4px' }}>
          <ChevronLeft size={16} /> Back to Inquiries
        </button>
        <div style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, margin: 0 }}>Inquiry Details</h3>
            <span style={{ fontSize: '11px', padding: '3px 10px', background: STATUS_CONFIG[selected.status]?.bg, color: STATUS_CONFIG[selected.status]?.color, border: `1px solid ${STATUS_CONFIG[selected.status]?.border}`, borderRadius: '10px' }}>
              {STATUS_CONFIG[selected.status]?.label}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {[
              [<Users size={13}/>, 'Guest',    `${selected.firstName || ''} ${selected.lastName || ''}`.trim()],
              [<Mail size={13}/>,  'Email',    selected.email],
              [<Phone size={13}/>, 'Phone',    selected.phone],
              [<Home size={13}/>,  'Property', selected.property],
              [<Calendar size={13}/>, 'Check-in',  selected.checkIn],
              [<Calendar size={13}/>, 'Check-out', selected.checkOut],
              [<Users size={13}/>,    'Guests',    selected.guests],
            ].map(([icon, label, val]) => val ? (
              <div key={label} style={{ display: 'flex', gap: '10px', fontSize: '13px' }}>
                <span style={{ color: '#c9a96e', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
                <span style={{ color: '#888', width: '68px', flexShrink: 0 }}>{label}</span>
                <span style={{ color: '#1a1a1a', wordBreak: 'break-word' }}>{val}</span>
              </div>
            ) : null)}
          </div>

          {price > 0 && nights > 0 && (
            <div style={{ background: '#faf9f7', border: '1px solid #f0eeeb', borderRadius: '8px', padding: '14px 16px', marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9590', marginBottom: '12px' }}>Price Breakdown</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '6px' }}>
                <span>${price} × {nights} night{nights !== 1 ? 's' : ''}</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              {cleaning > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '6px' }}>
                  <span>Cleaning fee</span><span>${cleaning.toLocaleString()}</span>
                </div>
              )}
              <div style={{ borderTop: '1px solid #e8e4de', marginTop: '8px', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 500, color: '#c9a96e' }}>${total.toLocaleString()}</span>
              </div>
            </div>
          )}

          {selected.message && (
            <div style={{ background: '#f8f7f5', padding: '14px', borderRadius: '6px', fontSize: '13px', color: '#555', lineHeight: 1.75, marginBottom: '20px', fontStyle: 'italic' }}>
              "{selected.message}"
            </div>
          )}

          <div style={{ fontSize: '11px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Update Status</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selected.status !== 'in_progress' && selected.status !== 'confirmed' && selected.status !== 'declined' && (
              <button onClick={() => updateStatus(selected._id, 'in_progress')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', fontSize: '13px', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '8px', fontWeight: 500 }}>
                <Clock size={15} /> Mark In Progress
              </button>
            )}
            {selected.status !== 'confirmed' && selected.status !== 'declined' && (
              <button onClick={() => updateStatus(selected._id, 'confirmed')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', fontSize: '13px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '8px', fontWeight: 500 }}>
                <Check size={15} /> Confirm Booking
              </button>
            )}
            {selected.status === 'confirmed' && (
              <button disabled style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', fontSize: '13px', background: '#16a34a', color: '#fff', border: 'none', fontFamily: "'Jost', sans-serif", borderRadius: '8px', fontWeight: 500, opacity: 0.8 }}>
                <CheckCircle size={15} /> Confirmed
              </button>
            )}
            {selected.status !== 'declined' ? (
              <button onClick={() => updateStatus(selected._id, 'declined')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', fontSize: '13px', background: '#fff', color: '#dc2626', border: '1px solid #fecaca', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '8px', fontWeight: 500 }}>
                <Ban size={15} /> Decline
              </button>
            ) : (
              <button disabled style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', fontSize: '13px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', fontFamily: "'Jost', sans-serif", borderRadius: '8px', fontWeight: 500, opacity: 0.7 }}>
                <Ban size={15} /> Declined
              </button>
            )}
            {selected.status === 'declined' && (
              <button onClick={() => deleteInquiry(selected._id)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', fontSize: '13px', background: '#111', color: '#fff', border: '1px solid #111', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '8px', fontWeight: 500, marginTop: '4px' }}>
                <Trash2 size={15} /> Remove Inquiry
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', margin: '0 0 4px' }}>Management</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: '#1a1a1a', margin: 0 }}>Inquiries</h2>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px', marginBottom: '16px' }} className="stats-grid-4">
        {[{ label: 'Total', value: inquiries.length, color: '#1a1a1a' }, { label: 'New', value: counts.new, color: '#2563eb' }, { label: 'In Progress', value: counts.in_progress, color: '#d97706' }, { label: 'Confirmed', value: counts.confirmed, color: '#16a34a' }].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '16px', borderRadius: '8px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', fontWeight: 400, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9a9590', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '16px' }}>
        {[['all','All'], ['new','New'], ['in_progress','In Progress'], ['confirmed','Confirmed']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={{ padding: '7px 14px', fontSize: '12px', background: filter === k ? '#111' : '#fff', color: filter === k ? '#fff' : '#666', border: '1px solid #e8e4de', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '20px', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {l}{counts[k] > 0 && <span style={{ marginLeft: '5px', background: filter === k ? '#c9a96e' : '#f0eeeb', color: filter === k ? '#fff' : '#888', borderRadius: '10px', padding: '0px 5px', fontSize: '10px' }}>{counts[k]}</span>}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#aaa', fontSize: '13px' }}>Loading inquiries...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>📬</div>
            <div style={{ fontSize: '14px', color: '#aaa' }}>No inquiries yet</div>
          </div>
        ) : filtered.map((inq, i) => {
          const s = STATUS_CONFIG[inq.status] || STATUS_CONFIG.new
          const fullName = `${inq.firstName || ''} ${inq.lastName || ''}`.trim()
          return (
            <div key={inq._id} onClick={() => setSelected(inq)}
              style={{ padding: '14px 16px', borderBottom: i < filtered.length - 1 ? '1px solid #f0eeeb' : 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a1a' }}>{fullName}</span>
                    <span style={{ fontSize: '10px', padding: '2px 8px', background: s.bg, color: s.color, border: `1px solid ${s.border}`, borderRadius: '10px', whiteSpace: 'nowrap' }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inq.property}</div>
                  {inq.checkIn && <div style={{ fontSize: '11px', color: '#9a9590' }}>📅 {inq.checkIn} → {inq.checkOut}</div>}
                </div>
                <div style={{ fontSize: '11px', color: '#bbb', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '2px' }}>
                  {new Date(inq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Booking Calendar Section ────────────────────────────────
function BookingCalendarSection({ properties }) {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [blockedDates, setBlockedDates] = useState({})
  const [inquiries, setInquiries] = useState([])
  const [hoveredDate, setHoveredDate] = useState(null)
  const [showPropList, setShowPropList] = useState(false)
  const [savingDate, setSavingDate] = useState(false)

  useEffect(() => { if (!selectedProperty && properties.length > 0) setSelectedProperty(properties[0]) }, [properties])

  // Load confirmed inquiries
  useEffect(() => {
    api.get('/inquiries').then(({ data }) => setInquiries(data.filter(i => i.status === 'confirmed'))).catch(() => {})
  }, [])

  // Load blocked dates from backend whenever selected property changes
  useEffect(() => {
    if (!selectedProperty?._id) return
    const propId = selectedProperty._id
    // Only fetch if we haven't loaded this property's dates yet
    if (blockedDates[propId] !== undefined) return
    api.get(`/properties/${propId}/blocked-dates`)
      .then(({ data }) => {
        setBlockedDates(prev => ({ ...prev, [propId]: data.blockedDates || [] }))
      })
      .catch(() => {
        setBlockedDates(prev => ({ ...prev, [propId]: [] }))
      })
  }, [selectedProperty])

  const propKey = selectedProperty?._id
  const propBlocked = blockedDates[propKey] || []

  const saveBlockedDates = async (newDates) => {
    if (!propKey) return
    setSavingDate(true)
    try {
      await api.put(`/properties/${propKey}/blocked-dates`, { blockedDates: newDates })
    } catch (err) {
      console.error('Failed to save blocked dates', err)
    } finally {
      setSavingDate(false)
    }
  }

  const toggleDate = async (dateStr) => {
    const cur = propBlocked
    const newDates = cur.includes(dateStr) ? cur.filter(d => d !== dateStr) : [...cur, dateStr]
    setBlockedDates(prev => ({ ...prev, [propKey]: newDates }))
    await saveBlockedDates(newDates)
  }

  const clearAllBlocked = async () => {
    setBlockedDates(prev => ({ ...prev, [propKey]: [] }))
    await saveBlockedDates([])
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date(); today.setHours(0, 0, 0, 0)

  const propertyBookedDates = (() => {
    const dates = []
    ;(selectedProperty?.bookedDates || []).forEach(b => {
      const s = new Date(b.checkIn), e = new Date(b.checkOut)
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1))
        dates.push(d.toISOString().split('T')[0])
    })
    return dates
  })()

  const confirmedInquiries = inquiries.filter(i => i.propertyId === propKey || i.property === selectedProperty?.name)
  const confirmedDates = (() => {
    const map = {}
    confirmedInquiries.forEach(inq => {
      if (!inq.checkIn || !inq.checkOut) return
      const s = new Date(inq.checkIn), e = new Date(inq.checkOut)
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        map[d.toISOString().split('T')[0]] = `${inq.firstName} ${inq.lastName || ''}`.trim()
      }
    })
    return map
  })()

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', margin: '0 0 4px' }}>Management</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: '#1a1a1a', margin: 0 }}>Booking Calendar</h2>
      </div>

      {/* Property selector (mobile-friendly dropdown) */}
      <div style={{ marginBottom: '16px' }}>
        <button onClick={() => setShowPropList(!showPropList)} style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', background: '#fff', border: '1px solid #e8e4de', borderRadius: '8px',
          cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontSize: '13px', color: '#1a1a1a'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={14} color="#c9a96e" />
            {selectedProperty?.name || 'Select property'}
          </span>
          <span style={{ fontSize: '11px', color: '#aaa' }}>{showPropList ? '▲' : '▼'}</span>
        </button>
        {showPropList && (
          <div style={{ background: '#fff', border: '1px solid #e8e4de', borderRadius: '8px', marginTop: '4px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            {properties.map(p => (
              <div key={p._id} onClick={() => { setSelectedProperty(p); setShowPropList(false) }}
                style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f0eeeb', background: selectedProperty?._id === p._id ? '#faf9f7' : '#fff', fontSize: '13px', color: '#1a1a1a' }}>
                <div style={{ fontWeight: selectedProperty?._id === p._id ? 600 : 400 }}>{p.name}</div>
                <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>{p.location}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', padding: '20px' }}>
        {/* Legend */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {[['#dcfce7','Confirmed'],['#fee2e2','Booked'],['#dbeafe','Blocked'],['transparent','Available']].map(([bg, l]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#666' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: bg, border: '1px solid #e8e4de', flexShrink: 0 }} />{l}
            </div>
          ))}
        </div>

        {/* Month nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} style={{ background: 'none', border: '1px solid #e8e4de', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>‹</button>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 500 }}>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} style={{ background: 'none', border: '1px solid #e8e4de', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>›</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: '6px' }}>
          {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: '11px', color: '#9a9590', fontWeight: 600, padding: '4px 0' }}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '3px' }}>
          {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
          {Array(daysInMonth).fill(null).map((_, i) => {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`
            const isConfirmed = !!confirmedDates[dateStr]
            const isBooked = propertyBookedDates.includes(dateStr)
            const isBlocked = propBlocked.includes(dateStr)
            const isToday = new Date(year, month, i + 1).getTime() === today.getTime()
            const isDisabled = isConfirmed || isBooked
            const bg = isConfirmed ? '#dcfce7' : isBooked ? '#fee2e2' : isBlocked ? '#dbeafe' : 'transparent'
            const color = isConfirmed ? '#16a34a' : isBooked ? '#dc2626' : isBlocked ? '#2563eb' : '#1a1a1a'
            return (
              <div key={i}
                onClick={() => !isDisabled && toggleDate(dateStr)}
                style={{ textAlign: 'center', padding: '8px 2px', fontSize: '12px', borderRadius: '6px', cursor: isDisabled ? 'default' : 'pointer', background: bg, color, fontWeight: isToday ? 700 : 400, border: isToday ? '2px solid #c9a96e' : '2px solid transparent' }}
              >{i + 1}</div>
            )
          })}
        </div>

        {propBlocked.length > 0 && (
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #f0eeeb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>{propBlocked.length} date{propBlocked.length !== 1 ? 's' : ''} blocked</span>
            <button onClick={clearAllBlocked} style={{ fontSize: '12px', color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: "'Jost', sans-serif" }}>Clear all</button>
          </div>
        )}
        <p style={{ fontSize: '11px', color: savingDate ? '#c9a96e' : '#aaa', marginTop: '12px' }}>{savingDate ? 'Saving…' : 'Tap any available date to block/unblock it.'}</p>
      </div>
    </div>
  )
}

// ─── Analytics Section ───────────────────────────────────────
function AnalyticsSection({ properties }) {
  const totalProperties = properties.length
  const active = properties.filter(p => p.active).length
  const avgPrice = totalProperties ? Math.round(properties.reduce((a, p) => a + (p.price || 0), 0) / totalProperties) : 0
  const locationCounts = properties.reduce((acc, p) => { acc[p.location] = (acc[p.location] || 0) + 1; return acc }, {})
  const typeCounts = properties.reduce((acc, p) => { acc[p.type] = (acc[p.type] || 0) + 1; return acc }, {})
  const topLocations = Object.entries(locationCounts).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const barMax = Math.max(...topLocations.map(([, c]) => c), 1)
  const estMonthly = properties.reduce((a, p) => a + (p.price || 0) * 20, 0)

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', margin: '0 0 4px' }}>Management</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: '#1a1a1a', margin: 0 }}>Analytics</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: 'Total Properties', value: totalProperties, sub: `${active} active`, color: '#c9a96e' },
          { label: 'Avg Price/Night', value: `$${avgPrice}`, sub: 'all listings', color: '#16a34a' },
          { label: 'Est. Monthly', value: `$${estMonthly.toLocaleString()}`, sub: '@ 20 nights', color: '#2563eb' },
          { label: 'Locations', value: Object.keys(locationCounts).length, sub: 'cities', color: '#d97706' },
        ].map(k => (
          <div key={k.label} style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '16px', borderRadius: '8px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: k.color, lineHeight: 1, marginBottom: '4px' }}>{k.value}</div>
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', fontWeight: 600, marginBottom: '2px' }}>{k.label}</div>
            <div style={{ fontSize: '11px', color: '#aaa' }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Properties by Location</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {topLocations.map(([loc, count]) => (
            <div key={loc}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#444', marginBottom: '5px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={12} color="#c9a96e" />{loc}</span>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{count}</span>
              </div>
              <div style={{ height: '5px', background: '#f0eeeb', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(count / barMax) * 100}%`, background: 'linear-gradient(to right, #c9a96e, #e8d5b0)', borderRadius: '3px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', padding: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a', marginBottom: '16px' }}>Properties by Type</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => {
            const pct = Math.round((count / totalProperties) * 100)
            return (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#f8f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#c9a96e' }}>{pct}%</span>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: '#1a1a1a', fontWeight: 500, textTransform: 'capitalize' }}>{type}</div>
                  <div style={{ fontSize: '11px', color: '#aaa' }}>{count} propert{count !== 1 ? 'ies' : 'y'}</div>
                </div>
              </div>
            )
          })}
        </div>
        {properties.length > 0 && (
          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f0eeeb' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9a9590', marginBottom: '8px' }}>Price Range</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: '#555' }}>Min: <strong style={{ color: '#1a1a1a' }}>${Math.min(...properties.map(p => p.price || 0))}/night</strong></span>
              <span style={{ color: '#555' }}>Max: <strong style={{ color: '#1a1a1a' }}>${Math.max(...properties.map(p => p.price || 0))}/night</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Investment Leads Section ────────────────────────────────
const STATUS_LEAD = {
  new:       { label: 'New',       color: '#c9a96e', bg: '#fdf8f0', border: '#f0d9a0' },
  contacted: { label: 'Contacted', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
  closed:    { label: 'Closed',    color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
}

function InvestLeadsSection({ showToast }) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => { fetchLeads() }, [])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/invest-leads')
      setLeads(data)
    } catch { showToast('Failed to load investment leads', 'error') }
    finally { setLoading(false) }
  }

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/invest-leads/${id}`, { status })
      setLeads(prev => prev.map(l => l._id === id ? data : l))
      if (selected?._id === id) setSelected(data)
      showToast(`Marked as ${STATUS_LEAD[status].label}`)
    } catch { showToast('Failed to update status', 'error') }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/invest-leads/${id}`)
      setLeads(prev => prev.filter(l => l._id !== id))
      if (selected?._id === id) setSelected(null)
      setDeleteConfirm(null)
      showToast('Lead removed')
    } catch { showToast('Failed to remove lead', 'error') }
  }

  // Mobile detail view
  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '13px', fontFamily: "'Jost', sans-serif", padding: '0 0 20px' }}>
          <ChevronLeft size={16} /> Back to Leads
        </button>
        <div style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', padding: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#1a1a1a' }}>{selected.firstName} {selected.lastName}</div>
            <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>{new Date(selected.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', padding: '14px', background: '#f8f7f5', borderRadius: '6px' }}>
            {[{ label: 'Email', value: selected.email }, { label: 'Phone', value: selected.phone || '—' }, { label: 'Interest', value: `Wants to ${selected.interest}` }].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', gap: '10px' }}>
                <span style={{ color: '#888', flexShrink: 0 }}>{label}</span>
                <span style={{ color: '#1a1a1a', fontWeight: 500, textAlign: 'right', wordBreak: 'break-all' }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: '8px' }}>Message</div>
            <div style={{ background: '#f8f7f5', padding: '14px', borderRadius: '6px', fontSize: '13px', color: '#555', lineHeight: 1.75, fontStyle: 'italic' }}>"{selected.message}"</div>
          </div>
          <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', marginBottom: '10px' }}>Update Status</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {Object.entries(STATUS_LEAD).map(([key, sc]) => (
              <button key={key} onClick={() => updateStatus(selected._id, key)} disabled={selected.status === key}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', background: selected.status === key ? sc.bg : '#f8f7f5', border: `1px solid ${selected.status === key ? sc.border : '#e8e4de'}`, borderRadius: '8px', cursor: selected.status === key ? 'default' : 'pointer', fontSize: '13px', fontFamily: "'Jost', sans-serif", color: selected.status === key ? sc.color : '#555', textAlign: 'left' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: sc.color, flexShrink: 0 }} />
                {sc.label}
                {selected.status === key && <span style={{ marginLeft: 'auto', fontSize: '11px' }}>● Current</span>}
              </button>
            ))}
          </div>
          <button onClick={() => setDeleteConfirm(selected._id)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: '#dc2626', fontFamily: "'Jost', sans-serif" }}>
            <Trash2 size={14} /> Remove Lead
          </button>
        </div>

        {deleteConfirm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0' }}>
            <div style={{ background: '#fff', borderRadius: '16px 16px 0 0', padding: '32px 24px', width: '100%', textAlign: 'center' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 400, margin: '0 0 10px' }}>Remove Lead?</h3>
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.7, margin: '0 0 24px' }}>This cannot be undone.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: '14px', background: '#fff', border: '1px solid #e8e4de', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontFamily: "'Jost', sans-serif" }}>Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} style={{ flex: 1, padding: '14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Remove</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', margin: '0 0 4px' }}>Management</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: '#1a1a1a', margin: 0 }}>Investment Leads</h2>
        <p style={{ fontSize: '13px', color: '#888', margin: '4px 0 0' }}>Clients who submitted the investment inquiry form.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '16px' }}>
        {[
          { label: 'Total', value: leads.length, color: '#1a1a1a' },
          { label: 'New', value: leads.filter(l => l.status === 'new').length, color: '#c9a96e' },
          { label: 'Contacted', value: leads.filter(l => l.status === 'contacted').length, color: '#2563eb' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9590', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', fontSize: '13px', color: '#aaa' }}>Loading leads...</div>
        ) : leads.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <TrendingUp size={32} color="#e8e4de" style={{ margin: '0 auto 12px', display: 'block' }} />
            <div style={{ fontSize: '14px', color: '#aaa' }}>No investment leads yet</div>
          </div>
        ) : leads.map((lead, i) => {
          const sc = STATUS_LEAD[lead.status]
          return (
            <div key={lead._id} onClick={() => setSelected(lead)}
              style={{ padding: '14px 16px', borderBottom: i < leads.length - 1 ? '1px solid #f8f7f5' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#f8f7f5', border: '1px solid #f0eeeb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#c9a96e', flexShrink: 0 }}>
                {lead.firstName.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>{lead.firstName} {lead.lastName}</span>
                  {lead.status === 'new' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c9a96e', flexShrink: 0 }} />}
                </div>
                <div style={{ fontSize: '12px', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.email}</div>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 8px', background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: '10px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{sc.label}</span>
                <span style={{ fontSize: '11px', color: '#bbb' }}>{new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Team Members Section ────────────────────────────────────
const ROLE_CONFIG = {
  owner: { label: 'Owner', color: '#c9a96e', bg: '#fdf8f0', border: '#f0d9a0' },
  staff: { label: 'Staff', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
}

function MemberRow({ m, isSelf, isLast, onEdit, onToggle, onDelete, canDelete }) {
  const rc = ROLE_CONFIG[m.role] || ROLE_CONFIG.staff
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderBottom: isLast ? 'none' : '1px solid #f8f7f5', background: isSelf ? '#fdfcfb' : '#fff' }}>
      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: rc.bg, border: `1.5px solid ${rc.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: rc.color, flexShrink: 0 }}>
        {(m.name || m.username).charAt(0).toUpperCase()}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '2px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>{m.name || '—'}</span>
          {isSelf && <span style={{ fontSize: '10px', background: '#fdf8f0', color: '#c9a96e', border: '1px solid #f0d9a0', borderRadius: '8px', padding: '1px 6px' }}>You</span>}
          <span style={{ fontSize: '10px', background: m.active ? '#f0fdf4' : '#fef2f2', color: m.active ? '#16a34a' : '#dc2626', border: `1px solid ${m.active ? '#bbf7d0' : '#fecaca'}`, borderRadius: '8px', padding: '1px 6px' }}>{m.active ? 'Active' : 'Inactive'}</span>
        </div>
        <div style={{ fontSize: '12px', color: '#888' }}>@{m.username}</div>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        <button onClick={() => onEdit(m)} style={{ padding: '7px 9px', background: '#f8f7f5', border: '1px solid #e8e4de', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#555' }}><Edit2 size={13} /></button>
        {!isSelf && <button onClick={() => onToggle(m)} style={{ padding: '7px 9px', background: m.active ? '#fef2f2' : '#f0fdf4', border: `1px solid ${m.active ? '#fecaca' : '#bbf7d0'}`, borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: m.active ? '#dc2626' : '#16a34a' }}>{m.active ? <EyeOff size={13} /> : <Eye size={13} />}</button>}
        {!isSelf && canDelete && <button onClick={() => onDelete(m._id)} style={{ padding: '7px 9px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#dc2626' }}><Trash2 size={13} /></button>}
      </div>
    </div>
  )
}

function TeamSection({ showToast, currentUserId }) {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editMember, setEditMember] = useState(null)
  const [form, setForm] = useState({ username: '', password: '', name: '', email: '' })
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [showPass, setShowPass] = useState(false)

  useEffect(() => { fetchMembers() }, [])

  const fetchMembers = async () => {
    setLoading(true)
    try { const { data } = await api.get('/team'); setMembers(data) }
    catch { showToast('Failed to load team members', 'error') }
    finally { setLoading(false) }
  }

  const openCreate = () => { setEditMember(null); setForm({ username: '', password: '', name: '', email: '' }); setShowPass(false); setShowForm(true) }
  const openEdit = (m) => { setEditMember(m); setForm({ username: m.username, password: '', name: m.name || '', email: m.email || '' }); setShowPass(false); setShowForm(true) }

  const handleSave = async () => {
    if (!form.username || (!editMember && !form.password)) { showToast('Username and password are required', 'error'); return }
    setSaving(true)
    try {
      if (editMember) {
        const payload = { name: form.name, email: form.email }
        if (form.password) payload.password = form.password
        const { data } = await api.patch(`/team/${editMember._id}`, payload)
        setMembers(prev => prev.map(m => m._id === data._id ? data : m))
        showToast('Member updated')
      } else {
        const { data } = await api.post('/team', { ...form, role: 'staff' })
        setMembers(prev => [...prev, data])
        showToast('Staff member created')
      }
      setShowForm(false)
    } catch (err) { showToast(err.response?.data?.message || 'Failed to save member', 'error') }
    finally { setSaving(false) }
  }

  const toggleActive = async (m) => {
    try {
      const { data } = await api.patch(`/team/${m._id}`, { active: !m.active })
      setMembers(prev => prev.map(x => x._id === data._id ? data : x))
      showToast(`${data.name || data.username} ${data.active ? 'activated' : 'deactivated'}`)
    } catch { showToast('Failed to update member', 'error') }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/team/${id}`)
      setMembers(prev => prev.filter(m => m._id !== id))
      setDeleteConfirm(null)
      showToast('Member removed')
    } catch (err) { showToast(err.response?.data?.message || 'Failed to remove member', 'error') }
  }

  const inp = { width: '100%', padding: '12px 14px', fontSize: '14px', fontFamily: "'Jost', sans-serif", border: '1px solid #e8e4de', borderRadius: '8px', outline: 'none', color: '#1a1a1a', background: '#fff', boxSizing: 'border-box' }
  const ownerMembers = members.filter(m => m.role === 'owner')
  const staffMembers = members.filter(m => m.role === 'staff')

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', margin: '0 0 4px' }}>Management</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: '#1a1a1a', margin: 0 }}>Team Members</h2>
        </div>
        <button onClick={openCreate} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 18px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Jost', sans-serif", borderRadius: '6px' }}>
          <Plus size={14} /> Add Staff
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '20px' }}>
        {[{ label: 'Total', value: members.length, color: '#1a1a1a' }, { label: 'Active', value: members.filter(m => m.active).length, color: '#16a34a' }, { label: 'Inactive', value: members.filter(m => !m.active).length, color: '#dc2626' }].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a9590', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? <div style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', padding: '48px', textAlign: 'center', fontSize: '13px', color: '#aaa' }}>Loading...</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: '#fdf8f0', borderBottom: '1px solid #f0eeeb', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c9a96e' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 600 }}>Owner</span>
            </div>
            {ownerMembers.map((m, i) => <MemberRow key={m._id} m={m} isSelf={m._id === currentUserId} isLast={i === ownerMembers.length - 1} onEdit={openEdit} onToggle={toggleActive} onDelete={setDeleteConfirm} canDelete={false} />)}
          </div>
          <div style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', background: '#f0fdf4', borderBottom: '1px solid #f0eeeb', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#16a34a', fontWeight: 600 }}>Staff</span>
            </div>
            {staffMembers.length === 0 ? (
              <div style={{ padding: '28px', textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '12px' }}>No staff members yet</div>
                <button onClick={openCreate} style={{ padding: '10px 18px', background: '#111', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontFamily: "'Jost', sans-serif" }}>Add First Staff Member</button>
              </div>
            ) : staffMembers.map((m, i) => <MemberRow key={m._id} m={m} isSelf={m._id === currentUserId} isLast={i === staffMembers.length - 1} onEdit={openEdit} onToggle={toggleActive} onDelete={setDeleteConfirm} canDelete={true} />)}
          </div>
        </div>
      )}

      {/* Form Modal — bottom sheet on mobile */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px 16px 0 0', padding: '28px 24px 36px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 -8px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 400, margin: 0 }}>{editMember ? 'Edit Staff Member' : 'Add Staff Member'}</h3>
              <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', marginBottom: '6px' }}>Full Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jane Doe" style={inp} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', marginBottom: '6px' }}>Email</label>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@email.com" style={inp} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', marginBottom: '6px' }}>Username *</label>
                <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} placeholder="e.g. jane_staff" disabled={!!editMember} style={{ ...inp, background: editMember ? '#f8f7f5' : '#fff', color: editMember ? '#aaa' : '#1a1a1a' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', marginBottom: '6px' }}>
                  Password {editMember ? <span style={{ textTransform: 'none', letterSpacing: 0, color: '#bbb' }}>(leave blank to keep)</span> : '*'}
                </label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder={editMember ? '········' : 'Set a strong password'} style={{ ...inp, paddingRight: '44px' }} />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '14px', background: '#fff', border: '1px solid #e8e4de', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontFamily: "'Jost', sans-serif", color: '#555' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: '14px', background: saving ? '#999' : '#111', color: '#fff', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '13px', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                {saving ? 'Saving...' : editMember ? 'Save Changes' : 'Create Staff Member'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '16px 16px 0 0', padding: '32px 24px 36px', width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 400, margin: '0 0 10px' }}>Remove Member?</h3>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.7, margin: '0 0 24px' }}>This cannot be undone. They will immediately lose dashboard access.</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: '14px', background: '#fff', border: '1px solid #e8e4de', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontFamily: "'Jost', sans-serif" }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ flex: 1, padding: '14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Dashboard ──────────────────────────────────────────
function Dashboard() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [duplicating, setDuplicating] = useState(null)
  const [activeSection, setActiveSection] = useState('properties')
  const [toast, setToast] = useState(null)
  const [notifications, setNotifications] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gtmg_notifications') || '[]') } catch { return [] }
  })
  const [showNotifs, setShowNotifs] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const notifRef = useRef(null)

  // Persist notifications to localStorage on every change
  useEffect(() => {
    localStorage.setItem('gtmg_notifications', JSON.stringify(notifications))
  }, [notifications])
  const navigate = useNavigate()
  const username = localStorage.getItem('gtmg_user') || 'Admin'
  const role = localStorage.getItem('gtmg_role') || 'staff'
  const currentUserId = localStorage.getItem('gtmg_id') || ''
  const isOwner = role === 'owner'

  const showToast = (msg, type = 'success') => setToast({ message: msg, type })

  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const legacyToken = localStorage.getItem('adminToken')
    if (legacyToken) { localStorage.removeItem('adminToken'); localStorage.removeItem('adminUsername') }
    const token = localStorage.getItem('gtmg_token')
    if (!token) { navigate('/admin'); return }
    fetchProperties()
    pollAll()
    const interval = setInterval(pollAll, 10000)
    return () => clearInterval(interval)
  }, [])

  const pollAll = async () => {
    try {
      const { data: inquiries } = await api.get('/inquiries')
      const newInquiries = inquiries.filter(i => i.status === 'new')
      const storedInquiry = localStorage.getItem('gtmg_last_seen_inquiry')
      const unseenInquiries = storedInquiry ? newInquiries.filter(i => new Date(i.createdAt) > new Date(storedInquiry)) : newInquiries

      const { data: leads } = await api.get('/invest-leads')
      const newLeads = leads.filter(l => l.status === 'new')
      const storedLead = localStorage.getItem('gtmg_last_seen_lead')
      const unseenLeads = storedLead ? newLeads.filter(l => new Date(l.createdAt) > new Date(storedLead)) : newLeads

      setNotifications(prev => {
        const existingIds = new Set(prev.map(n => n._id))
        const freshInquiries = unseenInquiries.filter(i => !existingIds.has(i._id)).map(i => ({ ...i, read: false, type: 'inquiry' }))
        const freshLeads = unseenLeads.filter(l => !existingIds.has(l._id)).map(l => ({ ...l, read: false, type: 'invest' }))
        const combined = [...freshInquiries, ...freshLeads]
        if (combined.length === 0) return prev
        // New items go to the top; existing items keep their current read state
        return [...combined, ...prev].slice(0, 20)
      })
    } catch { /* silent */ }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    const inquiryNotifs = notifications.filter(n => n.type === 'inquiry')
    const leadNotifs = notifications.filter(n => n.type === 'invest')
    if (inquiryNotifs.length > 0) {
      const latest = inquiryNotifs.reduce((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? a : b)
      localStorage.setItem('gtmg_last_seen_inquiry', latest.createdAt)
    }
    if (leadNotifs.length > 0) {
      const latest = leadNotifs.reduce((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? a : b)
      localStorage.setItem('gtmg_last_seen_lead', latest.createdAt)
    }
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const clearAllNotifs = () => {
    setNotifications([])
    localStorage.removeItem('gtmg_notifications')
    localStorage.removeItem('gtmg_last_seen_inquiry')
    localStorage.removeItem('gtmg_last_seen_lead')
  }

  const handleNotifClick = (notif) => {
    setNotifications(prev => prev.map(n => n._id === notif._id ? { ...n, read: true } : n))
    setShowNotifs(false)
    setActiveSection(notif.type === 'invest' ? 'invest-leads' : 'inquiries')
  }

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/properties/all')
      setProperties(data)
    } catch (err) {
      if (err.response?.status === 401) { localStorage.removeItem('gtmg_token'); navigate('/admin') }
      else setError('Failed to load properties.')
    } finally { setLoading(false) }
  }

  const handleLogout = () => {
    localStorage.removeItem('gtmg_token'); localStorage.removeItem('gtmg_user')
    localStorage.removeItem('gtmg_role'); localStorage.removeItem('gtmg_id')
    localStorage.removeItem('adminToken'); localStorage.removeItem('adminUsername')
    navigate('/admin')
  }

  const handleDelete = async (id) => {
    try { await api.delete(`/properties/${id}`); setProperties(prev => prev.filter(p => p._id !== id)); setDeleteId(null); showToast('Property deleted') }
    catch { setError('Failed to delete property.') }
  }

  const handleDuplicate = async (property) => {
    setDuplicating(property._id)
    try {
      const fd = new FormData()
      fd.append('name', `${property.name} (Copy)`); fd.append('type', property.type); fd.append('location', property.location); fd.append('price', property.price); fd.append('description', property.description || ''); fd.append('bedrooms', String(property.bedrooms)); fd.append('bathrooms', String(property.bathrooms)); fd.append('maxGuests', String(property.maxGuests)); fd.append('featured', 'false'); fd.append('active', String(property.active)); fd.append('imageUrls', JSON.stringify(property.images?.filter(img => img.startsWith('http')) || []))
      const { data } = await api.post('/properties', fd)
      setProperties(prev => [data, ...prev]); showToast('Property duplicated')
    } catch { setError('Failed to duplicate.') } finally { setDuplicating(null) }
  }

  const handleToggleActive = async (property) => {
    try {
      const fd = new FormData(); fd.append('active', String(!property.active)); fd.append('name', property.name); fd.append('type', property.type); fd.append('location', property.location); fd.append('price', property.price); fd.append('keepImages', JSON.stringify(property.images || []))
      const { data } = await api.put(`/properties/${property._id}`, fd)
      setProperties(prev => prev.map(p => p._id === data._id ? data : p)); showToast(`Property ${data.active ? 'activated' : 'hidden'}`)
    } catch { setError('Failed to update.') }
  }

  const handleToggleFeatured = async (property) => {
    try {
      const fd = new FormData(); fd.append('featured', String(!property.featured)); fd.append('name', property.name); fd.append('type', property.type); fd.append('location', property.location); fd.append('price', property.price); fd.append('keepImages', JSON.stringify(property.images || []))
      const { data } = await api.put(`/properties/${property._id}`, fd)
      setProperties(prev => prev.map(p => p._id === data._id ? data : p)); showToast(`${property.featured ? 'Removed from' : 'Added to'} featured`)
    } catch { setError('Failed to update.') }
  }

  const stats = { total: properties.length, active: properties.filter(p => p.active).length, featured: properties.filter(p => p.featured).length, inactive: properties.filter(p => !p.active).length }

  const navItems = [
    { key: 'properties',   label: 'Properties',       icon: <Home size={15} />,          badge: properties.length },
    { key: 'inquiries',    label: 'Inquiries',         icon: <MessageSquare size={15} />, badge: unreadCount, badgeColor: unreadCount > 0 ? '#c9a96e' : null },
    { key: 'calendar',     label: 'Booking Calendar',  icon: <Calendar size={15} /> },
    { key: 'analytics',    label: 'Analytics',         icon: <BarChart2 size={15} /> },
    { key: 'invest-leads', label: 'Investment Leads',  icon: <TrendingUp size={15} /> },
    ...(isOwner ? [{ key: 'team', label: 'Team Members', icon: <Users size={15} /> }] : []),
  ]

  const currentNavLabel = navItems.find(n => n.key === activeSection)?.label || 'Dashboard'

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7f5', fontFamily: "'Jost', sans-serif", display: 'flex' }}>
      <style>{`
        /* Desktop sidebar */
        .dash-sidebar { position: fixed; top: 0; left: 0; bottom: 0; width: 220px; background: #111; display: flex; flex-direction: column; z-index: 100; }
        .dash-main    { margin-left: 220px; flex: 1; padding: 40px; min-width: 0; }

        /* Mobile */
        @media (max-width: 900px) {
          .dash-sidebar  { display: none !important; }
          .dash-main     { margin-left: 0 !important; padding: 72px 16px 100px !important; }
          .mobile-header { display: flex !important; }
          .mobile-bottom-nav { display: flex !important; }
          .stats-grid-4  { grid-template-columns: repeat(2,1fr) !important; }
          .props-table   { display: none !important; }
          .props-cards   { display: flex !important; }
        }

        /* Mobile bottom nav */
        .mobile-bottom-nav {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
          background: #fff; border-top: 1px solid #f0eeeb;
          padding: 8px 0 calc(8px + env(safe-area-inset-bottom));
          box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      {/* Mobile Top Header */}
      <MobileHeader
        onMenuOpen={() => setMobileMenuOpen(true)}
        unreadCount={unreadCount}
        username={username}
        sectionLabel={currentNavLabel}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        username={username}
        role={role}
        unreadCount={unreadCount}
        showNotifs={showNotifs}
        setShowNotifs={setShowNotifs}
        notifications={notifications}
        markAllRead={markAllRead}
        clearAllNotifs={clearAllNotifs}
        handleNotifClick={handleNotifClick}
        handleLogout={handleLogout}
      />

      {/* Desktop Sidebar */}
      <aside className="dash-sidebar">
        <div style={{ padding: '28px 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '3px', marginBottom: '3px' }}>GT Property Management</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: '10px' }}>Group</div>
          <div style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>Owner Dashboard</div>
        </div>
        <nav style={{ padding: '20px 12px', flex: 1 }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '10px', paddingLeft: '10px' }}>Navigation</div>
          {navItems.map(item => {
            const active = activeSection === item.key
            return (
              <button key={item.key} onClick={() => setActiveSection(item.key)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: active ? 'rgba(201,169,110,0.12)' : 'none', border: 'none', borderRadius: '6px', cursor: 'pointer', color: active ? '#c9a96e' : 'rgba(255,255,255,0.5)', fontSize: '12px', fontFamily: "'Jost', sans-serif", marginBottom: '2px', transition: 'all 0.15s', textAlign: 'left', borderLeft: active ? '2px solid #c9a96e' : '2px solid transparent', letterSpacing: '0.04em' }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' } }}
              >
                {item.icon}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge > 0 && <span style={{ fontSize: '10px', background: item.badgeColor || 'rgba(201,169,110,0.3)', color: item.badgeColor ? '#fff' : '#c9a96e', borderRadius: '10px', padding: '1px 6px', flexShrink: 0 }}>{item.badge}</span>}
              </button>
            )
          })}
        </nav>
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', position: 'relative' }} ref={notifRef}>
          <button onClick={() => { setShowNotifs(!showNotifs); if (!showNotifs) markAllRead() }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', padding: '8px 14px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '4px', width: '100%', transition: 'all 0.2s', marginBottom: '10px', justifyContent: 'space-between' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a96e'; e.currentTarget.style.color = '#c9a96e' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bell size={13} />Notifications</div>
            {unreadCount > 0 && <span style={{ background: '#c9a96e', color: '#fff', borderRadius: '10px', padding: '1px 7px', fontSize: '10px', fontWeight: 700, animation: 'pulse 2s infinite' }}>{unreadCount}</span>}
          </button>
          {showNotifs && (
            <div style={{ position: 'absolute', bottom: '100%', left: '12px', right: '12px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', boxShadow: '0 -8px 32px rgba(0,0,0,0.4)', overflow: 'hidden', zIndex: 200, marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c9a96e' }}>Notifications</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {notifications.some(n => !n.read) && <button onClick={markAllRead} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: "'Jost', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}>Mark all read</button>}
                  {notifications.length > 0 && <button onClick={clearAllNotifs} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', color: 'rgba(220,38,38,0.6)', fontFamily: "'Jost', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}>Clear</button>}
                </div>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                    <Bell size={24} color="rgba(255,255,255,0.15)" style={{ margin: '0 auto 8px', display: 'block' }} />
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>No new notifications</div>
                  </div>
                ) : notifications.map((n, i) => (
                  <div key={n._id} onClick={() => handleNotifClick(n)}
                    style={{ padding: '12px 16px', borderBottom: i < notifications.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', cursor: 'pointer', background: n.read ? 'transparent' : 'rgba(201,169,110,0.08)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = n.read ? 'transparent' : 'rgba(201,169,110,0.08)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      {!n.read && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: n.type === 'invest' ? '#16a34a' : '#c9a96e', flexShrink: 0, marginTop: '4px' }} />}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '6px', background: n.type === 'invest' ? 'rgba(22,163,74,0.2)' : 'rgba(201,169,110,0.2)', color: n.type === 'invest' ? '#4ade80' : '#c9a96e', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'inline-block', marginBottom: '4px' }}>
                          {n.type === 'invest' ? 'Invest' : 'Inquiry'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#fff', fontWeight: n.read ? 400 : 600, marginBottom: '2px' }}>
                          {n.type === 'invest' ? `Lead from ${n.firstName} ${n.lastName || ''}` : `Inquiry from ${n.firstName} ${n.lastName || ''}`}
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {n.type === 'invest' ? `Wants to ${n.interest}` : n.property}
                        </div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>
                          {new Date(n.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginBottom: '4px' }}>Signed in as</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <div style={{ fontSize: '13px', color: '#fff' }}>{username}</div>
            <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 7px', background: ROLE_CONFIG[role]?.bg || '#f8f7f5', color: ROLE_CONFIG[role]?.color || '#c9a96e', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {ROLE_CONFIG[role]?.label || role}
            </span>
          </div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', padding: '8px 14px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '4px', width: '100%', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a96e'; e.currentTarget.style.color = '#c9a96e' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          ><LogOut size={13} /> Sign Out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dash-main">

        {/* ── PROPERTIES ── */}
        {activeSection === 'properties' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', margin: '0 0 4px' }}>Management</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: '#1a1a1a', margin: 0 }}>Properties</h2>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={fetchProperties} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #e8e4de', padding: '9px 14px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '6px', color: '#666' }}><RefreshCw size={13} /></button>
                <button onClick={() => navigate('/admin/properties/new')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#111', color: '#fff', border: 'none', padding: '9px 16px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '6px' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#c9a96e'}
                  onMouseLeave={e => e.currentTarget.style.background = '#111'}
                ><Plus size={14} /> Add Property</button>
              </div>
            </div>

            {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '6px', fontSize: '13px', color: '#dc2626', marginBottom: '16px' }}>{error}</div>}

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' }} className="stats-grid-4">
              {[{ l: 'Total', v: stats.total, c: '#c9a96e' }, { l: 'Active', v: stats.active, c: '#16a34a' }, { l: 'Featured', v: stats.featured, c: '#d97706' }, { l: 'Inactive', v: stats.inactive, c: '#dc2626' }].map(s => (
                <div key={s.l} style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 400, color: s.c, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9a9590', marginTop: '4px' }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="props-table" style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '68px 1fr 100px 120px 110px 60px 80px 110px', padding: '12px 20px', background: '#f8f7f5', borderBottom: '1px solid #f0eeeb' }}>
                {['Image','Property','Type','Location','Price/Night','Active','Featured','Actions'].map(h => (
                  <div key={h} style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9a9590', fontWeight: 500 }}>{h}</div>
                ))}
              </div>
              {loading ? (
                <div style={{ padding: '60px', textAlign: 'center', color: '#aaa', fontSize: '13px' }}>Loading properties...</div>
              ) : properties.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center' }}><div style={{ fontSize: '36px', marginBottom: '12px' }}>🏠</div><div style={{ fontSize: '13px', color: '#aaa' }}>No properties yet.</div></div>
              ) : properties.map((p, i) => (
                <div key={p._id}
                  style={{ display: 'grid', gridTemplateColumns: '68px 1fr 100px 120px 110px 60px 80px 110px', padding: '14px 20px', borderBottom: i < properties.length - 1 ? '1px solid #f0eeeb' : 'none', alignItems: 'center', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fdfcfb'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <div style={{ width: '56px', height: '44px', background: '#f0eeeb', borderRadius: '4px', overflow: 'hidden' }}>
                    {p.images?.[0] ? <img src={p.images[0].startsWith('/') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${p.images[0]}` : p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏠</div>}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontFamily: "'Cormorant Garamond', serif", color: '#1a1a1a', fontWeight: 500 }}>{p.name}</div>
                    <div style={{ fontSize: '11px', color: '#9a9590', marginTop: '2px' }}>{p.bedrooms}bd · {p.bathrooms}ba · {p.maxGuests} guests</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#5a5550', textTransform: 'capitalize' }}>{p.type}</div>
                  <div style={{ fontSize: '12px', color: '#5a5550' }}>{p.location}</div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a' }}>${p.price}<span style={{ fontSize: '11px', color: '#9a9590', fontWeight: 400 }}>/night</span></div>
                  <button onClick={() => handleToggleActive(p)} style={{ background: p.active ? '#dcfce7' : '#fee2e2', border: 'none', borderRadius: '20px', padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: p.active ? '#16a34a' : '#dc2626' }}>
                    {p.active ? <Eye size={11} /> : <EyeOff size={11} />}{p.active ? 'On' : 'Off'}
                  </button>
                  <button onClick={() => handleToggleFeatured(p)} style={{ background: p.featured ? '#fef9ee' : '#f8f7f5', border: `1px solid ${p.featured ? '#c9a96e' : '#e8e4de'}`, borderRadius: '20px', padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: p.featured ? '#c9a96e' : '#9a9590' }}>
                    <Star size={11} fill={p.featured ? '#c9a96e' : 'none'} />{p.featured ? 'Yes' : 'No'}
                  </button>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => navigate(`/admin/properties/edit/${p._id}`)} style={{ background: '#f8f7f5', border: '1px solid #e8e4de', borderRadius: '4px', padding: '7px 9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#111'} onMouseLeave={e => e.currentTarget.style.background = '#f8f7f5'}
                    ><Edit2 size={12} color="#5a5550" /></button>
                    <button onClick={() => handleDuplicate(p)} disabled={duplicating === p._id} style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '4px', padding: '7px 9px', cursor: duplicating === p._id ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', opacity: duplicating === p._id ? 0.6 : 1 }}
                      onMouseEnter={e => { if (duplicating !== p._id) e.currentTarget.style.background = '#0ea5e9' }} onMouseLeave={e => e.currentTarget.style.background = '#f0f9ff'}
                    ><Copy size={12} color="#0ea5e9" /></button>
                    <button onClick={() => setDeleteId(p._id)} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', padding: '7px 9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#dc2626'} onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
                    ><Trash2 size={12} color="#dc2626" /></button>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="props-cards" style={{ display: 'none', flexDirection: 'column', gap: '12px' }}>
              {loading ? (
                <div style={{ padding: '48px', textAlign: 'center', color: '#aaa', fontSize: '13px', background: '#fff', borderRadius: '8px' }}>Loading...</div>
              ) : properties.length === 0 ? (
                <div style={{ padding: '48px', textAlign: 'center', background: '#fff', borderRadius: '8px' }}><div style={{ fontSize: '32px', marginBottom: '8px' }}>🏠</div><div style={{ fontSize: '13px', color: '#aaa' }}>No properties yet.</div></div>
              ) : properties.map(p => (
                <div key={p._id} style={{ background: '#fff', border: '1px solid #f0eeeb', borderRadius: '8px', overflow: 'hidden' }}>
                  {p.images?.[0] && (
                    <div style={{ height: '160px', overflow: 'hidden' }}>
                      <img src={p.images[0].startsWith('/') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${p.images[0]}` : p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 500, color: '#1a1a1a', flex: 1, marginRight: '8px' }}>{p.name}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', color: '#c9a96e', fontWeight: 400, flexShrink: 0 }}>${p.price}<span style={{ fontSize: '11px', color: '#aaa' }}>/n</span></div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>{p.location} · {p.bedrooms}bd · {p.bathrooms}ba · {p.maxGuests} guests</div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <button onClick={() => handleToggleActive(p)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '8px', background: p.active ? '#dcfce7' : '#fee2e2', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', color: p.active ? '#16a34a' : '#dc2626', fontFamily: "'Jost', sans-serif" }}>
                        {p.active ? <Eye size={13} /> : <EyeOff size={13} />}{p.active ? 'Active' : 'Hidden'}
                      </button>
                      <button onClick={() => handleToggleFeatured(p)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '8px', background: p.featured ? '#fef9ee' : '#f8f7f5', border: `1px solid ${p.featured ? '#c9a96e' : '#e8e4de'}`, borderRadius: '6px', cursor: 'pointer', fontSize: '12px', color: p.featured ? '#c9a96e' : '#9a9590', fontFamily: "'Jost', sans-serif" }}>
                        <Star size={13} fill={p.featured ? '#c9a96e' : 'none'} />{p.featured ? 'Featured' : 'Not Featured'}
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => navigate(`/admin/properties/edit/${p._id}`)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: '#111', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontFamily: "'Jost', sans-serif" }}>
                        <Edit2 size={13} /> Edit
                      </button>
                      <button onClick={() => handleDuplicate(p)} disabled={duplicating === p._id} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: '#f0f9ff', color: '#0ea5e9', border: '1px solid #bae6fd', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontFamily: "'Jost', sans-serif" }}>
                        <Copy size={13} /> Copy
                      </button>
                      <button onClick={() => setDeleteId(p._id)} style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#dc2626' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'inquiries'    && <InquiriesSection showToast={showToast} properties={properties} />}
        {activeSection === 'calendar'     && <BookingCalendarSection properties={properties} />}
        {activeSection === 'analytics'    && <AnalyticsSection properties={properties} />}
        {activeSection === 'invest-leads' && <InvestLeadsSection showToast={showToast} />}
        {activeSection === 'team'         && isOwner && <TeamSection showToast={showToast} currentUserId={currentUserId} />}
      </main>

      {/* Mobile Bottom Nav — 5 most used items */}
      <nav className="mobile-bottom-nav">
        {navItems.slice(0, 5).map(item => {
          const active = activeSection === item.key
          return (
            <button key={item.key} onClick={() => setActiveSection(item.key)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0', position: 'relative', color: active ? '#c9a96e' : '#aaa', fontFamily: "'Jost', sans-serif" }}>
              {item.badge > 0 && (
                <span style={{ position: 'absolute', top: '2px', right: '50%', transform: 'translateX(8px)', background: item.badgeColor || '#c9a96e', color: '#fff', borderRadius: '50%', width: '14px', height: '14px', fontSize: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
              <span style={{ color: active ? '#c9a96e' : '#aaa' }}>{item.icon}</span>
              <span style={{ fontSize: '9px', letterSpacing: '0.06em', textTransform: 'uppercase', color: active ? '#c9a96e' : '#aaa', fontWeight: active ? 600 : 400 }}>{item.label.split(' ')[0]}</span>
            </button>
          )
        })}
      </nav>

      {/* Delete Modal */}
      {deleteId && (() => {
        const prop = properties.find(p => p._id === deleteId)
        return (
          <>
            <div onClick={() => setDeleteId(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9998, backdropFilter: 'blur(4px)' }} />
            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999, background: '#fff', borderRadius: '16px 16px 0 0', padding: '36px 24px 40px', boxShadow: '0 -8px 40px rgba(0,0,0,0.2)', textAlign: 'center', fontFamily: "'Jost', sans-serif", animation: 'slideUp 0.2s ease' }} className="delete-modal-desktop">
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Trash2 size={22} color="#dc2626" />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 400, color: '#1a1a1a', marginBottom: '8px' }}>Delete Property?</h3>
              {prop && <div style={{ background: '#f8f7f5', border: '1px solid #f0eeeb', borderRadius: '6px', padding: '10px 16px', marginBottom: '12px', fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>"{prop.name}"</div>}
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.8, marginBottom: '24px' }}>This action <strong>cannot be undone</strong>.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setDeleteId(null)} style={{ flex: 1, background: '#fff', border: '1px solid #e8e4de', padding: '14px', fontSize: '13px', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '8px' }}>Cancel</button>
                <button onClick={() => handleDelete(deleteId)} style={{ flex: 1, background: '#dc2626', border: 'none', color: '#fff', padding: '14px', fontSize: '13px', cursor: 'pointer', fontFamily: "'Jost', sans-serif", borderRadius: '8px', fontWeight: 600 }}>Yes, Delete</button>
              </div>
            </div>
          </>
        )
      })()}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}

export default Dashboard