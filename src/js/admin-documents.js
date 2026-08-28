import {
  agreementFilename,
  agreementFromRecord,
  buildAgreement,
  resolvePerson,
  todayIso,
} from "./agreement-data.js";
import { openDocumentPreview } from "./document-preview.js";
import {
  agreementFieldsHtml,
  claimFieldsHtml,
  releaseFieldsHtml,
} from "../lib/matter-fields.js";

const ADMIN_COPY = {
  title: "Preview",
  agree: "",
  sign: "Download",
  close: "Close",
  loading: "Preparing the document…",
  fail: "The document could not be prepared. Close this window and try again.",
  signing: "Downloading…",
};

const MENU_ITEMS = [
  { kind: "agreement", label: "Client authority form" },
  { kind: "claim", label: "Victim claim" },
  { kind: "release", label: "Draft release order" },
];

const TITLES = {
  agreement: "Client authority form",
  claim: "Victim claim",
  release: "Draft release order",
};

function feeEarnerLine(people, slug) {
  const person = resolvePerson(people, slug);
  if (!person) return "";
  return [person.name, person.phone, person.email].filter(Boolean).join(" · ");
}

function setStatus(node, text) {
  if (node) node.textContent = text || "";
}

function fillForm(form, values) {
  Object.entries(values).forEach(([name, value]) => {
    const field = form.elements.namedItem(name);
    if (!field || value == null) return;
    field.value = String(value);
  });
}

function syncShowWhen(form) {
  form.querySelectorAll("[data-show-when]").forEach((node) => {
    const rule = node.getAttribute("data-show-when") || "";
    const eq = rule.indexOf("=");
    if (eq < 0) return;
    const name = rule.slice(0, eq);
    const want = rule.slice(eq + 1);
    const field = form.elements.namedItem(name);
    node.hidden = String(field?.value || "") !== want;
  });
}

function prefill(kind, item, payload) {
  const name = item.full_name || "";
  const feeEarner = feeEarnerLine(payload?.people, item.instructed_person_slug);
  if (kind === "agreement") {
    return {
      clientName: name,
      clientEmail: item.email || "",
      clientPhone: item.phone || "",
      clientOccupation: item.occupation || "",
      clientDob: String(item.date_of_birth || "").slice(0, 10),
    };
  }
  if (kind === "claim") {
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
    const input = form.elements.namedItem(name);
    const value = String(input?.value || "").trim();
    const on = invalid(value);
    input?.closest(".field")?.classList.toggle("is-invalid", on);
    input?.setAttribute("aria-invalid", on ? "true" : "false");
    if (on) return input;
  }
  return null;
}

async function previewPacked(prepare) {
  await openDocumentPreview({
    copy: ADMIN_COPY,
    confirm: false,
    prepare,
  });
}

export function bindAdminDocuments({ payload, statusNode }) {
  const menu = document.createElement("div");
  menu.className = "admin-doc-menu";
  menu.id = "admin-doc-menu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", "Create a document");
  menu.hidden = true;
  menu.innerHTML = MENU_ITEMS.map(
    (item) => `<button type="button" role="menuitem" data-admin-create="${item.kind}">${item.label}</button>`,
  ).join("");
  document.body.append(menu);

  const compose = document.createElement("dialog");
  compose.className = "admin-compose-dialog";
  compose.setAttribute("aria-labelledby", "admin-compose-title");
  compose.innerHTML = `
    <div class="admin-compose-panel">
      <header class="preview-head">
        <h2 id="admin-compose-title" tabindex="-1"></h2>
        <button class="btn btn-ghost preview-close" type="button">Close</button>
      </header>
      <div class="admin-compose-body">
        <form class="form matter-form admin-compose-form" id="admin-compose-form" novalidate>
          <p class="admin-compose-status" data-compose-status hidden></p>
          <div class="admin-compose-fields"></div>
        </form>
      </div>
      <div class="preview-bar">
        <button class="btn btn-signal" type="submit" form="admin-compose-form">Preview document</button>
      </div>
    </div>
  `;
  document.body.append(compose);

  const title = compose.querySelector("#admin-compose-title");
  const form = compose.querySelector("#admin-compose-form");
  const fields = compose.querySelector(".admin-compose-fields");
  const composeStatus = compose.querySelector("[data-compose-status]");
  const closeBtn = compose.querySelector(".preview-close");

  let menuButton = null;
  let activeItem = null;
  let activeKind = "";

  const closeMenu = () => {
    menu.hidden = true;
    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton = null;
    }
  };

  const placeMenu = (button) => {
    const rect = button.getBoundingClientRect();
    menu.hidden = false;
    const height = menu.offsetHeight;
    const width = menu.offsetWidth;
    const below = window.innerHeight - rect.bottom;
    const top = below < height + 8 && rect.top > height + 8
      ? rect.top - height - 6
      : rect.bottom + 6;
    const left = Math.min(rect.right - width, window.innerWidth - width - 8);
    menu.style.top = `${Math.max(8, top)}px`;
    menu.style.left = `${Math.max(8, left)}px`;
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
    placeMenu(button);
  };

  const previewAgreement = (item) => {
    if (!payload?.firm || !Array.isArray(payload.people)) {
      setStatus(statusNode, "Agreement defaults are missing.");
      return;
    }
    setStatus(statusNode, "");
    return previewPacked(async () => {
      const data = agreementFromRecord(item, payload);
      const { generateAgreementPdf } = await import("./agreement-pdf.js");
      return {
        bytes: await generateAgreementPdf(data),
        filename: agreementFilename(data.matterReference),
      };
    });
  };

  const previewFromForm = async () => {
    if (activeKind === "agreement") {
      const invalid = firstAgreementInvalid(form);
      if (invalid) {
        composeStatus.hidden = false;
        composeStatus.textContent = "Check the highlighted fields and try again.";
        invalid.focus?.();
        return;
      }
      composeStatus.hidden = true;
      const values = Object.fromEntries(new FormData(form).entries());
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
      });
      return;
    }

    const { formValues, matterPdf } = await import("./matter-download.js");
    const kind = activeKind;
    await previewPacked(() => matterPdf(kind, formValues(form)));
  };

  const openCompose = (kind, item) => {
    closeMenu();
    if (!payload?.firm || !Array.isArray(payload.people)) {
      setStatus(statusNode, "Agreement defaults are missing.");
      return;
    }
    activeItem = item;
    activeKind = kind;
    title.textContent = TITLES[kind] || "New document";
    fields.innerHTML = fieldsHtml(kind);
    form.reset();
    composeStatus.hidden = true;
    composeStatus.textContent = "";
    fillForm(form, prefill(kind, item, payload));
    const dob = form.elements.namedItem("clientDob");
    if (dob) dob.max = todayIso();
    syncShowWhen(form);
    if (!compose.open) compose.showModal();
    title.focus();
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await previewFromForm();
    } catch (error) {
      composeStatus.hidden = false;
      composeStatus.textContent = error instanceof Error && error.message
        ? error.message
        : "The document could not be prepared.";
    }
  });
  form.addEventListener("change", () => syncShowWhen(form));
  form.addEventListener("input", () => syncShowWhen(form));

  closeBtn.addEventListener("click", () => compose.close());
  compose.addEventListener("click", (event) => {
    if (event.target === compose) compose.close();
  });
  compose.addEventListener("close", () => {
    activeKind = "";
    fields.replaceChildren();
  });

  menu.addEventListener("click", (event) => {
    const button = event.target.closest("[data-admin-create]");
    if (!button || !activeItem) return;
    openCompose(button.getAttribute("data-admin-create"), activeItem);
  });

  document.addEventListener("click", (event) => {
    if (menu.hidden) return;
    if (menu.contains(event.target) || menuButton?.contains(event.target)) return;
    closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) closeMenu();
  });
  window.addEventListener("resize", closeMenu);
  window.addEventListener("scroll", closeMenu, true);

  return {
    previewRecord(item) {
      closeMenu();
      return previewAgreement(item);
    },
    toggleMenu,
    closeMenu,
    reset() {
      closeMenu();
      if (compose.open) compose.close();
    },
  };
}
