import React, { useState } from 'react'

export default function SavingsForm({ members, addSavings }) {
  const [memberId, setMemberId] = useState(members[0]?.id || '')
  const [amount, setAmount] = useState(50)
  const [status, setStatus] = useState('paid')

  function submit(e) {
    e.preventDefault()
    if (!memberId) return alert('Select member')
    if (!amount || Number(amount) <= 0) return alert('Enter amount')
    addSavings({ memberId, amount: Number(amount), status })
  }

  return (
    <form onSubmit={submit} className="form-row">
      <select value={memberId} onChange={e => setMemberId(e.target.value)}>
        {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
      </select>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
      </select>
      <button className="btn" type="submit">Add</button>
    </form>
  )
}
