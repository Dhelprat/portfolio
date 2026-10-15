// Карина Лапенко — резюме продуктового дизайнера.
// Compile: typst compile --font-path fonts karina-lapenko.typ karina-lapenko.pdf
#set document(title: "Карина Лапенко — продуктовый дизайнер", author: "Карина Лапенко")
#set page(paper: "a4", margin: 0pt)
#set text(font: ("Inter", "Arial"), size: 9pt, fill: rgb("#222025"), lang: "ru")
#set par(leading: 5.7pt, spacing: 5pt, justify: false)
#set list(indent: 10pt, body-indent: 5pt, spacing: 3.6pt)
#let accent = rgb("#8A3655")
#let pink = rgb("#F4DDE6")
#let border = rgb("#E7BFCE")
#let muted = rgb("#6D6269")
#let soft = rgb("#FFF9FB")
#let portfolio = "https://dhelprat.github.io/portfolio/"
#let figma = "https://www.figma.com/design/YMfmZlipLMzIXSKBBBclwR/Takely--Copy-?node-id=6078-2670"
#let side-title(body) = {
  v(8pt)
  text(size: 9.1pt, weight: "bold", fill: accent, body)
  v(4pt)
  line(length: 100%, stroke: 0.5pt + border)
  v(5pt)
}
#let section(kicker, title) = {
  v(7pt)
  text(size: 7.6pt, tracking: 0.9pt, weight: "bold", fill: accent, kicker)
  v(2pt)
  grid(columns: (auto, 1fr), column-gutter: 8pt, align: horizon,
    text(size: 12pt, weight: "bold", title), line(length: 100%, stroke: 0.6pt + border))
  v(5pt)
}
#let tags(items) = {
  set text(size: 7.2pt, fill: accent)
  for item in items {
    box(fill: pink, radius: 4pt, inset: (x: 5pt, y: 1.5pt), item)
    h(3pt)
  }
}
#let card(body) = block(width: 100%, inset: (x: 8pt, y: 7pt), fill: soft,
  stroke: 0.6pt + border, radius: 9pt, breakable: false, body)
#let project(title, subtitle, year, url, description, technologies) = {
  card[
    #grid(columns: (1fr, auto), column-gutter: 8pt, [
      #text(size: 10pt, weight: "bold", title)
      #v(1pt)
      #text(size: 7.7pt, fill: muted, subtitle)
    ], [
      #align(right)[#text(size: 7.8pt, weight: "semibold", fill: accent, link(url)[GitHub ↗])]
      #v(1pt)
      #align(right)[#text(size: 7.7pt, fill: muted, year)]
    ])
    #v(4pt)
    #description
    #v(3pt)
    #tags(technologies)
  ]
  v(5pt)
}
#grid(
  columns: (173pt, 1fr),
  column-gutter: 0pt,
  block(height: 297mm, width: 173pt, fill: pink, inset: (left: 31pt, right: 28pt, top: 33pt, bottom: 25pt), breakable: false)[
    #set text(size: 8.3pt, fill: rgb("#422E35"))
    #set par(leading: 5.4pt, spacing: 4.8pt)
    #block(width: 100%, height: 119pt, radius: 16pt, stroke: 1.5pt + border, clip: true)[
      #image("assets/karina.jpg", width: 100%, height: 119pt, fit: "cover")
    ]
    #side-title[Контакты]
    Москва
    #linebreak()
    #link("tel:+79859473204")[+7 (985) 947-32-04]
    #linebreak()
    #link("mailto:indoorbox@yandex.ru")[indoorbox\@yandex.ru]
    #linebreak()
    #link("https://t.me/Dhelprat")[Telegram: \@Dhelprat]
    #linebreak()
    #text(weight: "bold", fill: accent, link(portfolio)[Сайт-портфолио ↗])
    #linebreak()
    #link("https://github.com/Dhelprat")[GitHub: dhelprat]

    #side-title[Позиция]
    *Продуктовый дизайнер*
    #linebreak()
    Стажировка / Junior
    #linebreak()
    Офис · гибрид · удалённо

    #side-title[Дизайн]
    Figma · Auto Layout
    #linebreak()
    Компоненты · варианты
    #linebreak()
    UI-kit · прототипирование · пользовательские сценарии · анализ конкурентов · бриф и согласование решений

    #side-title[Техническая база]
    HTML · CSS · TypeScript
    #linebreak()
    Vue 3 · Nuxt 3 · Pinia
    #linebreak()
    REST API · Git / GitHub
    #linebreak()
    Playwright · Python · SQL

    #side-title[Образование]
    *Московский авиационный институт*
    #linebreak()
    Институт №8 · *кафедра 806*
    #linebreak()
    *Прикладная математика и информатика*
    #linebreak()
    4 курс · выпуск 2027

    #side-title[Доп. образование]
    *Цифровая кафедра МАИ*
    #linebreak()
    Методы ИИ и предиктивная аналитика в проектах дефектоскопии
    #linebreak()
    Специалист по большим данным · 2025

    #side-title[Языки]
    Английский — *B2*
  ],
  block(height: 297mm, width: 100%, inset: (left: 33pt, right: 34pt, top: 29pt, bottom: 26pt), breakable: false)[
    #text(size: 25pt, weight: "bold")[Лапенко Карина]
    #v(4pt)
    #text(size: 10.2pt, weight: "semibold", fill: accent)[Продуктовый дизайнер · UX/UI]
    #v(7pt)
    #link(portfolio)[#box(fill: pink, stroke: 0.6pt + border, radius: 5pt, inset: (x: 10pt, y: 5pt))[#text(size: 10pt, weight: "bold", fill: accent)[Сайт-портфолио ↗]]]

    #section("PROFILE", "Обо мне")
    Проектирую веб-интерфейсы и пользовательские сценарии. Есть коммерческий дизайн-проект и опыт разработки учебных продуктов. Учусь на последнем курсе МАИ, кафедра 806, «Прикладная математика и информатика». Математическая и программистская база помогает учитывать ограничения реализации и говорить с разработчиками на одном языке. Ищу стажировку в продуктовом дизайне.

    #section("EXPERIENCE", "Коммерческий опыт")
    #card[
      #grid(columns: (1fr, auto), column-gutter: 8pt, [
        #text(size: 10.2pt, weight: "bold")[Продуктовый / UI-дизайнер · Takely]
        #v(2pt)
        #text(size: 7.8pt, fill: muted)[Фриланс · проектная занятость]
      ], [
        #align(right)[#text(size: 7.8pt, weight: "semibold", fill: accent, link(figma)[Figma ↗])]
        #v(2pt)
        #align(right)[#text(size: 7.8pt, fill: muted)[В течение 6 месяцев]]
      ])
      #v(5pt)
      #set list(tight: false, spacing: 6pt)
      - Уточнила общий бриф, согласовала MVP с клиентом и спроектировала сайт аренды одежды и интерфейс сотрудника склада.
      - Связала каталог, выбор размера и дат, корзину и заявку с офлайн-примеркой, оплатой и возвратом вещей.
      - Подготовила UI-kit, компоненты, состояния и прототип в Figma; передала макеты разработчику.
      - Сопровождала разработку: уточняла нюансы интерфейса и помогала клиенту и разработчику согласовывать решения.
      #v(4pt)
      #tags(("UX/UI", "Figma", "MVP", "UI-kit", "Прототипирование"))
    ]

    #section("PROJECTS", "Учебные проекты")
    #project("QuizHub", "Платформа квизов в реальном времени", "2026",
      "https://github.com/Dhelprat/vk-quiz-project",
      [Дизайн и фронтенд: сценарии организатора и участника, конструктор квизов, результаты и адаптивный интерфейс. Основные сценарии покрыла E2E-тестами.],
      ("Vue 3", "Pinia", "Socket.IO", "Playwright"))
    #project("Chess Analysis Platform", "Анализ шахматных партий", "2025",
      "https://github.com/Madagascam/frontend",
      [Дизайн и фронтенд: загрузка PGN, интерактивная доска, история ходов и состояния асинхронного анализа.],
      ("Nuxt 3", "Vue 3", "chess.js", "REST API"))
    #project("Олимпозавр", "Агрегатор олимпиад и соревнований", "2024",
      "https://github.com/den4ik2975/CompetitionAggregator",
      [Дизайн и фронтенд: поиск событий, фильтры, карточки, избранное и подключение к REST API.],
      ("Vue 3", "Vue Router", "Tailwind CSS", "REST API"))

    #section("LEARNING", "Дополнительное обучение")
    #card[
      #set text(size: 8.1pt)
      *VK Education* — менеджер продукта; прикладная аналитика данных.
      #linebreak()
      *Яндекс Практикум* — фронтенд-разработка.
      #linebreak()
      *Яндекс Лицей* — Python, SQL.
      #linebreak()
      *Сбербанк* — большие языковые модели на базе GigaChat.
    ]
  ]
)

