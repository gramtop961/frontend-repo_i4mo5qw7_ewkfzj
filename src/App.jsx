import { useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Check, ArrowRight, Store, Users, Clock, TrendingDown, Sparkles, Shield } from 'lucide-react'

const COLORS = {
  dark: '#0e0e2c',
  orange: '#f36f2b',
  light: '#f5f7fb',
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      {eyebrow && (
        <div className="text-sm font-semibold tracking-widest uppercase text-white/70">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-white/70 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="px-6 py-5 rounded-xl bg-white/5 backdrop-blur border border-white/10 text-center">
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="mt-2 text-white/60 text-sm">{label}</div>
    </div>
  )
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
      <div className="shrink-0 p-3 rounded-xl bg-[rgba(243,111,43,0.15)] text-[#{COLORS.orange}]">
        <Icon className="text-[\#f36f2b]" size={22} />
      </div>
      <div>
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-white/70 text-sm mt-1">{desc}</p>
      </div>
    </div>
  )
}

export default function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [lead, setLead] = useState({ name: '', email: '', role: 'consumer', company: '', message: '', consent: true })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', message: 'Sending…' })
    try {
      const res = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setStatus({ state: 'success', message: 'Thank you! We will get back to you shortly.' })
      setLead({ name: '', email: '', role: 'consumer', company: '', message: '', consent: true })
    } catch (err) {
      setStatus({ state: 'error', message: 'Something went wrong. Please try again.' })
    }
  }

  const comparison = useMemo(() => ([
    { label: 'Price decreases automatically', lastdrop: true, traditional: false },
    { label: 'Clears stock faster', lastdrop: true, traditional: 'sometimes' },
    { label: 'Protects brand pricing windows', lastdrop: true, traditional: false },
    { label: 'Real-time scarcity boosts conversion', lastdrop: true, traditional: false },
    { label: 'Easy setup, no custom dev', lastdrop: true, traditional: 'varies' },
  ]), [])

  const demoProducts = [
    { id: 1, name: 'Wireless Headphones', start: 129, floor: 79, timeLeft: '1h 22m', drop: '-3%' },
    { id: 2, name: 'Smartwatch Pro', start: 199, floor: 129, timeLeft: '3h 10m', drop: '-7%' },
    { id: 3, name: '4K Action Cam', start: 249, floor: 159, timeLeft: '45m', drop: '-5%' },
  ]

  return (
    <div style={{ backgroundColor: COLORS.dark }} className="min-h-screen w-full text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgba(14,14,44,0.7)] backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #f36f2b, #ff9958)' }} />
            <span className="font-bold tracking-tight">LastDrop</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a href="#why" className="hover:text-white">Why LastDrop</a>
            <a href="#how" className="hover:text-white">How It Works</a>
            <a href="#retailers" className="hover:text-white">Retailers</a>
            <a href="#customers" className="hover:text-white">Customers</a>
            <a href="#compare" className="hover:text-white">Compare</a>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 bg-[\#f36f2b] hover:brightness-110 text-white font-semibold px-4 py-2 rounded-lg transition">
            Get Started <ArrowRight size={18} />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-40" style={{ background: '#f36f2b' }} />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: '#4e4ef8' }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[13px] px-3 py-1 rounded-full border border-white/15 bg-white/5">
              <Sparkles size={14} className="text-[\#f36f2b]" /> Dynamic Clearance Platform
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              Turn slow movers into wins with prices that drop over time
            </h1>
            <p className="mt-4 text-white/70 text-lg">
              LastDrop automatically reduces prices until items sell — protecting margins, accelerating sell-through, and delighting deal-seekers.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-[\#f36f2b] hover:brightness-110 text-white font-semibold px-5 py-3 rounded-lg">
                Talk to us <ArrowRight size={18} />
              </a>
              <a href="#products" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-5 py-3 rounded-lg">
                See live drops
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <Stat label="Avg. sell-through uplift" value="+38%" />
              <Stat label="Setup time" value="< 1 day" />
              <Stat label="Retailers onboarded" value="120+" />
            </div>
          </div>
          <div className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-black/30">
            <Spline scene="https://prod.spline.design/FduaNp3csZktbOi3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
        </div>
      </section>

      {/* Why LastDrop */}
      <section id="why" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Why LastDrop"
            title="Maximise recovery. Minimise friction."
            subtitle="Automated, rules-based markdowns ensure you clear inventory profitably without constant manual repricing."
          />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Feature icon={TrendingDown} title="Automated price decay" desc="Set start price, floor, and decay curve. We handle the rest in real-time." />
            <Feature icon={Clock} title="Time-boxed windows" desc="Protect brand pricing with scheduled campaigns and clear guardrails." />
            <Feature icon={Shield} title="Fair and transparent" desc="Customers see live price movement and scarcity — no hidden tricks." />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="How it works"
            title="Launch a drop in three simple steps"
          />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-sm text-white/60">01</div>
              <h4 className="mt-2 font-semibold">Select inventory</h4>
              <p className="text-white/70 mt-1">Choose SKUs you want to clear and define campaign timing.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-sm text-white/60">02</div>
              <h4 className="mt-2 font-semibold">Set price curve</h4>
              <p className="text-white/70 mt-1">Pick starting price, floor price, and decay rate based on your goals.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-sm text-white/60">03</div>
              <h4 className="mt-2 font-semibold">Publish & track</h4>
              <p className="text-white/70 mt-1">Go live in minutes and monitor performance in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Retailer Benefits */}
      <section id="retailers" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Retailer benefits"
            title="Move stock without moving your team"
          />
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <Feature icon={Store} title="Faster sell-through" desc="Dynamic pricing creates urgency and clears slow-moving inventory." />
            <Feature icon={Users} title="New customer acquisition" desc="Deal-seekers discover your brand through shareable live drops." />
            <Feature icon={Shield} title="Policy-safe" desc="Floor prices protect margins and MAP, while windows keep promos contained." />
            <Feature icon={Sparkles} title="Plug-and-play" desc="Simple setup, no heavy engineering required." />
          </div>
        </div>
      </section>

      {/* Customer Benefits */}
      <section id="customers" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="For shoppers"
            title="The thrill of timing your perfect deal"
          />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-semibold">Watch the drop</h4>
              <p className="text-white/70 mt-2">See prices decrease live until someone grabs it. Wait or buy now — your call.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-semibold">Transparent limits</h4>
              <p className="text-white/70 mt-2">Clear floor prices and countdown timers mean no surprises.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-semibold">Real scarcity</h4>
              <p className="text-white/70 mt-2">Limited quantities and time windows keep it exciting and fair.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section id="compare" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Compare"
            title="What makes us different"
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-4">Feature</th>
                  <th className="p-4">LastDrop</th>
                  <th className="p-4">Traditional markdowns</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={idx} className="border-t border-white/10">
                    <td className="p-4 text-white/80">{row.label}</td>
                    <td className="p-4">
                      {row.lastdrop === true ? (
                        <span className="inline-flex items-center gap-2 text-emerald-400 font-medium"><Check size={16} /> Yes</span>
                      ) : (
                        <span className="text-white/80">{String(row.lastdrop)}</span>
                      )}
                    </td>
                    <td className="p-4 text-white/70">{row.traditional === false ? 'No' : String(row.traditional)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Dynamic clearance products (demo) */}
      <section id="products" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Live drops"
            title="A glimpse of dynamic pricing in action"
            subtitle="Illustrative demo cards. Connect your catalog to power this section with real inventory."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoProducts.map(p => (
              <div key={p.id} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition">
                <div className="h-36 rounded-xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10" />
                <h4 className="mt-4 font-semibold">{p.name}</h4>
                <div className="mt-2 flex items-center gap-3 text-sm">
                  <span className="px-2 py-0.5 rounded bg-white/10">Start ${p.start}</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">Floor ${p.floor}</span>
                  <span className="px-2 py-0.5 rounded bg-[\#f36f2b]/20 text-[\#f36f2b]">{p.drop} now</span>
                </div>
                <div className="mt-3 text-white/70 text-sm">Time left: {p.timeLeft}</div>
                <button className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-4 py-2 rounded-lg">Watch drop</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Contact */}
      <section id="contact" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionTitle
              eyebrow="Get in touch"
              title="Ready to run your first LastDrop?"
              subtitle="Tell us a bit about you. We’ll reach out with a tailored walkthrough for your business."
            />
            <div className="mt-8 p-6 rounded-2xl bg-[rgba(243,111,43,0.08)] border border-[rgba(243,111,43,0.25)]">
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-[\#f36f2b]" /> White-glove onboarding</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[\#f36f2b]" /> No long-term contracts</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[\#f36f2b]" /> Works with your stack</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Name</label>
                <input required value={lead.name} onChange={(e)=>setLead(v=>({...v,name:e.target.value}))} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-[\#f36f2b]" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="text-sm text-white/70">Email</label>
                <input required type="email" value={lead.email} onChange={(e)=>setLead(v=>({...v,email:e.target.value}))} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-[\#f36f2b]" placeholder="jane@brand.com" />
              </div>
              <div>
                <label className="text-sm text-white/70">Role</label>
                <select value={lead.role} onChange={(e)=>setLead(v=>({...v,role:e.target.value}))} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-[\#f36f2b]">
                  <option value="retailer">Retailer</option>
                  <option value="consumer">Consumer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-white/70">Company (optional)</label>
                <input value={lead.company} onChange={(e)=>setLead(v=>({...v,company:e.target.value}))} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-[\#f36f2b]" placeholder="Brand Inc." />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-white/70">Message (optional)</label>
                <textarea value={lead.message} onChange={(e)=>setLead(v=>({...v,message:e.target.value}))} rows={4} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-[\#f36f2b]" placeholder="Tell us what you want to achieve…" />
              </div>
              <label className="sm:col-span-2 flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={lead.consent} onChange={(e)=>setLead(v=>({...v,consent:e.target.checked}))} /> I agree to be contacted about LastDrop.
              </label>
            </div>

            <button disabled={status.state==='loading'} className="mt-5 inline-flex items-center gap-2 bg-[\#f36f2b] hover:brightness-110 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-lg">
              {status.state==='loading' ? 'Sending…' : 'Request a demo'}
            </button>
            {status.state!=='idle' && (
              <div className={`mt-3 text-sm ${status.state==='success' ? 'text-emerald-400' : status.state==='error' ? 'text-red-400' : 'text-white/70'}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/70 text-sm">
          <div>© {new Date().getFullYear()} LastDrop. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
