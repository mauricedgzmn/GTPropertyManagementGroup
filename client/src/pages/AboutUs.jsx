import { useState, useEffect, useRef } from 'react'
import { Shield, Activity, Clock, Users, DollarSign, MessageSquare, Home, TrendingUp, FileText, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  )
}

const principles = [
  {
    icon: Shield,
    num: '1',
    title: 'Owner-First, Always',
    body: 'Every decision we make is filtered through one question: does this serve the property owner? Your asset, your income, and your peace of mind come before everything else.',
  },
  {
    icon: Activity,
    num: '2',
    title: 'Performance Over Promises',
    body: "We don't make guarantees we can't keep. We share real data, real occupancy numbers, and real revenue results. You'll always know exactly how your property is performing.",
  },
  {
    icon: Clock,
    num: '3',
    title: 'Obsessive Attention to Detail',
    body: 'From the way a listing photo is framed to the way a guest is greeted, every touchpoint matters. Five-star reviews aren\'t luck — they\'re the result of relentless standards applied consistently.',
  },
  {
    icon: Users,
    num: '4',
    title: 'Local Expertise, Global Reach',
    body: 'We operate in five markets across three countries. Each market has a dedicated team with on-the-ground knowledge — not remote operators guessing at local conditions.',
  },
  {
    icon: DollarSign,
    num: '5',
    title: 'Aligned Incentives',
    body: "We earn a percentage of revenue — not a flat fee. When your property performs better, we earn more. Our success is directly tied to yours, and that's exactly how it should be.",
  },
  {
    icon: MessageSquare,
    num: '6',
    title: 'Radical Transparency',
    body: "Monthly reports. Clear breakdowns. No hidden fees. You always know where every dollar is going and what's driving every result. We believe trust is earned through honesty, not marketing.",
  },
]

const markets = [
  { flag: 'https://flagcdn.com/w40/us.png', city: 'Fort Myers', region: 'Florida, USA', body: "Southwest Florida's fastest growing STR market. Year-round sunshine, Gulf Coast beaches, and strong snowbird demand make this one of our highest-performing regions." },
  { flag: 'https://flagcdn.com/w40/us.png', city: 'Orlando', region: 'Florida, USA', body: "The world's most visited theme park destination. Consistent year-round demand, massive event-driven spikes, and a diverse traveler base that never stops booking." },
  { flag: 'https://flagcdn.com/w40/us.png', city: 'Miami', region: 'Florida, USA', body: 'Global destination. Premium nightly rates, international travelers, and world-class events year-round. Miami properties command some of our highest revenue per night.' },
  { flag: 'https://flagcdn.com/w40/co.png', city: 'Colombia', region: 'South America', body: 'A booming destination for international travelers and digital nomads. Medellín and Cartagena offer exceptional ROI with lower acquisition costs and rapidly growing demand.' },
  { flag: 'https://flagcdn.com/w40/sv.png', city: 'El Salvador', region: 'Central America', body: 'An emerging market with extraordinary upside. Growing surf tourism, Bitcoin adoption driving fintech travelers, and an improving infrastructure make this a ground-floor opportunity.' },
]

const heroMarkets = [
  { flag: 'https://flagcdn.com/w40/us.png', label: 'Fort Myers, FL' },
  { flag: 'https://flagcdn.com/w40/us.png', label: 'Orlando, FL' },
  { flag: 'https://flagcdn.com/w40/us.png', label: 'Miami, FL' },
  { flag: 'https://flagcdn.com/w40/co.png', label: 'Colombia' },
  { flag: 'https://flagcdn.com/w40/sv.png', label: 'El Salvador' },
]

const services = [
  { icon: Home, label: 'Full Setup & Launch', body: 'Photography, listing copy, platform accounts, and pricing strategy — all done for you before your first guest checks in.' },
  { icon: MessageSquare, label: '24/7 Guest Communication', body: "Every message, every question, every issue — handled by our team around the clock. You'll never receive a 2am text from a guest." },
  { icon: TrendingUp, label: 'Dynamic Pricing', body: "Real-time rate optimization based on demand, events, seasonality, and competitor data — so you're never undercharging or sitting empty." },
  { icon: FileText, label: 'Monthly Reporting', body: "Clear, detailed reports showing occupancy, revenue, expenses, and net income — delivered every month without you having to ask." },
]

export default function AboutUs() {
  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: '#f8f7f5', color: '#1a1a1a' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(150deg, #1a1a1a 0%, #2c2218 55%, #1a1a1a 100%)',
        padding: 'clamp(100px, 14vw, 160px) clamp(24px, 6vw, 80px) clamp(80px, 10vw, 120px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, #c9a96e)' }} />

        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
              <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>Our Story</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(44px, 8vw, 88px)', fontWeight: 300, lineHeight: 1.05, color: '#f8f7f5', margin: '0 0 8px' }}>
              Built on One
            </h1>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(44px, 8vw, 88px)', fontWeight: 400, fontStyle: 'italic', color: '#c9a96e', margin: '0 0 32px', lineHeight: 1.05 }}>
              Simple Promise.
            </h1>
            <div style={{ width: '40px', height: '1px', background: '#c9a96e', marginBottom: '32px' }} />
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: '15px', color: 'rgba(248,247,245,0.65)', lineHeight: 1.9, maxWidth: '580px', fontWeight: 300, marginBottom: '40px' }}>
              We built GT Property Management Group because property owners deserved better — better service, better returns, and a team that treats every property like it's their own. Our mission is simple: make short-term rental ownership completely hands-off, and dramatically more profitable.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {heroMarkets.map((m, i) => (
                <span key={i} style={{
                  fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'rgba(248,247,245,0.6)', border: '1px solid rgba(248,247,245,0.15)',
                  padding: '7px 14px', display: 'inline-flex', alignItems: 'center', gap: '8px',
                }}>
                  <img src={m.flag} alt="" style={{ width: '20px', height: 'auto', borderRadius: '2px', flexShrink: 0 }} />
                  {m.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, transparent, #f8f7f5)' }} />
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#f8f7f5', padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { stat: '5', sub: 'Markets across 3 countries' },
            { stat: '94%', sub: 'Average occupancy rate' },
            { stat: '0 hrs', sub: 'Owner time required' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '24px',
                padding: 'clamp(20px, 3vw, 28px) clamp(24px, 4vw, 40px)',
                border: '1px solid #e8e4de',
                marginBottom: '2px',
                transition: 'background 0.3s',
                background: '#fff',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#faf9f7'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div style={{ width: '3px', height: '48px', background: '#c9a96e', flexShrink: 0 }} />
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 300, color: '#c9a96e', lineHeight: 1, minWidth: '120px' }}>{item.stat}</div>
                <div style={{ fontSize: '12px', color: '#9a9590', letterSpacing: '0.08em', fontWeight: 300 }}>{item.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 130px) clamp(24px, 6vw, 80px)', background: '#f8f7f5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(48px, 6vw, 80px)', alignItems: 'start' }}>
          <Reveal>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>Our Mission</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: 300, lineHeight: 1.1, margin: '0 0 32px' }}>
                Stress-Free.<br />Hands-Off.<br />
                <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Maximum Returns.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <p style={{ fontSize: '14px', color: '#5a5550', lineHeight: 1.9, marginBottom: '20px', fontWeight: 300 }}>
                GT Property Management Group was founded on a simple observation: most property owners either leave significant money on the table with long-term rentals, or burn out trying to self-manage short-term ones.
              </p>
              <p style={{ fontSize: '14px', color: '#1a1a1a', lineHeight: 1.9, marginBottom: '32px', fontWeight: 400 }}>
                We bridge that gap. <strong>We take the complexity, the late-night guest messages, the pricing decisions, the cleaning coordination, and the operational chaos entirely off your plate</strong> — and replace it with a monthly check and a performance report.
              </p>
              <p style={{ fontSize: '14px', color: '#5a5550', lineHeight: 1.9, fontWeight: 300 }}>
                Operating across Florida and internationally in Colombia and El Salvador, our team brings local market expertise to every property we manage. We don't believe in one-size-fits-all. Every market has its own rhythm, its own demand patterns, its own peak seasons — and we know them all.
              </p>

              {/* Quote */}
              <div style={{ marginTop: '36px', borderLeft: '3px solid #c9a96e', padding: '20px 24px', background: 'rgba(201,169,110,0.06)' }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px, 2.5vw, 22px)', fontStyle: 'italic', color: '#1a1a1a', margin: '0 0 12px', lineHeight: 1.5 }}>
                  "You own the asset. We run the business. You collect the income."
                </p>
                <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>— The GT Promise</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section style={{ background: '#1a1a1a', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '64px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>What We Stand For</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: '#f8f7f5', margin: 0, lineHeight: 1.1 }}>
                The Principles That <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Drive Us</em>
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {principles.map((p, i) => {
              const Icon = p.icon
              return (
                <Reveal key={i} delay={i * 80}>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '64px 1fr',
                    gap: '28px', padding: 'clamp(32px, 5vw, 48px) 0',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    alignItems: 'start', position: 'relative',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '52px', height: '52px', border: '1px solid rgba(201,169,110,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={20} color="#c9a96e" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 400, color: '#f8f7f5', margin: 0 }}>{p.title}</h3>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 300, color: 'rgba(201,169,110,0.15)', lineHeight: 1 }}>{p.num}</span>
                      </div>
                      <p style={{ fontSize: '14px', color: 'rgba(248,247,245,0.5)', lineHeight: 1.85, margin: 0, fontWeight: 300, maxWidth: '580px' }}>{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── MARKETS ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)', background: '#f8f7f5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '56px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>Where We Operate</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 300, margin: 0, lineHeight: 1.1 }}>
                5 Markets. 3 Countries.{' '}
                <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>One Standard.</em>
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e8e4de', overflow: 'hidden' }}>
            {markets.map((m, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '48px 1fr',
                  gap: '20px', padding: 'clamp(28px, 4vw, 40px)',
                  borderBottom: i < markets.length - 1 ? '1px solid #e8e4de' : 'none',
                  background: '#fff', alignItems: 'start',
                  transition: 'background 0.2s',
                  position: 'relative', overflow: 'hidden',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#faf9f7'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <img src={m.flag} alt="" style={{ width: '32px', height: 'auto', borderRadius: '2px', marginTop: '4px' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '6px' }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 400, margin: 0, color: '#1a1a1a' }}>{m.city}</h3>
                    </div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '12px' }}>{m.region}</div>
                    <p style={{ fontSize: '13px', color: '#6b6560', lineHeight: 1.8, margin: 0, fontWeight: 300 }}>{m.body}</p>
                  </div>
                  {/* Market number watermark */}
                  <div style={{ position: 'absolute', right: '20px', bottom: '10px', fontFamily: "'Cormorant Garamond', serif", fontSize: '64px', fontWeight: 300, color: 'rgba(201,169,110,0.08)', lineHeight: 1, userSelect: 'none' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ background: '#1a1a1a', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '56px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>What You Get</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: '#f8f7f5', margin: 0, lineHeight: 1.1 }}>
                The Hands-Off <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Experience</em>
              </h2>
            </div>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px' }}>
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={i} delay={i * 80}>
                  <div style={{
                    border: '1px solid rgba(201,169,110,0.15)',
                    padding: 'clamp(32px, 4vw, 44px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    textAlign: 'center', gap: '20px',
                    transition: 'background 0.3s',
                    height: '100%', boxSizing: 'border-box',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid rgba(201,169,110,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={22} color="#c9a96e" strokeWidth={1.5} />
                    </div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a96e' }}>{s.label}</div>
                    <p style={{ fontSize: '13px', color: 'rgba(248,247,245,0.5)', lineHeight: 1.8, margin: 0, fontWeight: 300 }}>{s.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)', background: '#f8f7f5', textAlign: 'center' }}>
        <Reveal>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>Ready to Get Started?</span>
              <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, lineHeight: 1.1, margin: '0 0 20px' }}>
              Let's Make Your Property{' '}
              <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Work For You.</em>
            </h2>
            <p style={{ fontSize: '14px', color: '#6b6560', lineHeight: 1.9, marginBottom: '40px', fontWeight: 300 }}>
              Book a free 30-minute strategy call. We'll walk through your property, your market, and what you can realistically expect to earn — with zero pressure and zero obligation.
            </p>
            <a href="/invest" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#c9a96e', color: '#1a1a1a',
              padding: '18px 48px', fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', textDecoration: 'none',
              fontFamily: "'Jost', sans-serif", fontWeight: 600,
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#f8f7f5' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.color = '#1a1a1a' }}
            >
              Schedule a Free Strategy Call <ArrowRight size={14} />
            </a>
            <div style={{ marginTop: '20px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Free 30-minute call', 'No obligation', 'We serve FL, Colombia & El Salvador'].map((t, i) => (
                <span key={i} style={{ fontSize: '11px', color: '#aaa', letterSpacing: '0.06em' }}>· {t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  )
}