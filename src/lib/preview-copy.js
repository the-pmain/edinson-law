import { t } from "../i18n/catalog.js";
import { esc } from "./html.js";

export function previewDataAttrs() {
  return [
    ["preview-title", t("previewTitle")],
    ["preview-agree", t("previewAgree")],
    ["preview-sign", t("previewSign")],
    ["preview-close", t("previewClose")],
    ["preview-loading", t("previewLoading")],
    ["preview-fail", t("previewFail")],
    ["preview-signing", t("previewSigning")],
  ].map(([name, value]) => `data-${name}="${esc(value)}"`).join(" ");
}
