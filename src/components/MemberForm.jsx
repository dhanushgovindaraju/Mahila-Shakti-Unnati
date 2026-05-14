import React, { useState, useEffect } from 'react'

export default function MemberForm({ addMember }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [touched, setTouched] = useState(false)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    const ok = name.trim().length > 0 && /^\d{10}$/.test(phone)
    setValid(ok)
  }, [name, phone])

  function onPhoneChange(e) {
    // allow only digits and limit to 10
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
    setPhone(digits)
  }

  function submit(e) {
    e.preventDefault()
    setTouched(true)
    if (!valid) return
    addMember({ name: name.trim(), phone: phone.trim() })
    setName('')
    setPhone('')
    setTouched(false)
  }

  return (
    <form className="panel" onSubmit={submit}>
      <h3>Add Member</h3>
      <div className="form-row">
        <input
          placeholder="Member name"
          value={name}
          onChange={e => setName(e.target.value)}
          aria-label="Member name"
        />
        <input
          placeholder="Phone number"
          value={phone}
          onChange={onPhoneChange}
          inputMode="numeric"
          pattern="\d{10}"
          maxLength={10}
          aria-label="Phone number"
          onBlur={() => setTouched(true)}
        />

        <button type="submit" className="btn" disabled={!valid}>Add</button>
      </div>
      <div style={{height:18}}>
        {touched && !/^\d{10}$/.test(phone) && (
          <div className="field-error">Phone number must contain 10 digits</div>
        )}
      </div>
    </form>
  )
}
