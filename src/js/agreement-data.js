export function clientInitials(name = "") {
  return String(name || "")
    .trim()
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
    .slice(0, 4);
}

export function todayIso(now = new Date()) {
  const date = now instanceof Date ? now : new Date(now);
  const when = Number.isNaN(date.getTime()) ? new Date() : date;
  const month = String(when.getMonth() + 1).padStart(2, "0");
  const day = String(when.getDate()).padStart(2, "0");
  return `${when.getFullYear()}-${month}-${day}`;
}

export function draftReference(now = new Date()) {
  const date = now instanceof Date ? now : new Date(now);
  const when = Number.isNaN(date.getTime()) ? new Date() : date;
  const start = Date.UTC(when.getFullYear(), 0, 0);
  const day = Math.floor((when.getTime() - start) / 86400000);
  return `EL-${when.getFullYear()}-${String(day).padStart(4, "0")}`;
}

export function resolvePerson(people, slug = "") {
  const list = Array.isArray(people) ? people : [];
  const key = String(slug || "").trim();
  return list.find((person) => person.slug === key)
    || list.find((person) => person.principal)
    || list[0]
    || null;
}

/** Prefer the SRA-named solicitor on reserved-work letters. */
export function resolveFeeEarner(people, slug = "") {
  const list = Array.isArray(people) ? people : [];
  const key = String(slug || "").trim();
  const instructed = list.find((person) => person.slug === key);
  const solicitor = list.find((person) => person.sraRegulated);
  return (instructed?.sraRegulated ? instructed : null)
    || solicitor
    || instructed
    || list.find((person) => person.principal)
    || list[0]
    || null;
}

export function feeEarnerLine(people, slug = "") {
  const person = resolveFeeEarner(people, slug);
  if (!person) return "";
  return [person.name, person.phone, person.email].filter(Boolean).join(" · ");
}

export function buildAgreement(client, payload, options = {}) {
  const firm = payload.firm;
  const when = options.when ? new Date(options.when) : new Date();
  const at = Number.isNaN(when.getTime()) ? new Date() : when;
  const person = resolvePerson(payload.people, options.instructSlug);
  return {
    clientName: String(client.clientName || "").trim(),
    clientEmail: String(client.clientEmail || "").trim().toLowerCase(),
    clientPhone: String(client.clientPhone || "").trim(),
    clientOccupation: String(client.clientOccupation || "").trim(),
    clientInitials: clientInitials(client.clientName),
    clientDob: String(client.clientDob || "").slice(0, 10),
    matterReference: draftReference(at),
    agreementDate: todayIso(at),
    feeEarnerName: person?.name || "",
    feeEarnerTitle: person?.role || "",
    feeEarnerEmail: person?.email || "",
    feeEarnerPhone: person?.phone || firm.phone,
    supervisorName: firm.supervisorName,
    supervisorTitle: firm.supervisorTitle,
    supervisorRole: firm.supervisorRole || "director",
    updateFrequency: firm.updateFrequency || "six weeks",
    privacyUrl: firm.privacyUrl || "edisonlaw.co.uk/privacy",
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

export function agreementFromRecord(record, payload) {
  return buildAgreement(
    {
      clientName: record.full_name,
      clientEmail: record.email || "",
      clientPhone: record.phone || "",
      clientOccupation: record.occupation ?? "",
      clientDob: record.date_of_birth,
    },
    payload,
    {
      instructSlug: record.instructed_person_slug || "",
      when: record.created_at,
    },
  );
}

export function agreementFilename(matterReference) {
  const safe = String(matterReference || "").replace(/[^a-z0-9-_]+/gi, "-").replace(/^-|-$/g, "");
  return `Edison-Law-Client-Authority-and-Consent-${safe || "completed"}.pdf`;
}

export function downloadBytes(bytes, filename) {
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

export function readJson(id) {
  const node = document.getElementById(id);
  if (!node) return null;
  try {
    return JSON.parse(node.textContent || "null");
  } catch {
    return null;
  }
}
