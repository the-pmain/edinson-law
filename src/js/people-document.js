const CLIENT_FIELDS = ["clientName", "clientEmail", "clientAddress", "clientDob"];
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readJson(id) {
  const node = document.getElementById(id);
  if (!node) return null;
  try {
    return JSON.parse(node.textContent || "null");
  } catch {
    return null;
  }
}

function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function draftReference() {
  const now = new Date();
  const start = Date.UTC(now.getFullYear(), 0, 0);
  const day = Math.floor((now.getTime() - start) / 86400000);
  return `EL-${now.getFullYear()}-${String(day).padStart(4, "0")}`;
}

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

function resolvePerson(people) {
  const slug = instructSlug();
  return people.find((person) => person.slug === slug)
    || people.find((person) => person.principal)
    || people[0]
    || null;
}

function buildAgreement(form, payload) {
  const firm = payload.firm;
  const person = resolvePerson(payload.people);
  return {
    clientName: valueOf(form, "clientName"),
    clientEmail: valueOf(form, "clientEmail"),
    clientAddress: valueOf(form, "clientAddress"),
    clientDob: valueOf(form, "clientDob"),
    matterReference: draftReference(),
    agreementDate: todayIso(),
    feeEarnerName: person?.name || "",
    feeEarnerTitle: person?.role || "",
    feeEarnerEmail: person?.email || "",
    feeEarnerPhone: firm.phone,
    supervisorName: firm.supervisorName,
    supervisorTitle: firm.supervisorTitle,
    supervisorRole: firm.supervisorRole || "director",
    updateFrequency: firm.updateFrequency || "monthly",
    firmAddress: firm.address,
    cancellationEmail: firm.email,
    sraNumber: firm.sraNumber,
    vatTreatment: firm.vatTreatment || "plus",
    firstReportWindow: firm.firstReportWindow,
    recoveryTailMonths: firm.recoveryTailMonths,
    interestRate: firm.interestRate,
    singleDisbursementLimit: firm.singleDisbursementLimit,
    aggregateDisbursementLimit: firm.aggregateDisbursementLimit,
    billingFrequency: firm.billingFrequency || "monthly",
    liabilityLimit: firm.liabilityLimit,
    individualRole: firm.individualRole || "director",
    initialComplaintContact: person?.name || firm.supervisorName,
    complaintsPartner: firm.complaintsPartner,
    complaintsEmail: firm.complaintsEmail,
    complaintAckDays: firm.complaintAckDays,
    complaintResponseWeeks: firm.complaintResponseWeeks,
    fileRetentionYears: firm.fileRetentionYears,
    valuationBody: firm.valuationBody,
  };
}

function firstInvalid(form) {
  const missing = [];
  CLIENT_FIELDS.forEach((name) => {
    const input = form.elements.namedItem(name);
    const value = valueOf(form, name);
    const invalid =
      name === "clientEmail" ? !EMAIL_OK.test(value)
      : name === "clientDob" ? !value || value > todayIso()
      : !value;
    setInvalid(input, invalid);
    if (invalid) missing.push(input);
  });
  const privacy = form.elements.namedItem("agreementPrivacy");
  setInvalid(privacy, !privacy?.checked);
  if (!privacy?.checked) missing.push(privacy);
  return missing.find(Boolean) || null;
}

function downloadBytes(bytes, filename) {
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const url = URL.createObjectURL(new Blob([buffer], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
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
      const data = buildAgreement(form, payload);
      const saved = await fetch("/api/prepare-clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: data.clientName,
          email: data.clientEmail,
          address: data.clientAddress,
          date_of_birth: data.clientDob,
          instructed_person_slug: instructSlug() || null,
        }),
      });
      if (!saved.ok) {
        throw new Error(form.dataset.msgSaveFail || "The details could not be saved.");
      }

      if (status) status.textContent = form.dataset.msgCreating || "Creating the PDF...";
      const { generateAgreementPdf } = await import("./agreement-pdf.js");
      const bytes = await generateAgreementPdf(data);
      const safeReference = data.matterReference.replace(/[^a-z0-9-_]+/gi, "-").replace(/^-|-$/g, "");
      downloadBytes(bytes, `Edison-Law-Client-Agreement-${safeReference || "completed"}.pdf`);
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
