import { useEffect, useState } from 'react'
import {
  Summary,
  CategoryChart,
  TransactionForm,
  TransactionList,
  MonthFilter,
} from './components'
import {
  loadOperations,
  saveOperations,
  currentMonth,
} from './storage'
import Report from './Report'
import Slides from './Slides'
import './App.css'

function getPage() {
  const hash = window.location.hash.replace(/^#/, '')
  if (hash === 'zapiska' || hash.startsWith('zapiska/')) return 'zapiska'
  if (hash === 'slides' || hash === 'prezentaciya') return 'slides'
  return 'app'
}

function App() {
  const [page, setPage] = useState(getPage)
  const [operations, setOperations] = useState(() => loadOperations())
  const [month, setMonth] = useState(() => currentMonth())

  useEffect(() => {
    saveOperations(operations)
  }, [operations])

  useEffect(() => {
    function onHash() {
      setPage(getPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  function openReport() {
    window.location.hash = 'zapiska'
    setPage('zapiska')
    window.scrollTo(0, 0)
  }

  function openSlides() {
    window.location.hash = 'slides'
    setPage('slides')
    window.scrollTo(0, 0)
  }

  function openApp() {
    history.pushState('', document.title, window.location.pathname + window.location.search)
    setPage('app')
    window.scrollTo(0, 0)
  }

  function addOperation(op) {
    setOperations((prev) => [op, ...prev])
    setMonth(op.date.slice(0, 7))
  }

  function deleteOperation(id) {
    setOperations((prev) => prev.filter((op) => op.id !== id))
  }

  if (page === 'zapiska') {
    return <Report onBack={openApp} />
  }

  if (page === 'slides') {
    return <Slides onBack={openApp} />
  }

  return (
    <div className="page">
      <div className="bg-glow" aria-hidden="true" />
      <header className="header reveal">
        <div>
          <p className="header__eyebrow">Учёт финансов</p>
          <h1 className="header__title">Мой бюджет</h1>
        </div>
        <div className="header__right">
          <button type="button" className="nav-link" onClick={openReport}>
            Записка
          </button>
          <button type="button" className="nav-link" onClick={openSlides}>
            Презентация
          </button>
          <MonthFilter month={month} onChange={setMonth} />
        </div>
      </header>

      <Summary operations={operations} month={month} />

      <div className="grid">
        <TransactionForm onAdd={addOperation} />
        <CategoryChart operations={operations} month={month} />
      </div>

      <TransactionList
        operations={operations}
        month={month}
        onDelete={deleteOperation}
      />

      <footer className="footer">
        <p>ОПД · Шиханцов Е. · Камынин Е. · 09.02.11/1094</p>
        <div className="footer__links">
          <button type="button" className="footer__link" onClick={openReport}>
            Пояснительная записка
          </button>
          <button type="button" className="footer__link" onClick={openSlides}>
            Презентация
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
