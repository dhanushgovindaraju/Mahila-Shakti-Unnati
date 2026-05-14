import React, { useState } from 'react'

function simpleInterest(p, r, months) {
  const years = months / 12
  return Math.round((p * r * years) / 100)
}

export default function LoanForm({ members, loans, addLoan }) {
  const [memberId, setMemberId] = useState(members[0]?.id || '')
  const [principal, setPrincipal] = useState(500)
  const [rate, setRate] = useState(12)
  const [months, setMonths] = useState(6)
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))

  function submit(e) {
    e.preventDefault()
    if (!memberId) return
    // prevent duplicate active loans
    const hasActive = loans.some(l => l.memberId === memberId && l.status === 'active')
    if (hasActive) return alert('Member already has an active loan')
    if (!principal || Number(principal) <= 0) return alert('Enter principal')
    const interest = simpleInterest(principal, rate, months)
    addLoan({ memberId, principal: Number(principal), rate: Number(rate), months: Number(months), interest, start: date })
  }

  return (
    <form className="form-row" onSubmit={submit}>
      <select value={memberId} onChange={e => setMemberId(e.target.value)}>
        {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
      </select>
      <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
      <input type="number" value={rate} onChange={e => setRate(e.target.value)} />
      <input type="number" value={months} onChange={e => setMonths(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button className="btn" type="submit">Create Loan</button>
    </form>
  )
}
