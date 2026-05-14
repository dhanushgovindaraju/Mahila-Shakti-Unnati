import React from 'react'

export default function MemberList({ members, savings, loans, deleteMember }) {
  return (
    <div className="list">
      {members.map(m => {
        const memberSavings = savings.filter(s => s.memberId === m.id && s.status === 'paid').reduce((s, x) => s + x.amount, 0)
        const memberLoan = loans.find(l => l.memberId === m.id && l.status === 'active')
        return (
          <div key={m.id} className="list-card member-card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div className="list-title">{m.name}</div>
                <div className="muted">{m.phone || ''}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontWeight:700}}>₹ {memberSavings}</div>
                <div className="muted">{memberLoan ? 'Loan Active' : 'No Loan'}</div>
              </div>
            </div>
            <div style={{marginTop:8,display:'flex',gap:8}}>
              <button className="btn small danger" onClick={() => deleteMember(m.id)}>Delete</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
