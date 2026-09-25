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

/** Верхний предел суммы одной операции — чтобы UI и Number не ломались */
export const MAX_AMOUNT = 999_999_999_999

const KEY = 'finance_ops_v1'

function clampAmount(n) {
  const value = Math.round(Number(n))
  if (!Number.isFinite(value) || value <= 0) return null
  return Math.min(value, MAX_AMOUNT)
}

function sanitizeOperations(list) {
  if (!Array.isArray(list)) return getDemoData()
  return list
    .map((op) => {
      if (!op || typeof op !== 'object') return null
      const amount = clampAmount(op.amount)
      if (amount == null) return null
      return { ...op, amount }
    })
    .filter(Boolean)
}

export function loadOperations() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return getDemoData()
    return sanitizeOperations(JSON.parse(raw))
  } catch {
    return getDemoData()
  }
}

export function saveOperations(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

/** Разбор суммы из поля ввода. null — невалидно или слишком большая. */
export function parseAmount(raw) {
  const cleaned = String(raw ?? '')
    .trim()
    .replace(/\s/g, '')
    .replace(',', '.')
  if (!cleaned || /[eE]/.test(cleaned)) return null
  const num = Number(cleaned)
  if (!Number.isFinite(num) || num <= 0) return null
  const rounded = Math.round(num)
  if (rounded > MAX_AMOUNT) return null
  return rounded
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
  const value = Number(n)
  if (!Number.isFinite(value)) return '—'

  const abs = Math.abs(value)
  // Компактная запись для миллиардов+, чтобы длинные числа не раздували карточки
  if (abs >= 1_000_000_000) {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(value)
  }

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}

export function monthKey(dateStr) {
  return dateStr.slice(0, 7)
}

export function currentMonth() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
