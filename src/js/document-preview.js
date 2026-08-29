import { downloadBytes } from "./agreement-data.js";

const DEFAULTS = {
  title: "Review and sign",
  agree: "I confirm that every detail shown in this document is correct.",
  sign: "Sign and download",
  close: "Close",
  loading: "Preparing the document…",
  fail: "The document could not be prepared. Close this window and try again.",
  signing: "Signing…",
};

let dialog;
let pages;
let status;
let agree;
let sign;
let title;
let agreeLabel;
let closeBtn;
let preview;
let generation = 0;

export function copyFromForm(form) {
  const data = form?.dataset || {};
  return {
    title: data.previewTitle || DEFAULTS.title,
    agree: data.previewAgree || DEFAULTS.agree,
    sign: data.previewSign || DEFAULTS.sign,
    close: data.previewClose || DEFAULTS.close,
    loading: data.previewLoading || DEFAULTS.loading,
    fail: data.previewFail || DEFAULTS.fail,
    signing: data.previewSigning || DEFAULTS.signing,
  };
}

function setStatus(text, mode) {
  status.textContent = text || "";
  status.hidden = !text;
  status.dataset.mode = mode || "";
  pages.hidden = mode !== "ready";
}

function ensureDialog() {
  if (dialog) return;

  dialog = document.createElement("dialog");
  dialog.className = "preview-dialog";
  dialog.setAttribute("aria-labelledby", "preview-dialog-title");
  dialog.setAttribute("closedby", "closerequest");
  dialog.innerHTML = `
    <div class="preview-panel">
      <header class="preview-head">
        <h2 id="preview-dialog-title" tabindex="-1"></h2>
        <button class="btn btn-ghost preview-close" type="button"></button>
      </header>
      <div class="preview-stage">
        <p class="preview-status" hidden></p>
        <div class="preview-pages" hidden></div>
      </div>
      <div class="preview-bar">
        <label class="checkbox">
          <input type="checkbox">
          <span></span>
        </label>
        <button class="btn btn-signal preview-sign" type="button" disabled></button>
      </div>
    </div>
  `;
  document.body.append(dialog);

  title = dialog.querySelector("#preview-dialog-title");
  closeBtn = dialog.querySelector(".preview-close");
  status = dialog.querySelector(".preview-status");
  pages = dialog.querySelector(".preview-pages");
  agree = dialog.querySelector("input[type='checkbox']");
  agreeLabel = dialog.querySelector(".checkbox span");
  sign = dialog.querySelector(".preview-sign");

  closeBtn.addEventListener("click", () => {
    if (!closeBtn.disabled) dialog.close();
  });
  dialog.addEventListener("close", () => {
    generation += 1;
    try {
      preview?.clear();
    } catch {
      /* Preview teardown must not block opening the next document. */
    }
    agree.checked = false;
    agree.disabled = false;
    sign.dataset.ready = "";
    sign.disabled = true;
    sign.onclick = null;
    closeBtn.disabled = false;
    dialog.dataset.confirm = "true";
    dialog.querySelector(".checkbox")?.removeAttribute("hidden");
  });
  agree.addEventListener("change", () => {
    const needsConfirm = dialog.dataset.confirm !== "false";
    sign.disabled = (needsConfirm && !agree.checked)
      || sign.dataset.ready !== "true"
      || closeBtn.disabled;
  });
}

function applyCopy(copy) {
  title.textContent = copy.title;
  agreeLabel.textContent = copy.agree;
  sign.textContent = copy.sign;
  closeBtn.textContent = copy.close;
  pages.setAttribute("aria-label", copy.title);
}

export function openDocumentPreview({
  copy = DEFAULTS,
  prepare,
  onSign,
  confirm = true,
  wait = "close",
}) {
  ensureDialog();
  const labels = { ...DEFAULTS, ...copy };
  const id = ++generation;
  let packed = null;
  const checkWrap = dialog.querySelector(".checkbox");

  applyCopy(labels);
  dialog.dataset.confirm = confirm ? "true" : "false";
  if (checkWrap) checkWrap.hidden = !confirm;
  agree.checked = false;
  agree.disabled = true;
  sign.dataset.ready = "";
  sign.disabled = true;
  sign.onclick = null;
  closeBtn.disabled = false;
  try {
    preview?.clear();
  } catch {
    /* Ignore a stale renderer so a new preview can still open. */
  }
  setStatus(labels.loading, "loading");
  if (!dialog.open) dialog.showModal();
  title.focus();

  const runSign = async () => {
    if (!packed) return;
    if (confirm && !agree.checked) return;
    const signLabel = sign.textContent;
    closeBtn.disabled = true;
    agree.disabled = true;
    sign.disabled = true;
    sign.textContent = labels.signing;
    try {
      if (onSign) await onSign(packed);
      downloadBytes(packed.bytes, packed.filename);
      dialog.close();
    } catch (error) {
      sign.textContent = signLabel;
      setStatus(
        error instanceof Error && error.message ? error.message : labels.fail,
        "ready",
      );
      closeBtn.disabled = false;
      agree.disabled = !confirm;
      sign.disabled = confirm ? !agree.checked : false;
    }
  };
  sign.onclick = runSign;

  return new Promise((resolve, reject) => {
    if (wait !== "ready") {
      dialog.addEventListener("close", () => resolve(), { once: true });
    }

    const settleReady = (error) => {
      if (wait !== "ready") return;
      if (error) reject(error);
      else resolve();
    };

    Promise.resolve()
      .then(prepare)
      .then(async (result) => {
        if (id !== generation) {
          settleReady();
          return;
        }
        packed = result;
        const { createPdfPreview } = await import("./pdf-preview.js");
        if (id !== generation) {
          settleReady();
          return;
        }
        preview = preview || createPdfPreview(pages);
        pages.hidden = false;
        await preview.show(result.bytes);
        if (id !== generation) {
          settleReady();
          return;
        }
        setStatus("", "ready");
        sign.dataset.ready = "true";
        agree.disabled = !confirm;
        sign.disabled = confirm ? !agree.checked : false;
        settleReady();
      })
      .catch((error) => {
        if (id !== generation) {
          settleReady();
          return;
        }
        setStatus(
          error instanceof Error && error.message ? error.message : labels.fail,
          "error",
        );
        agree.disabled = true;
        sign.disabled = true;
        settleReady(error instanceof Error ? error : new Error(labels.fail));
      });
  });
}
