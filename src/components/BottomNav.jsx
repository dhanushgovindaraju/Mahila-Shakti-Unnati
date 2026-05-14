import React from 'react'

const icons = {
  dashboard: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor"/><rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor"/><rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor"/><rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor"/></svg>
  ),
  members: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor"/><path d="M4 20c1.5-4 7-6 8-6s6.5 2 8 6" stroke="currentColor"/></svg>
  ),
  savings: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v18" stroke="currentColor"/><path d="M5 7h14" stroke="currentColor"/><path d="M5 17h14" stroke="currentColor"/></svg>
  ),
  loans: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="currentColor"/><path d="M6 8v8" stroke="currentColor"/><path d="M18 8v8" stroke="currentColor"/></svg>
  ),
  export: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v12" stroke="currentColor"/><path d="M8 7l4-4 4 4" stroke="currentColor"/><rect x="3" y="17" width="18" height="4" rx="1" stroke="currentColor"/></svg>
  )
}

export default function BottomNav({ page, setPage }) {
  return (
    <nav className="bottom-nav">
      {[
        ['dashboard', 'Dashboard'],
        ['members', 'Members'],
        ['savings', 'Savings'],
        ['loans', 'Loans'],
        ['export', 'Export']
      ].map(([key, label]) => (
        <button key={key} className={page === key ? 'active' : ''} onClick={() => setPage(key)}>
          <div className="icon">{icons[key]}</div>
          <div className="label">{label}</div>
        </button>
      ))}
    </nav>
  )
}
