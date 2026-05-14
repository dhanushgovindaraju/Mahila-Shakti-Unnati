import React from 'react'
import LoanForm from '../components/LoanForm'

export default function Loans({ data, addLoan }) {
  return (
    <div className="page">
      <div className="panel">
        <h3>Loans</h3>
        <LoanForm members={data.members} loans={data.loans} addLoan={addLoan} />
      </div>

      <div className="section">
        <h3>Loan Summary</h3>
        <div className="list">
          {data.loans.map(l => (
            <div key={l.id} className="list-card">
              <div className="list-title">{data.members.find(m=>m.id===l.memberId)?.name || l.memberId}</div>
              <div>Principal: ₹{l.principal} • Interest: {l.rate}% • Months: {l.months}</div>
              <div className="muted">Start: {new Date(l.start).toLocaleDateString()}</div>
              <div style={{marginTop:8}}>
                <div className="muted">Status: {l.status}</div>
                {l.status === 'active' && <div style={{marginTop:8}}><button className="btn small" onClick={() => {
                  // mark paid via custom event to parent
                  const ev = new CustomEvent('markLoanPaid', { detail: { id: l.id } })
                  window.dispatchEvent(ev)
                }}>Mark Paid</button></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
