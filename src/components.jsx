import { useMemo, useState } from 'react'
import {
  CATEGORIES,
  formatMoney,
  monthKey,
  currentMonth,
} from './storage'

function catById(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1]
}

function polar(cx, cy, r, angle) {
  const a = ((angle - 90) * Math.PI) / 180
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

function arcPath(cx, cy, r, start, end) {
  const [x1, y1] = polar(cx, cy, r, end)
  const [x2, y2] = polar(cx, cy, r, start)
  const large = end - start > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 0 ${x2} ${y2}`
}

export function Summary({ operations, month }) {
  const { income, expense, balance } = useMemo(() => {
    let income = 0
    let expense = 0
    for (const op of operations) {
      if (monthKey(op.date) !== month) continue
      if (op.type === 'income') income += op.amount
      else expense += op.amount
    }
    return { income, expense, balance: income - expense }
  }, [operations, month])

  return (
    <section className="summary">
      <article className="summary__card summary__card--balance reveal">
        <p className="summary__label">Баланс за месяц</p>
        <p
          className={
            'summary__value ' +
            (balance >= 0 ? 'is-plus' : 'is-minus')
          }
        >
          {formatMoney(balance)}
        </p>
      </article>
      <article className="summary__card reveal delay-1">
        <p className="summary__label">Доходы</p>
        <p className="summary__value is-plus">{formatMoney(income)}</p>
      </article>
      <article className="summary__card reveal delay-2">
        <p className="summary__label">Расходы</p>
        <p className="summary__value is-minus">{formatMoney(expense)}</p>
      </article>
    </section>
  )
}

export function CategoryChart({ operations, month }) {
  const data = useMemo(() => {
    const map = {}
    for (const op of operations) {
      if (op.type !== 'expense') continue
      if (monthKey(op.date) !== month) continue
      map[op.category] = (map[op.category] || 0) + op.amount
    }
    return Object.entries(map).map(([id, value]) => ({
      name: catById(id).name,
      value,
      color: catById(id).color,
    }))
  }, [operations, month])

  if (data.length === 0) {
    return (
      <div className="chart-empty reveal delay-2">
        <p>Пока нет расходов за этот месяц</p>
      </div>
    )
  }

  return (
    <div className="chart-wrap reveal delay-2">
      <h2 className="block-title">Расходы по категориям</h2>
      <div className="chart-box">
        <svg viewBox="0 0 200 200" className="donut" aria-hidden="true">
          {(() => {
            const total = data.reduce((s, d) => s + d.value, 0)
            let angle = 0
            return data.map((item) => {
              const slice = (item.value / total) * 360
              const start = angle
              const end = angle + Math.max(slice - 1.5, 0.5)
              angle += slice
              return (
                <path
                  key={item.name}
                  d={arcPath(100, 100, 72, start, end)}
                  fill="none"
                  stroke={item.color}
                  strokeWidth="28"
                  strokeLinecap="butt"
                />
              )
            })
          })()}
          <circle cx="100" cy="100" r="48" fill="rgba(7,11,10,0.9)" />
        </svg>
        <ul className="chart-legend">
          {data.map((item) => (
            <li key={item.name}>
              <span style={{ background: item.color }} />
              {item.name}
              <strong>{formatMoney(item.value)}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function TransactionForm({ onAdd }) {
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('food')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)

  function submit(e) {
    e.preventDefault()
    const num = Number(String(amount).replace(',', '.'))
    if (!num || num <= 0) {
      setError('Введите сумму больше 0')
      return
    }
    onAdd({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      type,
      amount: Math.round(num),
      category,
      date,
      comment: comment.trim(),
    })
    setAmount('')
    setComment('')
    setError('')
    setOk(true)
    setTimeout(() => setOk(false), 1200)
  }

  return (
    <form className="form reveal delay-1" onSubmit={submit}>
      <h2 className="block-title">Новая операция</h2>

      <div className="type-switch">
        <button
          type="button"
          className={type === 'expense' ? 'is-active is-expense' : ''}
          onClick={() => setType('expense')}
        >
          Расход
        </button>
        <button
          type="button"
          className={type === 'income' ? 'is-active is-income' : ''}
          onClick={() => setType('income')}
        >
          Доход
        </button>
      </div>

      <label className="field">
        <span>Сумма, ₽</span>
        <input
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
        />
      </label>

      <label className="field">
        <span>Категория</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Дата</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label className="field">
        <span>Комментарий</span>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Необязательно"
          maxLength={80}
        />
      </label>

      {error && <p className="form-msg is-error">{error}</p>}
      {ok && <p className="form-msg is-ok">Сохранено</p>}

      <button type="submit" className="btn-primary">
        Добавить
      </button>
    </form>
  )
}

export function TransactionList({ operations, month, onDelete }) {
  const list = useMemo(() => {
    return operations
      .filter((op) => monthKey(op.date) === month)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [operations, month])

  if (list.length === 0) {
    return (
      <div className="list-empty reveal delay-3">
        <p>Операций за выбранный месяц нет</p>
      </div>
    )
  }

  return (
    <section className="list reveal delay-3">
      <h2 className="block-title">История</h2>
      <ul>
        {list.map((op, i) => {
          const cat = catById(op.category)
          return (
            <li
              key={op.id}
              className="list__item"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span
                className="list__dot"
                style={{ background: cat.color }}
              />
              <div className="list__main">
                <p className="list__title">
                  {cat.name}
                  {op.comment ? (
                    <span className="list__comment"> — {op.comment}</span>
                  ) : null}
                </p>
                <p className="list__date">{op.date}</p>
              </div>
              <p
                className={
                  'list__amount ' +
                  (op.type === 'income' ? 'is-plus' : 'is-minus')
                }
              >
                {op.type === 'income' ? '+' : '−'}
                {formatMoney(op.amount)}
              </p>
              <button
                type="button"
                className="list__del"
                onClick={() => onDelete(op.id)}
                aria-label="Удалить"
              >
                ×
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function MonthFilter({ month, onChange }) {
  return (
    <label className="month-filter">
      <span>Месяц</span>
      <input
        type="month"
        value={month}
        onChange={(e) => onChange(e.target.value || currentMonth())}
      />
    </label>
  )
}
