import { useState } from 'react'
import { Mail, Phone, Headphones } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const contactCards = [
  { Icon: Mail, title: 'Email us', desc: 'Email us for general queries, including marketing and partnership opportunities.', value: 'info@gtpropertymanagement.com', href: 'mailto:info@gtpropertymanagement.com' },
  { Icon: Phone, title: 'Call us', desc: 'Call us to speak to a member of our team. We are always happy to help.', value: '+1 (239) 322 4140', href: 'tel:+12393224140' },
  { Icon: Headphones, title: 'Support', desc: 'Email us for general queries, including marketing and partnership opportunities.', value: 'Support Center', href: 'mailto:info@gtpropertymanagement.com' },
]

const inputStyle = {
  width: '100%', fontSize: '13px', fontWeight: 300, color: '#1a1a1a',
  background: '#fff', border: '1.5px solid #e8e4de', borderRadius: '4px',
  padding: '12px 16px', outline: 'none', fontFamily: "'Jost', sans-serif",
  boxSizing: 'border-box', transition: 'border 0.2s',
}

function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = () => { if (!form.firstName || !form.email || !form.message) return; setSent(true) }

  return (
    <main style={{ fontFamily: "'Jost', sans-serif" }}>
      <style>{`
        .ct-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .ct-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; width: 100%; max-width: 860px; padding: 0 24px 80px; box-sizing: border-box; }
        .ct-form-card { background: #fff; border-radius: 8px; padding: 48px; width: 100%; max-width: 620px; box-shadow: 0 24px 64px rgba(0,0,0,0.2); margin-bottom: 80px; box-sizing: border-box; }
        @media (max-width: 768px) {
          .ct-form-grid { grid-template-columns: 1fr !important; }
          .ct-cards-grid { grid-template-columns: 1fr !important; gap: 16px !important; padding: 0 20px 48px !important; }
          .ct-form-card { padding: 28px 20px !important; margin-bottom: 40px !important; }
          .ct-hero-text { padding: 60px 20px 36px !important; }
        }
      `}</style>
      <Navbar />

      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', overflow: 'hidden' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=80') center/cover no-repeat", filter: 'brightness(0.25) saturate(0.5)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.75))' }} />

        {/* Hero Text */}
        <div className="ct-hero-text" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '80px 24px 48px', maxWidth: '700px', width: '100%', boxSizing: 'border-box' }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px', display: 'block' }}>Get In Touch</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 68px)', fontWeight: 400, lineHeight: 1.05, color: '#fff', marginBottom: '24px' }}>
            Thank You For Visiting<br /><em style={{ fontStyle: 'italic', color: '#e8d5b0' }}>Our Website</em>
          </h1>
          <p style={{ fontSize: '14px', lineHeight: 1.9, color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto', letterSpacing: '0.04em' }}>
            We appreciate your interest in our services. If you have any questions, comments, or concerns, please don't hesitate to reach out. Our dedicated team is here to ensure your experience with us is a positive one.
          </p>
        </div>

        {/* Form Card */}
        <div className="ct-form-card" style={{ position: 'relative', zIndex: 2 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#1a1a1a', marginBottom: '10px' }}>Message Received</div>
              <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.8 }}>Thank you for reaching out. A member of our team will be in touch within 24 hours.</p>
            </div>
          ) : (
            <>
              <div className="ct-form-grid">
                <div>
                  <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" style={inputStyle} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" style={inputStyle} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                </div>
              </div>
              <div className="ct-form-grid">
                <div>
                  <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Your Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john.doe@example.com" style={inputStyle} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Phone Number</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" style={inputStyle} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5550', display: 'block', marginBottom: '8px' }}>Your Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." rows={5} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }} onFocus={e => e.target.style.border = '1.5px solid #1a1a1a'} onBlur={e => e.target.style.border = '1.5px solid #e8e4de'} />
              </div>
              <p style={{ fontSize: '11px', color: '#aaa', lineHeight: 1.7, marginBottom: '24px' }}>
                <strong style={{ color: '#5a5550' }}>Privacy Notice:</strong> Your personal information will be used solely to respond to your inquiry. We respect your privacy and will never share your information with third parties.
              </p>
              <button onClick={handleSubmit} style={{ width: '100%', background: '#111', color: '#fff', border: '1px solid #111', padding: '16px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontWeight: 500, transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.borderColor = '#c9a96e' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#111' }}
              >Send Message ✦</button>
            </>
          )}
        </div>

        {/* Contact Cards */}
        <div className="ct-cards-grid" style={{ position: 'relative', zIndex: 2 }}>
          {contactCards.map(({ Icon, title, desc, value, href }) => (
            <div key={title} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '32px 24px', textAlign: 'center', backdropFilter: 'blur(8px)', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            >
              <div style={{ width: '52px', height: '52px', background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Icon size={22} color="#c9a96e" />
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#fff', marginBottom: '10px' }}>{title}</div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '16px' }}>{desc}</p>
              <a href={href} style={{ fontSize: '13px', color: '#c9a96e', textDecoration: 'none', fontWeight: 500, letterSpacing: '0.04em' }}
                onMouseEnter={e => e.target.style.color = '#e8d5b0'}
                onMouseLeave={e => e.target.style.color = '#c9a96e'}
              >{value}</a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Contact