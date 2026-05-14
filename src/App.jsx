import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Savings from './pages/Savings'
import Loans from './pages/Loans'
import ExportPage from './pages/Export'
import { loadData, saveData, initSampleData } from './utils/storage'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [data, setData] = useState(() => loadData() || initSampleData())

  useEffect(() => {
    // save on change
    saveData(data)
  }, [data])

  // actions
  function addMember(payload) {
    const id = 'm' + Date.now()
    setData(d => ({ ...d, members: [...d.members, { id, name: payload.name, phone: payload.phone, joined: new Date().toISOString() }], activities: [...d.activities, { id: 'a'+Date.now(), text: `Member added: ${payload.name}`, date: new Date().toISOString() }] }))
  }

  function addSavings(payload) {
    const id = 's' + Date.now()
    setData(d => ({ ...d, savings: [...d.savings, { id, memberId: payload.memberId, amount: payload.amount, date: new Date().toISOString(), status: payload.status }], activities: [...d.activities, { id: 'a'+Date.now(), text: `Savings ${payload.status} ₹${payload.amount}`, date: new Date().toISOString() }] }))
  }

  function addLoan(payload) {
    const id = 'l' + Date.now()
    setData(d => ({ ...d, loans: [...d.loans, { id, memberId: payload.memberId, principal: payload.principal, rate: payload.rate, months: payload.months, interest: payload.interest || 0, start: payload.start || new Date().toISOString(), status: 'active' }], activities: [...d.activities, { id: 'a'+Date.now(), text: `Loan created for ${d.members.find(m=>m.id===payload.memberId)?.name || payload.memberId}`, date: new Date().toISOString() }] }))
  }

  function deleteMember(id) {
    if (!confirm('Delete member and all related records?')) return
    setData(d => ({ ...d, members: d.members.filter(m => m.id !== id), savings: d.savings.filter(s => s.memberId !== id), loans: d.loans.filter(l => l.memberId !== id), activities: [...d.activities, { id: 'a'+Date.now(), text: `Member deleted: ${id}`, date: new Date().toISOString() }] }))
  }

  function toggleSavingsStatus(id) {
    setData(d => ({ ...d, savings: d.savings.map(s => s.id === id ? { ...s, status: s.status === 'paid' ? 'pending' : 'paid' } : s) }))
  }

  function deleteSaving(id) {
    if (!confirm('Delete saving entry?')) return
    setData(d => ({ ...d, savings: d.savings.filter(s => s.id !== id) }))
  }

  function markLoanPaid(id) {
    setData(d => ({ ...d, loans: d.loans.map(l => l.id === id ? { ...l, status: 'paid' } : l), activities: [...d.activities, { id: 'a'+Date.now(), text: `Loan repaid: ${id}`, date: new Date().toISOString() }] }))
  }

  useEffect(()=>{
    const handler = (e) => markLoanPaid(e.detail.id)
    window.addEventListener('markLoanPaid', handler)
    return () => window.removeEventListener('markLoanPaid', handler)
  },[])

  const pageProps = { data, addMember, addSavings, addLoan }
  // pass actions
  const actions = { deleteMember, toggleSavingsStatus, deleteSaving }

  return (
    <div className="app-root">
      <div className="phone-frame">
        <div className="app-shell">
        <Header title="Mahila Shakti" />

        <main className="content">
          {page === 'dashboard' && <Dashboard data={data} />}
          {page === 'members' && <Members data={data} addMember={addMember} deleteMember={deleteMember} />}
          {page === 'savings' && <Savings data={data} addSavings={addSavings} toggleSavingsStatus={toggleSavingsStatus} deleteSaving={deleteSaving} />}
          {page === 'loans' && <Loans data={data} addLoan={addLoan} />}
          {page === 'export' && <ExportPage data={data} />}
        </main>

        <BottomNav page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  )
}
