export const CATEGORIES = [
  { id: 'food', name: 'Еда', color: '#2a9d8f' },
  { id: 'transport', name: 'Транспорт', color: '#457b9d' },
  { id: 'home', name: 'Жильё', color: '#e9c46a' },
  { id: 'fun', name: 'Развлечения', color: '#e76f51' },
  { id: 'study', name: 'Учёба', color: '#bc6c25' },
  { id: 'health', name: 'Здоровье', color: '#40916c' },
  { id: 'salary', name: 'Зарплата / стипендия', color: '#264653' },
  { id: 'other', name: 'Другое', color: '#6c757d' },
]

const KEY = 'finance_ops_v1'

export function loadOperations() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return getDemoData()
    return JSON.parse(raw)
  } catch {
    return getDemoData()
  }
}

export function saveOperations(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

function getDemoData() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  return [
    {
      id: 'd1',
      type: 'income',
      amount: 18000,
      category: 'salary',
      date: `${y}-${m}-01`,
      comment: 'Стипендия',
    },
    {
      id: 'd2',
      type: 'expense',
      amount: 450,
      category: 'food',
      date: `${y}-${m}-03`,
      comment: 'Продукты',
    },
    {
      id: 'd3',
      type: 'expense',
      amount: 120,
      category: 'transport',
      date: `${y}-${m}-05`,
      comment: 'Метро',
    },
    {
      id: 'd4',
      type: 'expense',
      amount: 890,
      category: 'fun',
      date: `${y}-${m}-08`,
      comment: 'Кино',
    },
    {
      id: 'd5',
      type: 'expense',
      amount: 2100,
      category: 'study',
      date: `${y}-${m}-10`,
      comment: 'Учебники',
    },
  ]
}

export function formatMoney(n) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(n)
}

export function monthKey(dateStr) {
  return dateStr.slice(0, 7)
}

export function currentMonth() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
