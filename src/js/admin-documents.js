import {
  agreementFilename,
  agreementFromRecord,
  buildAgreement,
  todayIso,
} from "./agreement-data.js";
import {
  COMPOSE_KINDS,
  DOCUMENT_LABELS,
  fieldsForKind,
  kindSaved,
} from "./clients-documents-model.js";
import { openDocumentPreview } from "./document-preview.js";
import {
  agreementFieldsHtml,
  claimFieldsHtml,
  FIXED_FEE_EARNER_LINE,
  releaseFieldsHtml,
} from "../lib/matter-fields.js";
import { formControl } from "./form-control.js";
import { applyMatterMock, bindFullFieldPickers, MATTER_MOCK } from "./matter-forms.js";

const ADMIN_COPY = {
  title: "Preview",
  agree: "",
  sign: "Download",
  close: "Close",
  loading: "Preparing the document…",
  fail: "The document could not be prepared. Close this window and try again.",
  signing: "Downloading…",
};

function setStatus(node, text) {
  if (node) node.textContent = text || "";
}

function fillForm(form, values) {
  Object.entries(values).forEach(([name, value]) => {
    const field = formControl(form, name);
    if (!field || value == null) return;
    field.value = String(value);
    field.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function syncShowWhen(form) {
  form.querySelectorAll("[data-show-when]").forEach((node) => {
    const rule = node.getAttribute("data-show-when") || "";
    const eq = rule.indexOf("=");
    if (eq < 0) return;
    const name = rule.slice(0, eq);
    const want = rule.slice(eq + 1);
    const field = formControl(form, name);
    node.hidden = String(field?.value || "") !== want;
  });
}

function prefill(kind, item, payload) {
  const name = item.full_name || "";
  const feeEarner = FIXED_FEE_EARNER_LINE;
  if (kind === "agreement") {
    return {
      clientName: name,
      clientEmail: item.email || "",
      clientPhone: item.phone || "",
      clientOccupation: item.occupation || "",
      clientDob: String(item.date_of_birth || "").slice(0, 10),
    };
  }
  if (kind === "claim" || kind === "matter") {
    return {
      clientName: name,
      court: "City of London Magistrates' Court",
      claimants: "none",
      copyTo: "CPS Proceeds of Crime Division",
      feeEarner,
    };
  }
  return {
    applicant: name,
    wsName: name,
    court: "City of London Magistrates' Court",
    feeEarner,
  };
}

function lockFeeEarner(form) {
  form.querySelectorAll('[name="feeEarner"], #feeEarner').forEach((node) => {
    node.value = FIXED_FEE_EARNER_LINE;
  });
}

function fieldsHtml(kind) {
  if (kind === "agreement") return agreementFieldsHtml();
  if (kind === "release") return releaseFieldsHtml();
  return claimFieldsHtml();
}

function firstAgreementInvalid(form) {
  const checks = [
    ["clientName", (value) => !value],
    ["clientEmail", (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)],
    ["clientPhone", (value) => value.replace(/\D/g, "").length < 8],
    ["clientDob", (value) => !value || value > todayIso()],
  ];
  for (const [name, invalid] of checks) {
    const input = formControl(form, name);
    const value = String(input?.value || "").trim();
    const on = invalid(value);
    const visible = input?.closest(".edison-date")?.querySelector(".edison-date-text") || input;
    input?.closest(".field")?.classList.toggle("is-invalid", on);
    visible?.setAttribute("aria-invalid", on ? "true" : "false");
    if (on) return visible;
  }
  return null;
}

function formFields(form) {
  const values = {};
  new FormData(form).forEach((value, name) => {
    values[name] = String(value || "").trim();
  });
  return values;
}

function previewPacked(prepare, kind) {
  return openDocumentPreview({
    copy: {
      ...ADMIN_COPY,
      title: DOCUMENT_LABELS[kind] || "Document",
    },
    confirm: false,
    prepare,
    wait: "ready",
  });
}

function markBusy(button, on, busyText) {
  if (!button) return;
  if (on) {
    if (button.dataset.idle == null) button.dataset.idle = button.textContent;
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    if (busyText) button.textContent = busyText;
    return;
  }
  button.disabled = false;
  button.removeAttribute("aria-busy");
  if (button.dataset.idle != null) {
    button.textContent = button.dataset.idle;
    delete button.dataset.idle;
  }
}

export function bindAdminDocuments({ payload, statusNode, onSaved }) {
  const menu = document.createElement("div");
  menu.className = "admin-doc-menu";
  menu.id = "admin-doc-menu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", "Add or edit a document");
  menu.hidden = true;
  menu.innerHTML = COMPOSE_KINDS.map(
    (kind) => `<button type="button" role="menuitem" data-admin-create="${kind}">${DOCUMENT_LABELS[kind]}</button>`,
  ).join("");
  document.body.append(menu);

  const savedMenu = document.createElement("div");
  savedMenu.className = "admin-doc-menu";
  savedMenu.id = "admin-doc-saved-menu";
  savedMenu.setAttribute("role", "menu");
  savedMenu.setAttribute("aria-label", "Saved documents");
  savedMenu.hidden = true;
  document.body.append(savedMenu);

  const compose = document.createElement("dialog");
  compose.className = "admin-compose-dialog";
  compose.setAttribute("aria-labelledby", "admin-compose-title");
  compose.setAttribute("closedby", "none");
  compose.innerHTML = `
    <div class="admin-compose-panel">
      <header class="preview-head">
        <h2 id="admin-compose-title" tabindex="-1"></h2>
        <button class="btn btn-ghost preview-close" type="button">Close</button>
      </header>
      <div class="admin-compose-body">
        <form class="form matter-form admin-compose-form" id="admin-compose-form" novalidate>
          <p class="admin-compose-note muted" data-compose-saved hidden>This document is already on file. Saving will replace it.</p>
          <p class="admin-compose-status" data-compose-status hidden></p>
          <div class="admin-compose-fields"></div>
        </form>
      </div>
      <div class="preview-bar">
        <button class="btn btn-muted" type="button" data-compose-mock hidden>Insert mock</button>
        <button class="btn btn-ghost" type="button" data-compose-preview>Preview</button>
        <button class="btn btn-signal" type="submit" form="admin-compose-form" data-compose-save>Save</button>
      </div>
    </div>
  `;
  document.body.append(compose);

  const title = compose.querySelector("#admin-compose-title");
  const form = compose.querySelector("#admin-compose-form");
  const fields = compose.querySelector(".admin-compose-fields");
  const composeStatus = compose.querySelector("[data-compose-status]");
  const savedNote = compose.querySelector("[data-compose-saved]");
  const saveBtn = compose.querySelector("[data-compose-save]");
  const previewBtn = compose.querySelector("[data-compose-preview]");
  const mockBtn = compose.querySelector("[data-compose-mock]");
  const closeBtn = compose.querySelector(".preview-close");

  let menuButton = null;
  let savedMenuButton = null;
  let activeItem = null;
  let activeKind = "";
  let saving = false;
  let previewing = false;

  const closeMenu = () => {
    menu.hidden = true;
    savedMenu.hidden = true;
    savedMenu.replaceChildren();
    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton = null;
    }
    if (savedMenuButton) {
      savedMenuButton.setAttribute("aria-expanded", "false");
      savedMenuButton = null;
    }
  };

  const showComposeStatus = (text, ok = false) => {
    composeStatus.hidden = !text;
    composeStatus.textContent = text || "";
    composeStatus.classList.toggle("is-ok", Boolean(ok && text));
  };

  const paintMenu = (item) => {
    menu.querySelectorAll("[data-admin-create]").forEach((button) => {
      const kind = button.getAttribute("data-admin-create");
      const saved = kindSaved(item?.documents, kind);
      const label = DOCUMENT_LABELS[kind];
      button.textContent = saved ? `${label} · Saved` : `Add ${label.toLowerCase()}`;
      button.classList.toggle("is-saved", saved);
    });
  };

  const paintSavedMenu = (item) => {
    const kinds = COMPOSE_KINDS.filter((kind) => kindSaved(item?.documents, kind));
    savedMenu.replaceChildren();
    kinds.forEach((kind) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("role", "menuitem");
      button.dataset.adminPreviewKind = kind;
      button.textContent = DOCUMENT_LABELS[kind];
      savedMenu.append(button);
    });
  };

  const placeAt = (node, button) => {
    const rect = button.getBoundingClientRect();
    node.hidden = false;
    const height = node.offsetHeight;
    const width = node.offsetWidth;
    const below = window.innerHeight - rect.bottom;
    const top = below < height + 8 && rect.top > height + 8
      ? rect.top - height - 6
      : rect.bottom + 6;
    const left = Math.min(rect.right - width, window.innerWidth - width - 8);
    node.style.top = `${Math.max(8, top)}px`;
    node.style.left = `${Math.max(8, left)}px`;
  };

  const toggleMenu = (button, item) => {
    if (menuButton === button && !menu.hidden) {
      closeMenu();
      return;
    }
    closeMenu();
    activeItem = item;
    menuButton = button;
    button.setAttribute("aria-expanded", "true");
    paintMenu(item);
    placeAt(menu, button);
  };

  const toggleSavedMenu = (button, item) => {
    if (button.disabled) return;
    if (savedMenuButton === button && !savedMenu.hidden) {
      closeMenu();
      return;
    }
    closeMenu();
    activeItem = item;
    savedMenuButton = button;
    button.setAttribute("aria-expanded", "true");
    paintSavedMenu(item);
    if (!savedMenu.childElementCount) {
      closeMenu();
      return;
    }
    placeAt(savedMenu, button);
  };

  const previewAgreement = (item) => {
    if (!payload?.firm || !Array.isArray(payload.people)) {
      setStatus(statusNode, "Agreement defaults are missing.");
      return;
    }
    setStatus(statusNode, "");
    const saved = fieldsForKind(item.documents, "agreement");
    return previewPacked(async () => {
      const data = Object.keys(saved).length
        ? buildAgreement(
          {
            clientName: saved.clientName,
            clientEmail: saved.clientEmail,
            clientPhone: saved.clientPhone,
            clientOccupation: saved.clientOccupation,
            clientDob: saved.clientDob,
          },
          payload,
          {
            instructSlug: item?.instructed_person_slug || "",
            when: item?.created_at,
          },
        )
        : agreementFromRecord(item, payload);
      const { generateAgreementPdf } = await import("./agreement-pdf.js");
      return {
        bytes: await generateAgreementPdf(data),
        filename: agreementFilename(data.matterReference),
      };
    }, "agreement");
  };

  const previewFromForm = async () => {
    if (activeKind === "agreement") {
      const invalid = firstAgreementInvalid(form);
      if (invalid) {
        showComposeStatus("Check the highlighted fields and try again.");
        invalid.focus?.();
        return;
      }
    }
    showComposeStatus("");
    if (activeKind === "agreement") {
      const values = formFields(form);
      await previewPacked(async () => {
        const data = buildAgreement(
          {
            clientName: values.clientName,
            clientEmail: values.clientEmail,
            clientPhone: values.clientPhone,
            clientOccupation: values.clientOccupation,
            clientDob: values.clientDob,
          },
          payload,
          {
            instructSlug: activeItem?.instructed_person_slug || "",
            when: activeItem?.created_at,
          },
        );
        const { generateAgreementPdf } = await import("./agreement-pdf.js");
        return {
          bytes: await generateAgreementPdf(data),
          filename: agreementFilename(data.matterReference),
        };
      }, "agreement");
      return;
    }
    const { formValues, matterPdf } = await import("./matter-download.js");
    const kind = activeKind;
    await previewPacked(() => matterPdf(kind, formValues(form), { people: payload.people }), kind);
  };

  const openCompose = (kind, item) => {
    closeMenu();
    if (!payload?.firm || !Array.isArray(payload.people)) {
      setStatus(statusNode, "Agreement defaults are missing.");
      return;
    }
    if (!item?.id) {
      setStatus(statusNode, "That record could not be found.");
      return;
    }
    if (!COMPOSE_KINDS.includes(kind)) {
      setStatus(statusNode, "That document is previewed from the client record.");
      return;
    }
    activeItem = item;
    activeKind = kind;
    const saved = kindSaved(item.documents, kind);
    title.textContent = DOCUMENT_LABELS[kind] || "Document";
    savedNote.hidden = !saved;
    saveBtn.textContent = saved ? "Update" : "Save";
    delete saveBtn.dataset.idle;
    delete previewBtn.dataset.idle;
    previewBtn.textContent = "Preview";
    mockBtn.hidden = !MATTER_MOCK[kind];
    fields.innerHTML = fieldsHtml(kind);
    form.reset();
    showComposeStatus("");
    fillForm(form, {
      ...prefill(kind, item, payload),
      ...(kind === "matter" && !saved ? fieldsForKind(item.documents, "claim") : {}),
      ...fieldsForKind(item.documents, kind),
      feeEarner: FIXED_FEE_EARNER_LINE,
    });
    lockFeeEarner(form);
    const dob = formControl(form, "clientDob");
    if (dob) dob.max = todayIso();
    bindFullFieldPickers(form);
    syncShowWhen(form);
    if (!compose.open) compose.showModal();
    title.focus();
  };

  const setBarBusy = (on, { save, preview } = {}) => {
    markBusy(saveBtn, on, save);
    markBusy(previewBtn, on, preview);
    mockBtn.disabled = on;
    closeBtn.disabled = on;
  };

  const savedFields = (item, kind) => ({
    ...prefill(kind, item, payload),
    ...fieldsForKind(item.documents, kind),
  });

  const previewKind = (item, kind) => {
    closeMenu();
    if (!payload?.firm || !Array.isArray(payload.people)) {
      setStatus(statusNode, "Agreement defaults are missing.");
      return Promise.reject(new Error("Agreement defaults are missing."));
    }
    if (!item?.id) {
      setStatus(statusNode, "That record could not be found.");
      return Promise.reject(new Error("That record could not be found."));
    }
    if (kind === "agreement") return previewAgreement(item);
    if (!COMPOSE_KINDS.includes(kind) || !kindSaved(item.documents, kind)) {
      setStatus(statusNode, "That document is not on file.");
      return Promise.reject(new Error("That document is not on file."));
    }
    setStatus(statusNode, "");
    const fields = savedFields(item, kind);
    return previewPacked(async () => {
      const { matterPdf } = await import("./matter-download.js");
      return matterPdf(kind, fields, { people: payload.people });
    }, kind);
  };

  const saveDocument = async () => {
    if (!activeItem?.id || !activeKind) return;
    if (!COMPOSE_KINDS.includes(activeKind)) return;
    if (activeKind === "agreement") {
      const invalid = firstAgreementInvalid(form);
      if (invalid) {
        showComposeStatus("Check the highlighted fields and try again.");
        invalid.focus?.();
        return;
      }
    }
    const updating = kindSaved(activeItem.documents, activeKind);
    saving = true;
    showComposeStatus("");
    setBarBusy(true, { save: updating ? "Updating…" : "Saving…" });
    try {
      const rawFields = formFields(form);
      rawFields.feeEarner = FIXED_FEE_EARNER_LINE;
      lockFeeEarner(form);
      const { validateMatterFields } = await import("./matter-validate.js");
      const validation = validateMatterFields(rawFields, { people: payload.people });
      if (!validation.ok) {
        const top = validation.critical.slice(0, 2).map((item) => item.message).join(" ");
        showComposeStatus(top || "Fix the highlighted document issues before saving.");
        setBarBusy(false);
        saving = false;
        return;
      }
      const response = await fetch("/api/admin/clients-documents", {
        method: "PUT",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          prepare_client_id: activeItem.id,
          kind: activeKind,
          fields: rawFields,
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        const extra = body.hint ? ` ${body.hint}` : "";
        throw new Error(`${body.error || "Could not save the document."}${extra}`);
      }
      activeItem.document_id = body.id;
      activeItem.documents = body.documents;
      onSaved?.(activeItem, activeKind);
      compose.close();
    } catch (error) {
      showComposeStatus(error instanceof Error && error.message
        ? error.message
        : "Could not save the document.");
      setBarBusy(false);
      saving = false;
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (saving || previewing) return;
    await saveDocument();
  });
  mockBtn.addEventListener("click", () => {
    if (saving || previewing) return;
    if (!applyMatterMock(form, activeKind, {
      keepFilled: ["clientName", "applicant", "wsName"],
    })) return;
    lockFeeEarner(form);
    syncShowWhen(form);
  });
  previewBtn.addEventListener("click", async () => {
    if (saving || previewing) return;
    previewing = true;
    setBarBusy(true, { preview: "Preparing…" });
    try {
      await previewFromForm();
    } catch (error) {
      showComposeStatus(error instanceof Error && error.message
        ? error.message
        : "The document could not be prepared.");
    } finally {
      previewing = false;
      if (compose.open && !saving) setBarBusy(false);
    }
  });
  form.addEventListener("change", () => syncShowWhen(form));
  form.addEventListener("input", () => syncShowWhen(form));

  closeBtn.addEventListener("click", () => {
    if (!saving && !previewing) compose.close();
  });
  compose.addEventListener("cancel", (event) => {
    event.preventDefault();
  });
  compose.addEventListener("close", () => {
    activeKind = "";
    saving = false;
    previewing = false;
    setBarBusy(false);
    fields.replaceChildren();
  });

  menu.addEventListener("click", (event) => {
    const button = event.target.closest("[data-admin-create]");
    if (!button || !activeItem) return;
    openCompose(button.getAttribute("data-admin-create"), activeItem);
  });

  savedMenu.addEventListener("click", (event) => {
    const button = event.target.closest("[data-admin-preview-kind]");
    if (!button || !activeItem) return;
    const kind = button.getAttribute("data-admin-preview-kind");
    const item = activeItem;
    const trigger = savedMenuButton;
    closeMenu();
    if (trigger) {
      trigger.disabled = true;
      trigger.setAttribute("aria-busy", "true");
    }
    Promise.resolve(previewKind(item, kind))
      .catch((error) => {
        setStatus(
          statusNode,
          error instanceof Error && error.message
            ? error.message
            : "The document could not be prepared.",
        );
      })
      .finally(() => {
        if (!trigger) return;
        trigger.disabled = false;
        trigger.removeAttribute("aria-busy");
      });
  });

  document.addEventListener("click", (event) => {
    if (menu.hidden && savedMenu.hidden) return;
    const t = event.target;
    if (menu.contains(t) || savedMenu.contains(t)) return;
    if (menuButton?.contains(t) || savedMenuButton?.contains(t)) return;
    closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && (!menu.hidden || !savedMenu.hidden)) closeMenu();
  });
  window.addEventListener("resize", closeMenu);
  window.addEventListener("scroll", closeMenu, true);

  return {
    previewRecord(item) {
      closeMenu();
      return previewAgreement(item);
    },
    previewKind(item, kind) {
      return previewKind(item, kind);
    },
    openKind(item, kind) {
      openCompose(kind, item);
    },
    toggleMenu,
    toggleSavedMenu,
    closeMenu,
    reset() {
      closeMenu();
      if (compose.open) compose.close();
    },
  };
}
