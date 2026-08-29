let y = 0;
let active = false;
let listening = false;
let watching = false;
let nativeShowModal;

function root() {
  return document.documentElement;
}

function gap() {
  return Math.max(0, window.innerWidth - root().clientWidth);
}

function blocked() {
  if (document.querySelector("dialog[open]")) return true;
  return Boolean(document.querySelector("#site-drawer[data-open='true']"));
}

function insideAllowed(node) {
  if (!(node instanceof Element)) return false;
  if (node.closest("[data-page-lock-scroll]")) return true;
  for (let el = node; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
    if (!(el instanceof HTMLElement)) continue;
    const style = getComputedStyle(el);
    if ((style.overflowY === "auto" || style.overflowY === "scroll") && el.scrollHeight > el.clientHeight + 1) {
      return true;
    }
  }
  return false;
}

function onGuard(event) {
  if (!active) return;
  if (insideAllowed(event.target)) return;
  event.preventDefault();
}

function listen() {
  if (listening) return;
  listening = true;
  const opts = { capture: true, passive: false };
  document.addEventListener("wheel", onGuard, opts);
  document.addEventListener("touchmove", onGuard, opts);
}

function rememberScroll() {
  if (!active) y = window.scrollY;
}

function applyLock() {
  if (active) return;
  if (!document.querySelector("dialog[open]")) rememberScroll();
  active = true;
  listen();
  root().dataset.pageLock = "true";
  root().style.setProperty("--page-lock-gap", `${gap()}px`);
  document.body.style.top = `-${y}px`;
}

function releaseLock() {
  if (!active) return;
  active = false;
  const html = root();
  html.removeAttribute("data-page-lock");
  html.style.removeProperty("--page-lock-gap");
  document.body.style.top = "";
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, y);
  html.style.scrollBehavior = prev;
}

export function syncPageLock() {
  if (blocked()) applyLock();
  else releaseLock();
}

/** Close only via an explicit Close control — not backdrop click or Escape. */
export function lockDialogToCloseButton(dialog) {
  if (!(dialog instanceof HTMLDialogElement)) return;
  if (dialog.dataset.closeLocked === "1") return;
  dialog.dataset.closeLocked = "1";
  dialog.setAttribute("closedby", "none");
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
  });
}

function lockOpenDialogs() {
  document.querySelectorAll("dialog").forEach(lockDialogToCloseButton);
}

export function watchPageLock() {
  if (watching) return;
  watching = true;
  nativeShowModal = HTMLDialogElement.prototype.showModal;
  HTMLDialogElement.prototype.showModal = function showModalLocked(...args) {
    lockDialogToCloseButton(this);
    rememberScroll();
    const result = nativeShowModal.apply(this, args);
    syncPageLock();
    return result;
  };
  lockOpenDialogs();
  window.addEventListener("scroll", () => {
    if (!active && !document.querySelector("dialog[open]")) y = window.scrollY;
  }, { passive: true });
  syncPageLock();
  document.addEventListener("close", syncPageLock, true);
  document.addEventListener("toggle", syncPageLock, true);
  new MutationObserver(syncPageLock).observe(document.documentElement, {
    subtree: true,
    attributes: true,
    attributeFilter: ["open", "data-open"],
  });
}
