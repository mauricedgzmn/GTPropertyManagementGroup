function Marquee() {
  const items = ['Luxury Houses', 'Haciendas', 'Mansion', 'Bespoke Experiences', 'Cozy Apartments']

  return (
    <div style={{ background: '#111', padding: '14px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div style={{ display: 'inline-flex', animation: 'marquee 30s linear infinite' }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', padding: '0 40px', fontFamily: "'Jost', sans-serif" }}>
            {item} <span style={{ color: '#c9a96e' }}>◆</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  )
}

export default Marquee