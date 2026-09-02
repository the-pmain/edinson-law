import { readJson } from "./agreement-data.js";
import { bindAdminDocuments } from "./admin-documents.js";
import {
  COMPOSE_KINDS,
  kindSaved,
} from "./clients-documents-model.js";
import { formatUkDate, formatUkDateTime } from "../lib/dates.js";

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

function europeanDate(formatted) {
  return formatted ? formatted.replaceAll("/", ".") : "—";
}

function formatDateTime(value) {
  return europeanDate(formatUkDateTime(value));
}

function formatDate(value) {
  return europeanDate(formatUkDate(value));
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
  const actionStatus = root.querySelector("[data-admin-action-status]");
  const dots = [...(root.querySelectorAll("[data-admin-pin-dots] span") || [])];
  const payload = readJson("edison-agreement-defaults");
  const records = new Map();
  let listItems = [];
  const docs = bindAdminDocuments({
    payload,
    statusNode: actionStatus,
    onSaved(item) {
      listItems = listItems.map((row) => (row.id === item.id ? { ...row, ...item } : row));
      renderRows(listItems);
    },
  });

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
    if (actionStatus) actionStatus.textContent = "";
    if (rows) rows.replaceChildren();
  };

  const recordKey = (item, index) => String(item.id ?? `${item.created_at || ""}-${item.full_name || ""}-${index}`);

  const actionCell = (item, key) => {
    const td = document.createElement("td");
    const wrap = document.createElement("div");
    wrap.className = "admin-actions";
    const name = item.full_name || "client";
    const saved = COMPOSE_KINDS.filter((kind) => kindSaved(item.documents, kind));

    const docsBtn = document.createElement("button");
    docsBtn.type = "button";
    docsBtn.className = "icon-btn admin-doc-list-btn";
    docsBtn.dataset.adminDocs = key;
    docsBtn.disabled = saved.length === 0;
    docsBtn.title = saved.length ? "Preview saved documents" : "No documents yet";
    docsBtn.setAttribute(
      "aria-label",
      saved.length
        ? `Preview saved documents for ${name}`
        : `No saved documents for ${name}`,
    );
    docsBtn.setAttribute("aria-haspopup", "menu");
    docsBtn.setAttribute("aria-expanded", "false");
    docsBtn.setAttribute("aria-controls", "admin-doc-saved-menu");
    docsBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M8 13h8M8 17h5"/></svg>`;

    const preview = document.createElement("button");
    preview.type = "button";
    preview.className = "icon-btn admin-preview";
    preview.dataset.adminPreview = key;
    preview.title = "Preview client authority form";
    preview.setAttribute("aria-label", `Preview client authority form for ${name}`);
    preview.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12s3.6-7 9.5-7 9.5 7 9.5 7-3.6 7-9.5 7-9.5-7-9.5-7z"/><circle cx="12" cy="12" r="3"/></svg>`;

    const menu = document.createElement("button");
    menu.type = "button";
    menu.className = "icon-btn admin-doc-menu-btn";
    menu.dataset.adminMenu = key;
    menu.title = "Add or edit a document";
    menu.setAttribute("aria-label", `Add or edit a document for ${name}`);
    menu.setAttribute("aria-haspopup", "menu");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-controls", "admin-doc-menu");
    menu.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="6" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="12" cy="18" r="1.7"/></svg>`;

    wrap.append(docsBtn, preview, menu);
    td.append(wrap);
    return td;
  };

  const renderRows = (items) => {
    if (!rows) return;
    records.clear();
    docs.closeMenu();
    rows.replaceChildren();
    items.forEach((item, index) => {
      const key = recordKey(item, index);
      records.set(key, item);
      const tr = document.createElement("tr");
      tr.append(
        cell(formatDateTime(item.created_at)),
        cell(item.full_name),
        cell(item.email),
        cell(item.phone),
        cell(item.occupation),
        cell(formatDate(item.date_of_birth)),
        cell(item.instructed_person_slug),
        actionCell(item, key),
      );
      rows.append(tr);
    });
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
      listItems = items;
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
    records.clear();
    listItems = [];
    docs.reset();
    if (rows) rows.replaceChildren();
    if (actionStatus) actionStatus.textContent = "";
    showGate();
  });

  retry?.addEventListener("click", () => {
    load();
  });

  table?.addEventListener("click", (event) => {
    const preview = event.target.closest("[data-admin-preview]");
    const menu = event.target.closest("[data-admin-menu]");
    const docsBtn = event.target.closest("[data-admin-docs]");
    const button = preview || menu || docsBtn;
    if (!button || !table.contains(button) || button.disabled) return;
    const key = button.dataset.adminPreview || button.dataset.adminMenu || button.dataset.adminDocs;
    const item = records.get(key);
    if (!item) {
      if (actionStatus) actionStatus.textContent = "That record could not be found.";
      return;
    }
    if (menu) {
      docs.toggleMenu(button, item);
      return;
    }
    if (docsBtn) {
      docs.toggleSavedMenu(button, item);
      return;
    }
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    Promise.resolve(docs.previewRecord(item))
      .catch((error) => {
        if (actionStatus) {
          actionStatus.textContent = error instanceof Error && error.message
            ? error.message
            : "The document could not be prepared.";
        }
      })
      .finally(() => {
        button.disabled = false;
        button.removeAttribute("aria-busy");
      });
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
