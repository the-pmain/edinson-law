/** Max length for optional prepare_clients text fields (matches phone). */
export const TEXT_FIELD_MAX = 80;

export const PREPARE_CLIENTS_SELECT =
  "id,created_at,full_name,email,phone,occupation,date_of_birth,instructed_person_slug";

/**
 * @typedef {object} PrepareClient
 * @property {string} id
 * @property {string} created_at
 * @property {string} full_name
 * @property {string} email
 * @property {string} date_of_birth
 * @property {string | null} [phone]
 * @property {string | null} [occupation]
 * @property {string | null} [instructed_person_slug]
 */

/**
 * @typedef {object} PrepareClientInput
 * @property {string} [full_name]
 * @property {string} [email]
 * @property {string} [date_of_birth]
 * @property {string | null} [phone]
 * @property {string | null} [occupation]
 * @property {string | null} [instructed_person_slug]
 */

/**
 * Trim occupation, cap length, and treat blank as null.
 * @param {unknown} value
 * @returns {string | null}
 */
export function normalizeOccupation(value) {
  if (value == null) return null;
  const occupation = String(value).trim().slice(0, TEXT_FIELD_MAX);
  return occupation || null;
}
