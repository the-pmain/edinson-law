import {
  agreementFilename,
  buildAgreement,
  downloadBytes,
  readJson,
  todayIso,
} from "./agreement-data.js";
import { normalizeOccupation } from "./prepare-clients-model.js";

const CLIENT_FIELDS = ["clientName", "clientEmail", "clientPhone", "clientDob"];

function fieldWrap(input) {
  return input?.closest(".field") || input;
}

function setInvalid(input, on) {
  fieldWrap(input)?.classList.toggle("is-invalid", Boolean(on));
  if (input) input.setAttribute("aria-invalid", on ? "true" : "false");
}

function valueOf(form, name) {
  const field = form.elements.namedItem(name);
  if (!field) return "";
  if (field instanceof RadioNodeList) return String(field.value || "").trim();
  return String(field.value || "").trim();
}

function instructSlug() {
  return new URLSearchParams(window.location.search).get("instruct") || "";
}

function agreementFromForm(form, payload) {
  return buildAgreement(
    {
      clientName: valueOf(form, "clientName"),
      clientEmail: valueOf(form, "clientEmail"),
      clientPhone: valueOf(form, "clientPhone"),
      clientOccupation: valueOf(form, "clientOccupation"),
      clientDob: valueOf(form, "clientDob"),
    },
    payload,
    { instructSlug: instructSlug() },
  );
}

function firstInvalid(form) {
  const missing = [];
  CLIENT_FIELDS.forEach((name) => {
    const input = form.elements.namedItem(name);
    const value = valueOf(form, name);
    const invalid =
      name === "clientDob" ? !value || value > todayIso()
      : name === "clientPhone" ? value.replace(/\D/g, "").length < 8
      : name === "clientEmail" ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      : !value;
    setInvalid(input, invalid);
    if (invalid) missing.push(input);
  });
  const privacy = form.elements.namedItem("agreementPrivacy");
  setInvalid(privacy, !privacy?.checked);
  if (!privacy?.checked) missing.push(privacy);
  return missing.find(Boolean) || null;
}

export function peopleDocumentForm() {
  const form = document.querySelector("[data-agreement-form]");
  if (!form) return;

  const payload = readJson("edison-agreement-defaults");
  if (!payload?.firm || !Array.isArray(payload.people)) return;

  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector("[data-agreement-submit]");
  const dob = form.elements.namedItem("clientDob");
  if (dob) {
    dob.max = todayIso();
    if (dob.value && dob.value > dob.max) dob.value = "";
  }

  dob?.addEventListener("click", () => {
    if (typeof dob.showPicker !== "function") return;
    try {
      dob.showPicker();
    } catch {
      /* Picker already open, or the browser blocked it. */
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const invalid = firstInvalid(form);
    if (invalid) {
      if (status) {
        status.dataset.visible = "true";
        status.textContent = form.dataset.msgCheck || "Check the highlighted fields and try again.";
      }
      invalid.focus?.();
      return;
    }

    if (submit) submit.disabled = true;
    if (status) {
      status.dataset.visible = "true";
      status.textContent = form.dataset.msgSaving || "Saving...";
    }

    try {
      const data = agreementFromForm(form, payload);
      const saved = await fetch("/api/prepare-clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: data.clientName,
          email: data.clientEmail,
          phone: data.clientPhone,
          occupation: normalizeOccupation(data.clientOccupation),
          date_of_birth: data.clientDob,
          instructed_person_slug: instructSlug() || null,
        }),
      });
      const body = await saved.json().catch(() => ({}));
      if (!saved.ok) {
        throw new Error(
          body.error || body.message || form.dataset.msgSaveFail || "The details could not be saved.",
        );
      }

      if (status) status.textContent = form.dataset.msgCreating || "Creating the PDF...";
      const { generateAgreementPdf } = await import("./agreement-pdf.js");
      const bytes = await generateAgreementPdf(data);
      downloadBytes(bytes, agreementFilename(data.matterReference));
      form.reset();
      if (status) status.textContent = form.dataset.msgDone || "Agreement downloaded.";
    } catch (error) {
      if (status) {
        status.textContent = error instanceof Error && error.message
          ? error.message
          : (form.dataset.msgFail || "The PDF could not be created.");
      }
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}
