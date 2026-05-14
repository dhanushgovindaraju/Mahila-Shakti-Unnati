import React from 'react'

export default function Card({ title, value, children }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{title}</div>
        <div className="card-value">{value}</div>
        {children}
      </div>
    </div>
  )
}
