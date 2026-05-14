import React from 'react'
import SavingsForm from '../components/SavingsForm'

export default function Savings({ data, addSavings, toggleSavingsStatus, deleteSaving }) {
  const total = data.savings.filter(s => s.status === 'paid').reduce((s, x) => s + x.amount, 0)
  return (
    <div className="page">
      <div className="panel">
        <h3>Record Savings</h3>
        <SavingsForm members={data.members} addSavings={addSavings} />
      </div>
      <div className="section">
        <h3>Total Savings: ₹ {total}</h3>
        <div className="list">
          {data.savings.slice().reverse().map(s => (
            <div key={s.id} className="list-card">
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div>
                  <div style={{fontWeight:700}}>₹ {s.amount}</div>
                  <div className="muted">{data.members.find(m=>m.id===s.memberId)?.name || s.memberId}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="muted">{new Date(s.date).toLocaleDateString()}</div>
                  <div style={{marginTop:6}}>
                    <button className="btn small" onClick={() => toggleSavingsStatus(s.id)}>{s.status === 'paid' ? 'Mark Pending' : 'Mark Paid'}</button>
                    <button className="btn small danger" style={{marginLeft:8}} onClick={() => deleteSaving(s.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
