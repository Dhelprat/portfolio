(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  function closeMenu() { if (!toggle || !nav) return; toggle.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); }
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open)); nav.classList.toggle("is-open", open);
    });
    nav.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); toggle.focus(); } });
    window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);
  }
  const toc = document.querySelector(".contents");
  const sections = document.querySelectorAll(".case-section[id]");
  if (toc && sections.length) {
    const links = [...toc.querySelectorAll("a")];
    let scheduled = false;
    function updateContents() {
      scheduled = false;
      const header = document.querySelector(".site-header");
      const tocStyle = getComputedStyle(toc);
      const stickyOffset = (header ? header.getBoundingClientRect().height : 0) +
        (tocStyle.position === "sticky" && tocStyle.display === "flex" ? toc.getBoundingClientRect().height : 0) + 24;
      const anchorOffset = (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0) +
        (parseFloat(getComputedStyle(sections[0]).scrollMarginTop) || 0) + 1;
      const readingLine = Math.max(stickyOffset, anchorOffset);
      const current = [...sections].find(s => s.getBoundingClientRect().bottom > readingLine) || sections[sections.length - 1];
      links.forEach(a => {
        const active = a.getAttribute("href") === "#" + current.id;
        a.classList.toggle("is-active", active);
        if (active) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
      });
    }
    function scheduleContents() {
      if (!scheduled) { scheduled = true; requestAnimationFrame(updateContents); }
    }
    window.addEventListener("scroll", scheduleContents, { passive: true });
    window.addEventListener("resize", scheduleContents);
    document.addEventListener("load", scheduleContents, true);
    scheduleContents();
  }
  const dialog = document.querySelector(".lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const allLinks = [...document.querySelectorAll("[data-lightbox]")];
  const gallery = [...document.querySelectorAll(".screens-gallery [data-lightbox]")];
  const image = dialog.querySelector(".lightbox-image");
  const title = dialog.querySelector(".lightbox-title");
  const stage = dialog.querySelector(".lightbox-stage");
  const download = dialog.querySelector("[data-download]");
  const zoom = dialog.querySelector("[data-zoom]");
  let trigger = null, index = -1;
  function render(link) {
    image.src = link.href; image.alt = link.dataset.caption || "";
    title.textContent = link.dataset.caption || "Экран Takely";
    download.href = link.href; download.download = link.href.split("/").pop();
    stage.classList.remove("zoomed"); zoom.setAttribute("aria-pressed", "false");
    zoom.setAttribute("aria-label", "Показать экран в масштабе 1:1");
    stage.scrollTop = 0; stage.scrollLeft = 0;
    index = gallery.findIndex(l => l.href === link.href);
    dialog.querySelector("[data-prev]").disabled = index < 0;
    dialog.querySelector("[data-next]").disabled = index < 0;
  }
  allLinks.forEach(link => link.addEventListener("click", e => {
    e.preventDefault(); trigger = link; render(link); dialog.showModal();
    document.body.classList.add("modal-open");
    dialog.querySelector("[data-close]").focus();
  }));
  function close() { dialog.close(); }
  dialog.querySelector("[data-close]").addEventListener("click", close);
  dialog.addEventListener("click", e => { if (e.target === dialog) close(); });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open"); image.removeAttribute("src");
    if (trigger) trigger.focus({ preventScroll: true });
  });
  zoom.addEventListener("click", () => {
    const active = stage.classList.toggle("zoomed");
    zoom.setAttribute("aria-pressed", String(active));
    zoom.setAttribute("aria-label", active ? "Вписать экран в окно" : "Показать экран в масштабе 1:1");
  });
  function move(direction) { if (index < 0 || !gallery.length) return; render(gallery[(index + direction + gallery.length) % gallery.length]); }
  dialog.querySelector("[data-prev]").addEventListener("click", () => move(-1));
  dialog.querySelector("[data-next]").addEventListener("click", () => move(1));
  dialog.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { e.preventDefault(); move(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); move(-1); }
  });
})();
