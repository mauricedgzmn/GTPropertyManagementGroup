const testimonials = [
  { text: 'GT Management Group redefined what luxury travel means for our family. The villa was beyond anything we could have imagined.', author: 'Alexandra V., Monaco' },
  { text: 'Every detail was perfect. The concierge service alone made it worth every penny — truly white-glove from start to finish.', author: 'James H., London' },
  { text: 'We booked through them three times now. Each experience surpasses the last. This is the only way to travel in style.', author: 'Sophia M., New York' },
]

function Testimonials() {
  return (
    <>
      <style>{`
        .test-section { padding: 100px 48px; }
        .test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) {
          .test-section { padding: 64px 20px !important; }
          .test-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .test-card { padding: 32px 24px !important; }
        }
      `}</style>
      <section className="test-section" style={{ background: '#f8f7f5', fontFamily: "'Jost', sans-serif" }}>
        <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto 56px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px', display: 'block' }}>Client Stories</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 400, lineHeight: 1.1, color: '#1a1a1a', margin: 0 }}>
            Words From Our<br />Distinguished Guests
          </h2>
        </div>
        <div className="test-grid">
          {testimonials.map((t, i) => (
            <div className="test-card" key={i} style={{ background: '#fff', padding: '40px 36px', border: '1px solid #f0eeeb' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '64px', lineHeight: 0.5, color: '#e8d5b0', marginBottom: '24px', display: 'block' }}>"</span>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '19px', fontWeight: 400, fontStyle: 'italic', color: '#1a1a1a', lineHeight: 1.65, marginBottom: '28px' }}>{t.text}</p>
              <div style={{ color: '#c9a96e', fontSize: '12px', letterSpacing: '2px', marginBottom: '6px' }}>★★★★★</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9a9590' }}>— {t.author}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Testimonials