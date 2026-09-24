import { useEffect, useState } from 'react'

const SLIDES = [
  {
    id: 'title',
    type: 'title',
    eyebrow: 'Основы проектной деятельности',
    title: 'Мой бюджет',
    subtitle: 'Веб-приложение для учёта личных финансов',
    meta: [
      'Шиханцов Егор · Камынин Егор',
      'Группа 09.02.11/1094',
      'Руководитель: Андреев В.А.',
    ],
  },
  {
    id: 'actual',
    title: 'Актуальность',
    points: [
      'Студентам сложно следить за тратами',
      'Обычные приложения слишком сложные',
      'Нужен простой сайт в браузере',
    ],
  },
  {
    id: 'goal',
    title: 'Цель и задачи',
    points: [
      'Сделать «Мой бюджет»',
      'Доходы и расходы по категориям',
      'Сводка и диаграмма',
      'Сохранение в браузере',
    ],
  },
  {
    id: 'object',
    title: 'Объект и предмет',
    points: [
      'Объект — личные финансы',
      'Предмет — интерфейс и отчёты',
      'React + ручные тесты',
    ],
  },
  {
    id: 'analogs',
    title: 'Аналоги',
    points: [
      'Excel — неудобно',
      'CoinKeeper — много лишнего',
      'Боты — плохо с отчётами',
      'Мы — просто и наглядно',
    ],
  },
  {
    id: 'stack',
    title: 'Стек',
    points: [
      'React',
      'Vite',
      'SVG-диаграмма',
      'localStorage',
    ],
  },
  {
    id: 'features',
    title: 'Что умеет',
    points: [
      'Доход и расход',
      'Категории и комментарий',
      'Фильтр по месяцу',
      'Баланс и диаграмма',
    ],
  },
  {
    id: 'practice',
    title: 'Практика',
    points: [
      'Форма операции',
      'История',
      'Пересчёт сводки',
      'Данные не пропадают',
    ],
  },
  {
    id: 'tests',
    title: 'Тесты',
    points: [
      'Добавление — ок',
      'Смена месяца — ок',
      'Удаление — ок',
      'Пустая сумма — ошибка',
    ],
  },
  {
    id: 'result',
    title: 'Итог',
    points: [
      'Цель выполнена',
      'Учёт работает',
      'Есть записка и презентация',
      'Можно защищать',
    ],
  },
  {
    id: 'end',
    type: 'end',
    title: 'Спасибо за внимание',
    subtitle: 'Вопросы?',
    meta: ['Шиханцов Егор · Камынин Егор', '09.02.11/1094'],
  },
]

export default function Slides({ onBack }) {
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index]

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        setIndex((i) => Math.min(i + 1, SLIDES.length - 1))
      }
      if (e.key === 'ArrowLeft') {
        setIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBack])

  return (
    <div className="slides-page">
      <div className="slides-top">
        <button type="button" className="nav-link" onClick={onBack}>
          ← К приложению
        </button>
        <a className="nav-link" href="/prezentaciya.pdf" download>
          Скачать PDF
        </a>
        <p className="slides-counter">
          {index + 1} / {SLIDES.length}
        </p>
      </div>

      <div className="slide-stage">
        <article key={slide.id} className={`slide slide--${slide.type || 'content'}`}>
          {slide.eyebrow && <p className="slide__eyebrow">{slide.eyebrow}</p>}
          <h1 className="slide__title">{slide.title}</h1>
          {slide.subtitle && <p className="slide__subtitle">{slide.subtitle}</p>}
          {slide.points && (
            <ul className="slide__points">
              {slide.points.map((p, i) => (
                <li key={p} style={{ animationDelay: `${0.12 + i * 0.08}s` }}>
                  {p}
                </li>
              ))}
            </ul>
          )}
          {slide.meta && (
            <div className="slide__meta">
              {slide.meta.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          )}
        </article>
      </div>

      <div className="slides-nav">
        <button
          type="button"
          className="nav-link"
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          Назад
        </button>
        <div className="slides-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={'dot' + (i === index ? ' is-active' : '')}
              aria-label={`Слайд ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="nav-link"
          disabled={index === SLIDES.length - 1}
          onClick={() => setIndex((i) => i + 1)}
        >
          Далее
        </button>
      </div>
    </div>
  )
}

export { SLIDES }
