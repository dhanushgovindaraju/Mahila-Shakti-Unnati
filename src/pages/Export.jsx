import React from 'react'

export default function ExportPage({ data }) {
  const summary = {
    members: data.members.length,
    totalSavings: data.savings.filter(s => s.status === 'paid').reduce((s, x) => s + x.amount, 0),
    activeLoans: data.loans.filter(l => l.status === 'active').length
  }

  function copyReport() {
    const text = `Summary:\nMembers: ${summary.members}\nTotal Savings: ₹ ${summary.totalSavings}\nActive Loans: ${summary.activeLoans}`
    navigator.clipboard?.writeText(text)
      .then(() => alert('Report copied'))
      .catch(() => alert('Copy failed'))
  }

  function shareWhatsApp() {
    const text = `Mahila Shakti Unnati - Summary:\nMembers: ${summary.members}\nTotal Savings: ₹ ${summary.totalSavings}\nActive Loans: ${summary.activeLoans}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="page">
      <div className="panel">
        <h3>Financial Summary</h3>
        <div className="list-card">Members: {summary.members}</div>
        <div className="list-card">Total Savings: ₹ {summary.totalSavings}</div>
        <div className="list-card">Active Loans: {summary.activeLoans}</div>
        <div style={{marginTop:12}}>
          <button className="btn" onClick={copyReport}>Copy / Share Report</button>
          <button className="btn" style={{marginLeft:8}} onClick={shareWhatsApp}>Share on WhatsApp</button>
        </div>
      </div>
    </div>
  )
}
