import React from 'react'

export default function Header({ title }) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <h1>{title}</h1>
        <p className="sub">Mahila Shakti Unnati</p>
      </div>
    </header>
  )
}
