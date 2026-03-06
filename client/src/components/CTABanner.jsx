function CTABanner() {
  return (
    <>
      <style>{`
        .cta-wrap { padding: 80px 48px; display: flex; align-items: center; justify-content: space-between; gap: 40px; }
        .cta-btns { display: flex; gap: 16px; flex-shrink: 0; }
        @media (max-width: 768px) {
          .cta-wrap { flex-direction: column !important; padding: 56px 20px !important; text-align: center; align-items: center !important; }
          .cta-btns { flex-direction: column !important; width: 100% !important; }
          .cta-btns a { text-align: center !important; }
        }
      `}</style>
      <div className="cta-wrap" id="invest" style={{ background: '#fff', borderTop: '1px solid #f0eeeb', borderBottom: '1px solid #f0eeeb', fontFamily: "'Jost', sans-serif" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 400, color: '#1a1a1a', maxWidth: '560px', lineHeight: 1.15, margin: 0 }}>
          Ready to Experience <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>True Luxury</em> Living?
        </h2>
        <div className="cta-btns">
          <a href="#booking" style={{ background: '#111', color: '#fff', border: '1px solid #111', padding: '16px 36px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.target.style.background = '#c9a96e'; e.target.style.borderColor = '#c9a96e' }}
            onMouseLeave={e => { e.target.style.background = '#111'; e.target.style.borderColor = '#111' }}
          >Book a Property</a>
          <a href="#contact" style={{ background: 'transparent', color: '#111', border: '1px solid #111', padding: '16px 36px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.target.style.background = '#111'; e.target.style.color = '#fff' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#111' }}
          >Talk to Us</a>
        </div>
      </div>
    </>
  )
}

export default CTABanner