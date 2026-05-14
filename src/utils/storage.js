const STORAGE_KEY = 'msu_data_v1'

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.error('loadData', e)
  }
  return null
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('saveData', e)
  }
}

export function initSampleData() {
  const now = new Date().toISOString()
  return {
    members: [
      { id: 'm1', name: 'Radha', phone: '9876543210', joined: now },
      { id: 'm2', name: 'Sita', phone: '9876501234', joined: now },
      { id: 'm3', name: 'Gita', phone: '9876509999', joined: now }
    ],
    savings: [
      { id: 's1', memberId: 'm1', amount: 50, date: now, status: 'paid' },
      { id: 's2', memberId: 'm2', amount: 50, date: now, status: 'pending' }
    ],
    loans: [
      { id: 'l1', memberId: 'm3', principal: 500, rate: 12, months: 6, start: now, status: 'active' }
    ],
    activities: [
      { id: 'a1', text: 'Weekly savings added by Radha', date: now }
    ]
  }
}
