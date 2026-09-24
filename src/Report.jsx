const NAV = [
  { id: 'intro', label: 'Введение' },
  { id: 'ch1', label: '1. Теоретическая часть' },
  { id: 'ch2', label: '2. Практическая часть' },
  { id: 'outro', label: 'Заключение' },
  { id: 'sources', label: 'Источники' },
]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Report({ onBack }) {
  return (
    <div className="page report-page">
      <div className="report-top reveal">
        <button type="button" className="nav-link" onClick={onBack}>
          ← Назад
        </button>
      </div>

      <article className="report reveal delay-1">
        <header className="report-title">
          <p>Министерство науки и высшего образования РФ</p>
          <p>ФГАОУ ВО «СПбПУ»</p>
          <p>Институт среднего профессионального образования</p>
          <p className="report-title__spacer">
            Специальность: 09.02.11 Разработка и управление программным
            обеспечением
          </p>
          <p>Группа: 09.02.11/1094</p>
          <h1>Пояснительная записка к проекту</h1>
          <p className="report-theme">
            на тему: «Разработка веб-приложения для учёта личных финансов»
          </p>
          <p>Дисциплина: Основы проектной деятельности</p>
          <div className="report-authors">
            <p>Студенты: Шиханцов Егор, Камынин Егор</p>
            <p>Руководитель: Андреев В.А.</p>
          </div>
          <p>Санкт-Петербург, 2026</p>
        </header>

        <nav className="report-toc">
          <h2>Содержание</h2>
          <ol>
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="toc-btn"
                  onClick={() => scrollToId(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <section id="intro" className="report-section">
          <h2>Введение</h2>
          <p>
            <strong>Актуальность.</strong> У студентов часто небольшие доходы, а
            траты не считаются. Обычные приложения для бюджета тяжёлые и просят
            регистрацию. Мы сделали простое веб-приложение, которое открывается в
            браузере и помогает вести учёт.
          </p>
          <p>
            <strong>Цель:</strong> сделать веб-приложение «Мой бюджет» для учёта
            доходов и расходов.
          </p>
          <p>
            <strong>Задачи:</strong>
          </p>
          <ol>
            <li>посмотреть аналоги;</li>
            <li>придумать структуру данных и экраны;</li>
            <li>сделать добавление и удаление операций;</li>
            <li>добавить фильтр по месяцу, сводку и диаграмму;</li>
            <li>сохранять данные в localStorage;</li>
            <li>написать записку и презентацию.</li>
          </ol>
          <p>
            <strong>Объект:</strong> учёт личных финансов.
          </p>
          <p>
            <strong>Предмет:</strong> интерфейс и логика учёта операций.
          </p>
          <p>
            <strong>Методы:</strong> анализ аналогов, разработка на React,
            ручное тестирование.
          </p>
          <p>
            <strong>Практическая значимость:</strong> можно пользоваться без
            установки программ.
          </p>
          <p>
            <strong>Стек:</strong> React, Vite, localStorage.
          </p>
          <p>
            Сайт: https://opdproject.vercel.app
          </p>
        </section>

        <section id="ch1" className="report-section">
          <h2>1. Теоретическая часть</h2>
          <h3>1.1. Предметная область</h3>
          <p>
            Учёт финансов — это запись доходов и расходов, категории и подсчёт
            баланса. Обычно люди пишут в Excel или ставят приложение на телефон.
            Для учёбы удобнее сайт: его легко показать на защите.
          </p>

          <h3>1.2. Анализ аналогов</h3>
          <div className="report-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Аналог</th>
                  <th>Плюсы</th>
                  <th>Минусы</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Excel</td>
                  <td>привычно</td>
                  <td>неудобно и легко ошибиться</td>
                </tr>
                <tr>
                  <td>CoinKeeper</td>
                  <td>много функций</td>
                  <td>сложно для простого учёта</td>
                </tr>
                <tr>
                  <td>Telegram-боты</td>
                  <td>быстро вносить</td>
                  <td>плохо видно отчёты</td>
                </tr>
                <tr>
                  <td>Наше приложение</td>
                  <td>просто и наглядно</td>
                  <td>нет синхронизации между устройствами</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>1.3. Почему такой стек</h3>
          <p>
            React удобен для интерфейса. Vite быстро собирает проект. Данные
            кладём в localStorage — сервер не нужен. Диаграмму нарисовали через
            SVG.
          </p>
        </section>

        <section id="ch2" className="report-section">
          <h2>2. Практическая часть</h2>
          <h3>2.1. Файлы</h3>
          <ul>
            <li>
              <code>App.jsx</code> — главная страница
            </li>
            <li>
              <code>components.jsx</code> — форма, список, сводка
            </li>
            <li>
              <code>storage.js</code> — сохранение операций
            </li>
            <li>
              <code>Report.jsx</code> — записка
            </li>
            <li>
              <code>Slides.jsx</code> — презентация
            </li>
            <li>
              <code>CursorBg.jsx</code> — фон и круг за курсором
            </li>
          </ul>

          <h3>2.2. Данные</h3>
          <pre className="report-code">{`{
  id: "...",
  type: "income" | "expense",
  amount: 450,
  category: "food",
  date: "2026-09-24",
  comment: "Продукты"
}`}</pre>

          <h3>2.3. Что умеет</h3>
          <ul>
            <li>доход / расход</li>
            <li>категории и комментарий</li>
            <li>фильтр по месяцу</li>
            <li>баланс и диаграмма</li>
            <li>удаление из истории</li>
          </ul>

          <h3>2.4. Тесты</h3>
          <div className="report-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Сценарий</th>
                  <th>Результат</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>добавить расход</td>
                  <td>ок</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>добавить доход</td>
                  <td>ок</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>сменить месяц</td>
                  <td>ок</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>удалить запись</td>
                  <td>ок</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>обновить страницу</td>
                  <td>данные на месте</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>пустая сумма</td>
                  <td>ошибка, не сохраняет</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="outro" className="report-section">
          <h2>Заключение</h2>
          <p>
            Цель выполнена: приложение считает доходы и расходы, показывает
            сводку и диаграмму, данные сохраняются в браузере.
          </p>
          <p>
            Дальше можно добавить экспорт в CSV и лимиты по категориям.
          </p>
        </section>

        <section id="sources" className="report-section">
          <h2>Список использованных источников</h2>
          <ol className="report-sources">
            <li>
              Документация React. — URL: https://react.dev (дата обращения:
              24.09.2026).
            </li>
            <li>
              Документация Vite. — URL: https://vite.dev (дата обращения:
              24.09.2026).
            </li>
            <li>
              MDN SVG. — URL: https://developer.mozilla.org/docs/Web/SVG
              (дата обращения: 24.09.2026).
            </li>
            <li>
              MDN. localStorage. — URL:
              https://developer.mozilla.org/docs/Web/API/Window/localStorage
              (дата обращения: 24.09.2026).
            </li>
          </ol>
        </section>
      </article>
    </div>
  )
}
