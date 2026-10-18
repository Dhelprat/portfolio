ПОРТФОЛИО КАРИНЫ ЛАПЕНКО — GITHUB PAGES

Структура:
src/ — редактируемые страницы, стили и JavaScript.
data/projects.json — галерея проектов; data/screens.json — экраны Takely.
assets/ — фото, шрифт, макеты и PDF для сайта.
resume/ — исходник Typst, локальные шрифты, фото и PDF.
scripts/build.mjs — сборка готового сайта в dist/.
.github/workflows/pages.yml — автоматическая публикация GitHub Pages.

Локальная сборка (Node.js 24; npm install не нужен):
node scripts/build.mjs
python3 -m http.server 4173 --directory dist --bind 127.0.0.1

После изменения файлов в основной ветке main GitHub Actions пересобирает и публикует сайт. Статус публикации — вкладка Actions. Сборка не меняет уже опубликованный сайт до успешной публикации новой версии.

Включение Pages: Settings → Pages → Source → GitHub Actions.

Резюме:
cd resume
typst compile --font-path fonts karina-lapenko.typ karina-lapenko.pdf
Затем скопировать PDF в assets/karina-lapenko.pdf и выполнить node scripts/build.mjs из корня проекта.

Добавить кейс: скопировать запись в data/projects.json и создать HTML-страницу в src/. Шаблон сборки уже добавляет общий контактный блок и навигацию.
Takely: четыре основных изображения видны сразу, включая исходный UI-kit; остальные раскрываются кнопкой «Ещё 3 экрана». Все изображения экспортированы из авторской версии Takely-main без правок. Файл и ID исходных фреймов записаны в data/screens.json. Все макеты доступны через увеличение и Figma.

Откат через Git (без удаления истории):
git log --oneline
git revert <SHA_коммита>
git push origin main
После успешной публикации этой версии проверить адрес сайта. Предыдущая история остаётся доступной в репозитории.

Исходники дизайна Takely: https://www.figma.com/design/Ik6EGnZS2zdTvqG2asdH7E/Takely-main?node-id=0-1&t=ZLAwKgWL3DVEkJoS-1

Основной адрес сайта: https://dhelprat.github.io/portfolio/
Репозиторий: https://github.com/Dhelprat/portfolio
