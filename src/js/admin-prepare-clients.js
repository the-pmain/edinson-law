const ADMIN_PIN = "1100";
const SESSION_KEY = "edison-admin-ok";
const PER_PAGE = 20;
const PIN_LENGTH = 4;

function sessionOn() {
  return localStorage.getItem(SESSION_KEY) === "1";
}

function setSession(on) {
  if (on) {
    localStorage.setItem(SESSION_KEY, "1");
    document.documentElement.dataset.adminSession = "1";
  } else {
    localStorage.removeItem(SESSION_KEY);
    delete document.documentElement.dataset.adminSession;
  }
}

function currentPage() {
  const page = Number.parseInt(new URLSearchParams(window.location.search).get("page") || "1", 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(date);
}

function cell(text) {
  const td = document.createElement("td");
  td.textContent = text || "—";
  return td;
}

function pagerLink(page, label, enabled) {
  if (!enabled) {
    const span = document.createElement("span");
    span.className = "btn btn-ghost";
    span.setAttribute("aria-disabled", "true");
    span.textContent = label;
    return span;
  }
  const link = document.createElement("a");
  link.className = "btn btn-ghost";
  link.href = page <= 1 ? "/admin/" : `/admin/?page=${page}`;
  link.textContent = label;
  return link;
}

async function fetchPage(page) {
  const response = await fetch(`/api/admin/prepare-clients?page=${page}&per_page=${PER_PAGE}`, {
    headers: { Accept: "application/json" },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "Could not load client records.");
    error.status = response.status;
    error.hint = payload.hint;
    throw error;
  }
  return payload;
}

export function adminPrepareClients() {
  const root = document.querySelector("[data-admin-prepare-clients]");
  if (!root) return;

  const page = root;
  const gate = root.querySelector("[data-admin-gate]");
  const pad = root.querySelector(".admin-pin-pad");
  const list = root.querySelector("[data-admin-list]");
  const loading = root.querySelector("[data-admin-loading]");
  const table = root.querySelector("[data-admin-table]");
  const rows = root.querySelector("[data-admin-rows]");
  const empty = root.querySelector("[data-admin-empty]");
  const errorBox = root.querySelector("[data-admin-error]");
  const pager = root.querySelector("[data-admin-pager]");
  const summary = root.querySelector("[data-admin-summary]");
  const gateStatus = root.querySelector("[data-admin-gate-status]");
  const listStatus = root.querySelector("[data-admin-list-status]");
  const signOut = root.querySelector("[data-admin-sign-out]");
  const retry = root.querySelector("[data-admin-retry]");
  const dots = [...(root.querySelectorAll("[data-admin-pin-dots] span") || [])];

  let pin = "";
  let locked = false;
  let request = 0;

  const setHidden = (node, hidden) => {
    if (node) node.hidden = hidden;
  };

  const setBusy = (on) => {
    pad?.setAttribute("aria-busy", on ? "true" : "false");
    if (pad) pad.classList.toggle("is-busy", on);
    list?.setAttribute("aria-busy", on ? "true" : "false");
  };

  const paintDots = (mode = "") => {
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-filled", i < pin.length);
      dot.classList.toggle("is-error", mode === "error");
    });
    root.querySelector("[data-admin-pin-dots]")?.classList.toggle("is-error", mode === "error");
  };

  const showGate = () => {
    page?.classList.remove("is-open");
    setHidden(gate, false);
    setHidden(list, true);
    pin = "";
    locked = false;
    setBusy(false);
    paintDots();
    if (gateStatus) gateStatus.textContent = "";
  };

  const showOpen = () => {
    page?.classList.add("is-open");
    setHidden(gate, true);
    setHidden(list, false);
    pin = "";
    paintDots();
  };

  const showLoading = () => {
    showOpen();
    setBusy(true);
    if (summary) summary.textContent = "Loading records";
    setHidden(loading, false);
    setHidden(table, true);
    setHidden(empty, true);
    setHidden(errorBox, true);
    setHidden(pager, true);
    if (rows) rows.replaceChildren();
  };

  const renderRows = (items) => {
    if (!rows) return;
    rows.replaceChildren();
    for (const item of items) {
      const tr = document.createElement("tr");
      tr.append(
        cell(formatDateTime(item.created_at)),
        cell(item.full_name),
        cell(item.email),
        cell(item.address),
        cell(formatDate(item.date_of_birth)),
        cell(item.instructed_person_slug),
      );
      rows.append(tr);
    }
  };

  const renderPager = (meta) => {
    if (!pager) return;
    pager.replaceChildren();
    if (!meta.total || meta.total_pages <= 1) {
      pager.hidden = true;
      return;
    }
    pager.hidden = false;
    pager.append(pagerLink(meta.page - 1, "Previous", meta.has_prev));
    const status = document.createElement("p");
    status.textContent = `Page ${meta.page} of ${meta.total_pages}`;
    pager.append(status);
    pager.append(pagerLink(meta.page + 1, "Next", meta.has_next));
  };

  const load = async () => {
    if (!sessionOn()) {
      showGate();
      return;
    }
    const ticket = ++request;
    showLoading();
    try {
      const data = await fetchPage(currentPage());
      if (ticket !== request) return;
      const items = Array.isArray(data.items) ? data.items : [];
      setBusy(false);
      setHidden(loading, true);
      if (summary) {
        summary.textContent = data.total
          ? `${data.total} record${data.total === 1 ? "" : "s"}`
          : "No records";
      }
      if (!data.total) {
        setHidden(table, true);
        setHidden(empty, false);
        setHidden(errorBox, true);
        setHidden(pager, true);
        return;
      }
      renderRows(items);
      setHidden(table, false);
      setHidden(empty, true);
      setHidden(errorBox, true);
      renderPager(data);
    } catch (error) {
      if (ticket !== request) return;
      setBusy(false);
      setHidden(loading, true);
      setHidden(table, true);
      setHidden(empty, true);
      setHidden(errorBox, false);
      if (summary) summary.textContent = "Could not load records";
      if (listStatus) {
        const extra = error.hint ? ` ${error.hint}` : "";
        listStatus.textContent = `${error.message || "Could not load client records."}${extra}`;
      }
    }
  };

  const unlock = () => {
    locked = true;
    setBusy(true);
    if (gateStatus) gateStatus.textContent = "";
    setSession(true);
    load();
  };

  const reject = () => {
    locked = true;
    paintDots("error");
    if (gateStatus) gateStatus.textContent = "Wrong PIN.";
    window.setTimeout(() => {
      pin = "";
      locked = false;
      paintDots();
      if (gateStatus) gateStatus.textContent = "";
    }, 420);
  };

  const submitPin = () => {
    if (pin === ADMIN_PIN) unlock();
    else reject();
  };

  const addDigit = (digit) => {
    if (locked || pin.length >= PIN_LENGTH) return;
    pin += digit;
    paintDots();
    if (pin.length === PIN_LENGTH) submitPin();
  };

  gate?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || !gate.contains(button) || locked) return;
    if (button.hasAttribute("data-pin-clear")) {
      pin = "";
      paintDots();
      if (gateStatus) gateStatus.textContent = "";
      return;
    }
    if (button.hasAttribute("data-pin-back")) {
      pin = pin.slice(0, -1);
      paintDots();
      return;
    }
    const digit = button.getAttribute("data-pin-digit");
    if (digit) addDigit(digit);
  });

  document.addEventListener("keydown", (event) => {
    if (!gate || gate.hidden || locked) return;
    if (event.key >= "0" && event.key <= "9") {
      event.preventDefault();
      addDigit(event.key);
      return;
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      pin = pin.slice(0, -1);
      paintDots();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      pin = "";
      paintDots();
    }
  });

  signOut?.addEventListener("click", () => {
    request += 1;
    setSession(false);
    if (rows) rows.replaceChildren();
    showGate();
  });

  retry?.addEventListener("click", () => {
    load();
  });

  pager?.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    const url = new URL(link.href, window.location.origin);
    if (url.pathname !== "/admin/" && url.pathname !== "/admin") return;
    event.preventDefault();
    history.pushState({}, "", `${url.pathname}${url.search}`);
    load();
  });

  window.addEventListener("popstate", load);
  load();
}
