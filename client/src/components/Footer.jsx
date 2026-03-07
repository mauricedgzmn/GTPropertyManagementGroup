import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Facebook, Linkedin, X } from 'lucide-react'

import airbnb from '../assets/airbnb.png'
import booking from '../assets/booking.png'
import pricelabs from '../assets/pricelabs.png'
import tripadvisor from '../assets/tripadvisor.png'
import turo from '../assets/turo.png'
import vrbo from '../assets/vrbo.png'
import cupontours from '../assets/cupontours.png'
import bnbflow from '../assets/bnbflow.png'

const platforms = [
  { name: 'Airbnb', logo: airbnb },
  { name: 'Vrbo', logo: vrbo },
  { name: 'Booking.com', logo: booking },
  { name: 'Tripadvisor', logo: tripadvisor },
  { name: 'Turo', logo: turo },
  { name: 'PriceLabs', logo: pricelabs },
  { name: 'CuponTours', logo: cupontours },
  { name: 'BnbFlow', logo: bnbflow },
]

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Story', to: '/about' },
  { label: 'Properties', to: '/properties' },
  { label: 'Work With Us', to: '/invest' },
  { label: 'Why STR', to: '/why-str' },
]

const destinations = [
  'Miami, Florida, USA',
  'Hallandale, Florida, USA',
  'Orlando, Florida, USA',
  'Atlanta, Georgia, USA',
  'Cali, Colombia',
  'Lago Camila, Colombia',
  'Valledupar, Colombia',
  'El Salvador',
  'Fort Myers, Florida',
]

const contactInfo = [
  { Icon: MapPin, text: 'Miami, Florida, USA' },
  { Icon: Phone, text: '+1 (239) 322 4140' },
  { Icon: Mail, text: 'info@gtpropertymanagement.com' },
]

const termsContent = [
  { title: '1. Agreement to Terms', text: 'Welcome to GT Property Management Group ("GT Property Management Group," "we," "us," or "our"). These Terms and Conditions ("Terms") govern your access to and use of our website and our luxury short-term rental services (collectively, the "Services"). By accessing, browsing, or booking through our platform, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms. If you do not agree, you must refrain from using our Services.' },
  { title: '2. Our Services', text: 'GT Property Management Group specializes in the management and booking of premium short-term rental residences, including luxury vacation homes, executive residences, high-end furnished accommodations, and exclusive short-term residential stays. We curate and manage exceptional properties designed to deliver elevated living experiences. All reservations are subject to availability and confirmation.' },
  { title: '3. Eligibility', text: 'Our Services are available only to individuals who are at least 18 years of age, have legal capacity to enter into binding agreements, and provide accurate and complete booking information. By making a reservation, you represent and warrant that you meet these requirements.' },
  { title: '4. Reservations & Payments', text: 'A reservation is confirmed only upon receipt of full or required payment and written confirmation from GT Property Management Group. We reserve the right to decline or cancel any booking at our discretion prior to confirmation. All rates are listed in USD unless otherwise stated, may include cleaning fees, service fees, security deposits, or applicable taxes, and are subject to change until booking confirmation.' },
  { title: '5. Guest Standards & Conduct', text: 'As a guest of GT Property Management Group, you agree to uphold the highest standards of conduct and respect for the property and surrounding community. Guests agree to adhere strictly to occupancy limits, respect all house rules, maintain the property in excellent condition, refrain from hosting unauthorized events, and comply with all local laws.' },
  { title: '6. Cancellations & Refunds', text: 'Cancellation policies vary by property and will be clearly stated at the time of booking. Refunds, when applicable, will be issued to the original payment method, may take 5–10 business days to process, and may exclude administrative or service fees.' },
  { title: '7. Limitation of Liability', text: 'To the fullest extent permitted by law, GT Property Management Group shall not be liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the total amount paid for the reservation in question.' },
  { title: '8. Governing Law', text: 'These Terms shall be governed by the laws of the State of Florida, United States. Any disputes shall be resolved exclusively in the state or federal courts located in Miami, Florida.' },
  { title: '9. Contact', text: 'For inquiries: GT Property Management Group, Miami, Florida. Email: info@gtpropertymanagement.com | Phone: +1 (239) 322 4140' },
]

const privacyContent = [
  { title: '1. Introduction', text: 'At GT Property Management Group, we are committed to maintaining the highest standards of privacy, discretion, and data protection. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and engage with our luxury short-term rental services.' },
  { title: '2. Information We Collect', text: 'We collect personal information that you voluntarily provide when you create an account, submit a reservation inquiry, confirm a booking, contact our team, or subscribe to communications. This may include your full name, email address, telephone number, mailing and billing address, and payment details.' },
  { title: '3. How We Use Your Information', text: 'We use collected information to process and manage reservations, verify guest identity when required, communicate booking confirmations and property details, provide personalized guest support, improve website performance and service quality, prevent fraud and ensure security, and comply with legal and regulatory obligations.' },
  { title: '4. Data Security', text: 'We implement industry-standard security measures to protect your personal information, including encryption of sensitive data, secure server infrastructure, access control protocols, and regular system monitoring and updates.' },
  { title: '5. Your Privacy Rights', text: 'Depending on your jurisdiction, you may have the right to request access to your personal information, request correction of inaccurate data, request deletion of personal data, or object to marketing communications.' },
  { title: '6. Contact Us', text: 'For questions: GT Property Management Group, Miami, Florida. Email: info@gtpropertymanagement.com | Phone: +1 (239) 322 4140' },
]

function LegalModal({ title, content, onClose }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9998, backdropFilter: 'blur(4px)' }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        zIndex: 9999, background: '#fff', width: '90%', maxWidth: '720px',
        maxHeight: '85vh', display: 'flex', flexDirection: 'column',
        borderRadius: '4px', boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
        fontFamily: "'Jost', sans-serif"
      }}>
        <div style={{ padding: '28px 36px', borderBottom: '1px solid #f0eeeb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '6px' }}>Legal</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: '#1a1a1a', margin: 0 }}>{title}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid #e8e4de', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#111' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = '#e8e4de' }}
          >
            <X size={16} color="#1a1a1a" />
          </button>
        </div>
        <div style={{ padding: '16px 36px 0', flexShrink: 0 }}>
          <span style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.08em' }}>Last Updated: January 1, 2026</span>
        </div>
        <div style={{ overflowY: 'auto', padding: '24px 36px 36px', scrollbarWidth: 'thin', scrollbarColor: '#c9a96e #f5f5f5' }}>
          {content.map((section) => (
            <div key={section.title} style={{ marginBottom: '28px' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 500, color: '#1a1a1a', marginBottom: '10px', borderLeft: '3px solid #c9a96e', paddingLeft: '12px' }}>{section.title}</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.9, margin: 0 }}>{section.text}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: '20px 36px', borderTop: '1px solid #f0eeeb', display: 'flex', justifyContent: 'flex-end', flexShrink: 0 }}>
          <button onClick={onClose} style={{ background: '#111', color: '#fff', border: '1px solid #111', padding: '12px 32px', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.borderColor = '#c9a96e' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#111' }}
          >I Understand</button>
        </div>
      </div>
    </>
  )
}

function Footer() {
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  const support = [
    { label: 'Owner Dashboard', to: '/admin' },
    { label: 'Contact', to: '/contact' },
    { label: 'Terms of Service', action: () => setShowTerms(true) },
    { label: 'Privacy Policy', action: () => setShowPrivacy(true) },
  ]

  return (
    <>
      <style>{`
        .footer-platforms { padding: 56px 48px; }
        .footer-main { padding: 64px 48px 40px; }
        .footer-grid { display: grid; grid-template-columns: 1.8fr 1fr 1.4fr 1fr; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid #eee; }
        .footer-bottom { margin-top: 32px; display: flex; justify-content: space-between; align-items: center; }
        .footer-social { display: flex; gap: 16px; align-items: center; }
        @media (max-width: 900px) {
          .footer-platforms { padding: 40px 20px !important; }
          .footer-main { padding: 40px 20px 24px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-bottom { flex-direction: column !important; gap: 16px !important; text-align: center !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        .platform-card { background: #fff; border: 1px solid #e8e8e8; border-radius: 12px; width: 120px; height: 70px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: box-shadow 0.2s, transform 0.2s; padding: 0 14px; box-sizing: border-box; }
        @media (max-width: 480px) {
          .platform-card { width: 90px; height: 56px; }
        }
      `}</style>

      {showTerms && <LegalModal title="Terms & Conditions" content={termsContent} onClose={() => setShowTerms(false)} />}
      {showPrivacy && <LegalModal title="Privacy Policy" content={privacyContent} onClose={() => setShowPrivacy(false)} />}

      <footer id="contact" style={{ background: '#f9f9f9', fontFamily: "'Jost', sans-serif" }}>

        {/* Platforms */}
        <div className="footer-platforms" style={{ background: '#fff', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 400, color: '#1a1a1a', marginBottom: '32px' }}>
            Platforms where you can find us and we use to manage our properties
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {platforms.map((p) => (
              <div key={p.name} className="platform-card"
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <img src={p.logo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer */}
        <div className="footer-main" style={{ background: '#fff', borderTop: '1px solid #eee' }}>
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.15 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1a1a1a', borderBottom: '1px solid #1a1a1a', paddingBottom: '3px', whiteSpace: 'nowrap' }}>GT Property Management</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontWeight: 400, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#1a1a1a', marginTop: '4px' }}>Group</span>
                </div>
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {contactInfo.map(({ Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#666' }}>
                    <Icon size={14} color="#c9a96e" strokeWidth={1.5} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', color: '#1a1a1a', marginBottom: '20px' }}>Quick Links</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {quickLinks.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}
                      onMouseEnter={e => e.target.style.color = '#c9a96e'}
                      onMouseLeave={e => e.target.style.color = '#666'}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', color: '#1a1a1a', marginBottom: '20px' }}>Popular Destinations</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {destinations.map(dest => (
                  <li key={dest}><span style={{ fontSize: '13px', color: '#666' }}>{dest}</span></li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', color: '#1a1a1a', marginBottom: '20px' }}>Support</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {support.map(item => (
                  <li key={item.label}>
                    {item.action ? (
                      <button onClick={item.action} style={{ fontSize: '13px', color: '#666', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: "'Jost', sans-serif" }}
                        onMouseEnter={e => e.target.style.color = '#c9a96e'}
                        onMouseLeave={e => e.target.style.color = '#666'}
                      >{item.label}</button>
                    ) : (
                      <Link to={item.to} style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}
                        onMouseEnter={e => e.target.style.color = '#c9a96e'}
                        onMouseLeave={e => e.target.style.color = '#666'}
                      >{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <span style={{ fontSize: '12px', color: '#999' }}>
              © 2026 <strong style={{ color: '#1a1a1a' }}>GT Property Management Group</strong>. All rights reserved.
            </span>
            <div className="footer-social">
              <span style={{ fontSize: '12px', color: '#999' }}>Follow us:</span>
              {[Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a96e'; e.currentTarget.style.color = '#c9a96e' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#666' }}
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer