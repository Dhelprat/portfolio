import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "src"), dist = path.join(root, "dist");
fs.mkdirSync(dist, { recursive: true });
const data = JSON.parse(fs.readFileSync(path.join(root, "data/projects.json"), "utf8"));
const site = JSON.parse(fs.readFileSync(path.join(root, "data/site.json"), "utf8"));
const escape = s => String(s).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const icon = name => '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><use href="#icon-' + name + '"></use></svg>';
const arrow = icon("arrow");
const symbols = '<svg class="symbols" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><defs>' +
'<symbol id="icon-arrow" viewBox="0 0 24 24"><path d="M4 12h16M14 6l6 6-6 6"/></symbol>' +
'<symbol id="icon-back" viewBox="0 0 24 24"><path d="M20 12H4m6-6-6 6 6 6"/></symbol>' +
'<symbol id="icon-external" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"/></symbol>' +
'<symbol id="icon-pdf" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 15h6M9 18h4"/></symbol>' +
'<symbol id="icon-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></symbol>' +
'<symbol id="icon-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>' +
'<symbol id="icon-mail" viewBox="0 0 24 24"><path d="M3 5h18v14H3zM3 5l9 8 9-8"/></symbol>' +
'<symbol id="icon-send" viewBox="0 0 24 24"><path d="m3 11 18-8-6 18-4-7-8-3zm8 3L21 3"/></symbol>' +
'<symbol id="icon-github" viewBox="0 0 24 24"><path d="M9 19c-4 1-4-2-6-2m14 5v-4a3 3 0 0 0-1-2.4c3.3-.4 6.8-1.6 6.8-7.4A5.7 5.7 0 0 0 21.2 4 5.3 5.3 0 0 0 21.1 0s-1.3-.4-4.1 1.5a14 14 0 0 0-7.6 0C6.6-.4 5.3 0 5.3 0a5.3 5.3 0 0 0-.1 4A5.7 5.7 0 0 0 3.6 8c0 5.8 3.5 7 6.8 7.4A3 3 0 0 0 9 18v4" transform="translate(1 2) scale(.88)"/></symbol>' +
'<symbol id="icon-zoom" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6M10 7v6"/></symbol>' +
'</defs></svg>';
const header = '<header class="site-header"><div class="header-inner container"><a class="brand" href="index.html" aria-label="Карина Лапенко — главная">Карина Лапенко</a>' +
'<nav class="site-nav" id="navigation" aria-label="Основная навигация"><a href="index.html#work">Работы</a><a href="index.html#about">Обо мне</a><a href="index.html#contact">Контакты</a></nav>' +
'<div class="header-actions"><a class="btn outline pdf-link" href="assets/karina-lapenko.pdf" download aria-label="Скачать резюме в PDF">' + icon("pdf") + '<span class="btn-label">Резюме PDF</span></a>' +
'<button class="btn outline circle menu-toggle" type="button" aria-label="Открыть навигацию" aria-controls="navigation" aria-expanded="false">' + icon("menu") + '</button></div></div></header>';
const contact = '<section class="contact-band" id="contact" aria-labelledby="contact-title"><div class="contact-inner container"><div><h2 id="contact-title">Давайте <span class="accent">познакомимся!</span></h2><p>Буду рада обсудить стажировку и рассказать о себе.</p></div><div class="contact-actions"><a class="btn" href="https://t.me/Dhelprat" target="_blank" rel="noopener noreferrer">' + icon("send") + 'Написать в Telegram</a><a class="btn outline" href="mailto:indoorbox@yandex.ru">' + icon("mail") + 'Написать на почту</a></div></div></section>';
const footer = '<footer class="site-footer"><div class="footer-inner container"><p>Карина Лапенко · 2026</p><div class="footer-links"><a class="text-link" href="assets/karina-lapenko.pdf" download>Резюме PDF ' + arrow + '</a><a class="text-link" href="https://github.com/Dhelprat" target="_blank" rel="noopener noreferrer">GitHub ' + arrow + '</a></div></div></footer>';
function picture(key, width, height, alt, lazy = true) {
  return '<picture><source type="image/webp" srcset="assets/' + key + '-480.webp 480w, assets/' + key + '-960.webp 960w, assets/' + key + '-1440.webp ' + Math.min(width, 1440) + 'w" sizes="(max-width:760px) calc(100vw - 72px), (max-width:1100px) 60vw, 770px"><img src="assets/' + key + '.png" alt="' + escape(alt) + '" width="' + width + '" height="' + height + '" loading="' + (lazy ? "lazy" : "eager") + '" decoding="async"></picture>';
}
const cards = data.filter(p => !p.hidden).map(p => '<a class="project-card" href="' + escape(p.href) + '"><div class="project-media">' + picture(p.cover, p.width, p.height, p.name + " — клиентский интерфейс", false) + '</div><div class="project-copy"><h3>' + escape(p.name) + '</h3><p class="project-subtitle">' + escape(p.subtitle) + '</p><p class="project-summary">' + escape(p.summary) + '</p><span class="text-link">Открыть кейс ' + arrow + '</span></div></a>').join("\n");
const screens = JSON.parse(fs.readFileSync(path.join(root, "data/screens.json"), "utf8"));
const renderScreen = s => '<article class="screen-card"><a class="image-link" href="assets/' + s.key + '.png" data-lightbox data-caption="' + escape(s.title) + '" aria-label="Увеличить экран: ' + escape(s.title) + '" aria-haspopup="dialog">' + picture(s.key, s.width, s.height, s.alt) + '</a><h3>' + escape(s.title) + '</h3><p>' + escape(s.description) + '</p></article>';
const featuredKeys = ['takely-product', 'takely-request', 'takely-return', 'takely-warehouse'];
const featured = featuredKeys.map(key => screens.find(s => s.key === key));
const remaining = screens.filter(s => !featuredKeys.includes(s.key));
const gallery = '<div class="screens-gallery">' + featured.map(renderScreen).join('\n') + '</div>' +
  '<details class="more-screens"><summary class="btn outline">Ещё ' + remaining.length + ' экранов <span aria-hidden="true">⌄</span></summary><div class="screens-gallery">' + remaining.map(renderScreen).join('\n') + '</div></details>';
const lightbox = '<dialog class="lightbox" aria-labelledby="lightbox-title"><div class="lightbox-bar"><h2 class="lightbox-title" id="lightbox-title">Экран Takely</h2><div class="lightbox-tools"><button class="btn outline circle" data-prev aria-label="Предыдущий экран">' + icon("back") + '</button><button class="btn outline circle" data-next aria-label="Следующий экран">' + arrow + '</button><button class="btn outline circle" data-zoom aria-label="Показать экран в масштабе 1:1" aria-pressed="false">' + icon("zoom") + '</button><button class="btn outline circle" data-close aria-label="Закрыть просмотр">' + icon("close") + '</button></div></div><div class="lightbox-stage" tabindex="0" aria-label="Область просмотра макета"><img class="lightbox-image" alt=""></div><div class="lightbox-bottom"><span>Можно увеличить экран и рассмотреть детали.</span><a data-download download>Скачать исходный PNG</a></div></dialog>';
const replacements = { HEADER: header, CONTACT: contact, FOOTER: footer, SYMBOLS: symbols, PROJECTS: cards, ARROW: arrow, BACK: icon("back"), EXTERNAL: icon("external"), SCREEN_GALLERY: gallery, LIGHTBOX: lightbox, SITE_URL: site.url, FIGMA: site.figma };
for (const filename of ["index.html", "takely.html"]) {
  let html = fs.readFileSync(path.join(src, filename), "utf8");
  for (const [key, value] of Object.entries(replacements)) html = html.replaceAll("@@" + key + "@@", value);
  if (/@@[A-Z_]+@@/.test(html)) throw new Error("Unresolved template token in " + filename);
  fs.writeFileSync(path.join(dist, filename), html);
}
for (const filename of ["styles.css", "site.js"]) fs.copyFileSync(path.join(src, filename), path.join(dist, filename));
fs.cpSync(path.join(root, "assets"), path.join(dist, "assets"), { recursive: true });
fs.writeFileSync(path.join(dist, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: " + site.url + "/sitemap.xml\n");
fs.writeFileSync(path.join(dist, "sitemap.xml"), '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + site.url + '/</loc></url><url><loc>' + site.url + '/takely.html</loc></url></urlset>');
console.log("Built " + data.filter(p => !p.hidden).length + " project(s), " + screens.length + " native screen previews.");

