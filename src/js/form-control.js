/** namedItem returns a RadioNodeList when id and name hit two controls. */
export function formControl(form, name) {
  const field = form?.elements?.namedItem(name);
  if (!field) return null;
  if (typeof field.dispatchEvent === "function") return field;
  const list = [...field];
  return list.find((el) => el.name === name) || list[0] || null;
}
