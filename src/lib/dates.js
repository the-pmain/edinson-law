/** Project-wide UK dates. Storage is ISO (YYYY-MM-DD); users see DD/MM/YYYY. */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const UK_DATE_PLACEHOLDER = "DD/MM/YYYY";
export const EU_DATE_PLACEHOLDER = "DD.MM.YYYY";

export function pad2(n) {
  return String(n).padStart(2, "0");
}

export function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || "").trim());
}

function calendarDate(year, month, day) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return null;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

export function parseIsoDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|T|\s)/.exec(String(value || "").trim());
  if (!match) return null;
  return calendarDate(Number(match[1]), Number(match[2]), Number(match[3]));
}

/** Day-first. 05/06/2026 is 5 June 2026. */
export function parseUkDate(value) {
  const match = /^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4})$/.exec(String(value || "").trim());
  if (!match) return null;
  return calendarDate(Number(match[3]), Number(match[2]), Number(match[1]));
}

export function parseUserDate(value) {
  const text = String(value || "").trim();
  if (!text) return null;
  return parseIsoDate(text) || parseUkDate(text);
}

export function toIsoDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function asDate(value) {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  return parseUserDate(value);
}

function formatDayMonthYear(value, sep) {
  const date = asDate(value);
  if (!date) return "";
  return `${pad2(date.getDate())}${sep}${pad2(date.getMonth() + 1)}${sep}${date.getFullYear()}`;
}

export function formatUkDate(value) {
  return formatDayMonthYear(value, "/");
}

export function formatEuDate(value) {
  return formatDayMonthYear(value, ".");
}

export function formatUkLong(value) {
  const date = asDate(value);
  if (!date) return "";
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatUkDateTime(value) {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${formatUkDate(date)} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function maskDayMonthYear(raw, sep) {
  const digits = String(raw || "").replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}${sep}${digits.slice(2)}`;
  return `${digits.slice(0, 2)}${sep}${digits.slice(2, 4)}${sep}${digits.slice(4)}`;
}

export function maskUkDate(raw) {
  return maskDayMonthYear(raw, "/");
}

export function maskEuDate(raw) {
  return maskDayMonthYear(raw, ".");
}

export function todayIso(now = new Date()) {
  const date = now instanceof Date && !Number.isNaN(now.getTime()) ? now : new Date();
  return toIsoDate(date);
}
