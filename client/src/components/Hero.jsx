import BookingWidget from './BookingWidget'

function Hero() {
  return (
    <section id="home" style={{
      position: 'relative', minHeight: '92vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'visible', background: '#f8f7f5',
      fontFamily: "'Jost', sans-serif"
    }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-content { padding: 0 20px !important; margin-bottom: 32px; }
          .hero-p { display: none; }
        }
      `}</style>

      <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=80') center/cover no-repeat", filter: 'brightness(0.35) saturate(0.6)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.22))' }} />

      <div className="hero-content" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '860px', width: '100%' }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '24px', display: 'block' }}>
          Luxury Properties · Worldwide
        </span>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(38px, 7vw, 88px)', fontWeight: 400, lineHeight: 1.05, color: '#fff', marginBottom: '28px' }}>
          Live Beyond <em style={{ fontStyle: 'italic', color: '#e8d5b0' }}>Ordinary</em> Spaces
        </h1>
        <p className="hero-p" style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', maxWidth: '520px', margin: '0 auto 52px', letterSpacing: '0.04em' }}>
          Curated luxury properties and bespoke experiences — crafted for those who expect nothing less than extraordinary.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: '0 16px', boxSizing: 'border-box' }}>
        <BookingWidget />
      </div>
    </section>
  )
}

export default Hero