const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const YEAR_FLOOR = 1920;
const YEAR_CEILING_PAD = 0;

const CARET = `<svg class="edison-cal-caret" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 6.2 8 10.8l4.5-4.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHEVRON = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.2 3.2 5.4 8l4.8 4.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

let shell;
let jumpInput;
let activeInput = null;
let view = "day";
let cursor = new Date();
let selected = null;

function pad(n) {
  return String(n).padStart(2, "0");
}

function toIso(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseIso(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || "").trim());
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a, b) {
  return a && b
    && a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function bound(date, min, max) {
  let next = date;
  if (min && next < min) next = new Date(min);
  if (max && next > max) next = new Date(max);
  return next;
}

function limitOf(input, attr) {
  return parseIso(input.getAttribute(attr));
}

function yearLimits() {
  const min = activeInput ? limitOf(activeInput, "min") : null;
  const max = activeInput ? limitOf(activeInput, "max") : null;
  const now = new Date().getFullYear();
  return {
    min,
    max,
    minY: min ? min.getFullYear() : YEAR_FLOOR,
    maxY: max ? max.getFullYear() : now + YEAR_CEILING_PAD,
  };
}

function nativeLockNeeded() {
  return /iP(hone|ad|od)/.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function ensureShell() {
  if (shell) return shell;
  shell = document.createElement("div");
  shell.className = "edison-cal";
  shell.hidden = true;
  shell.setAttribute("role", "dialog");
  shell.setAttribute("aria-modal", "true");
  shell.setAttribute("aria-label", "Choose a date");
  if (typeof shell.showPopover === "function") shell.setAttribute("popover", "manual");
  shell.innerHTML = `
    <div class="edison-cal-card">
      <div class="edison-cal-head">
        <button type="button" class="edison-cal-nav" data-cal-prev></button>
        <div class="edison-cal-titles">
          <button type="button" class="edison-cal-title" data-cal-title-a>
            <span data-cal-label-a></span>${CARET}
          </button>
          <button type="button" class="edison-cal-title" data-cal-title-b>
            <span data-cal-label-b></span>${CARET}
          </button>
        </div>
        <button type="button" class="edison-cal-nav" data-cal-next></button>
      </div>
      <div class="edison-cal-jump" data-cal-jump hidden>
        <label class="visually-hidden" for="edison-cal-year-jump">Year</label>
        <input id="edison-cal-year-jump" type="text" inputmode="numeric" maxlength="4" autocomplete="off" spellcheck="false" enterkeyhint="go" placeholder="Type a year" aria-autocomplete="list" aria-controls="edison-cal-yearlist">
      </div>
      <div class="edison-cal-body" data-cal-body></div>
      <div class="edison-cal-foot">
        <button type="button" class="edison-cal-text" data-cal-clear>Clear</button>
        <button type="button" class="edison-cal-text" data-cal-today>Today</button>
      </div>
    </div>
  `;
  shell.querySelector("[data-cal-prev]").innerHTML = CHEVRON;
  shell.querySelector("[data-cal-next]").innerHTML = CHEVRON;
  jumpInput = shell.querySelector("#edison-cal-year-jump");
  document.body.append(shell);

  shell.querySelector("[data-cal-prev]").addEventListener("click", () => step(-1));
  shell.querySelector("[data-cal-next]").addEventListener("click", () => step(1));
  shell.querySelector("[data-cal-title-a]").addEventListener("click", () => drill("a"));
  shell.querySelector("[data-cal-title-b]").addEventListener("click", () => drill("b"));
  shell.querySelector("[data-cal-clear]").addEventListener("click", () => commit(""));
  shell.querySelector("[data-cal-today]").addEventListener("click", () => {
    const today = startOfDay(new Date());
    const { min, max } = yearLimits();
    commit(toIso(bound(today, min, max)));
  });
  shell.addEventListener("click", (event) => {
    const cell = event.target.closest("[data-cal-pick]");
    if (!cell || cell.disabled) return;
    pick(cell.dataset.calPick, cell.dataset.calValue);
  });
  jumpInput.addEventListener("input", () => {
    jumpInput.value = jumpInput.value.replace(/\D/g, "").slice(0, 4);
    if (view !== "year") return;
    if (jumpInput.value.length === 4) {
      goToYear(Number(jumpInput.value));
      return;
    }
    render();
  });
  jumpInput.addEventListener("keydown", (event) => {
    if (view !== "year") return;
    if (event.key === "Enter") {
      event.preventDefault();
      const years = matchingYears();
      if (jumpInput.value.length === 4 && years.length) goToYear(Number(jumpInput.value));
      else if (years.length === 1) goToYear(years[0]);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      shell.querySelector(".edison-cal-yearlist [data-cal-pick]")?.focus();
    }
  });
  return shell;
}

function hostFor(input) {
  return input.closest("dialog[open]") || document.body;
}

function place() {
  if (!activeInput || !shell) return;
  const rect = activeInput.getBoundingClientRect();
  const width = Math.min(22 * 16, Math.max(20 * 16, rect.width));
  const gap = 8;
  let left = rect.left;
  if (left + width > window.innerWidth - 12) left = window.innerWidth - width - 12;
  if (left < 12) left = 12;
  const estimated = view === "year" ? 22 * 16 : view === "day" ? 24 * 16 : 20 * 16;
  const below = rect.bottom + gap;
  const top = below + estimated > window.innerHeight - 12 && rect.top - estimated - gap > 12
    ? rect.top - estimated - gap
    : below;
  shell.style.width = `${width}px`;
  shell.style.left = `${left}px`;
  shell.style.top = `${Math.max(12, top)}px`;
}

function setTitle(button, label, { hidden = false, drillable = true, aria } = {}) {
  button.hidden = hidden;
  button.classList.toggle("is-static", !drillable);
  button.querySelector("[data-cal-label-a], [data-cal-label-b]").textContent = label;
  if (aria) button.setAttribute("aria-label", aria);
  else button.removeAttribute("aria-label");
}

function render() {
  if (!shell) return;
  const titleA = shell.querySelector("[data-cal-title-a]");
  const titleB = shell.querySelector("[data-cal-title-b]");
  const prev = shell.querySelector("[data-cal-prev]");
  const next = shell.querySelector("[data-cal-next]");
  const jump = shell.querySelector("[data-cal-jump]");
  const body = shell.querySelector("[data-cal-body]");
  const year = cursor.getFullYear();
  const month = cursor.getMonth();

  jump.hidden = view !== "year";
  next.hidden = view === "year";
  if (view !== "year") jumpInput.value = "";

  if (view === "day") {
    setTitle(titleA, MONTHS[month], { drillable: true, aria: `${MONTHS[month]}, show months` });
    setTitle(titleB, String(year), { drillable: true, aria: `${year}, show years` });
    prev.setAttribute("aria-label", "Previous month");
    next.setAttribute("aria-label", "Next month");
    body.innerHTML = dayGrid();
  } else if (view === "month") {
    setTitle(titleA, String(year), { drillable: true, aria: `${year}, show years` });
    setTitle(titleB, "", { hidden: true, drillable: false });
    prev.setAttribute("aria-label", "Previous year");
    next.setAttribute("aria-label", "Next year");
    body.innerHTML = monthGrid();
  } else {
    setTitle(titleA, "Year", { drillable: false });
    setTitle(titleB, "", { hidden: true, drillable: false });
    prev.setAttribute("aria-label", "Back to calendar");
    body.innerHTML = yearList();
    requestAnimationFrame(scrollYearIntoView);
  }
  place();
}

function dayGrid() {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const { min, max } = yearLimits();
  const today = startOfDay(new Date());
  const cells = [];
  for (let i = 0; i < 42; i += 1) {
    let d;
    let outside = false;
    if (i < startOffset) {
      d = new Date(year, month - 1, prevDays - startOffset + i + 1);
      outside = true;
    } else if (i >= startOffset + daysInMonth) {
      d = new Date(year, month + 1, i - startOffset - daysInMonth + 1);
      outside = true;
    } else {
      d = new Date(year, month, i - startOffset + 1);
    }
    const iso = toIso(d);
    const disabled = (min && d < min) || (max && d > max);
    const cls = [
      "edison-cal-day",
      outside ? "is-muted" : "",
      sameDay(d, selected) ? "is-selected" : "",
      sameDay(d, today) ? "is-today" : "",
    ].filter(Boolean).join(" ");
    cells.push(`<button type="button" class="${cls}" data-cal-pick="day" data-cal-value="${iso}" ${disabled ? "disabled" : ""}>${d.getDate()}</button>`);
  }
  return `<div class="edison-cal-week">${WEEKDAYS.map((d) => `<span>${d}</span>`).join("")}</div>
    <div class="edison-cal-days">${cells.join("")}</div>`;
}

function monthGrid() {
  const year = cursor.getFullYear();
  const { min, max } = yearLimits();
  return `<div class="edison-cal-months">${MONTHS_SHORT.map((label, index) => {
    const disabled = (min && year === min.getFullYear() && index < min.getMonth())
      || (max && year === max.getFullYear() && index > max.getMonth());
    const selectedMonth = selected && selected.getFullYear() === year && selected.getMonth() === index;
    const now = new Date();
    const current = year === now.getFullYear() && index === now.getMonth();
    const cls = [
      "edison-cal-chip",
      selectedMonth ? "is-selected" : "",
      current ? "is-today" : "",
    ].filter(Boolean).join(" ");
    return `<button type="button" class="${cls}" data-cal-pick="month" data-cal-value="${index}" ${disabled ? "disabled" : ""}>${label}</button>`;
  }).join("")}</div>`;
}

function matchingYears() {
  const { minY, maxY } = yearLimits();
  const prefix = jumpInput?.value || "";
  const years = [];
  for (let year = maxY; year >= minY; year -= 1) {
    if (prefix && !String(year).startsWith(prefix)) continue;
    years.push(year);
  }
  return years;
}

function yearList() {
  const nowY = new Date().getFullYear();
  const selectedY = selected?.getFullYear();
  const years = matchingYears();
  if (!years.length) {
    return `<p class="edison-cal-empty">No year matches.</p>`;
  }
  const rows = years.map((year) => {
    const cls = [
      "edison-cal-yearopt",
      selectedY === year ? "is-selected" : "",
      year === nowY ? "is-today" : "",
    ].filter(Boolean).join(" ");
    const aria = selectedY === year ? ' aria-selected="true"' : ' aria-selected="false"';
    return `<button type="button" class="${cls}" role="option"${aria} data-cal-pick="year" data-cal-value="${year}">${year}</button>`;
  }).join("");
  return `<div class="edison-cal-yearlist" id="edison-cal-yearlist" role="listbox" aria-label="Year">${rows}</div>`;
}

function scrollYearIntoView() {
  const list = shell?.querySelector(".edison-cal-yearlist");
  const row = list?.querySelector(".is-selected")
    || list?.querySelector(".is-today")
    || list?.querySelector("[data-cal-pick]");
  if (!list || !row) return;
  list.scrollTop = row.offsetTop - (list.clientHeight - row.offsetHeight) / 2;
}

function step(dir) {
  if (view === "year") {
    view = "day";
    render();
    return;
  }
  if (view === "day") cursor = new Date(cursor.getFullYear(), cursor.getMonth() + dir, 1);
  else cursor = new Date(cursor.getFullYear() + dir, cursor.getMonth(), 1);
  const { min, max } = yearLimits();
  cursor = bound(cursor, min, max);
  render();
}

function drill(which) {
  if (view === "day") view = which === "b" ? "year" : "month";
  else if (view === "month") view = "year";
  else return;
  render();
  if (view === "year") jumpInput.focus();
}

function goToYear(year) {
  if (!Number.isInteger(year) || year < 1000 || year > 9999) return;
  const { min, max, minY, maxY } = yearLimits();
  const next = Math.min(maxY, Math.max(minY, year));
  cursor = bound(new Date(next, cursor.getMonth(), 1), min, max);
  view = "month";
  jumpInput.value = "";
  render();
}

function pick(kind, value) {
  if (kind === "day") {
    commit(value);
    return;
  }
  if (kind === "month") {
    cursor = new Date(cursor.getFullYear(), Number(value), 1);
    view = "day";
  } else {
    cursor = new Date(Number(value), cursor.getMonth(), 1);
    view = "month";
  }
  const { min, max } = yearLimits();
  cursor = bound(cursor, min, max);
  render();
}

function commit(iso) {
  if (!activeInput) return close();
  const input = activeInput;
  input.value = iso;
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  close();
  input.focus({ preventScroll: true });
}

function close() {
  if (!shell || shell.hidden) return;
  shell.hidden = true;
  try {
    if (typeof shell.hidePopover === "function" && shell.matches(":popover-open")) shell.hidePopover();
  } catch {
    /* already closed */
  }
  activeInput = null;
}

function focusables() {
  if (!shell) return [];
  return [...shell.querySelectorAll("button, input")].filter((el) => {
    if (el.disabled || el.hidden) return false;
    if (el.closest("[hidden]")) return false;
    return true;
  });
}

function open(input) {
  if (input.disabled) return;
  if (input.readOnly && input.dataset.edisonCalLock !== "1") return;
  ensureShell();
  if (activeInput === input && !shell.hidden) {
    place();
    return;
  }
  const host = hostFor(input);
  if (shell.parentNode !== host && typeof shell.showPopover !== "function") host.append(shell);
  activeInput = input;
  selected = parseIso(input.value);
  cursor = selected ? new Date(selected) : startOfDay(new Date());
  const { min, max } = yearLimits();
  cursor = bound(cursor, min, max);
  view = "day";
  shell.hidden = false;
  try {
    if (typeof shell.showPopover === "function") shell.showPopover();
  } catch {
    host.append(shell);
  }
  render();
}

function onDocPointer(event) {
  if (!activeInput || !shell || shell.hidden) return;
  if (shell.contains(event.target) || activeInput.contains(event.target)) return;
  close();
}

function onDocKey(event) {
  if (!activeInput || !shell || shell.hidden) return;
  if (event.key === "Escape") {
    event.preventDefault();
    const input = activeInput;
    close();
    input?.focus({ preventScroll: true });
    return;
  }
  if (event.key !== "Tab") return;
  const nodes = focusables();
  if (!nodes.length) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (document.activeElement === activeInput && !event.shiftKey) {
    event.preventDefault();
    first.focus();
    return;
  }
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function onScroll(event) {
  if (!activeInput || !shell || shell.hidden) return;
  if (shell.contains(event.target)) return;
  const rect = activeInput.getBoundingClientRect();
  if (rect.bottom < 8 || rect.top > window.innerHeight - 8) close();
  else place();
}

function bindInput(input) {
  if (input.dataset.edisonCal === "1") return;
  input.dataset.edisonCal = "1";
  if (nativeLockNeeded()) {
    input.dataset.edisonCalLock = "1";
    input.setAttribute("readonly", "");
    input.setAttribute("inputmode", "none");
  }
  const openCal = (event) => {
    if (input.disabled) return;
    if (event.button != null && event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    open(input);
  };
  input.addEventListener("pointerdown", openCal, true);
  input.addEventListener("mousedown", openCal, true);
  input.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  }, true);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault();
      open(input);
    }
  });
  try {
    Object.defineProperty(input, "showPicker", {
      configurable: true,
      value: () => open(input),
    });
  } catch {
    try {
      input.showPicker = () => open(input);
    } catch {
      /* showPicker is not writable in this browser. */
    }
  }
}

export function bindDatePickers(root = document) {
  if (!root?.querySelectorAll) return;
  ensureShell();
  root.querySelectorAll('input[type="date"]').forEach(bindInput);
}

document.addEventListener("pointerdown", onDocPointer, true);
document.addEventListener("keydown", onDocKey, true);
window.addEventListener("resize", () => {
  if (activeInput) place();
});
window.addEventListener("scroll", onScroll, true);
