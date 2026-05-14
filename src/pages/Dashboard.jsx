import React from 'react'
import Card from '../components/Card'

export default function Dashboard({ data }) {
  const totalSavings = data.savings.reduce((s, x) => s + (x.status === 'paid' ? x.amount : 0), 0)
  const membersCount = data.members.length
  const activeLoans = data.loans.filter(l => l.status === 'active').length
  const pendingSavings = data.savings.filter(s => s.status === 'pending').length

  return (
    <div className="page">
      <div className="cards">
        <Card title="Total Savings" value={`₹ ${totalSavings}`} />
        <Card title="Members" value={membersCount} />
        <Card title="Active Loans" value={activeLoans} />
        <Card title="Pending Savings" value={pendingSavings} />
      </div>

      <section className="section">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {data.activities.slice().reverse().map(a => (
            <div key={a.id} className="activity-item">{a.text} <span className="muted">{new Date(a.date).toLocaleString()}</span></div>
          ))}
        </div>
      </section>
    </div>
  )
}
