const reasons = [
  { num: '01', title: 'Handpicked Exclusivity', text: 'Every listing is personally vetted to meet our uncompromising standards of quality, location, and luxury.' },
  { num: '02', title: 'White-Glove Concierge', text: 'From arrival to departure, our dedicated concierge team is available 24/7 to fulfill your every need.' },
  { num: '03', title: 'Seamless Booking', text: 'Our platform makes securing your dream vacation as effortless as the experience itself.' },
]

function WhyUs() {
  return (
    <>
      <style>{`
        .whyus-section { padding: 100px 48px; }
        .whyus-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .whyus-badge { position: absolute; bottom: -24px; right: -24px; }
        @media (max-width: 900px) {
          .whyus-section { padding: 64px 20px !important; }
          .whyus-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .whyus-img { height: 300px !important; }
          .whyus-badge { bottom: 16px !important; right: 16px !important; padding: 20px 24px !important; }
          .whyus-badge span:first-child { font-size: 36px !important; }
        }
      `}</style>
      <section className="whyus-section" id="about-us" style={{ background: '#111', fontFamily: "'Jost', sans-serif" }}>
        <div className="whyus-grid">
          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" alt="Luxury Property"
              className="whyus-img"
              style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block', filter: 'brightness(0.8) saturate(0.7)' }} />
            <div className="whyus-badge" style={{ position: 'absolute', bottom: '-24px', right: '-24px', background: '#c9a96e', color: '#fff', padding: '28px 32px', textAlign: 'center' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 400, display: 'block', lineHeight: 1 }}>10+</span>
              <span style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px', display: 'block' }}>Years of Excellence</span>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px', display: 'block' }}>Why Choose Us</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 400, lineHeight: 1.1, color: '#fff', marginBottom: '20px' }}>
              The Standard of<br />True Luxury
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.9, marginBottom: '48px' }}>
              We don't just offer properties — we curate experiences that define your standard of living.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {reasons.map((r) => (
                <li key={r.num} style={{ display: 'flex', gap: '20px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 300, color: '#c9a96e', lineHeight: 1, minWidth: '40px' }}>{r.num}</span>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#fff', marginBottom: '8px' }}>{r.title}</div>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, margin: 0 }}>{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default WhyUs