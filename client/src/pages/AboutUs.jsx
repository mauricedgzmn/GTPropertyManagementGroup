import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle, Building2, CalendarCheck, Headphones, TrendingUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const features = [
  { Icon: Building2, title: 'Professional Property Management', sub: 'Residential & Rental Solutions' },
  { Icon: CalendarCheck, title: 'Streamlined Booking System', sub: 'Fast & Hassle-Free Process' },
  { Icon: Headphones, title: 'Dedicated Support Team', sub: 'Responsive & Reliable Service' },
  { Icon: TrendingUp, title: 'Owner-Focused Strategy', sub: 'Maximizing Property Value' },
]

const values = [
  { num: '01', title: 'Quality & Reliability', text: 'Every property under GT Property Management Group is carefully maintained and regularly inspected to ensure cleanliness, safety, and comfort for all tenants and guests.' },
  { num: '02', title: 'Customer-Centered Service', text: 'We focus on providing a smooth and hassle-free rental experience. From inquiry to booking and check-out, we prioritize clear communication and responsive support.' },
  { num: '03', title: 'Integrity & Transparency', text: 'We believe in honest pricing, clear policies, and straightforward processes. Our clients and property owners trust us because we operate with fairness and professionalism.' },
  { num: '04', title: 'Professional Property Management', text: 'We combine industry knowledge with hands-on management to maximize property value while ensuring a positive rental experience for every guest.' },
]

const contactItems = [
  { Icon: Mail, label: 'Email', value: 'info@gtpropertymanagement.com', href: 'mailto:info@gtpropertymanagement.com' },
  { Icon: Phone, label: 'Phone', value: '+1 (239) 322 4140', href: 'tel:+12393224140' },
  { Icon: MapPin, label: 'Location', value: 'Miami, Florida, USA', href: null },
]

const inputStyle = {
  width: '100%', fontSize: '13px', fontWeight: 300, color: '#1a1a1a',
  background: '#fff', border: '1.5px solid #e8e4de', borderRadius: '0',
  padding: '12px 16px', outline: 'none', fontFamily: "'Jost', sans-serif",
  boxSizing: 'border-box', transition: 'border 0.2s',
}

function AboutUs() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = () => { if (!form.firstName || !form.email || !form.message) return; setSent(true) }

  return (
    <main style={{ fontFamily: "'Jost', sans-serif" }}>
      <style>{`
        .au-section { padding: 100px 48px; }
        .au-features-bar { padding: 40px 48px; }
        .au-features-grid { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 1100px; margin: 0 auto; }
        .au-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .au-values-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
        .au-contact-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 64px; align-items: start; }
        .au-form-names { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .au-cta-wrap { background: #fff; padding: 80px 48px; display: flex; align-items: center; justify-content: space-between; gap: 40px; border-top: 1px solid #f0eeeb; border-bottom: 1px solid #f0eeeb; }
        .au-cta-btns { display: flex; gap: 16px; flex-shrink: 0; }
        .au-story-img { width: 100%; height: 560px; object-fit: cover; display: block; filter: brightness(0.9) saturate(0.8); }
        .au-quote-card { position: absolute; bottom: -24px; left: -24px; background: #fff; border: 1px solid #f0eeeb; padding: 20px 32px; box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
        @media (max-width: 900px) {
          .au-section { padding: 64px 20px !important; }
          .au-features-bar { padding: 32px 20px !important; }
          .au-features-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px; }
          .au-feature-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 24px !important; }
          .au-story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .au-story-img { height: 300px !important; }
          .au-quote-card { display: none !important; }
          .au-values-grid { grid-template-columns: 1fr !important; }
          .au-value-item { border-right: none !important; padding: 28px 20px !important; }
          .au-contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .au-cta-wrap { flex-direction: column !important; padding: 56px 20px !important; text-align: center !important; }
          .au-cta-btns { flex-direction: column !important; width: 100% !important; }
          .au-cta-btns a { text-align: center !important; }
        }
        @media (max-width: 480px) {
          .au-features-grid { grid-template-columns: 1fr !important; }
          .au-form-names { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80') center/cover no-repeat", filter: 'brightness(0.3) saturate(0.6)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.55))' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px' }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px', display: 'block' }}>Our Story</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 7vw, 88px)', fontWeight: 400, lineHeight: 1.05, color: '#fff', marginBottom: '24px' }}>
            Crafted With <em style={{ fontStyle: 'italic', color: '#e8d5b0' }}>Passion,</em><br />Delivered With Purpose
          </h1>
          <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(255,255,255,0.6)', maxWidth: '480px', margin: '0 auto', letterSpacing: '0.04em' }}>
            GT Property Management Group was born from a simple belief — that luxury travel should feel personal, seamless, and utterly unforgettable.
          </p>
        </div>
      </section>

      {/* Feature Bar */}
      <div className="au-features-bar" style={{ background: '#111' }}>
        <div className="au-features-grid">
          {features.map((item, i) => (
            <div key={item.title} className="au-feature-item" style={{ textAlign: 'center', padding: '0 20px', borderRight: i < features.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                <item.Icon size={22} color="#c9a96e" />
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontWeight: 400, color: '#fff', marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <section className="au-section" style={{ background: '#fff' }}>
        <div className="au-story-grid">
          <div>
            <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px', display: 'block' }}>Who We Are</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, lineHeight: 1.1, color: '#1a1a1a', marginBottom: '28px' }}>
              More Than a Property<br />Management Company
            </h2>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.9, marginBottom: '20px' }}>GT Property Management Group is dedicated to providing high-quality rental properties and seamless booking experiences for our clients. We specialize in offering comfortable, well-maintained spaces designed to meet the needs of individuals, families, and travelers.</p>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.9, marginBottom: '20px' }}>With a strong commitment to professionalism and reliability, we ensure that every property we manage meets high standards of cleanliness, safety, and convenience.</p>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.9 }}>At GT Property Management Group, we focus on delivering dependable rental solutions and creating a smooth experience that makes every stay comfortable and worry-free.</p>
          </div>
          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" alt="Luxury Property" className="au-story-img" />
            <div className="au-quote-card">
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontStyle: 'italic', color: '#1a1a1a', maxWidth: '200px', lineHeight: 1.6 }}>"Luxury is not about the price. It's about the feeling."</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="au-section" style={{ background: '#111' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px', display: 'block' }}>What Drives Us</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 400, lineHeight: 1.1, color: '#fff', margin: 0 }}>Our Core Values</h2>
          </div>
          <div className="au-values-grid">
            {values.map((v, i) => (
              <div key={v.num} className="au-value-item" style={{ padding: '48px', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none', display: 'flex', gap: '24px' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: '#c9a96e', lineHeight: 1, minWidth: '48px' }}>{v.num}</span>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 400, color: '#fff', marginBottom: '12px' }}>{v.title}</div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, margin: 0 }}>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work With Us */}
      <section id="work-with-us" className="au-section" style={{ background: '#f8f7f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px', display: 'block' }}>Let's Connect</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 400, lineHeight: 1.1, color: '#1a1a1a', margin: 0 }}>Work With Us</h2>
          </div>
          <div className="au-contact-grid">
            {/* Form */}
            <div style={{ background: '#fff', border: '1px solid #f0eeeb', padding: '40px', boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.9, marginBottom: '32px' }}>We are always available — from trip planning to concierge service, we are here to make your experience extraordinary.</p>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CheckCircle size={40} color="#c9a96e" style={{ margin: '0 auto 16px', display: 'block' }} />
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', color: '#1a1a1a', marginBottom: '10px' }}>Message Received</div>
                  <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.8 }}>Thank you for reaching out. A member of our team will be in touch shortly.</p>
                </div>
              ) : (
                <>
                  <div className="au-form-names">
                    <div>
                      <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>First Name</label>
                      <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" style={inputStyle} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Last Name</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" style={inputStyle} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Your Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                  </div>
                  <div style={{ marginBottom: '28px' }}>
                    <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Your Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={5} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                  </div>
                  <button onClick={handleSubmit} style={{ width: '100%', background: '#111', color: '#fff', border: '1px solid #111', padding: '16px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.borderColor = '#c9a96e' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#111' }}
                  >Send Message</button>
                </>
              )}
            </div>
            {/* Contact Info */}
            <div style={{ paddingTop: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1a1a1a', marginBottom: '32px' }}>Get in Touch</div>
              {contactItems.map(({ Icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #f0eeeb' }}>
                  <div style={{ width: '44px', height: '44px', flexShrink: 0, background: '#fff', border: '1px solid #f0eeeb', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <Icon size={18} color="#c9a96e" />
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9590', marginBottom: '6px' }}>{label}</div>
                    {href ? <a href={href} style={{ fontSize: '14px', color: '#1a1a1a', textDecoration: 'none', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }} onMouseEnter={e => e.target.style.color = '#c9a96e'} onMouseLeave={e => e.target.style.color = '#1a1a1a'}>{value}</a>
                      : <span style={{ fontSize: '14px', color: '#1a1a1a', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>{value}</span>}
                  </div>
                </div>
              ))}
              <div style={{ padding: '28px', background: '#111', borderLeft: '3px solid #c9a96e' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '17px', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>"Every great partnership begins with a simple conversation."</p>
                <div style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c9a96e', marginTop: '12px' }}>— GT Management Group</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="au-cta-wrap">
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(24px, 3.5vw, 46px)', fontWeight: 400, color: '#1a1a1a', maxWidth: '560px', lineHeight: 1.15, margin: 0 }}>
          Ready to Experience <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>True Luxury</em> Living?
        </h2>
        <div className="au-cta-btns">
          <a href="/#booking" style={{ background: '#111', color: '#fff', border: '1px solid #111', padding: '16px 36px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.target.style.background = '#c9a96e'; e.target.style.borderColor = '#c9a96e' }}
            onMouseLeave={e => { e.target.style.background = '#111'; e.target.style.borderColor = '#111' }}
          >Book a Property</a>
          <a href="/contact" style={{ background: 'transparent', color: '#111', border: '1px solid #111', padding: '16px 36px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.target.style.background = '#111'; e.target.style.color = '#fff' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#111' }}
          >Talk to Us</a>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default AboutUs