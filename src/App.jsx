import { useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Check, ArrowRight, Store, Users, Clock, TrendingDown, Sparkles, Shield } from 'lucide-react'
import RetailerDashboard from './components/RetailerDashboard'

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
    setStatus({ state: 'loading', message: 'Envoi…' })
    try {
      const res = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setStatus({ state: 'success', message: 'Merci ! Nous vous recontacterons très bientôt.' })
      setLead({ name: '', email: '', role: 'consumer', company: '', message: '', consent: true })
    } catch (err) {
      setStatus({ state: 'error', message: 'Une erreur s\u2019est produite. Veuillez r\u00e9essayer.' })
    }
  }

  const comparison = useMemo(() => ([
    { label: 'Baisse automatique des prix', lastdrop: true, traditional: false },
    { label: 'Écoulement des stocks plus rapide', lastdrop: true, traditional: 'parfois' },
    { label: 'Protège les fenêtres de prix de la marque', lastdrop: true, traditional: false },
    { label: 'La rareté en temps réel booste la conversion', lastdrop: true, traditional: false },
    { label: 'Mise en place simple, sans dév sur-mesure', lastdrop: true, traditional: 'variable' },
  ]), [])

  const demoProducts = [
    { id: 1, name: 'Casque sans fil', start: 129, floor: 79, timeLeft: '1h 22m', drop: '-3%' },
    { id: 2, name: 'Montre connectée Pro', start: 199, floor: 129, timeLeft: '3h 10m', drop: '-7%' },
    { id: 3, name: 'Caméra d’action 4K', start: 249, floor: 159, timeLeft: '45m', drop: '-5%' },
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
            <a href="#why" className="hover:text-white">Pourquoi LastDrop</a>
            <a href="#how" className="hover:text-white">Comment ça marche</a>
            <a href="#retailers" className="hover:text-white">Enseignes</a>
            <a href="#customers" className="hover:text-white">Consommateurs</a>
            <a href="#compare" className="hover:text-white">Comparaison</a>
            <a href="#pro" className="hover:text-white">Espace Pro</a>
          </div>
          <div className="flex items-center gap-2">
            <a href="#products" className="hidden sm:inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-lg">Voir les drops</a>
            <a href="#contact" className="inline-flex items-center gap-2 bg-[\#f36f2b] hover:brightness-110 text-white font-semibold px-4 py-2 rounded-lg transition">
              Commencer <ArrowRight size={18} />
            </a>
          </div>
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
              <Sparkles size={14} className="text-[\#f36f2b]" /> Plateforme de déstockage dynamique
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              Des prix qui baissent. Des paniers qui montent.
            </h1>
            <p className="mt-4 text-white/70 text-lg">
              Attendez le bon moment ou sécurisez le deal maintenant. Une expérience ludique et transparente, pensée pour déclencher l’achat.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a href="#products" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-5 py-3 rounded-lg">
                Explorer les drops
              </a>
              <a href="#pro" className="inline-flex items-center justify-center gap-2 bg-[\#f36f2b] hover:brightness-110 text-white font-semibold px-5 py-3 rounded-lg">
                Créer un compte pro <ArrowRight size={18} />
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <Stat label="+ de conversion" value="+18%" />
              <Stat label="Temps de mise en place" value="< 1 jour" />
              <Stat label="Enseignes intégrées" value="120+" />
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
            eyebrow="Pourquoi LastDrop"
            title="Maximisez la récupération. Minimisez la friction."
            subtitle="Des démarques automatisées et pilotées par des règles pour écouler vos stocks de manière rentable sans repricing manuel permanent."
          />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Feature icon={TrendingDown} title="Décroissance de prix automatisée" desc="Définissez prix de départ, plancher et courbe de décroissance. Nous gérons le temps réel." />
            <Feature icon={Clock} title="Fenêtres temporelles" desc="Protégez vos prix de marque avec des campagnes planifiées et des garde-fous clairs." />
            <Feature icon={Shield} title="Équitable et transparent" desc="Les clients voient la baisse des prix et la rareté en direct — sans artifices." />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Comment ça marche"
            title="Lancez un drop en trois étapes simples"
          />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-sm text-white/60">01</div>
              <h4 className="mt-2 font-semibold">Sélectionnez l'inventaire</h4>
              <p className="text-white/70 mt-1">Choisissez les SKU à écouler et définissez la période de campagne.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-sm text-white/60">02</div>
              <h4 className="mt-2 font-semibold">Définissez la courbe de prix</h4>
              <p className="text-white/70 mt-1">Prix de départ, prix plancher et rythme de décroissance selon vos objectifs.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-sm text-white/60">03</div>
              <h4 className="mt-2 font-semibold">Publiez et suivez</h4>
              <p className="text-white/70 mt-1">Mise en ligne en quelques minutes et suivi des performances en temps réel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Retailer Benefits */}
      <section id="retailers" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Avantages pour les enseignes"
            title="Écoulez le stock sans mobiliser votre équipe"
          />
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <Feature icon={Store} title="Rotation plus rapide" desc="La tarification dynamique crée l'urgence et écoule les invendus." />
            <Feature icon={Users} title="Acquisition de nouveaux clients" desc="Les chasseurs de bonnes affaires découvrent votre marque via des drops partageables." />
            <Feature icon={Shield} title="Conforme aux politiques" desc="Les prix planchers protègent vos marges et la MAP, les fenêtres temporelles cadrent les promos." />
            <Feature icon={Sparkles} title="Plug-and-play" desc="Mise en place simple, sans lourde ingénierie." />
          </div>
        </div>
      </section>

      {/* Customer Benefits */}
      <section id="customers" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Pour les acheteurs"
            title="Le frisson de viser le moment parfait"
            subtitle="Des prix qui bougent, une transparence totale et des quantités limitées : l’équilibre parfait entre jeu et bonne affaire."
          />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-semibold">Suivez la baisse</h4>
              <p className="text-white/70 mt-2">Voyez les prix diminuer en direct jusqu'à ce que quelqu'un achète. Attendre ou acheter maintenant — à vous de jouer.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-semibold">Limites transparentes</h4>
              <p className="text-white/70 mt-2">Prix planchers et compte à rebours clairs — pas de surprises.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="font-semibold">Rareté réelle</h4>
              <p className="text-white/70 mt-2">Quantités limitées et fenêtres de temps rendent l'expérience excitante et équitable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section id="compare" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            eyebrow="Comparaison"
            title="Ce qui nous différencie"
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-4">Fonctionnalité</th>
                  <th className="p-4">LastDrop</th>
                  <th className="p-4">Démarques traditionnelles</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, idx) => (
                  <tr key={idx} className="border-t border-white/10">
                    <td className="p-4 text-white/80">{row.label}</td>
                    <td className="p-4">
                      {row.lastdrop === true ? (
                        <span className="inline-flex items-center gap-2 text-emerald-400 font-medium"><Check size={16} /> Oui</span>
                      ) : (
                        <span className="text-white/80">{String(row.lastdrop)}</span>
                      )}
                    </td>
                    <td className="p-4 text-white/70">{row.traditional === false ? 'Non' : String(row.traditional)}</td>
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
            eyebrow="Drops en direct"
            title="Un aperçu de la tarification dynamique en action"
            subtitle="Cartes démo à titre illustratif. Connectez votre catalogue pour alimenter cette section avec un stock réel."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoProducts.map(p => (
              <div key={p.id} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition">
                <div className="h-36 rounded-xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10" />
                <h4 className="mt-4 font-semibold">{p.name}</h4>
                <div className="mt-2 flex items-center gap-3 text-sm">
                  <span className="px-2 py-0.5 rounded bg-white/10">Départ ${p.start}</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">Plancher ${p.floor}</span>
                  <span className="px-2 py-0.5 rounded bg-[\#f36f2b]/20 text-[\#f36f2b]">{p.drop} maintenant</span>
                </div>
                <div className="mt-3 text-white/70 text-sm">Temps restant : {p.timeLeft}</div>
                <button className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-4 py-2 rounded-lg">Suivre le drop</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Area */}
      <section id="pro" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionTitle
              eyebrow="Espace professionnel"
              title="Gérez vos commandes et vos drops"
              subtitle="Créez un compte pour accéder à votre tableau de bord, suivre vos commandes et lancer vos campagnes LastDrop."
            />
            <div className="mt-8 p-6 rounded-2xl bg-[rgba(243,111,43,0.08)] border border-[rgba(243,111,43,0.25)]">
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-[\#f36f2b]" /> Création de compte en 1 minute</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[\#f36f2b]" /> Suivi en temps réel</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[\#f36f2b]" /> Export CSV / intégrations</li>
              </ul>
            </div>
          </div>
          <RetailerDashboard baseUrl={baseUrl} />
        </div>
      </section>

      {/* CTA + Contact */}
      <section id="contact" className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionTitle
              eyebrow="Nous contacter"
              title="Prêt à lancer votre premier LastDrop ?"
              subtitle="Parlez-nous de vous. Nous vous proposerons une démonstration adaptée à votre activité."
            />
            <div className="mt-8 p-6 rounded-2xl bg-[rgba(243,111,43,0.08)] border border-[rgba(243,111,43,0.25)]">
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-center gap-2"><Check size={16} className="text-[\#f36f2b]" /> Accompagnement premium</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[\#f36f2b]" /> Sans engagement long terme</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-[\#f36f2b]" /> Compatible avec votre stack</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Nom</label>
                <input required value={lead.name} onChange={(e)=>setLead(v=>({...v,name:e.target.value}))} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-[\#f36f2b]" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="text-sm text-white/70">E-mail</label>
                <input required type="email" value={lead.email} onChange={(e)=>setLead(v=>({...v,email:e.target.value}))} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-[\#f36f2b]" placeholder="jane@brand.com" />
              </div>
              <div>
                <label className="text-sm text-white/70">Rôle</label>
                <select value={lead.role} onChange={(e)=>setLead(v=>({...v,role:e.target.value}))} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-[\#f36f2b]">
                  <option value="retailer">Enseigne</option>
                  <option value="consumer">Consommateur</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-white/70">Société (optionnel)</label>
                <input value={lead.company} onChange={(e)=>setLead(v=>({...v,company:e.target.value}))} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-[\#f36f2b]" placeholder="Brand Inc." />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-white/70">Message (optionnel)</label>
                <textarea value={lead.message} onChange={(e)=>setLead(v=>({...v,message:e.target.value}))} rows={4} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-[\#f36f2b]" placeholder="Dites-nous ce que vous souhaitez atteindre…" />
              </div>
              <label className="sm:col-span-2 flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" checked={lead.consent} onChange={(e)=>setLead(v=>({...v,consent:e.target.checked}))} /> J'accepte d'être contacté(e) au sujet de LastDrop.
              </label>
            </div>

            <button disabled={status.state==='loading'} className="mt-5 inline-flex items-center gap-2 bg-[\#f36f2b] hover:brightness-110 disabled:opacity-60 text-white font-semibold px-5 py-3 rounded-lg">
              {status.state==='loading' ? 'Envoi…' : 'Demander une démo'}
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
          <div>© {new Date().getFullYear()} LastDrop. Tous droits réservés.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Confidentialité</a>
            <a href="#" className="hover:text-white">Conditions</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
