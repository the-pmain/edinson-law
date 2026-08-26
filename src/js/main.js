import { config } from "../../config.js";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.dataset.mode = config.develop ? "development" : "production";

function currentYear() {
  for (const node of document.querySelectorAll("[data-year]")) {
    node.textContent = String(new Date().getFullYear());
  }
}

function menu() {
  const drawer = document.querySelector("#site-drawer");
  if (!drawer) return;
  const openers = document.querySelectorAll("[data-menu-open]");
  const closer = drawer.querySelector("[data-menu-close]");
  const panel = drawer.querySelector(".drawer-panel");
  let last = null;

  const set = (open) => {
    drawer.dataset.open = open ? "true" : "false";
    document.body.style.overflow = open ? "hidden" : "";
    openers.forEach((btn) => btn.setAttribute("aria-expanded", open ? "true" : "false"));
    if (open) {
      last = document.activeElement;
      closer?.focus();
    } else {
      last?.focus();
    }
  };

  openers.forEach((btn) => btn.addEventListener("click", () => set(true)));
  closer?.addEventListener("click", () => set(false));
  drawer.addEventListener("click", (event) => {
    if (event.target === drawer) set(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.dataset.open === "true") set(false);
    if (event.key !== "Tab" || drawer.dataset.open !== "true") return;
    const focusable = panel.querySelectorAll("a, button");
    const first = focusable[0];
    const end = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      end.focus();
    } else if (!event.shiftKey && document.activeElement === end) {
      event.preventDefault();
      first.focus();
    }
  });
}

function search() {
  const dialog = document.querySelector("[data-search]");
  if (!dialog) return;
  const input = dialog.querySelector("input");
  const results = dialog.querySelector("[data-search-results]");
  const data = JSON.parse(document.querySelector("#edison-search-data")?.textContent || "[]");

  const render = (query) => {
    const q = query.trim().toLowerCase();
    const matches = data
      .filter((item) =>
        `${item.title} ${item.type} ${item.text}`.toLowerCase().includes(q || item.title.toLowerCase()),
      )
      .slice(0, 8);
    results.innerHTML = matches
      .map(
        (item) =>
          `<a href="${item.href}"><span class="mono">${item.type}</span><strong>${item.title}</strong></a>`,
      )
      .join("");
  };

  document.querySelectorAll("[data-search-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      dialog.showModal();
      render("");
      input.focus();
    });
  });
  input.addEventListener("input", () => render(input.value));
}

function contactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const status = form.querySelector("[data-form-status]");

  const invalidate = (name, on) => {
    const field = form.querySelector(`[name="${name}"]`)?.closest(".field");
    field?.classList.toggle("is-invalid", on);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const matter = String(data.get("matter") || "").trim();
    const message = String(data.get("message") || "").trim();
    const organisation = String(data.get("organisation") || "").trim();
    const privacy = form.privacy.checked;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    invalidate("name", !name);
    invalidate("email", !emailOk);
    invalidate("matter", !matter);
    invalidate("message", message.length < 12);
    invalidate("privacy", !privacy);

    if (!name || !emailOk || !matter || message.length < 12 || !privacy) {
      status.dataset.visible = "true";
      status.textContent = "Check the highlighted fields and try again.";
      form.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea, .is-invalid input[type=checkbox]")?.focus();
      return;
    }

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      organisation ? `Organisation: ${organisation}` : "",
      `Matter: ${matter}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    status.dataset.visible = "true";
    const mailto = form.dataset.mailto || "";
    if (!mailto) {
      status.textContent = form.dataset.ack || "";
      return;
    }

    const href = `mailto:${mailto}?subject=${encodeURIComponent(
      `Edison Law enquiry — ${matter}`,
    )}&body=${encodeURIComponent(body)}`;

    status.textContent = `Draft prepared for ${mailto}. If your email app does not open, write to that address directly.`;
    window.location.href = href;
  });
}

function pageJumpSpy() {
  const nav = document.querySelector(".page-jump");
  if (!nav) return;
  const links = [...nav.querySelectorAll("a[href^='#']")];
  const targets = links
    .map((link) => document.querySelector(link.hash))
    .filter(Boolean);
  if (!targets.length) return;

  const setCurrent = (id) => {
    links.forEach((link) => {
      if (link.hash === `#${id}`) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  setCurrent(targets[0].id);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(visible.target.id);
    },
    { rootMargin: "-18% 0px -62% 0px", threshold: [0.15, 0.35, 0.6] },
  );
  targets.forEach((node) => observer.observe(node));
}

function insightTools() {
  const search = document.querySelector("[data-insight-search]");
  const filters = document.querySelector("[data-insight-filters]");
  const empty = document.querySelector("[data-insight-empty]");
  if (!search && !filters) return;
  let active = "all";

  const apply = () => {
    const query = (search?.value || "").trim().toLowerCase();
    const items = document.querySelectorAll(".insight-list .insight-entry");
    let shown = 0;
    items.forEach((item) => {
      const type = item.dataset.type || "";
      const topics = (item.dataset.topics || "").split("|");
      const text = (item.dataset.search || "").toLowerCase();
      const filterOk = active === "all" || type === active || topics.includes(active);
      const searchOk = !query || text.includes(query);
      const match = filterOk && searchOk;
      item.hidden = !match;
      if (match) shown += 1;
    });
    if (empty) empty.hidden = shown > 0;
  };

  filters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    active = button.dataset.filter;
    filters.querySelectorAll("[data-filter]").forEach((node) => {
      node.setAttribute("aria-pressed", node === button ? "true" : "false");
    });
    apply();
  });
  search?.addEventListener("input", apply);
}

function peopleFilter() {
  const root = document.querySelector("[data-people-filters]");
  if (!root) return;
  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    const value = button.dataset.filter;
    root.querySelectorAll("[data-filter]").forEach((node) => {
      node.setAttribute("aria-pressed", node === button ? "true" : "false");
    });
    document.querySelectorAll("[data-people-index] [data-expertise]").forEach((item) => {
      const tags = (item.dataset.expertise || "").split("|");
      item.hidden = value !== "all" && !tags.includes(value);
    });
  });
}

currentYear();
menu();
search();
contactForm();
pageJumpSpy();
insightTools();
peopleFilter();

if (!reduced) {
  document.documentElement.style.scrollBehavior = "smooth";
}
