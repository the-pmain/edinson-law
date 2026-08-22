import { config } from "../../config.js";
import { site } from "../../site.config.js";

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

    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Edison Law enquiry — ${matter}`,
    )}&body=${encodeURIComponent(body)}`;

    status.dataset.visible = "true";
    status.textContent = `Draft prepared for ${site.email}. If your email app does not open, write to that address directly.`;
    window.location.href = href;
  });
}

currentYear();
menu();
search();
contactForm();

if (!reduced) {
  document.documentElement.style.scrollBehavior = "smooth";
}
