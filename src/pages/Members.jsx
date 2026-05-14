import React, { useState } from 'react'
import MemberForm from '../components/MemberForm'
import MemberList from '../components/MemberList'

export default function Members({ data, addMember, deleteMember }) {
  return (
    <div className="page">
      <MemberForm addMember={addMember} />
      <MemberList members={data.members} savings={data.savings} loans={data.loans} deleteMember={deleteMember} />
    </div>
  )
}
