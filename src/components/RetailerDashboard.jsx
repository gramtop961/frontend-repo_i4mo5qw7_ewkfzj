import { useEffect, useState } from 'react'

export default function RetailerDashboard({ baseUrl }) {
  const [token, setToken] = useState('')
  const [auth, setAuth] = useState({ stage: 'login', email: '', password: '', company: '', contact_name: '' })
  const [orders, setOrders] = useState([])
  const [newOrder, setNewOrder] = useState({ order_number: '', total_amount: 0, currency: 'EUR', items: [], notes: '' })
  const [msg, setMsg] = useState('')

  const headers = token ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } : { 'Content-Type': 'application/json' }

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/orders`, { headers })
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (token) fetchOrders()
  }, [token])

  const register = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      const res = await fetch(`${baseUrl}/api/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: auth.email, password: auth.password, company: auth.company, contact_name: auth.contact_name }) })
      if (!res.ok) throw new Error('Inscription impossible')
      setMsg('Compte créé. Vous pouvez vous connecter.')
      setAuth(a => ({ ...a, stage: 'login' }))
    } catch (e) { setMsg(e.message) }
  }

  const login = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: auth.email, password: auth.password }) })
      if (!res.ok) throw new Error('Identifiants invalides')
      const data = await res.json()
      setToken(data.token)
      setMsg('Connecté')
    } catch (e) { setMsg(e.message) }
  }

  const createOrder = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${baseUrl}/api/orders`, { method: 'POST', headers, body: JSON.stringify(newOrder) })
      if (!res.ok) throw new Error('Erreur création commande')
      setNewOrder({ order_number: '', total_amount: 0, currency: 'EUR', items: [], notes: '' })
      fetchOrders()
    } catch (e) { setMsg(e.message) }
  }

  if (!token) {
    return (
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-xl font-semibold">Espace professionnel</h3>
        <p className="text-white/70 mt-1">Créez un compte pour gérer vos commandes et vos drops.</p>

        {auth.stage === 'register' ? (
          <form onSubmit={register} className="mt-4 grid sm:grid-cols-2 gap-3">
            <input placeholder="E-mail" className="px-3 py-2 rounded bg-white/10 border border-white/10" value={auth.email} onChange={(e)=>setAuth(a=>({...a,email:e.target.value}))} required />
            <input placeholder="Mot de passe" type="password" className="px-3 py-2 rounded bg-white/10 border border-white/10" value={auth.password} onChange={(e)=>setAuth(a=>({...a,password:e.target.value}))} required />
            <input placeholder="Société (optionnel)" className="px-3 py-2 rounded bg-white/10 border border-white/10" value={auth.company} onChange={(e)=>setAuth(a=>({...a,company:e.target.value}))} />
            <input placeholder="Contact (optionnel)" className="px-3 py-2 rounded bg-white/10 border border-white/10" value={auth.contact_name} onChange={(e)=>setAuth(a=>({...a,contact_name:e.target.value}))} />
            <button className="sm:col-span-2 bg-[#f36f2b] text-white px-4 py-2 rounded">Créer un compte</button>
            <div className="sm:col-span-2 text-sm text-white/70">Déjà un compte ? <button type="button" className="underline" onClick={()=>setAuth(a=>({...a,stage:'login'}))}>Se connecter</button></div>
            {msg && <div className="sm:col-span-2 text-sm mt-1">{msg}</div>}
          </form>
        ) : (
          <form onSubmit={login} className="mt-4 grid sm:grid-cols-2 gap-3">
            <input placeholder="E-mail" className="px-3 py-2 rounded bg-white/10 border border-white/10" value={auth.email} onChange={(e)=>setAuth(a=>({...a,email:e.target.value}))} required />
            <input placeholder="Mot de passe" type="password" className="px-3 py-2 rounded bg-white/10 border border-white/10" value={auth.password} onChange={(e)=>setAuth(a=>({...a,password:e.target.value}))} required />
            <button className="sm:col-span-2 bg-[#f36f2b] text-white px-4 py-2 rounded">Se connecter</button>
            <div className="sm:col-span-2 text-sm text-white/70">Nouveau ? <button type="button" className="underline" onClick={()=>setAuth(a=>({...a,stage:'register'}))}>Créer un compte</button></div>
            {msg && <div className="sm:col-span-2 text-sm mt-1">{msg}</div>}
          </form>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Mes commandes</h3>
        <button className="text-sm underline" onClick={()=>{setToken(''); setOrders([])}}>Se déconnecter</button>
      </div>

      <div className="mt-4">
        {orders.length === 0 ? (
          <div className="text-white/70 text-sm">Aucune commande pour le moment.</div>
        ) : (
          <ul className="space-y-3">
            {orders.map(o => (
              <li key={o._id} className="p-3 rounded bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-medium">{o.order_number}</div>
                  <div className="text-white/70 text-sm">{o.status} • {o.total_amount} {o.currency}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={createOrder} className="mt-6 grid sm:grid-cols-2 gap-3">
        <input placeholder="N° commande" className="px-3 py-2 rounded bg-white/10 border border-white/10" value={newOrder.order_number} onChange={(e)=>setNewOrder(o=>({...o,order_number:e.target.value}))} required />
        <input placeholder="Montant total" type="number" step="0.01" className="px-3 py-2 rounded bg-white/10 border border-white/10" value={newOrder.total_amount} onChange={(e)=>setNewOrder(o=>({...o,total_amount:parseFloat(e.target.value)}))} required />
        <input placeholder="Devise" className="px-3 py-2 rounded bg-white/10 border border-white/10" value={newOrder.currency} onChange={(e)=>setNewOrder(o=>({...o,currency:e.target.value}))} />
        <input placeholder="Notes (optionnel)" className="px-3 py-2 rounded bg-white/10 border border-white/10 sm:col-span-2" value={newOrder.notes} onChange={(e)=>setNewOrder(o=>({...o,notes:e.target.value}))} />
        <button className="sm:col-span-2 bg-[#f36f2b] text-white px-4 py-2 rounded">Ajouter une commande</button>
      </form>
    </div>
  )
}
