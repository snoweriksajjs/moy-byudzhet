import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public')
mkdirSync(outDir, { recursive: true })

const W = 842
const H = 595

const slidesRu = [
  {
    kind: 'dark',
    title: 'Мой бюджет',
    lines: [
      'Веб-приложение для учёта личных финансов',
      '',
      'Шиханцов Егор  ·  Камынин Егор',
      'Группа 09.02.11/1094',
      'Руководитель: Андреев В.А.',
      'ОПД · СПбПУ · 2026',
    ],
  },
  {
    kind: 'light',
    title: 'Актуальность',
    lines: [
      'Студентам сложно контролировать расходы',
      'Готовые приложения часто перегружены',
      'Нужен простой учёт прямо в браузере',
    ],
  },
  {
    kind: 'light',
    title: 'Цель и задачи',
    lines: [
      'Цель: веб-приложение «Мой бюджет»',
      'Учёт доходов и расходов по категориям',
      'Сводка за месяц и диаграмма',
      'Сохранение данных в браузере',
    ],
  },
  {
    kind: 'light',
    title: 'Объект и предмет',
    lines: [
      'Объект — учёт личных финансов',
      'Предмет — веб-интерфейс и логика отчётов',
      'Методы: анализ аналогов, React, тестирование',
    ],
  },
  {
    kind: 'light',
    title: 'Анализ аналогов',
    lines: [
      'Excel — гибко, но неудобный интерфейс',
      'CoinKeeper / Дзен-мани — много лишнего',
      'Telegram-боты — быстрый ввод, слабые отчёты',
      'Наше решение — простота + наглядность',
    ],
  },
  {
    kind: 'light',
    title: 'Стек технологий',
    lines: [
      'React — интерфейс',
      'Vite — сборка проекта',
      'Recharts — диаграмма расходов',
      'localStorage — сохранение данных',
    ],
  },
  {
    kind: 'light',
    title: 'Возможности',
    lines: [
      'Добавление дохода и расхода',
      'Категории, дата, комментарий',
      'Фильтр по месяцу',
      'Баланс и круговая диаграмма',
    ],
  },
  {
    kind: 'light',
    title: 'Практическая часть',
    lines: [
      'Форма новой операции',
      'История с удалением записей',
      'Пересчёт сводки при изменениях',
      'Данные сохраняются после обновления',
    ],
  },
  {
    kind: 'light',
    title: 'Тестирование',
    lines: [
      'Добавление расхода и дохода — ок',
      'Смена месяца — ок',
      'Удаление операции — ок',
      'Проверка пустой суммы — ок',
    ],
  },
  {
    kind: 'light',
    title: 'Результаты',
    lines: [
      'Цель достигнута',
      'Работает учёт и отчётность',
      'Подготовлены записка и презентация',
      'Проект готов к защите',
    ],
  },
  {
    kind: 'dark',
    title: 'Спасибо за внимание',
    lines: ['Вопросы?', '', 'Шиханцов Егор · Камынин Егор', '09.02.11/1094'],
  },
]

function loadFontBytes() {
  const candidates = [
    '/System/Library/Fonts/Supplemental/Arial Unicode.ttf',
    '/Library/Fonts/Arial Unicode.ttf',
  ]
  for (const p of candidates) {
    if (existsSync(p)) return readFileSync(p)
  }
  throw new Error('Не найден шрифт с кириллицей')
}

async function main() {
  const doc = await PDFDocument.create()
  doc.registerFontkit(fontkit)
  const font = await doc.embedFont(loadFontBytes(), { subset: true })

  slidesRu.forEach((slide, idx) => {
    const page = doc.addPage([W, H])
    const dark = slide.kind === 'dark'
    const bg = dark ? rgb(0.06, 0.24, 0.2) : rgb(0.97, 0.98, 0.97)
    const fg = dark ? rgb(0.96, 0.98, 0.97) : rgb(0.08, 0.14, 0.12)
    const accent = dark ? rgb(0.94, 0.89, 0.78) : rgb(0.06, 0.42, 0.36)

    page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: bg })
    page.drawCircle({
      x: W - 40,
      y: H - 40,
      size: 140,
      color: dark ? rgb(0.1, 0.42, 0.36) : rgb(0.84, 0.92, 0.88),
      opacity: 0.55,
    })

    page.drawText(slide.title, {
      x: 56,
      y: H - 110,
      size: 34,
      font,
      color: fg,
    })

    let y = H - 170
    for (const line of slide.lines) {
      if (!line) {
        y -= 18
        continue
      }
      page.drawCircle({ x: 68, y: y + 5, size: 4, color: accent })
      page.drawText(line, {
        x: 86,
        y,
        size: 15,
        font,
        color: fg,
        maxWidth: W - 140,
      })
      y -= 34
    }

    page.drawText(`${idx + 1} / ${slidesRu.length}`, {
      x: W - 90,
      y: 28,
      size: 11,
      font,
      color: dark ? rgb(0.8, 0.9, 0.86) : rgb(0.4, 0.5, 0.45),
    })
  })

  const outPath = join(outDir, 'prezentaciya.pdf')
  writeFileSync(outPath, await doc.save())
  console.log('written', outPath)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
