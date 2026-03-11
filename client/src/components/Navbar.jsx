import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Properties', href: '/properties' },
{ label: 'Work With Us', href: '/work-with-us' },
  { label: 'Why STR', href: '/why-str' },
]

const LogoText = ({ size = 'md' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.2 }}>
    <span style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: size === 'sm' ? '13px' : '15px',
      fontWeight: 700,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: '#1a1a1a',
      borderBottom: '1.5px solid #1a1a1a',
      paddingBottom: '3px',
      whiteSpace: 'nowrap'
    }}>GT Property Management</span>
    <span style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: size === 'sm' ? '11px' : '13px',
      fontWeight: 400,
      letterSpacing: '0.32em',
      textTransform: 'uppercase',
      color: '#1a1a1a',
      marginTop: '5px'
    }}>Group</span>
  </div>
)

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    const onResize = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize) }
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const mobileMenu = (
    <>
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.3)',
          zIndex: 99998,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.3s',
        }}
      />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '280px',
        background: '#fff',
        zIndex: 99999,
        display: 'flex', flexDirection: 'column',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Jost', sans-serif",
        overflowY: 'auto',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
      }}>
        <div style={{
          padding: '0 20px', height: '64px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid #f0eeeb',
        }}>
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none' }}>
            <LogoText size="sm" />
          </Link>
          <button onClick={() => setMenuOpen(false)} style={{
            background: 'none', border: '1px solid #e8e4de', cursor: 'pointer',
            width: '40px', height: '40px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <X size={18} color="#1a1a1a" />
          </button>
        </div>
        <div style={{ flex: 1, padding: '8px 20px', display: 'flex', flexDirection: 'column' }}>
          {navItems.map((item) => {
            const isActive = item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href)
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: '20px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  color: isActive ? '#c9a96e' : '#1a1a1a',
                  textDecoration: 'none',
                  padding: '14px 0',
                  borderBottom: '1px solid #f0eeeb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'color 0.2s',
                }}
              >
                {item.label}
                <span style={{ fontSize: '16px', color: '#c9a96e', opacity: isActive ? 1 : 0.25 }}>→</span>
              </Link>
            )
          })}
        </div>
        <div style={{ padding: '16px 20px', borderTop: '1px solid #f0eeeb', flexShrink: 0, background: '#faf9f7' }}>
          <Link
            to="/#booking"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block', background: '#111', color: '#fff',
              textAlign: 'center', padding: '13px',
              fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', marginBottom: '14px',
              fontFamily: "'Jost', sans-serif",
            }}
          >Book Now</Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>

            <span style={{ fontSize: '11px', color: '#888' }}>✉ info@gtpropertymanagement.com</span>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div style={{
        background: '#111', color: 'rgba(255,255,255,0.7)',
        fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
        padding: isMobile ? '8px 20px' : '8px 48px',
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '4px' : '0'
      }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', fontSize: isMobile ? '10px' : '11px', textAlign: 'center', gap: isMobile ? '4px' : '24px' }}>
          <span>✉ &nbsp;info@gtpropertymanagement.com</span>
        </div>
        {!isMobile && <div style={{ color: '#e8d5b0' }}>Comfortable Stays. Hassle-Free Booking</div>}
      </div>

      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #f0eeeb',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.06)' : 'none',
        transition: 'box-shadow 0.3s',
        fontFamily: "'Jost', sans-serif",
      }}>
        <div style={{
          padding: isMobile ? '0 20px' : '0 48px',
          height: '80px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <LogoText size={isMobile ? 'sm' : 'md'} />
          </Link>

          {!isMobile && (
            <ul style={{ display: 'flex', gap: '40px', listStyle: 'none', margin: 0, padding: 0 }}>
              {navItems.map((item) => {
                const isActive = item.href === '/' ? location.pathname === '/' : location.pathname.startsWith(item.href)
                return (
                  <li key={item.label}>
                    <Link to={item.href} style={{
                      fontSize: '11px', fontWeight: 400, letterSpacing: '0.18em',
                      textTransform: 'uppercase', textDecoration: 'none',
                      color: isActive ? '#c9a96e' : '#5a5550',
                      borderBottom: isActive ? '1px solid #c9a96e' : '1px solid transparent',
                      paddingBottom: '2px', transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => { e.target.style.color = '#111' }}
                      onMouseLeave={e => { e.target.style.color = isActive ? '#c9a96e' : '#5a5550' }}
                    >{item.label}</Link>
                  </li>
                )
              })}
            </ul>
          )}

          {!isMobile && (
            <Link to="/#booking" style={{
              background: '#111', color: '#fff',
              padding: '12px 28px', fontSize: '11px',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'background 0.2s',
              flexShrink: 0,
            }}
              onMouseEnter={e => e.target.style.background = '#c9a96e'}
              onMouseLeave={e => e.target.style.background = '#111'}
            >Book Now</Link>
          )}

          {isMobile && (
            <button
              onClick={() => setMenuOpen(true)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#1a1a1a', flexShrink: 0,
              }}
            >
              <Menu size={26} />
            </button>
          )}
        </div>
      </nav>

      {isMobile && createPortal(mobileMenu, document.body)}
    </>
  )
}

export default Navbar
