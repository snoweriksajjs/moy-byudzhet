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
      'Студентам сложно контролировать расходы',
      'Готовые приложения часто перегружены',
      'Нужен простой учёт прямо в браузере',
    ],
  },
  {
    id: 'goal',
    title: 'Цель и задачи',
    points: [
      'Цель: веб-приложение «Мой бюджет»',
      'Учёт доходов и расходов по категориям',
      'Сводка за месяц и диаграмма',
      'Сохранение данных в браузере',
    ],
  },
  {
    id: 'object',
    title: 'Объект и предмет',
    points: [
      'Объект — учёт личных финансов',
      'Предмет — веб-интерфейс и логика отчётов',
      'Методы: анализ аналогов, React, тестирование',
    ],
  },
  {
    id: 'analogs',
    title: 'Анализ аналогов',
    points: [
      'Excel — гибко, но неудобный интерфейс',
      'CoinKeeper / Дзен-мани — много лишнего',
      'Telegram-боты — быстрый ввод, слабые отчёты',
      'Наше решение — простота + наглядность',
    ],
  },
  {
    id: 'stack',
    title: 'Стек технологий',
    points: [
      'React — интерфейс',
      'Vite — сборка проекта',
      'Recharts — диаграмма расходов',
      'localStorage — сохранение данных',
    ],
  },
  {
    id: 'features',
    title: 'Возможности приложения',
    points: [
      'Добавление дохода и расхода',
      'Категории, дата, комментарий',
      'Фильтр по месяцу',
      'Баланс и круговая диаграмма',
    ],
  },
  {
    id: 'practice',
    title: 'Практическая часть',
    points: [
      'Форма новой операции',
      'История с удалением записей',
      'Пересчёт сводки при изменениях',
      'Данные не теряются после обновления страницы',
    ],
  },
  {
    id: 'tests',
    title: 'Тестирование',
    points: [
      'Добавление расхода и дохода — ок',
      'Смена месяца — ок',
      'Удаление операции — ок',
      'Проверка пустой суммы — ок',
    ],
  },
  {
    id: 'result',
    title: 'Результаты',
    points: [
      'Цель достигнута',
      'Работает учёт и отчётность',
      'Подготовлены записка и презентация',
      'Проект готов к защите',
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
