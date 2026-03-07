import { useState, useEffect, useRef } from 'react'
import { DollarSign, Shield, Calendar, Home, TrendingUp, Clock, ArrowRight, Check, X } from 'lucide-react'
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

const reasons = [
  {
    icon: DollarSign,
    label: 'REVENUE',
    stat: '2–4×',
    statSub: 'More monthly income than a traditional rental',
    title: 'You Earn',
    titleItalic: 'Dramatically More',
    titleEnd: 'Money',
    body: 'A property that generates $1,800/month in long-term rent can easily produce $4,500–$6,000/month as a short-term rental. You\'re not charging for a lease — you\'re charging for an experience, a location, and convenience. Guests pay a premium for that. Every single night.',
    str: 'Dynamic nightly rates. Peak season surges. Revenue scales with demand.',
    trad: 'Fixed monthly rent. Zero upside, even when the market heats up.',
  },
  {
    icon: Shield,
    label: 'CONTROL',
    stat: '100%',
    statSub: 'Ownership of your property — always',
    title: 'You Keep',
    titleItalic: 'Full Control',
    titleEnd: 'of Your Asset',
    body: 'With a long-term tenant, your property is their home — legally. Evictions can take months. Damage can go undetected for years. With short-term rentals, guests check in and check out. Professional cleaners inspect the property after every stay. You maintain total control over who uses your property and when.',
    str: 'Regular professional inspections. Easy to remove bad guests. Property stays yours.',
    trad: 'Months-long eviction process. Property wear hidden until lease ends.',
  },
  {
    icon: Calendar,
    label: 'FLEXIBILITY',
    stat: '365',
    statSub: 'Days you control your calendar completely',
    title: 'Block It Off Whenever',
    titleItalic: 'You Want',
    titleEnd: '',
    body: 'Want to use your property for two weeks in December? Block it. Family visiting for the holidays? Block it. With a traditional tenant, your property is unavailable to you for the entire lease term — often 12 months at a time. Short-term rentals give you both income and personal access.',
    str: 'Personal use any time. Block dates instantly. Your property, your rules.',
    trad: 'Zero personal access for the full lease term — typically 12 months.',
  },
  {
    icon: Home,
    label: 'PROPERTY CONDITION',
    stat: '48×',
    statSub: 'More inspections per year vs. annual lease',
    title: 'Your Property Stays in',
    titleItalic: 'Better Condition',
    titleEnd: '',
    body: 'A professional cleaner inspects and photographs your property after every single checkout. Issues are caught within 24 hours — not discovered after years of wear when a long-term tenant finally leaves. Short-term rentals incentivize pristine presentation because ratings depend on it.',
    str: 'Professional cleaning every stay. Issues caught immediately. Ratings create accountability.',
    trad: 'Annual walkthroughs at best. Damage discovered after lease ends — often costly.',
  },
  {
    icon: TrendingUp,
    label: 'APPRECIATION',
    stat: '↑',
    statSub: 'STR-optimized properties command higher resale values',
    title: 'Your Property is Worth',
    titleItalic: 'More',
    titleEnd: 'on the Market',
    body: 'A property with a proven STR income history sells at a premium. Buyers pay for documented revenue — they\'re acquiring a business, not just a building. A well-maintained, high-performing short-term rental commands a significantly higher resale price than an equivalent property with a standard lease history.',
    str: 'Documented income history. Sold as a revenue-generating asset. Premium valuation.',
    trad: 'Valued purely on comparable sales. No income-based premium.',
  },
  {
    icon: Clock,
    label: 'PASSIVE INCOME',
    stat: '0 hrs',
    statSub: 'Your time required when managed by GT',
    title: 'It Can Be',
    titleItalic: 'Completely Hands-Off',
    titleEnd: '',
    body: 'The biggest misconception about short-term rentals is that they\'re high-maintenance. They are — if you self-manage. When you partner with GT Property Management, we handle everything: guest communication, pricing, cleaning coordination, maintenance, and reporting. You receive a monthly check. That\'s it.',
    str: 'Full-service management. Zero owner involvement. Higher returns than self-managed LTR.',
    trad: 'Still requires tenant screening, lease renewals, maintenance calls, and evictions.',
    strLabel: 'SHORT-TERM + GT',
  },
]

const comparison = [
  { factor: 'Monthly Revenue', str: '$3,000–$8,000+ (market-dependent)', trad: '$1,200–$2,500 (fixed)' },
  { factor: 'Income Flexibility', str: 'Dynamic — adjusts to demand & seasons', trad: 'Fixed — locked in for lease term' },
  { factor: 'Owner Access', str: 'Block any dates for personal use', trad: 'None during active lease' },
  { factor: 'Tenant Risk', str: 'Short stays, low risk per guest', trad: 'Long exposure, eviction difficulty' },
  { factor: 'Property Inspections', str: 'After every stay (weekly or more)', trad: 'Annually, at best' },
  { factor: 'Contract Lock-In', str: 'No long-term contracts with GT', trad: '12-month minimum lease typical' },
  { factor: 'Property Condition', str: 'Professionally cleaned & reviewed constantly', trad: 'Unknown until tenant vacates' },
  { factor: 'Resale Premium', str: 'Higher — proven income asset', trad: 'Standard — comparable market value' },
  { factor: 'Passive Income', str: 'Fully passive with professional management', trad: 'Still requires landlord involvement' },
  { factor: 'Revenue Upside', str: 'Unlimited — peak seasons, events, demand spikes', trad: 'None — same rate regardless of market' },
]

const faqs = [
  {
    q: '"Isn\'t it a lot more work than a traditional rental?"',
    sub: 'The most common concern we hear.',
    a: 'It is — if you self-manage. That\'s exactly why GT Property Management exists. We handle 100% of the operational work: guest communication, pricing optimization, cleaning coordination, maintenance, reviews, and monthly reporting. You own the asset. We run the business. Your involvement is zero.',
    bold: 'We handle 100% of the operational work:',
  },
  {
    q: '"What if my property sits empty for weeks?"',
    sub: 'The occupancy risk question.',
    a: 'Our average managed property achieves 94% occupancy. We use dynamic pricing technology that adjusts nightly rates in real time based on local demand, events, competitor availability, and seasonal trends. We also list on multiple platforms simultaneously — Airbnb, VRBO, Booking.com — to maximize visibility. Vacancy is the exception, not the rule.',
    bold: '94% occupancy.',
  },
  {
    q: '"What about property damage from guests?"',
    sub: 'The damage and liability concern.',
    a: 'Airbnb provides up to $3 million in host damage protection. Beyond that, we screen guests, set strict house rules, collect security deposits where applicable, and conduct thorough post-checkout inspections. In reality, guests who pay to stay somewhere tend to take far better care of it than long-term tenants who treat it as their permanent home.',
    bold: '$3 million in host damage protection.',
  },
  {
    q: '"Is short-term rental even legal in my area?"',
    sub: 'The regulation question.',
    a: 'South Florida is one of the most STR-friendly markets in the country. Many municipalities allow short-term rentals with proper licensing. We handle the permit research and compliance for every property we manage — so you\'re never exposed to regulatory risk. We know the rules in every city and county we operate in.',
    bold: 'We handle the permit research and compliance for every property we manage',
  },
  {
    q: '"What are your management fees?"',
    sub: 'The cost question.',
    a: 'We operate on a performance-based commission model — we only earn when you earn. There are no upfront setup fees, no monthly retainers, and no long-term contracts. Our fee comes as a percentage of revenue collected, meaning our incentives are perfectly aligned with yours. The more your property makes, the more we make. Schedule a strategy call to discuss exact rates for your specific property.',
    bold: 'we only earn when you earn.',
  },
]

function ReasonCard({ reason, index }) {
  const Icon = reason.icon
  const isEven = index % 2 === 0
  return (
    <section style={{ background: '#f8f7f5' }}>
      {/* Dark stat block */}
      <Reveal>
        <div style={{
          background: isEven ? '#1a1a1a' : '#211d19',
          padding: 'clamp(48px, 8vw, 80px) clamp(24px, 6vw, 80px)',
          display: 'flex', flexDirection: 'column', gap: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '52px', height: '52px', border: '1px solid rgba(201,169,110,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={20} color="#c9a96e" strokeWidth={1.5} />
            </div>
            <span style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#c9a96e' }}>{reason.label}</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(56px, 10vw, 96px)', fontWeight: 300, color: '#c9a96e', lineHeight: 1, marginBottom: '10px' }}>
              {reason.stat}
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(248,247,245,0.5)', fontWeight: 300 }}>{reason.statSub}</div>
          </div>
        </div>
      </Reveal>

      {/* Light content block */}
      <Reveal delay={100}>
        <div style={{ padding: 'clamp(40px, 7vw, 72px) clamp(24px, 6vw, 80px)', background: '#f8f7f5', borderBottom: '1px solid #e8e4de' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 20px' }}>
            {reason.title}{' '}
            <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>{reason.titleItalic}</em>
            {reason.titleEnd && <> {reason.titleEnd}</>}
          </h3>
          <p style={{ fontSize: '14px', color: '#5a5550', lineHeight: 1.9, marginBottom: '28px', fontWeight: 300, maxWidth: '640px' }}>{reason.body}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', borderLeft: '3px solid #c9a96e', padding: '14px 18px' }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={10} strokeWidth={2.5} /> {reason.strLabel || 'SHORT-TERM'}
              </div>
              <p style={{ fontSize: '13px', color: '#1a1a1a', margin: 0, lineHeight: 1.6, fontWeight: 400 }}>{reason.str}</p>
            </div>
            <div style={{ background: 'rgba(220,38,38,0.04)', border: '1px solid rgba(220,38,38,0.15)', borderLeft: '3px solid #dc2626', padding: '14px 18px' }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#dc2626', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <X size={10} strokeWidth={2.5} /> TRADITIONAL
              </div>
              <p style={{ fontSize: '13px', color: '#5a5550', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{reason.trad}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function FAQ({ faq, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #e8e4de', overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        padding: 'clamp(20px, 3vw, 28px) 0', display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: '20px', textAlign: 'left', fontFamily: "'Jost', sans-serif",
      }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 500, color: '#1a1a1a', lineHeight: 1.3, marginBottom: '4px' }}>{faq.q}</div>
          <div style={{ fontSize: '12px', color: '#9a9590', fontStyle: 'italic' }}>{faq.sub}</div>
        </div>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: open ? '#c9a96e' : '#f0eeeb',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background 0.2s', marginTop: '2px',
        }}>
          <span style={{ fontSize: '16px', color: open ? '#fff' : '#1a1a1a', lineHeight: 1, fontWeight: 300 }}>{open ? '×' : '+'}</span>
        </div>
      </button>
      <div style={{
        maxHeight: open ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <p style={{ fontSize: '14px', color: '#5a5550', lineHeight: 1.9, paddingBottom: '28px', margin: 0, fontWeight: 300 }}>
          {faq.a}
        </p>
      </div>
    </div>
  )
}

export default function WhySTR() {
  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: '#f8f7f5', color: '#1a1a1a' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(150deg, #1a1a1a 0%, #2a2218 60%, #1a1a1a 100%)',
        padding: 'clamp(100px, 14vw, 160px) clamp(24px, 6vw, 80px) clamp(80px, 10vw, 120px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, #c9a96e)' }} />

        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
              <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>The Case for Short-Term</span>
              <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(44px, 8vw, 88px)', fontWeight: 300, lineHeight: 1.05, color: '#f8f7f5', margin: '0 0 8px' }}>
              Why STR
            </h1>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(44px, 8vw, 88px)', fontWeight: 400, fontStyle: 'italic', color: '#c9a96e', margin: '0 0 24px', lineHeight: 1.05 }}>
              Wins Every Time.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', fontStyle: 'italic', color: 'rgba(248,247,245,0.5)', marginBottom: '32px', fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              The numbers don't lie — and neither do our owners.
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(248,247,245,0.6)', lineHeight: 1.9, maxWidth: '580px', fontWeight: 300 }}>
              Most property owners are leaving thousands of dollars on the table every single month. Traditional long-term rentals offer security — but they cap your income, limit your control, and handcuff you to one tenant. Short-term rentals change the equation entirely.
            </p>
          </Reveal>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to bottom, transparent, #f8f7f5)' }} />
      </section>

      {/* ── STR vs TRADITIONAL INTRO ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)', background: '#f8f7f5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { tag: 'SHORT-TERM RENTAL', stat: '3×', sub: 'Average monthly revenue vs. traditional rental', title: 'Dynamic income. Full control. Maximum returns.', highlight: true },
            { tag: 'TRADITIONAL RENTAL', stat: '1×', sub: 'Fixed monthly rent — same check every month, no matter what', title: 'Fixed income. Locked in. Capped upside.', highlight: false },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{
                border: `1px solid ${card.highlight ? 'rgba(201,169,110,0.3)' : '#e8e4de'}`,
                padding: 'clamp(28px, 4vw, 40px)',
                background: card.highlight ? 'rgba(201,169,110,0.04)' : '#fff',
                height: '100%',
              }}>
                <div style={{ fontSize: '9px', letterSpacing: '0.24em', textTransform: 'uppercase', color: card.highlight ? '#c9a96e' : '#9a9590', marginBottom: '20px' }}>{card.tag}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px, 2.5vw, 26px)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 20px', lineHeight: 1.2 }}>{card.title}</h3>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(48px, 7vw, 72px)', fontWeight: 300, color: card.highlight ? '#c9a96e' : '#ccc', lineHeight: 1, marginBottom: '8px' }}>{card.stat}</div>
                <p style={{ fontSize: '12px', color: '#9a9590', margin: 0, lineHeight: 1.6 }}>{card.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 6 REASONS ── */}
      <section style={{ background: '#f8f7f5' }}>
        <Reveal>
          <div style={{ padding: 'clamp(40px, 6vw, 72px) clamp(24px, 6vw, 80px) clamp(32px, 4vw, 48px)', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>6 Reasons to Switch</span>
              <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 300, margin: '0 0 16px', lineHeight: 1.1 }}>
              The Case for <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Short-Term</em>
            </h2>
            <p style={{ fontSize: '14px', color: '#6b6560', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8, fontWeight: 300 }}>
              Six data-backed reasons why smart property owners are switching to short-term rentals — and never looking back.
            </p>
          </div>
        </Reveal>

        {reasons.map((reason, i) => <ReasonCard key={i} reason={reason} index={i} />)}
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section style={{ background: '#1a1a1a', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>Head-to-Head</span>
                <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: '#f8f7f5', margin: '0 0 16px' }}>
                Side-by-Side <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Comparison</em>
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(248,247,245,0.45)', fontWeight: 300 }}>Every major factor, compared directly.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ border: '1px solid rgba(201,169,110,0.2)', overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', background: 'rgba(201,169,110,0.08)', borderBottom: '1px solid rgba(201,169,110,0.2)' }}>
                {['FACTOR', 'SHORT-TERM RENTAL', 'TRADITIONAL RENTAL'].map((h, i) => (
                  <div key={i} style={{ padding: '16px 20px', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: i === 1 ? '#c9a96e' : 'rgba(248,247,245,0.4)', borderRight: i < 2 ? '1px solid rgba(201,169,110,0.15)' : 'none' }}>{h}</div>
                ))}
              </div>
              {comparison.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', borderBottom: i < comparison.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ padding: '18px 20px', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(248,247,245,0.35)', borderRight: '1px solid rgba(255,255,255,0.06)', lineHeight: 1.4 }}>{row.factor}</div>
                  <div style={{ padding: '18px 20px', fontSize: '13px', color: '#f8f7f5', borderRight: '1px solid rgba(255,255,255,0.06)', lineHeight: 1.6, fontWeight: 300 }}>{row.str}</div>
                  <div style={{ padding: '18px 20px', fontSize: '13px', color: 'rgba(248,247,245,0.35)', lineHeight: 1.6, fontWeight: 300 }}>{row.trad}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)', background: '#f8f7f5' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '56px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
                <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>Common Questions</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, margin: '0 0 16px', lineHeight: 1.1 }}>
                We've Heard <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Every Concern.</em>
              </h2>
              <p style={{ fontSize: '14px', color: '#6b6560', fontWeight: 300, lineHeight: 1.8 }}>
                Here are the most common hesitations — and the honest answers.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ borderTop: '1px solid #e8e4de' }}>
              {faqs.map((faq, i) => <FAQ key={i} faq={faq} index={i} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: '#1a1a1a', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px)', textAlign: 'center' }}>
        <Reveal>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a96e' }}>Limited Availability</span>
              <div style={{ width: '32px', height: '1px', background: '#c9a96e' }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: '#f8f7f5', margin: '0 0 20px', lineHeight: 1.1 }}>
              Ready to Make Your Property <em style={{ fontStyle: 'italic', color: '#c9a96e' }}>Work Harder?</em>
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(248,247,245,0.5)', lineHeight: 1.9, marginBottom: '40px', fontWeight: 300 }}>
              We onboard a limited number of new properties each quarter to ensure every owner receives the attention and results they deserve. Spots fill fast.
            </p>
            <a href="/invest" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#c9a96e', color: '#1a1a1a',
              padding: '18px 48px', fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', textDecoration: 'none',
              fontFamily: "'Jost', sans-serif", fontWeight: 600,
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e0c080'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Schedule Your Free Strategy Call <ArrowRight size={14} />
            </a>
            <div style={{ marginTop: '20px', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Free 30-minute call', 'No obligation', 'South Florida properties'].map((t, i) => (
                <span key={i} style={{ fontSize: '11px', color: 'rgba(248,247,245,0.35)', letterSpacing: '0.08em' }}>· {t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  )
}