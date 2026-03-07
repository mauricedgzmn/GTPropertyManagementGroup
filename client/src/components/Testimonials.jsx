const testimonials = [
  {
    text: 'My Fort Myers property was sitting at $1,600/month in long-term rent. GT took it over and we hit $4,800 in the first full month. I haven\'t received a single call from a tenant since.',
    author: 'M. Rodriguez',
    location: 'Fort Myers, FL',
    role: 'Condo Owner',
  },
  {
    text: 'I was skeptical about the international market — I had no idea how to manage a property in Colombia from the US. GT made it seamless. The property has been booked solid since month two.',
    author: 'D. Herrera',
    location: 'Medellín, Colombia',
    role: 'Villa Owner',
  },
  {
    text: 'The reporting alone is worth it. I know exactly what every property earned, every expense, every booking. It\'s the most professional operation I\'ve dealt with in real estate.',
    author: 'T. Williams',
    location: 'Orlando, FL',
    role: 'Multi-Property Owner',
  },
]

function Testimonials() {
  return (
    <>
      <style>{`
        .test-section { padding: 100px 48px; }
        .test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
        @media (max-width: 900px) {
          .test-section { padding: 64px 20px !important; }
          .test-grid { grid-template-columns: 1fr !important; }
          .test-card { border-right: 1px solid #f0eeeb !important; border-bottom: none !important; }
          .test-card:not(:last-child) { border-bottom: 1px solid #f0eeeb !important; }
        }
      `}</style>
      <section className="test-section" style={{ background: '#f8f7f5', fontFamily: "'Jost', sans-serif" }}>
        <div style={{ textAlign: 'left', maxWidth: '1100px', margin: '0 auto 48px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ width: '32px', height: '1px', background: '#c9a96e', display: 'inline-block' }} />
            Owner Results
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 300, lineHeight: 1.1, color: '#1a1a1a', margin: '12px 0 0' }}>
            What Our <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Owners Say</em>
          </h2>
        </div>

        <div className="test-grid" style={{ maxWidth: '1100px', margin: '0 auto', border: '1px solid #f0eeeb' }}>
          {testimonials.map((t, i) => (
            <div className="test-card" key={i} style={{
              background: '#fff',
              padding: '40px 36px',
              borderRight: i < testimonials.length - 1 ? '1px solid #f0eeeb' : 'none',
              display: 'flex', flexDirection: 'column', gap: '0',
            }}>
              {/* Stars */}
              <div style={{ color: '#c9a96e', fontSize: '13px', letterSpacing: '3px', marginBottom: '24px' }}>★★★★★</div>

              {/* Quote */}
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '18px', fontWeight: 400, fontStyle: 'italic',
                color: '#1a1a1a', lineHeight: 1.75, marginBottom: '32px', flex: 1,
              }}>
                "{t.text}"
              </p>

              {/* Divider */}
              <div style={{ width: '32px', height: '1px', background: '#c9a96e', marginBottom: '16px' }} />

              {/* Author */}
              <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a1a1a', fontWeight: 500, marginBottom: '4px' }}>
                {t.author}
              </div>
              <div style={{ fontSize: '11px', color: '#9a9590', letterSpacing: '0.06em' }}>
                {t.location} · {t.role}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Testimonials